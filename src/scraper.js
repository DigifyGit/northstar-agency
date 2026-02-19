const fs = require('fs-extra');
const path = require('path');
const { createObjectCsvWriter } = require('csv-writer');
const { scoreJob } = require('./scoring');

// --- Helper Functions ---
const delay = (min, max) => new Promise(resolve => setTimeout(resolve, Math.random() * (max - min) + min));

async function checkFilters(page, expectedTokens) {
    if (!expectedTokens || expectedTokens.length === 0) return { passed: true };

    console.log('Verifying filters...');
    try {
        const activeFilters = await page.evaluate(() => {
            // Selectors for filter chips in the top bar
            const chips = Array.from(document.querySelectorAll('.search-reusables__filter-list-item, .artdeco-pill--selected'));
            return chips.map(c => c.innerText.trim());
        });

        const missing = expectedTokens.filter(token =>
            !activeFilters.some(f => f.toLowerCase().includes(token.toLowerCase()))
        );

        if (missing.length > 0) {
            console.error(`DRIFT DETECTED! Missing filters: ${missing.join(', ')}`);
            console.error(`Active filters found: ${activeFilters.join(', ')}`);
            return { passed: false, missing, active: activeFilters };
        }
        console.log('Filters verified: MATCH');
        return { passed: true };
    } catch (e) {
        console.error('Error checking filters:', e);
        return { passed: false, error: e.message }; // Fail safe
    }
}

async function saveResults(results, dateStr) {
    const dataDir = path.join(process.cwd(), 'data');
    await fs.ensureDir(dataDir);
    const filePath = path.join(dataDir, `job_results_${dateStr}.csv`);

    const csvWriter = createObjectCsvWriter({
        path: filePath,
        header: [
            { id: 'run_date', title: 'Run Date' },
            { id: 'job_id', title: 'Job ID' },
            { id: 'link_id', title: 'Link ID' },
            { id: 'keyword', title: 'Keyword' },
            { id: 'tier', title: 'Tier' },
            { id: 'fit_score', title: 'Score' },
            { id: 'job_title', title: 'Job Title' },
            { id: 'company', title: 'Company' },
            { id: 'location_text', title: 'Location' },
            { id: 'posted_age_text', title: 'Posted' },
            { id: 'reason_short', title: 'Reason' },
            { id: 'job_url', title: 'URL' },
            { id: 'promoted_flag', title: 'Promoted' },
            { id: 'easy_apply_flag', title: 'Easy Apply' },
            { id: 'workplace_type', title: 'Workplace' },
            { id: 'description', title: 'Description' }
        ],
        append: fs.existsSync(filePath)
    });

    await csvWriter.writeRecords(results);
    console.log(`Saved ${results.length} records to ${filePath}`);
}

