const puppeteer = require('puppeteer-extra');
const Stealth = require('puppeteer-extra-plugin-stealth');
const { resolveBrowserConfig, launchBrowserWithSingleProfile } = require('./src/utils/browserSession');

puppeteer.use(Stealth());
const BROWSER_CONFIG = resolveBrowserConfig('codex');

(async () => {
    const browser = await launchBrowserWithSingleProfile(puppeteer, BROWSER_CONFIG);
    const page = await browser.newPage();
    await page.goto('https://www.linkedin.com/notifications/?filter=jobs_all', { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 5000));

    const cards = await page.evaluate(() => {
        const results = [];
        const allLinks = Array.from(document.querySelectorAll('a'));

        const viewJobLinks = allLinks.filter(a => {
            const href = (a.href || '');
            return href.includes('linkedin.com/jobs/search') || href.includes('linkedin.com/jobs/collections');
        });

        for (const link of viewJobLinks) {
            const isNotification = !!link.closest('.nt-card__container, .notification-card, [data-urn*="urn:li:notification"], .artdeco-list__item');
            if (!isNotification) continue;

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

        // Deduplicate by URL
        const seen = new Set();
        return results.filter(c => {
            if (seen.has(c.viewJobsUrl)) return false;
            seen.add(c.viewJobsUrl);
            return true;
        });
    });

    console.log(JSON.stringify(cards, null, 2));
    await browser.close();
})();
