const fs = require('fs-extra');
const path = require('path');
const csv = require('csv-parser');

const MAP_LINK_IDS = new Set([
    'MAP-001',
    'MAP-002',
    'MAP-003',
    'MAP-004',
    'MAP-005',
    'MAP-006',
    'MAP-007'
]);

const TIER_RANK = { S: 5, A: 4, B: 3, C: 2, D: 1 };

function parseDateFromFilename(name) {
    const m = name.match(/^job_results_(\d{4}-\d{2}-\d{2})\.csv$/);
    return m ? m[1] : null;
}

async function findLatestCsv(dataDir) {
    const files = await fs.readdir(dataDir);
    const dated = files
        .map(f => ({ file: f, date: parseDateFromFilename(f) }))
        .filter(x => x.date)
        .sort((a, b) => a.date.localeCompare(b.date));

    if (dated.length === 0) return null;
    return path.join(dataDir, dated[dated.length - 1].file);
}

function normalizeRow(raw) {
    // Shifted MAP schema: Keyword contains MAP-00x and fields are offset.
    if (MAP_LINK_IDS.has((raw['Keyword'] || '').trim())) {
        return {
            run_date: raw['Run Date'] || '',
            job_id: raw['Link ID'] || '',
            link_id: raw['Keyword'] || '',
            keyword: raw['Tier'] || '',
            tier: raw['Score'] || '',
            score: Number(raw['Job Title']) || 0,
            job_title: raw['Company'] || '',
            company: raw['Location'] || '',
            reason: raw['URL'] || '',
            job_url: raw['Promoted'] || '',
            easy_apply: raw['Workplace'] || '',
            description: raw['_15'] || raw['Description'] || raw['Job Description'] || raw['Reason'] || ''
        };
    }

    return {
        run_date: raw['Run Date'] || '',
        job_id: raw['Job ID'] || '',
        link_id: raw['Link ID'] || '',
        keyword: raw['Keyword'] || '',
        tier: raw['Tier'] || '',
        score: Number(raw['Score']) || 0,
        job_title: raw['Job Title'] || '',
        company: raw['Company'] || '',
        reason: raw['Reason'] || '',
        job_url: raw['URL'] || '',
        easy_apply: raw['Easy Apply'] || '',
        description: raw['_15'] || raw['Description'] || raw['Job Description'] || raw['Reason'] || ''
    };
}

function isMapRow(row) {
    return MAP_LINK_IDS.has((row.link_id || '').trim());
}

function extractLatestMapCycle(rows) {
    const mapRows = rows.filter(isMapRow);
    if (mapRows.length === 0) return [];

    // Start from the last MAP-001 block so we get the most recent full cycle.
    let startIndex = -1;
    for (let i = 0; i < mapRows.length; i++) {
        if (mapRows[i].link_id === 'MAP-001' && (i === 0 || mapRows[i - 1].link_id !== 'MAP-001')) {
            startIndex = i;
        }
    }

    if (startIndex < 0) return mapRows;
    return mapRows.slice(startIndex);
}

function dedupeBest(rows) {
    const bestById = new Map();
    for (const row of rows) {
        const id = (row.job_id || '').trim() || row.job_url;
        if (!id) continue;

        if (!bestById.has(id)) {
            bestById.set(id, row);
            continue;
        }

        const curr = bestById.get(id);
        const currRank = TIER_RANK[curr.tier] || 0;
        const nextRank = TIER_RANK[row.tier] || 0;
        if (nextRank > currRank || (nextRank === currRank && row.score > curr.score)) {
            bestById.set(id, row);
        }
    }
    return [...bestById.values()];
}

async function readCsv(csvPath) {
    const rows = [];
    await new Promise((resolve, reject) => {
        fs.createReadStream(csvPath)
            .pipe(csv())
            .on('data', row => rows.push(normalizeRow(row)))
            .on('end', resolve)
            .on('error', reject);
    });
    return rows;
}