async function scrapeJobCards(page, linkId, keyword, minResults = 8, userContext = null) {
    console.log(`Scraping results for: ${keyword} (${linkId})`);

    // Wait for job list to load
    // BigPipe means we need to wait for the element to actually exist in the DOM
    try {
        await page.waitForFunction(() => {
            const selectors = [
                '.jobs-search-results-list',
                '.jobs-search__results-list',
                'ul.scaffold-layout__list-container',
                '.jobs-search-results__list',
                'div[aria-label="Search results"]'
            ];
            return selectors.some(s => document.querySelector(s));
        }, { timeout: 30000 });
        console.log('Job list container detected.');
    } catch (e) {
        console.log('Timeout waiting for job list container.');
    }

    // Scroll logic - More aggressive to trigger lazy loading
    try {
        await page.evaluate(async () => {
            const selectors = [
                '.jobs-search-results-list',
                '.jobs-search__results-list',
                'ul.scaffold-layout__list-container',
                'div.jobs-search-results-list__pagination' // explicit bottom element
            ];

            const container = selectors.map(s => document.querySelector(s)).find(e => e);

            // Methodology: Scroll specific container AND window
            if (container) {
                for (let i = 0; i < 6; i++) {
                    container.scrollTop = container.scrollHeight;
                    await new Promise(r => setTimeout(r, 1200));
                }
                container.scrollTop = 0; // Reset to top to start clicking
            } else {
                // Fallback to window scroll
                for (let i = 0; i < 6; i++) {
                    window.scrollTo(0, document.body.scrollHeight);
                    await new Promise(r => setTimeout(r, 1200));
                }
                window.scrollTo(0, 0);
            }
        });
        await delay(3000, 5000); // Wait for DOM to settle
    } catch (e) { console.log('Scroll failed:', e); }

    // Get all job card elements
    const jobCardsHandle = await page.evaluateHandle(() => {
        const selectors = [
            '.job-card-container',
            'li.jobs-search-results__list-item',
            '.scaffold-layout__list-container li',
            '.jobs-search-results__list-item'
        ];
        for (const sel of selectors) {
            const els = document.querySelectorAll(sel);
            if (els.length > 0) return Array.from(els);
        }
        return [];
    });

    // Convert property handle to length
    const cardCount = await jobCardsHandle.getProperties().then(m => m.size).catch(() => 0);
    console.log(`Debug: Handle size: ${cardCount}`);

    // Real count from the handle is tricky, let's trust the length from evaluate
    const actualCount = await page.evaluate(() => {
        const selectors = [
            '.job-card-container',
            'li.jobs-search-results__list-item',
            '.scaffold-layout__list-container li'
        ];
        // ... same selector logic as before usually works ...
        return document.querySelectorAll('.job-card-container').length ||
            document.querySelectorAll('li.jobs-search-results__list-item').length;
    });

    console.log(`Found ${actualCount} job cards.`);

    if (actualCount < minResults) {
        console.error(`Coverage Failure: Found ${actualCount} results, required ${minResults}.`);
        // Dump HTML for debugging if coverage is low
        const uniqueClasses = await page.evaluate(() => {
            const classes = new Set();
            document.querySelectorAll('ul, li, div').forEach(el => {
                if (el.className && typeof el.className === 'string') {
                    el.classList.forEach(c => classes.add(c));
                }
            });
            return Array.from(classes);
        });
        console.log('Available Classes:', uniqueClasses.join(', '));

        const content = await page.content();
        await fs.writeFile('debug_failure.html', content);
        const innerText = await page.evaluate(() => document.body.innerText);
        await fs.writeFile('debug_text.txt', innerText);
        console.log('Saved debug_failure.html and debug_text.txt');
        return [];
    }

    const results = [];
    const limit = Math.min(actualCount, 30); // Max 30 for Market Mapping as requested

    for (let i = 0; i < limit; i++) {
        try {
            // Find card again by index to avoid detached frame/element errors
            const card = await page.evaluateHandle((index) => {
                const selectors = [
                    '.job-card-container',
                    'li.jobs-search-results__list-item',
                    '.scaffold-layout__list-container li'
                ];
                for (const sel of selectors) {
                    const els = document.querySelectorAll(sel);
                    if (els.length > index) return els[index];
                }
                return null;
            }, i);

            if (!card || !(await card.asElement())) {
                console.log(`Card ${i} not found anymore, skipping.`);
                continue;
            }

            await card.evaluate(el => el.scrollIntoView({ block: 'center' }));
            await delay(800, 1500);

            // Click the card to load details on the right
            await card.click().catch(() => { });
            await delay(2000, 3500);

            // Now extract FULL details from the Right Pane (active job)
            const jobData = await page.evaluate(() => {
                const rightPane = document.querySelector('.jobs-search__job-details--container') || document.body;

                const titleEl = rightPane.querySelector('.job-details-jobs-unified-top-card__job-title') ||
                    rightPane.querySelector('h2.t-24') ||
                    document.querySelector('.jobs-unified-top-card__job-title');

                const companyEl = rightPane.querySelector('.job-details-jobs-unified-top-card__company-name') ||
                    rightPane.querySelector('.jobs-unified-top-card__company-name') ||
                    document.querySelector('.jobs-unified-top-card__company-name');

                const locationEl = rightPane.querySelector('.job-details-jobs-unified-top-card__primary-description-container .bullet') || // partial match
                    rightPane.querySelector('.jobs-unified-top-card__bullet') ||
                    document.querySelector('.jobs-unified-top-card__bullet');

                // Description is usually in #job-details, sometimes it's lazy loaded
                const descriptionEl = document.querySelector('#job-details') || document.querySelector('.jobs-description');

                const urlEl = rightPane.querySelector('.job-details-jobs-unified-top-card__job-title a');
                const url = urlEl ? urlEl.href : window.location.href;

                // Extract Job ID from URL (e.g., /view/1234567/)
                const jobIdMatch = url.match(/view\/(\d+)/);
                const jobId = jobIdMatch ? jobIdMatch[1] : (url.match(/currentJobId=(\d+)/) ? url.match(/currentJobId=(\d+)/)[1] : 'unknown');

                return {
                    job_id: jobId,
                    title: titleEl ? titleEl.innerText.trim() : '',
                    company: companyEl ? companyEl.innerText.trim() : '',
                    location_text: locationEl ? locationEl.innerText.trim() : '',
                    description: descriptionEl ? descriptionEl.innerText.trim() : '',
                    job_url: url,
                    // Easy Apply often has a distinct button or label
                    easy_apply_flag: !!document.querySelector('.jobs-apply-button--top-card button[aria-label*="Easy Apply"]')
                };
            });

            // Heuristic for workplace type if not explicitly grabbed
            let workplace = 'Unknown';
            if (jobData.location_text.toLowerCase().includes('remote')) workplace = 'Remote';
            else if (jobData.location_text.toLowerCase().includes('hybrid')) workplace = 'Hybrid';
            else workplace = 'On-site'; // Default assumption if neither

            // Clean up data
            const dateStr = new Date().toISOString().split('T')[0];

            // SCORE IT
            const { score, tier, reason_short } = scoreJob({
                title: jobData.title,
                description: jobData.description,
                workplace_type: workplace,
                location_text: jobData.location_text,
                easy_apply_flag: jobData.easy_apply_flag
            }, userContext);

            results.push({
                run_date: dateStr,
                job_id: jobData.job_id,
                link_id: linkId,
                keyword: keyword,
                job_title: jobData.title,
                company: jobData.company,
                location_text: jobData.location_text,
                workplace_type: workplace,
                posted_age_text: 'N/A',
                promoted_flag: 'No',
                easy_apply_flag: jobData.easy_apply_flag ? 'Yes' : 'No',
                fit_score: score,
                tier: tier,
                reason_short: reason_short,
                job_url: jobData.job_url,
                description: jobData.description
            });
        } catch (e) {
            console.error(`Error processing card ${i}:`, e.message);
        }
    }

    return results;
}

module.exports = {
    scrapeJobCards,
    saveResults,
    checkFilters
};
