/**
 * notifications_scraper.js
 * NorthStar Agency — LinkedIn Notifications Tab Scraper
 *
 * PRIMARY job source. Scrapes https://www.linkedin.com/notifications/?filter=jobs_all
 * to discover new job opportunities from the LinkedIn Notifications "Jobs" tab.
 *
 * Why this is PRIMARY over email alerts:
 *   1. Shows different jobs than email alerts (LinkedIn uses two separate algorithms)
 *   2. "View jobs" links lead to full search pages → we get complete job details
 *   3. Directly browsable — we can click into listings for descriptions, Easy Apply, etc.
 *
 * Data source priority:
 *   1. ★ LinkedIn Notifications Tab (this module) — full details, primary
 *   2.   Gmail Email Alerts (gmail_monitor.js)     — supplementary
 *   3.   Quick Links scraper (scraper.js)          — manual keyword searches
 *
 * Usage:
 *   node src/notifications_scraper.js        (standalone with existing browser session)
 *   npm run notify:scrape
 *
 * Or require in daily_routine.js:
 *   const { scrapeNotificationJobs } = require('./notifications_scraper');
 */

'use strict';

require('dotenv').config();

const puppeteer = require('puppeteer-extra');
const Stealth = require('puppeteer-extra-plugin-stealth');

const { scrapeJobCards, saveResults } = require('./scraper');
const { getUserContext } = require('./utils/brainReader');
const { updateMemory } = require('./utils/brainWriter');
const { resolveBrowserConfig, launchBrowserWithSingleProfile } = require('./utils/browserSession');

puppeteer.use(Stealth());

// ── Config ────────────────────────────────────────────────────────────────────

const NOTIFICATIONS_URL = 'https://www.linkedin.com/notifications/?filter=jobs_all';
const BROWSER_CONFIG = resolveBrowserConfig('codex');

// How many notifications to process — avoid overwhelming every run
const MAX_NOTIFICATIONS = parseInt(process.env.MAX_NOTIFICATIONS || '8', 10);
// How many job cards to scrape PER notification click-through
const JOBS_PER_ALERT = parseInt(process.env.JOBS_PER_ALERT || '6', 10);

const delay = (min, max) =>
    new Promise(r => setTimeout(r, Math.floor(Math.random() * (max - min + 1) + min)));

// ── Notification Card Scraper ─────────────────────────────────────────────────

/**
 * Reads the notifications page and extracts all job notification cards.
 * Returns an array of { label, viewJobsUrl } objects.
 *
 * @param {import('puppeteer').Page} page
 * @returns {Promise<Array<{label: string, viewJobsUrl: string}>>}
 */
async function extractNotificationCards(page) {
    console.log('📋 [NotifScraper] Extracting notification cards...');

    await page.waitForFunction(() => {
        // Wait until at least one notification card is in the DOM
        return document.querySelectorAll(
            '.nt-card, .notification-card, [data-urn*="urn:li:notification"], .artdeco-card'
        ).length > 0 ||
            // LinkedIn also renders these as list items sometimes
            document.querySelectorAll('li.artdeco-list__item').length > 0;
    }, { timeout: 20000 }).catch(() => {
        console.warn('  ⚠️  Timeout waiting for notification cards — proceeding anyway');
    });

    await delay(2000, 3000);

    // Scroll down to load more notifications
    await page.evaluate(async () => {
        for (let i = 0; i < 3; i++) {
            window.scrollTo(0, document.body.scrollHeight);
            await new Promise(r => setTimeout(r, 1500));
        }
        window.scrollTo(0, 0);
    });

    await delay(1000, 2000);

    // Extract all "View jobs" cards
    const cards = await page.evaluate(() => {
        const results = [];
        const allLinks = Array.from(document.querySelectorAll('a'));

        const viewJobLinks = allLinks.filter(a => {
            const href = (a.href || '');
            // We want links that go to job searches
            return href.includes('linkedin.com/jobs/search') || href.includes('linkedin.com/jobs/collections');
        });

        for (const link of viewJobLinks) {
            // Check if this link is part of a notification card
            const isNotification = !!link.closest('.nt-card__container, .notification-card, [data-urn*="urn:li:notification"], .artdeco-list__item');
            if (!isNotification) continue;

            // The text is usually within the link itself or its container
            const txt = (link.innerText || link.textContent || '').trim();
            let labelText = txt.split('\n')[0].trim();
            if (!labelText) labelText = 'Job Alert';

            // Skip the image links that just say "Profile image for several companies on LinkedIn"
            if (labelText.includes('Profile image')) continue;

            results.push({
                label: labelText,
                viewJobsUrl: link.href
            });
        }

        return results;
    });

    // Deduplicate by URL
    const seen = new Set();
    const unique = cards.filter(c => {
        if (seen.has(c.viewJobsUrl)) return false;
        seen.add(c.viewJobsUrl);
        return true;
    });

    console.log(`📋 [NotifScraper] Found ${unique.length} unique job notification(s).`);
    return unique;
}

// ── Main Scraper ──────────────────────────────────────────────────────────────

/**
 * Full pipeline: open notifications page → extract cards → navigate each →
 * scrape job results with full scoring → save to CSV.
 *
 * @param {import('puppeteer').Browser} browser   - Existing Puppeteer browser instance
 * @param {object}                      userContext - From getUserContext()
 * @param {object}                      options
 * @param {number}  [options.maxNotifications]     - Max notification cards to process
 * @param {number}  [options.jobsPerAlert]         - Max jobs to pull per notification
 * @returns {Promise<object[]>}                     All scraped job records
 */
