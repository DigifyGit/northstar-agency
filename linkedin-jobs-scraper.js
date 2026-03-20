const { chromium } = require('playwright');
const fs = require('fs');

const CONFIG = {
  keywords: "help desk",           // ← CHANGE THIS
  location: "Portugal",            // ← CHANGE THIS
  workType: "2",                   // 1 = On-site, 2 = Remote, 3 = Hybrid
  minScore: 50                      // Only show jobs above this score
};

(async () => {
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const context = await browser.newContext({
    storageState: './linkedin-storage-state.json',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 800 }
  });

  const page = await context.newPage();

  // Stealth (this is what beats LinkedIn blocks)
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => false });
  });

  const url = `https://www.linkedin.com/jobs/search?keywords=${encodeURIComponent(CONFIG.keywords)}&location=${encodeURIComponent(CONFIG.location)}&f_WT=${CONFIG.workType}&sortBy=DD`;
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

  await page.waitForTimeout(8000);

  const jobs = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('div[data-automation-id="job-card"], li[data-occludable-job-card]'), card => {
      const title = card.querySelector('h2, .job-card-list__title')?.innerText.trim() || 'N/A';
      const company = card.querySelector('span.job-card-container__company-name, .job-card-list__company')?.innerText.trim() || 'N/A';
      const location = card.querySelector('span.job-card-container__metadata-item, .job-card-list__location')?.innerText.trim() || 'N/A';
      const linkEl = card.querySelector('a[href*="/jobs/view/"]');
      const url = linkEl ? 'https://www.linkedin.com' + linkEl.getAttribute('href').split('?')[0] : 'N/A';
      return { title, company, location, url };
    }).filter(j => j.title !== 'N/A' && j.url.includes('/jobs/view/')).slice(0, 30);
  });

  // Smart scoring & analysis
  const scoredJobs = jobs.map(job => {
    let score = 0;
    const text = (job.title + job.company + job.location).toLowerCase();
    if (text.includes('remote') || text.includes('home')) score += 30;
    if (text.includes('hybrid')) score += 15;
    if (text.includes('help desk') || text.includes('support') || text.includes('it')) score += 40;
    return { ...job, score: Math.min(100, score) };
  }).filter(j => j.score >= CONFIG.minScore)
    .sort((a, b) => b.score - a.score);

  console.log('Top jobs found:', scoredJobs.length);

  fs.writeFileSync('linkedin-jobs.json', JSON.stringify(scoredJobs, null, 2));

  // Beautiful HTML report
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>LinkedIn Jobs Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 24px; }
    h1 { margin-bottom: 16px; }
    table { width: 100%; border-collapse: collapse; }
    th, td { border: 1px solid #ddd; padding: 10px; text-align: left; vertical-align: top; }
    th { background: #f5f5f5; }
    a { color: #0a66c2; text-decoration: none; }
  </style>
</head>
<body>
  <h1>LinkedIn Jobs Report - ${new Date().toLocaleDateString()}</h1>
  <table>
    <thead>
      <tr>
        <th>Score</th>
        <th>Title</th>
        <th>Company</th>
        <th>Location</th>
        <th>Link</th>
      </tr>
    </thead>
    <tbody>`;

  scoredJobs.forEach(j => {
    html += `
      <tr>
        <td>${j.score}</td>
        <td>${j.title}</td>
        <td>${j.company}</td>
        <td>${j.location}</td>
        <td><a href="${j.url}" target="_blank" rel="noopener noreferrer">Open</a></td>
      </tr>`;
  });

  html += `
    </tbody>
  </table>
</body>
</html>`;

  fs.writeFileSync('linkedin-report.html', html);

  await page.screenshot({ path: 'linkedin-screenshot.png', fullPage: true });
  await browser.close();

  console.log('✅ Done! Check linkedin-report.html and linkedin-jobs.json');
})();
