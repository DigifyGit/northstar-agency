# Playwright Cookie Scraper Template

Works for LinkedIn, Facebook, Instagram, OLX, etc.

## What this pack contains

- `.github/workflows/linkedin-jobs-scraper.yml`
- `linkedin-jobs-scraper.js`
- `linkedin-storage-state.json`
- `README.md`

## How to install it in any GitHub repo

1. Create a new repo or use an existing one.
2. Copy these 4 files exactly as they are into the repo.
3. Replace the cookies in `linkedin-storage-state.json`.
4. Commit and push.
5. Go to **GitHub → Actions → LinkedIn Jobs Scraper → Run workflow**.
6. Download the artifact after the run finishes.

## How to use

1. Put your cookies in `linkedin-storage-state.json`
2. Edit the `CONFIG` in `linkedin-jobs-scraper.js`:
   - `keywords`
   - `location`
   - `workType`
   - `minScore`
3. Go to GitHub → Actions → Run workflow
4. Download the artifact: JSON + HTML report + screenshot

## What each config value does

- `keywords` → job keywords, for example `help desk`, `IT support`, `technical support`
- `location` → country or city, for example `Portugal` or `Lisbon`
- `workType` → `1` = On-site, `2` = Remote, `3` = Hybrid
- `minScore` → hides weak matches below your score threshold

## How the scoring works

The script assigns a simple score to each scraped job:

- `+30` if title/company/location text mentions `remote` or `home`
- `+15` if text mentions `hybrid`
- `+40` if text mentions `help desk`, `support`, or `it`

Then it filters out jobs below `minScore` and sorts the rest from highest to lowest.

## How to get LinkedIn cookies

Same fast process as Facebook:

1. Open LinkedIn in Safari on iPad and log in.
2. Use DevTools or any cookie exporter.
3. Export cookies as JSON.
4. Paste them into `linkedin-storage-state.json`.

## What you get every run

- `linkedin-jobs.json` → clean list with scores
- `linkedin-report.html` → nice table you can open on iPad
- `linkedin-screenshot.png` → proof the browser was logged in
- ranked jobs based on your criteria

## How to customize for other platforms

To reuse this pack for Facebook, Instagram, OLX, or another site:

1. Copy the same structure into a new repo.
2. Rename the files.
3. Change the target URL.
4. Replace the scraping selectors inside `page.evaluate()`.
5. Replace the storage-state cookies file.

The GitHub Actions workflow and Playwright login pattern stay almost the same.

## Important note

The original text you provided had a broken HTML generation block in the JavaScript example. In this packaged version, that HTML report section has been repaired so the scraper can actually generate a working `linkedin-report.html` file.
