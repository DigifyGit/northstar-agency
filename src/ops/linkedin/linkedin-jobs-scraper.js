const { chromium } = require('playwright');
const fs = require('fs');

const CONFIG = {
  keywords: 'help desk',
  location: 'Portugal',
  workType: '2',
  minScore: 30
};

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.newContext({
    storageState: './linkedin-storage-state.json',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 800 }
  });

  const page = await context.newPage();

  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => false });
  });

  const url = `https://www.linkedin.com/jobs/search?keywords=${encodeURIComponent(CONFIG.keywords)}&location=${encodeURIComponent(CONFIG.location)}&f_WT=${CONFIG.workType}&sortBy=DD`;

  console.log('Navigating to:', url);
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(8000);

  await page.screenshot({ path: 'linkedin-screenshot.png', fullPage: false });
  console.log('Screenshot saved.');

  const jobs = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll(
      'div[data-automation-id="job-card"], li[data-occludable-job-card], li.jobs-search-results__list-item'
    ));
    return cards.map(card => {
      const title = card.querySelector('h2, .job-card-list__title, .job-card-container__link strong')?.innerText?.trim() || 'N/A';
      const company = card.querySelector('.job-card-container__company-name, .job-card-list__company, span[aria-hidden="true"]')?.innerText?.trim() || 'N/A';
      const location = card.querySelector('.job-card-container__metadata-item, .job-card-list__location, li.job-card-container__metadata-item')?.innerText?.trim() || 'N/A';
      const linkEl = card.querySelector('a[href*="/jobs/view/"]');
      const url = linkEl ? 'https://www.linkedin.com' + linkEl.getAttribute('href').split('?')[0] : null;
      return { title, company, location, url };
    }).filter(j => j.title !== 'N/A' && j.url).slice(0, 30);
  });

  console.log('Raw jobs scraped:', jobs.length);

  const scoredJobs = jobs.map(job => {
    let score = 0;
    const text = (job.title + ' ' + job.company + ' ' + job.location).toLowerCase();
    if (text.includes('remote') || text.includes('home')) score += 30;
    if (text.includes('hybrid')) score += 15;
    if (text.includes('help desk') || text.includes('helpdesk') || text.includes('support') || text.includes('it ')) score += 40;
    return { ...job, score: Math.min(100, score) };
  }).filter(j => j.score >= CONFIG.minScore)
    .sort((a, b) => b.score - a.score);

  console.log('Scored jobs above threshold:', scoredJobs.length);

  fs.writeFileSync('linkedin-jobs.json', JSON.stringify(scoredJobs, null, 2));
  console.log('linkedin-jobs.json saved.');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LinkedIn Jobs Report</title>
  <style>
    body { font-family: -apple-system, sans-serif; max-width: 960px; margin: 40px auto; padding: 0 20px; background: #f3f2ef; }
    h1 { color: #0a66c2; }
    p.meta { color: #666; font-size: 0.9em; }
    table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,0.1); }
    th { background: #0a66c2; color: #fff; padding: 12px 16px; text-align: left; font-size: 0.85em; }
    td { padding: 12px 16px; border-bottom: 1px solid #eee; font-size: 0.9em; vertical-align: top; }
    tr:last-child td { border-bottom: none; }
    .score { font-weight: bold; color: #0a66c2; }
    a { color: #0a66c2; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <h1>LinkedIn Jobs Report</h1>
  <p class="meta">Generated: ${new Date().toISOString()} | Results: ${scoredJobs.length}</p>
  <table>
    <thead>
      <tr><th>Score</th><th>Title</th><th>Company</th><th>Location</th><th>Link</th></tr>
    </thead>
    <tbody>
      ${scoredJobs.map(j => `
      <tr>
        <td class="score">${j.score}</td>
        <td>${j.title}</td>
        <td>${j.company}</td>
        <td>${j.location}</td>
        <td>${j.url ? `<a href="${j.url}" target="_blank">View</a>` : '—'}</td>
      </tr>`).join('')}
    </tbody>
  </table>
</body>
</html>`;

  fs.writeFileSync('linkedin-report.html', html);
  console.log('linkedin-report.html saved.');

  await browser.close();
  console.log('Done.');
})();
