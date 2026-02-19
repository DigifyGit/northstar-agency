const fs = require('fs-extra');
const path = require('path');

const BRAIN_DIR = path.join(process.cwd(), 'brain');
const CASE_LOG_PATH = path.join(BRAIN_DIR, 'CASE_LOG.md');
const DEFAULT_AGENT_NAME = process.env.AGENCY_AGENT_NAME || 'Mark';

function asDateStr() {
    return new Date().toISOString().split('T')[0];
}

function applyMetricIncrements(content, increments, dateStr) {
    const metricByStat = {
        jobsScraped: 'total jobs scraped',
        uniqueJobs: 'unique jobs after dedup',
        applicationsSubmitted: 'applications submitted',
        interviewsScheduled: 'interviews scheduled'
    };

    const targets = new Map();
    for (const [key, deltaRaw] of Object.entries(increments || {})) {
        const metric = metricByStat[key];
        if (!metric) continue;
        const delta = Number(deltaRaw);
        if (!Number.isFinite(delta)) continue;
        targets.set(metric, (targets.get(metric) || 0) + delta);
    }
    if (targets.size === 0) return { content, changed: false };

    const lines = content.split('\n');
    let changed = false;
    for (let i = 0; i < lines.length; i++) {
        const m = lines[i].match(/^\|\s*\*\*(.+?)\*\*\s*\|\s*([^|]+)\|\s*([^|]+)\|/);
        if (!m) continue;

        const metricOriginal = m[1].trim();
        const metricKey = metricOriginal.toLowerCase();
        if (!targets.has(metricKey)) continue;

        const currentVal = parseInt(m[2].trim(), 10);
        const safeCurrent = Number.isFinite(currentVal) ? currentVal : 0;
        const nextVal = Math.max(0, safeCurrent + targets.get(metricKey));
        lines[i] = `| **${metricOriginal}** | ${nextVal} | ${dateStr} |`;
        changed = true;
    }

    return { content: lines.join('\n'), changed };
}

function appendActivityLogRow(content, message, dateStr, agent = DEFAULT_AGENT_NAME) {
    if (!message || !String(message).trim()) {
        return { content, changed: false };
    }

    const lines = content.split('\n');
    const tableHeaderIdx = lines.findIndex(line => line.includes('| Date | Agent | Entry |'));
    if (tableHeaderIdx < 0) return { content, changed: false };

    let insertAt = tableHeaderIdx + 2;
    while (insertAt < lines.length) {
        const line = lines[insertAt];
        if (line.startsWith('---') || /^##\s+/.test(line)) break;
        insertAt++;
    }

    const safeMessage = String(message).replace(/\|/g, '\\|').trim();
    const row = `| ${dateStr} | ${agent} | ${safeMessage} |`;
    lines.splice(insertAt, 0, row);
    return { content: lines.join('\n'), changed: true };
}

async function updateMemory(stats = {}, logMessage = '') {
    try {
        if (!(await fs.pathExists(CASE_LOG_PATH))) {
            console.error('Failed to update memory: CASE_LOG.md not found.');
            return;
        }

        let content = await fs.readFile(CASE_LOG_PATH, 'utf8');
        const dateStr = asDateStr();
        let changedAny = false;

        const statsResult = applyMetricIncrements(content, stats, dateStr);
        content = statsResult.content;
        changedAny = changedAny || statsResult.changed;

        const logResult = appendActivityLogRow(content, logMessage, dateStr, DEFAULT_AGENT_NAME);
        content = logResult.content;
        changedAny = changedAny || logResult.changed;

        if (!changedAny) {
            console.warn('🧠 Memory Update Skipped (no matching rows to update).');
            return;
        }

        await fs.writeFile(CASE_LOG_PATH, content, 'utf8');
        console.log('🧠 Memory Updated.');
    } catch (e) {
        console.error('Failed to update memory:', e);
    }
}

module.exports = { updateMemory };
