/**
 * linkedin_alert_parser.js
 * NorthStar Agency — LinkedIn Email Alert Parser
 *
 * Converts raw LinkedIn job alert email text (from gmail_monitor.js)
 * into structured job objects compatible with the NorthStar data pipeline
 * (same shape as scraper.js output → data/job_results_YYYY-MM-DD.csv).
 */

'use strict';

// ── Regex Patterns ────────────────────────────────────────────────────────────

// LinkedIn alert emails contain job blocks like:
//   "Senior Software Engineer at Acme Corp (Lisbon, Portugal)"
//   or structured sections with job title, company, location

const JOB_BLOCK_RE = /([A-Z][^\n]{5,80})\s+at\s+([^\n(]{3,60?})\s*\(?([^\n)]{3,60})?\)?/g;
const APPLY_URL_RE = /https?:\/\/www\.linkedin\.com\/jobs\/view\/\d+[^\s"<]*/g;
const EMAIL_SEP_RE = /\n---\n/;

// ── Helpers ───────────────────────────────────────────────────────────────────

function extractApplyUrls(text) {
    return [...(text.matchAll(APPLY_URL_RE) || [])].map(m => m[0]);
}

function sanitize(str) {
    return (str || '')
        .replace(/\r/g, '')
        .replace(/\s+/g, ' ')
        .replace(/[*_]/g, '')
        .trim();
}

function slugify(str) {
    return (str || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 40);
}

/**
 * Try to extract a "posted date" from the email body for freshness tracking.
 * LinkedIn emails often say "Posted X days ago" or "New today".
 */
function parsePostedDate(emailText) {
    const today = new Date().toISOString().split('T')[0];
    if (/new today|just posted|posted today/i.test(emailText)) return today;
    const daysAgo = emailText.match(/posted\s+(\d+)\s+day/i);
    if (daysAgo) {
        const d = new Date();
        d.setDate(d.getDate() - parseInt(daysAgo[1], 10));
        return d.toISOString().split('T')[0];
    }
    return today; // fallback
}

// ── Email Splitter ────────────────────────────────────────────────────────────

/**
 * Splits the raw MCP batch response into individual email bodies.
 * @param {string} rawContent
 * @returns {Array<{messageId: string, subject: string, body: string}>}
 */
function splitEmails(rawContent) {
    if (!rawContent) return [];

    const emails = [];
    const blocks = rawContent.split(/\n\n---\n\n/).filter(b => b.trim());

    for (const block of blocks) {
        const lines = block.split('\n');
        const idLine = lines.find(l => l.startsWith('Message ID:'));
        const subjectLine = lines.find(l => l.startsWith('Subject:'));

        const messageId = idLine ? idLine.replace('Message ID:', '').trim() : 'unknown';
        const subject = subjectLine ? subjectLine.replace('Subject:', '').trim() : '';

        // Body starts after the header section (blank line after headers)
        const headerEnd = lines.findIndex((l, i) => i > 0 && l.trim() === '' && lines[i - 1].includes(':'));
        const body = lines.slice(headerEnd + 1).join('\n');

        emails.push({ messageId, subject, body });
    }

    return emails;
}

// ── Job Extractor ─────────────────────────────────────────────────────────────

/**
 * Extracts individual job listings from one email body.
 * LinkedIn alert emails can contain multiple jobs in one email.
 *
 * @param {string} body          - Email body text
 * @param {string} emailSubject  - Subject line (may contain role hint)
 * @param {string} messageId     - For reference tracking
 * @returns {object[]}           Array of raw job objects
 */
function extractJobsFromEmail(body, emailSubject, messageId) {
    const jobs = [];
    const applyUrls = extractApplyUrls(body);
    const postedDate = parsePostedDate(body);

    // Reset regex state
    JOB_BLOCK_RE.lastIndex = 0;
    let match;
    let urlIndex = 0;

    while ((match = JOB_BLOCK_RE.exec(body)) !== null) {
        const title = sanitize(match[1]);
        const company = sanitize(match[2]);
        const location = sanitize(match[3] || '');

        // Skip obviously bad matches (e.g. long sentences, email headers)
        if (title.split(' ').length > 8) continue;
        if (/^(to|the|and|if|you|we|this|your|our|for|in|at|on)\b/i.test(title)) continue;

        const applyUrl = applyUrls[urlIndex++] || '';
        const jobId = applyUrl
            ? applyUrl.match(/\/(\d+)/)?.[1] || slugify(`${title}-${company}`)
            : slugify(`${title}-${company}`);

        jobs.push({
            job_id: `LI-EMAIL-${jobId}`,
            title: title,
            company: company,
            location: location || 'See posting',
            apply_url: applyUrl,
            source: 'linkedin_email_alert',
            source_email_id: messageId,
            scraped_date: postedDate,
            // Fields filled downstream by analysis.js / fit_dossier.js
            score: null,
            summary: null,
            fit_verdict: null
        });
    }

    return jobs;
}

// ── Main Parser ───────────────────────────────────────────────────────────────

/**
 * Parses the raw MCP batch email content into an array of structured job objects.
 *
 * @param {string} rawContent - Output from fetchEmailContents() in gmail_monitor.js
 * @returns {object[]}         Array of job objects ready for NorthStar pipeline
 */
function parseLinkedInAlerts(rawContent) {
    if (!rawContent || !rawContent.trim()) {
        console.log('📭 [AlertParser] No email content to parse.');
        return [];
    }

    const emails = splitEmails(rawContent);
    console.log(`📨 [AlertParser] Parsing ${emails.length} LinkedIn alert email(s)...`);

    const allJobs = [];
    const seenIds = new Set();

    for (const email of emails) {
        const jobs = extractJobsFromEmail(email.body, email.subject, email.messageId);

        for (const job of jobs) {
            if (!seenIds.has(job.job_id)) {
                seenIds.add(job.job_id);
                allJobs.push(job);
            }
        }
    }

    console.log(`✅ [AlertParser] Extracted ${allJobs.length} unique job(s) from email alerts.`);
    return allJobs;
}

// ── Standalone Test ───────────────────────────────────────────────────────────

if (require.main === module) {
    // Quick sanity test with a mock email body
    const mockRaw = `
Message ID: abc123
Subject: 3 new jobs for you: IT Support, Lisbon

New jobs matching your search

Software Support Engineer at NovaTech Solutions (Lisbon, Portugal)
https://www.linkedin.com/jobs/view/4001234567

IT Helpdesk Specialist at Cloudify (Porto, Portugal)
https://www.linkedin.com/jobs/view/4009876543

Posted 1 day ago
`;

    const results = parseLinkedInAlerts(mockRaw);
    console.log('\nParsed Jobs:');
    console.log(JSON.stringify(results, null, 2));
}

module.exports = { parseLinkedInAlerts, splitEmails, extractJobsFromEmail };
