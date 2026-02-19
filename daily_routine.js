require('dotenv').config();
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const path = require('path');
const fs = require('fs-extra');
const { getUserContext } = require('./src/utils/brainReader');
const { scrapeJobCards, saveResults, checkFilters } = require('./src/scraper');
const { generateReport } = require('./src/analysis');
const { updateMemory } = require('./src/utils/brainWriter');

puppeteer.use(StealthPlugin());

const AGENT_ID = (process.env.AGENT_ID || 'codex').toLowerCase();
const SESSION_METHOD = (process.env.SESSION_METHOD || 'isolated_profile').toLowerCase();
const USER_DATA_DIR = process.env.USER_DATA_DIR
    ? path.resolve(process.env.USER_DATA_DIR)
    : path.join(process.cwd(), `user_data_${AGENT_ID}`);
const BROWSER_CHANNEL = process.env.BROWSER_CHANNEL;
const BROWSER_EXECUTABLE_PATH = process.env.BROWSER_EXECUTABLE_PATH;

async function main() {
    console.log('🤖 ACTIVATING AGENT: OpenClaw Daily Routine...');

    // 1. BOOT PHASE: Load Brain
    const userContext = await getUserContext();
    if (!userContext) {
        console.error('CRITICAL: Failed to load CLIENT_BRIEF.md context.');
        return;
    }
    console.log(`🧠 Brain Loaded. User: ${userContext.profile.roles[0] || 'Maestro'}`);
    console.log(`🎯 Active Skills: ${userContext.skills.high.length} High, ${userContext.skills.medium.length} Medium.`);

    // 2. PLANNING PHASE: Define Target
    // In a real agent, this would be an LLM choice. For now, we take the user's request.
    const targetKeyword = "Suporte Informática"; // Local variant
    const linkId = "DAILY-002";
    console.log(`📌 Target Acquired: ${targetKeyword}`);

    // 3. EXECUTION PHASE
    console.log('🚀 Launching Browser...');
    console.log(`🔐 Agent Session: agent=${AGENT_ID}, method=${SESSION_METHOD}, profile=${USER_DATA_DIR}`);
    const launchOptions = {
        headless: false,
        userDataDir: USER_DATA_DIR,
        defaultViewport: null,
        args: ['--start-maximized']
    };
    if (BROWSER_CHANNEL) launchOptions.channel = BROWSER_CHANNEL;
    if (BROWSER_EXECUTABLE_PATH) launchOptions.executablePath = BROWSER_EXECUTABLE_PATH;
    const browser = await puppeteer.launch(launchOptions);

    try {
        const page = await browser.newPage();

        // Session Check
        await page.goto('https://www.linkedin.com/feed/', { waitUntil: 'domcontentloaded' });
        if (page.url().includes('login') || page.url().includes('signup')) {
            console.error('❌ Not logged in. Please login manually and retry.');
            return;
        }

        // URL Construction (Search URL)
        // Heuristic: Construct search URL for Portugal + Date Posted
        // f_TPR=r86400 (Past 24 hours), but let's do Past Week (r604800) for better yield in test
        const searchUrl = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(targetKeyword)}&location=Portugal&f_TPR=r604800&sortBy=DD`;

        console.log(`🔗 Navigating to: ${searchUrl}`);
        await page.goto(searchUrl, { waitUntil: 'domcontentloaded' });

        // Drift Check (Simple)
        await checkFilters(page, ['Portugal']);

        // Scrape with Context!
        console.log('🕵️‍♀️ Starting analysis with CLIENT_BRIEF.md context...');
        const results = await scrapeJobCards(page, linkId, targetKeyword, 5, userContext);

        if (results.length > 0) {
            const dateStr = new Date().toISOString().split('T')[0];
            await saveResults(results, dateStr);

            // 4. REPORT PHASE
            console.log('📊 Generating Intelligence Report...');
            const reportPaths = await generateReport(dateStr);
            console.log(`✅ Routine Complete. Report saved to: ${reportPaths[0]}`);

            // Update CASE_LOG.md (Writeback)
            await updateMemory({ jobsScraped: results.length }, `Scraped ${results.length} jobs for '${targetKeyword}'.`);

        } else {
            console.log('⚠️ No results found to analyze.');
            await updateMemory({ jobsScraped: 0 }, `Attempted scrape for '${targetKeyword}' but found no results.`);
        }

    } catch (error) {
        console.error('🔥 Routine Error:', error);
    } finally {
        await browser.close();
        console.log('😴 Agent Sleeping.');
    }
}

main();