function renderWinnerToday({ dateStr, cycleRows, uniqueRows, topWinners, backup }) {
    let md = '';
    md += '# WINNER REPORT - TODAY\n';
    md += `**Date:** ${dateStr}\n`;
    md += '**Prepared By:** Northstar Job Sourcing Desk\n\n';

    md += '## 1 · Daily Outcome Snapshot\n';
    md += topWinners.length > 0
        ? 'We identified apply-now opportunities and built a backup pipeline for immediate execution.\n\n'
        : 'No S/A winner in this cycle. Backup opportunities exist and strategy pivot is required.\n\n';
    md += `- Winners (S/A): **${topWinners.length}**\n`;
    md += `- Backup (B): **${backup.length}**\n`;
    md += `- Unique jobs in latest MAP cycle: **${uniqueRows.length}**\n`;
    md += `- Raw rows in latest MAP cycle: **${cycleRows.length}**\n\n`;

    md += '---\n\n';
    md += '## 2 · Top Priority Jobs (Apply First)\n';
    if (topWinners.length === 0) {
        md += 'No S/A winners in latest cycle.\n\n';
    } else {
        md += '| Priority | Company | Job Title | Tier | Score | Easy Apply | Link |\n';
        md += '| :--- | :--- | :--- | :--- | ---: | :--- | :--- |\n';
        topWinners.forEach((r, idx) => {
            md += `| ${idx + 1} | ${r.company} | ${r.job_title} | ${r.tier} | ${r.score} | ${r.easy_apply || 'No'} | ${r.job_url} |\n`;
        });
        md += '\n';
    }

    md += '---\n\n';
    md += '## 3 · Backup Pipeline (Tier B)\n';
    if (backup.length === 0) {
        md += 'No B-tier backup jobs in latest cycle.\n\n';
    } else {
        md += '| Company | Job Title | Tier | Score | Keyword | Link |\n';
        md += '| :--- | :--- | :--- | ---: | :--- | :--- |\n';
        backup.forEach(r => {
            md += `| ${r.company} | ${r.job_title} | ${r.tier} | ${r.score} | ${r.keyword} | ${r.job_url} |\n`;
        });
        md += '\n';
    }

    md += '---\n\n';
    md += '## 4 · Next 60-Minute Execution Plan\n';
    md += '1. Apply to all S/A winners now.\n';
    md += '2. Apply to top 5 B-tier jobs.\n';
    md += '3. Log outcomes in `brain/CASE_LOG.md`.\n';
    md += '4. If queue is exhausted, trigger Phase 3 direct-company scraping.\n\n';

    md += '---\n\n';
    md += '## 5 · Data Sources\n';
    md += '- `reports/WINNER_REPORT_TODAY.json`\n';
    md += '- `brain/CLIENT_BRIEF.md`\n';
    md += '- `brain/AGENCY.md`\n';
    md += '- `brain/STYLE_GUIDE.md`\n';

    return md;
}

async function main() {
    const dataDir = path.join(process.cwd(), 'data');
    const reportsDir = path.join(process.cwd(), 'reports');
    await fs.ensureDir(reportsDir);

    const csvPath = await findLatestCsv(dataDir);
    if (!csvPath) {
        throw new Error('No job_results_YYYY-MM-DD.csv found in data/.');
    }

    const allRows = await readCsv(csvPath);
    const latestCycle = extractLatestMapCycle(allRows);
    if (latestCycle.length === 0) {
        throw new Error('No MAP-001..MAP-007 rows found in latest CSV.');
    }

    const unique = dedupeBest(latestCycle).sort((a, b) => {
        const tr = (TIER_RANK[b.tier] || 0) - (TIER_RANK[a.tier] || 0);
        if (tr !== 0) return tr;
        return (b.score || 0) - (a.score || 0);
    });

    const topWinners = unique.filter(r => r.tier === 'S' || r.tier === 'A');
    const backup = unique.filter(r => r.tier === 'B');

    const dateStr = path.basename(csvPath).replace('job_results_', '').replace('.csv', '');
    const winnerMd = renderWinnerToday({
        dateStr,
        cycleRows: latestCycle,
        uniqueRows: unique,
        topWinners,
        backup
    });

    await fs.writeFile(path.join(reportsDir, 'WINNER_REPORT_TODAY.md'), winnerMd);
    const winnersJson = topWinners.map(row => ({
        ...row,
        description: row.description || row.reason || ''
    }));
    const backupJson = backup.map(row => ({
        ...row,
        description: row.description || row.reason || ''
    }));

    await fs.writeJson(path.join(reportsDir, 'WINNER_REPORT_TODAY.json'), {
        date: dateStr,
        cycle_rows: latestCycle.length,
        unique_rows: unique.length,
        winners_sa_count: topWinners.length,
        backup_b_count: backup.length,
        winners: winnersJson,
        backup: backupJson
    }, { spaces: 2 });

    console.log('Generated reports/WINNER_REPORT_TODAY.md');
    console.log('Generated reports/WINNER_REPORT_TODAY.json');
    console.log(`Winners(S/A): ${topWinners.length} | Backup(B): ${backup.length}`);
}

if (require.main === module) {
    main().catch(err => {
        console.error(err.message);
        process.exit(1);
    });
}

module.exports = { main };
