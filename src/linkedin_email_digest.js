/**
 * linkedin_email_digest.js
 * NorthStar Agency — Standalone LinkedIn Email Digest
 *
 * Fetches all LinkedIn job alert emails from the past N days,
 * parses them into job cards, scores them against CLIENT_BRIEF.md,
 * and saves results to data/ + prints a human-readable digest.
 *
 * Usage:
 *   node src/linkedin_email_digest.js             # last 1 day (default)
 *   node src/linkedin_email_digest.js 3d          # last 3 days
 *   node src/linkedin_email_digest.js 7d          # last week
 *
 * Part of the NorthStar Agency pipeline.
 * Does NOT require a browser — uses Gmail MCP only.
 */

'use strict';

require('dotenv').config();

const fs = require('fs-extra');
const path = require('path');

const { fetchLinkedInAlerts } = require('./gmail_monitor');
const { parseLinkedInAlerts } = require('./linkedin_alert_parser');
const { getUserContext } = require('./utils/brainReader');
const { updateMemory } = require('./utils/brainWriter');

const DATA_DIR = path.join(process.cwd(), 'data');

// ── Save helpers ──────────────────────────────────────────────────────────────

async function saveJobsToJson(jobs, dateStr) {
    await fs.ensureDir(DATA_DIR);
    const outPath = path.join(DATA_DIR, `linkedin_alerts_${dateStr}.json`);
    await fs.writeJson(outPath, jobs, { spaces: 2 });
    return outPath;
}

async function saveJobsToCsv(jobs, dateStr) {
    await fs.ensureDir(DATA_DIR);
    const outPath = path.join(DATA_DIR, `job_results_${dateStr}.csv`);

    // Append-safe: read existing then merge by job_id
    let existing = [];
    if (await fs.pathExists(outPath)) {
        const csvParser = require('csv-parser');
        await new Promise((res, rej) => {
            const rows = [];
            require('fs').createReadStream(outPath)
                .pipe(csvParser())
                .on('data', r => rows.push(r))
                .on('end', () => { existing = rows; res(); })
                .on('error', rej);
        });
    }

    const existingIds = new Set(existing.map(r => r.job_id));
    const newJobs = jobs.filter(j => !existingIds.has(j.job_id));

    if (!newJobs.length) {
        console.log('  ℹ️  All parsed jobs are already in today\'s CSV. No duplicates added.');
        return outPath;
    }

    // Write CSV (header only if file is new)
    const header = 'job_id,title,company,location,apply_url,source,scraped_date,score,fit_verdict\n';
    const content = newJobs.map(j =>
        [j.job_id, j.title, j.company, j.location, j.apply_url, j.source, j.scraped_date, j.score || '', j.fit_verdict || '']
            .map(v => `"${String(v || '').replace(/"/g, '""')}"`)
            .join(',')
    ).join('\n');

    if (existing.length === 0) {
        await fs.writeFile(outPath, header + content + '\n');
    } else {
        await fs.appendFile(outPath, '\n' + content);
    }

    return outPath;
}

// ── Digest Printer ────────────────────────────────────────────────────────────

function printDigest(jobs, userContext) {
    console.log('');
    console.log('╔══════════════════════════════════════════════════════════╗');
    console.log('║       NorthStar — LinkedIn Email Alert Digest            ║');
    console.log('╚══════════════════════════════════════════════════════════╝');
    console.log('');

    if (!jobs.length) {
        console.log('  📭  No new LinkedIn job alerts found in your inbox.');
        console.log('');
        console.log('  ► Make sure your LinkedIn job alerts are set up at:');
        console.log('    https://www.linkedin.com/jobs/alerts/');
        console.log('  ► Alerts now go to: digifyway@gmail.com ✓');
        return;
    }

    const targetRoles = userContext?.profile?.roles || [];
    const highSkills = userContext?.skills?.high || [];
    const badRoles = userContext?.exclusions?.roles || [];

    console.log(`  Found ${jobs.length} job(s) from LinkedIn email alerts:\n`);

    jobs.forEach((job, i) => {
        // Simple keyword score against brain context
        const text = `${job.title} ${job.company}`.toLowerCase();
        const hits = highSkills.filter(s => text.includes(s.toLowerCase())).length;
        const isExcluded = badRoles.some(r => text.includes(r.toLowerCase()));
        const flag = isExcluded ? '🚫' : hits >= 2 ? '🏆' : hits === 1 ? '✅' : '📋';

        console.log(`  ${flag} #${i + 1} — ${job.title}`);
        console.log(`      🏢  ${job.company}`);
        if (job.location && job.location !== 'See posting') {
            console.log(`      📍  ${job.location}`);
        }
        if (job.apply_url) {
            console.log(`      🔗  ${job.apply_url}`);
        }
        console.log('');
    });

    const winners = jobs.filter(j => {
        const t = `${j.title} ${j.company}`.toLowerCase();
        return highSkills.filter(s => t.includes(s.toLowerCase())).length >= 2;
    });
    const excluded = jobs.filter(j => badRoles.some(r => `${j.title}`.toLowerCase().includes(r.toLowerCase())));

    console.log('─────────────────────────────────────────────────────────');
    console.log(`  🏆 High-signal matches : ${winners.length}`);
    console.log(`  🚫 Excluded (criteria) : ${excluded.length}`);
    console.log(`  📋 Needs review        : ${jobs.length - winners.length - excluded.length}`);
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
    const lookback = process.argv[2] || '1d';
    const dateStr = new Date().toISOString().split('T')[0];

    console.log(`\n🔍 NorthStar Gmail Digest — Fetching alerts (last ${lookback})...`);

    // Load brain context for scoring
    const userContext = await getUserContext();
    if (!userContext) {
        console.warn('⚠️  CLIENT_BRIEF.md not found. Scoring will be skipped.');
    }

    // 1 — Fetch emails
    const { ids, rawContent } = await fetchLinkedInAlerts({ query: `newer_than:${lookback}` });

    if (!ids.length) {
        printDigest([], userContext);
        return;
    }

    // 2 — Parse into job objects
    const jobs = parseLinkedInAlerts(rawContent);

    // 3 — Print digest
    printDigest(jobs, userContext);

    // 4 — Save results
    if (jobs.length) {
        const csvPath = await saveJobsToCsv(jobs, dateStr);
        const jsonPath = await saveJobsToJson(jobs, dateStr);

        console.log('\n  💾 Saved:');
        console.log(`     CSV  → ${path.relative(process.cwd(), csvPath)}`);
        console.log(`     JSON → ${path.relative(process.cwd(), jsonPath)}`);

        // 5 — Write to brain memory
        await updateMemory(
            { emailJobsIngested: jobs.length },
            `Gmail digest: ingested ${jobs.length} LinkedIn alert email job(s) for ${dateStr}. Email IDs: ${ids.slice(0, 5).join(', ')}.`
        );
    }

    console.log('\n✅ Digest complete.\n');
}

main().catch(err => {
    console.error('❌ Digest error:', err.message);
    process.exit(1);
});
