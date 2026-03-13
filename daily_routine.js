require('dotenv').config();
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { getUserContext } = require('./src/utils/brainReader');
const { scrapeJobCards, saveResults, checkFilters } = require('./src/scraper');
const { generateReport } = require('./src/analysis');
const { updateMemory } = require('./src/utils/brainWriter');
const { fetchLinkedInAlerts } = require('./src/gmail_monitor');
const { parseLinkedInAlerts } = require('./src/linkedin_alert_parser');
const { scrapeNotificationJobs } = require('./src/notifications_scraper');
const { resolveBrowserConfig, launchBrowserWithSingleProfile } = require('./src/utils/browserSession');

puppeteer.use(StealthPlugin());

const AGENT_ID = (process.env.AGENT_ID || 'codex').toLowerCase();
const BROWSER_CONFIG = resolveBrowserConfig(AGENT_ID);

async function main() {
    console.log('');
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║         NorthStar Agency — Daily Intelligence Routine       ║');
    console.log('╚════════════════════════════════════════════════════════════╝');
    console.log('');

    // ── BOOT: Load Brain ─────────────────────────────────────────────────────
    const userContext = await getUserContext();
    if (!userContext) {
        console.error('CRITICAL: Failed to load CLIENT_BRIEF.md context.');
        return;
    }
    console.log(`🧠 Brain Loaded   : ${userContext.profile.name || 'José'}`);
    console.log(`🎯 High Skills    : ${userContext.skills.high.join(', ') || '—'}`);
    console.log(`❌ Exclusions     : ${userContext.exclusions.roles.slice(0, 3).join(', ') || '—'}`);
    console.log('');

    const dateStr = new Date().toISOString().split('T')[0];
    let totalJobs = 0;

    // ── PHASE 1 (PRIMARY): LinkedIn Notifications Tab — Browser ──────────────
    // Best source: full job details, real-time, unique set not in email alerts
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔔 PHASE 1 — LinkedIn Notifications Scrape (PRIMARY SOURCE)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    console.log(`🌐 Browser profile : ${BROWSER_CONFIG.userDataDir}`);
    if (BROWSER_CONFIG.executablePath) {
        console.log(`🧭 Browser binary  : ${BROWSER_CONFIG.executablePath}`);
    }
    const browser = await launchBrowserWithSingleProfile(puppeteer, BROWSER_CONFIG);

    let notifJobs = [];
    try {
        // Session check
        const checkPage = await browser.newPage();
        await checkPage.goto('https://www.linkedin.com/feed/', { waitUntil: 'domcontentloaded', timeout: 60000 });
        if (checkPage.url().includes('login') || checkPage.url().includes('signup')) {
            console.error('❌ Not logged in. Please login manually then restart.');
            await browser.close();
            return;
        }
        console.log('✅ LinkedIn session verified.');
        await checkPage.close();

        notifJobs = await scrapeNotificationJobs(browser, userContext, {
            maxNotifications: 8,
            jobsPerAlert: 6
        });

        totalJobs += notifJobs.length;
        console.log(`\n📊 Phase 1 result: ${notifJobs.length} job(s) from Notifications.`);

    } catch (err) {
        console.error(`⚠️  Phase 1 error (non-fatal): ${err.message}`);
    }

    // ── PHASE 2 (SECONDARY): Gmail Email Alerts — No Browser ─────────────────
    // Catches alerts that don't appear in the Notifications tab
    console.log('');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📬 PHASE 2 — Gmail Email Alert Ingestion (SECONDARY SOURCE)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    let emailJobs = [];
    try {
        const { ids, rawContent } = await fetchLinkedInAlerts({ query: 'newer_than:1d' });
        if (ids.length) {
            emailJobs = parseLinkedInAlerts(rawContent);
            if (emailJobs.length) {
                await saveResults(emailJobs, dateStr);
                console.log(`✅ Saved ${emailJobs.length} job(s) from email alerts.`);
                totalJobs += emailJobs.length;
            }
        } else {
            console.log('📭 No new LinkedIn alert emails today.');
        }
    } catch (emailErr) {
        console.warn(`⚠️  Gmail monitor error (non-fatal): ${emailErr.message}`);
    }

    // ── PHASE 3 (SUPPLEMENTARY): Quick Links Browser Scrape ──────────────────
    // Manual keyword search — catches anything missed by alerts/notifications
    console.log('');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🌐 PHASE 3 — Keyword Search Scrape (SUPPLEMENTARY)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    let searchJobs = [];
    try {
        const page = await browser.newPage();
        const targetKeyword = 'IT Support';
        const linkId = 'DAILY-SEARCH';
        const searchUrl = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(targetKeyword)}&location=Portugal&f_TPR=r86400&sortBy=DD`;

        console.log(`🔗 Searching: "${targetKeyword}" — Portugal — Past 24h`);
        await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
        await checkFilters(page, ['Portugal']);

        searchJobs = await scrapeJobCards(page, linkId, targetKeyword, 5, userContext);
        if (searchJobs.length) {
            await saveResults(searchJobs, dateStr);
            totalJobs += searchJobs.length;
            console.log(`✅ Saved ${searchJobs.length} job(s) from keyword search.`);
        }
        await page.close();
    } catch (err) {
        console.error(`⚠️  Phase 3 error (non-fatal): ${err.message}`);
    }

    // ── PHASE 4: Report ───────────────────────────────────────────────────────
    console.log('');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 PHASE 4 — Intelligence Report Generation');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    if (totalJobs > 0) {
        try {
            const reportPaths = await generateReport(dateStr);
            console.log(`✅ Report saved: ${reportPaths[0]}`);
        } catch (rErr) {
            console.warn(`⚠️  Report generation error: ${rErr.message}`);
        }
    } else {
        console.log('⚠️  No jobs captured — skipping report generation.');
    }

    // ── Memory Update ─────────────────────────────────────────────────────────
    await updateMemory(
        { jobsScraped: totalJobs },
        `Daily routine complete. Sources: Notifications(${notifJobs.length}) + Email(${emailJobs.length}) + Search(${searchJobs.length}) = ${totalJobs} total jobs for ${dateStr}.`
    );

    console.log('');
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log(`║  ✅ Daily Routine Complete — ${totalJobs} total job(s) captured`.padEnd(61) + '║');
    console.log('║     Source breakdown:'.padEnd(62) + '║');
    console.log(`║       🔔 Notifications (primary)  : ${notifJobs.length}`.padEnd(62) + '║');
    console.log(`║       📬 Email alerts (secondary) : ${emailJobs.length}`.padEnd(62) + '║');
    console.log(`║       🌐 Keyword search (extra)   : ${searchJobs.length}`.padEnd(62) + '║');
    console.log('╚════════════════════════════════════════════════════════════╝');
    console.log('');

    await browser.close();
}

main().catch(err => {
    console.error('🔥 Fatal Routine Error:', err);
    process.exit(1);
});
