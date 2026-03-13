require('dotenv').config();
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const path = require('path');

puppeteer.use(StealthPlugin());

const fs = require('fs-extra');
const { scrapeJobCards, saveResults, checkFilters } = require('./scraper');
const { getUserContext } = require('./utils/brainReader');
const { updateMemory } = require('./utils/brainWriter');
const { resolveBrowserConfig, launchBrowserWithSingleProfile } = require('./utils/browserSession');

const CONFIG_PATH = process.argv[2] ? path.resolve(process.argv[2]) : path.join(process.cwd(), 'config', 'quick_links.json');
const MAX_ATTEMPTS_PER_LINK = 3;
const AGENT_ID = (process.env.AGENT_ID || 'codex').toLowerCase();
const SESSION_METHOD = (process.env.SESSION_METHOD || 'isolated_profile').toLowerCase();
const BROWSER_CONFIG = resolveBrowserConfig(AGENT_ID);

const delay = (min, max) => new Promise(resolve =>
    setTimeout(resolve, Math.floor(Math.random() * (max - min + 1) + min))
);

function isDetachedError(error) {
    const msg = (error && error.message) ? error.message.toLowerCase() : '';
    return msg.includes('detached frame') || msg.includes('target closed') || msg.includes('session closed');
}

async function createVerifiedPage(browser) {
    const page = await browser.newPage();
    await page.goto('https://www.linkedin.com/feed/', { waitUntil: 'domcontentloaded', timeout: 60000 });
    if (page.url().includes('login') || page.url().includes('signup')) {
        throw new Error('CRITICAL: Not logged in. Please log in manually in the browser window, then restart the script.');
    }
    return page;
}

async function main() {
    console.log(`Launching browser with persistent profile...`);
    console.log(`Agent Session: agent=${AGENT_ID}, method=${SESSION_METHOD}, profile=${BROWSER_CONFIG.userDataDir}`);
    if (BROWSER_CONFIG.executablePath) {
        console.log(`Browser Binary: ${BROWSER_CONFIG.executablePath}`);
    }
    const userContext = await getUserContext();
    if (!userContext) {
        console.error('CRITICAL: Failed to load CLIENT_BRIEF.md context.');
        return;
    }

    const browser = await launchBrowserWithSingleProfile(puppeteer, BROWSER_CONFIG);

    let activePage;
    try {
        activePage = await createVerifiedPage(browser);
    } catch (error) {
        console.error(error.message);
        return;
    }

    console.log('Session verified. Loading Quick Links...');
    const quickLinks = await fs.readJson(CONFIG_PATH);

    const allResults = [];
    const dateStr = new Date().toISOString().split('T')[0]; // dd-mm-yyyy logic later, iso for now

    for (const link of quickLinks) {
        console.log(`Processing Link: ${link.link_id} - ${link.keyword}`);

        let processed = false;
        for (let attempt = 1; attempt <= MAX_ATTEMPTS_PER_LINK; attempt++) {
            try {
                if (!activePage || activePage.isClosed()) {
                    activePage = await createVerifiedPage(browser);
                }

                await activePage.goto(link.linkedin_url, { waitUntil: 'domcontentloaded', timeout: 60000 });
                console.log('Navigation complete. Waiting for content to settle...');

                // Safety Check: Login Redirect
                if (activePage.url().includes('login') || activePage.url().includes('signup')) {
                    console.error('CRITICAL: Redirected to login page. Stopping run to protect account.');
                    return;
                }

                // Drift Detection
                let expectedConfig = ['Portugal'];
                if (link.filters_summary.includes('Entry')) expectedConfig.push('Entry');
                if (link.filters_summary.includes('On-site')) expectedConfig.push('On-site');

                const filterCheck = await checkFilters(activePage, expectedConfig);
                if (!filterCheck.passed) {
                    console.error(`WARNING: Filter Drift detected on ${link.keyword}. Proceeding with CAUTION.`);
                }

                await delay(5000, 8000);

                const results = await scrapeJobCards(activePage, link.link_id, link.keyword, 8, userContext);
                allResults.push(...results);

                console.log(`Create ${results.length} entries for ${link.link_id}`);
                if (results.length > 0) {
                    await saveResults(results, dateStr);
                }

                processed = true;
                break;
            } catch (error) {
                const lastAttempt = attempt === MAX_ATTEMPTS_PER_LINK;
                console.error(`Attempt ${attempt}/${MAX_ATTEMPTS_PER_LINK} failed for ${link.link_id}: ${error.message}`);

                if (!lastAttempt && isDetachedError(error)) {
                    try {
                        if (activePage && !activePage.isClosed()) {
                            await activePage.close();
                        }
                    } catch (_) {
                        // Ignore close errors while recovering.
                    }
                    activePage = await createVerifiedPage(browser);
                    continue;
                }

                break;
            }
        }

        if (!processed) {
            console.error(`Failed to process ${link.link_id} after ${MAX_ATTEMPTS_PER_LINK} attempts.`);
        }
    }

    console.log('Main loop completed.');
    await updateMemory(
        { jobsScraped: allResults.length },
        `Main scraper run completed. Captured ${allResults.length} jobs across ${quickLinks.length} quick links.`
    );

    // Optional: browser.close(); 
    // Keeping open for debugging as per "Manual-first" rule
}

main();
