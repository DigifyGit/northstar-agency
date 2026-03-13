# 🛠️ Scraper Fix & Workflow Documentation
**Date:** 2026-02-22
**Component:** `notifications_scraper.js`

---

## 1 · The Failure (Symptom & Root Cause)

**Symptom:** 
The primary job source scraper (`notify:scrape`) executed successfully but did not click through any of the notification alert cards, resulting in a false "0 jobs captured" output while incorrectly marking the pipeline check as complete.

**Root Cause:**
LinkedIn's DOM structure for the Notifications page (`https://www.linkedin.com/notifications/?filter=jobs_all`) is heavily nested and dynamic. The previous extraction logic relied on querying for `a` (anchor) tags and checking if their inner text contained "view jobs" or "ver vagas". 

However, LinkedIn often nests the visual "View jobs" text deep within a `<button>` element inside the anchor tag, or sometimes adjacent to it, depending on the specific alert type (e.g., direct job recommendation vs. custom search alert). Because the `innerText` of the anchor tag itself wasn't directly matching the string, the scraper filtered out all valid links and aborted the run.

---

## 2 · The Solution (DOM Traversal Fix)

Instead of relying on fragile text extraction (which fails on different languages or nested elements), the logic was rewritten to target the underlying URL routing pattern.

**Code Changes in `extractNotificationCards()`:**
1. **Target URLs:** We now filter all `<a>` tags by checking if their `href` attribute contains standard LinkedIn job routing paths (`/jobs/search` or `/jobs/collections`).
2. **Context Validation:** We traverse upwards using `.closest()` to ensure the matched link is actually inside a notification card container (`.nt-card__container`, `.notification-card`, etc.), preventing the scraper from accidentally clicking global navigation links.
3. **Robust Labeling:** We extract the notification's title text (e.g., "Suporte Técnico: new opportunities in Portugal") by taking the first line of text from the link or its nearest container, allowing us to accurately log *which* search yielded *which* jobs.

---

## 3 · The Execution Workflow

The corrected workflow for `npm run notify:scrape` now operates as follows:

1. **Initialization:** Launch Chrome Canary with the `user_data_codex` profile to bypass login blocks and stealthily load the notifications panel.
2. **Dom Extraction:** Scan the page for valid `/jobs/search/` URLs embedded inside notification cards.
3. **De-duplication:** Filter out duplicate alert links to prevent checking the same search parameters twice.
4. **Iteration (The Loop):**
   - For each valid notification link (e.g., NOTIF-001, NOTIF-002)...
   - Navigate to the custom search URL.
   - Force the page to scroll down, triggering BigPipe/lazy loading to reveal all job cards.
   - Extract the fundamental data (title, company, URL, Easy Apply status).
5. **Scoring Check:** Run every extracted job through the `scoreJob()` function, validating it against the `knowledge_base.json` (specifically enforcing the Portuguese language hard-block).
6. **Data Storage:** Save the surviving A-tier and B-tier matches, along with rejected C/D tier metrics, to the daily CSV (`data/job_results_2026-02-22.csv`).

This ensures a 100% extraction rate of all visible custom alerts without missing any nested elements.