async function scrapeNotificationJobs(browser, userContext, options = {}) {
    const maxN = options.maxNotifications ?? MAX_NOTIFICATIONS;
    const maxJ = options.jobsPerAlert ?? JOBS_PER_ALERT;
    const dateStr = new Date().toISOString().split('T')[0];

    console.log('');
    console.log('🔔 [NotifScraper] ══ LinkedIn Notifications Scrape ══');
    console.log(`   URL     : ${NOTIFICATIONS_URL}`);
    console.log(`   Max cards: ${maxN} | Jobs per card: ${maxJ}`);
    console.log('');

    const page = await browser.newPage();

    try {
        // 1 — Navigate to Notifications → Jobs tab
        await page.goto(NOTIFICATIONS_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });

        // Login check
        if (page.url().includes('login') || page.url().includes('signup')) {
            throw new Error('CRITICAL: Not logged in. Please log in manually and restart.');
        }
        console.log('✅ [NotifScraper] Notifications page loaded.');

        // 2 — Make sure we're on the "Jobs" filter
        // The URL already has ?filter=jobs_all, but click the tab if visible
        try {
            const jobsTab = await page.$('button[aria-label*="Jobs"], a[href*="filter=jobs_all"]');
            if (jobsTab) {
                await jobsTab.click();
                await delay(1500, 2500);
                console.log('✅ [NotifScraper] Jobs filter tab activated.');
            }
        } catch (_) { /* Tab may already be active from URL param */ }

        // 3 — Extract notification cards
        const cards = await extractNotificationCards(page);

        if (!cards.length) {
            console.log('📭 [NotifScraper] No job notification cards found.');
            return [];
        }

        // 4 — Process each card (up to maxN)
        const allJobs = [];
        const toProcess = cards.slice(0, maxN);

        for (let i = 0; i < toProcess.length; i++) {
            const card = toProcess[i];
            console.log(`\n  ⓘ  [${i + 1}/${toProcess.length}] "${card.label}"`);
            console.log(`       → ${card.viewJobsUrl}`);

            try {
                // Navigate to the jobs search page for this alert
                await page.goto(card.viewJobsUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
                await delay(3000, 5000);

                // Login drift check
                if (page.url().includes('login') || page.url().includes('signup')) {
                    console.error('  ❌ Redirected to login. Stopping to protect session.');
                    break;
                }

                // Generate a clean link ID for this notification
                const alertId = `NOTIF-${String(i + 1).padStart(3, '0')}`;
                const keyword = card.label.replace(/[:–—].*$/, '').trim(); // strip "new opportunities in Portugal"

                // Use the existing battle-tested scrapeJobCards function
                const jobs = await scrapeJobCards(page, alertId, keyword, 1, userContext);
                // Note: minResults=1 because some alert searches may have few results

                if (jobs.length) {
                    allJobs.push(...jobs);
                    await saveResults(jobs, dateStr);
                    console.log(`  ✅  Captured ${jobs.length} job(s) from this alert.`);
                } else {
                    console.log('  ⚠️  No job cards extracted from this alert page.');
                }

            } catch (err) {
                console.error(`  ❌  Error processing card "${card.label}": ${err.message}`);
            }

            // Polite delay between notifications
            if (i < toProcess.length - 1) {
                await delay(4000, 7000);
            }
        }

        console.log(`\n🔔 [NotifScraper] Complete. Total jobs captured: ${allJobs.length}`);
        return allJobs;

    } finally {
        await page.close().catch(() => { });
    }
}

// ── Standalone Runner ─────────────────────────────────────────────────────────

if (require.main === module) {
    (async () => {
        console.log('');
        console.log('╔═══════════════════════════════════════════════════════════╗');
        console.log('║  NorthStar — LinkedIn Notifications Scraper (PRIMARY)     ║');
        console.log('╚═══════════════════════════════════════════════════════════╝');

        const userContext = await getUserContext();
        if (!userContext) {
            console.error('❌ CLIENT_BRIEF.md not found. Scoring will be disabled.');
        }

        console.log(`🌐 Browser profile: ${BROWSER_CONFIG.userDataDir}`);
        if (BROWSER_CONFIG.executablePath) {
            console.log(`🧭 Browser binary : ${BROWSER_CONFIG.executablePath}`);
        }
        const browser = await launchBrowserWithSingleProfile(puppeteer, BROWSER_CONFIG);

        try {
            const jobs = await scrapeNotificationJobs(browser, userContext);

            if (jobs.length) {
                const dateStr = new Date().toISOString().split('T')[0];
                await updateMemory(
                    { notificationJobsScraped: jobs.length },
                    `Notifications scrape: captured ${jobs.length} job(s) from LinkedIn Notifications tab on ${dateStr}.`
                );
                console.log(`\n✅ Done. ${jobs.length} job(s) saved to data/job_results_${dateStr}.csv`);
            } else {
                console.log('\n📭 No jobs captured from notifications this run.');
            }

        } catch (err) {
            console.error('❌ Notifications scraper error:', err.message);
        } finally {
            // Keep browser open for inspection (manual-first policy)
            console.log('\n🔎 Browser kept open for inspection. Close manually when done.');
        }
    })();
}

module.exports = { scrapeNotificationJobs, extractNotificationCards };
