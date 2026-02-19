const fs = require('fs-extra');
const path = require('path');

const BRAIN_DIR = path.join(process.cwd(), 'brain');
const BRIEF_PATH = path.join(BRAIN_DIR, 'CLIENT_BRIEF.md');

function normalizeTerm(value) {
    return (value || '')
        .replace(/\*\*/g, '')
        .replace(/`/g, '')
        .replace(/["']/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

function unique(values) {
    return [...new Set(values.filter(Boolean))];
}

function sectionLines(content, headingPattern) {
    const lines = content.split('\n');
    const start = lines.findIndex(line => /^#{2,4}\s+/.test(line) && headingPattern.test(line));
    if (start < 0) return [];

    const captured = [];
    for (let i = start + 1; i < lines.length; i++) {
        const line = lines[i];
        if (/^#{2,4}\s+/.test(line)) break;
        captured.push(line);
    }
    return captured;
}

function parseBullets(lines) {
    const out = [];
    for (const line of lines) {
        const m = line.trim().match(/^-+\s*(?:❌|⚠️|✅)?\s*(.+)$/);
        if (!m) continue;
        const cleaned = normalizeTerm(m[1]).replace(/\s*\(.+\)\s*$/, '');
        if (cleaned) out.push(cleaned);
    }
    return unique(out);
}

function parseTableRows(lines) {
    const rows = [];
    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith('|')) continue;
        const cells = trimmed.split('|').slice(1, -1).map(c => normalizeTerm(c));
        if (!cells.length) continue;
        if (cells.every(c => /^:?-{2,}:?$/.test(c))) continue;
        rows.push(cells);
    }

    if (rows.length > 0) {
        const headerLike = rows[0].join(' ').toLowerCase();
        if (
            headerLike.includes('skill') ||
            headerLike.includes('field') ||
            headerLike.includes('priority') ||
            headerLike.includes('role type') ||
            headerLike.includes('penalty') ||
            headerLike.includes('context') ||
            headerLike.includes('detail')
        ) {
            rows.shift();
        }
    }

    return rows;
}

function parseTableColumn(lines, idx) {
    return unique(parseTableRows(lines).map(row => normalizeTerm(row[idx] || '')));
}

function parseClientName(content) {
    const m = content.match(/^\|\s*(?:\*\*)?Name(?:\*\*)?\s*\|\s*([^|]+)\|/mi);
    return m ? normalizeTerm(m[1]) : 'Client';
}

function parseProfile(content) {
    const roleRows = parseTableRows(sectionLines(content, /target role family/i));
    const roles = unique(roleRows.map(row => normalizeTerm(row[1] || '')));

    const preferenceRows = parseTableRows(sectionLines(content, /candidate summary/i));
    const preferences = [];
    let locationFocus = [];
    let languages = [];
    for (const row of preferenceRows) {
        const key = (row[0] || '').toLowerCase();
        const value = normalizeTerm(row[1] || '');
        if (!value) continue;
        if (key.includes('work model') || key.includes('experience level')) {
            preferences.push(value);
            continue;
        }
        if (key.includes('priority region')) {
            locationFocus = value.split('·').map(normalizeTerm);
            continue;
        }
        if (key.includes('languages')) {
            languages = value.split('·').map(normalizeTerm);
        }
    }
    return {
        name: parseClientName(content),
        roles,
        preferences: unique(preferences),
        location_focus: unique(locationFocus),
        languages: unique(languages)
    };
}

function parseSkills(content) {
    const high = parseTableColumn(sectionLines(content, /high value/i), 0);
    const medium = parseTableColumn(sectionLines(content, /medium value/i), 0);
    const negative = parseTableColumn(sectionLines(content, /negative signal/i), 0);
    return { high, medium, negative };
}

function parseExclusions(content) {
    return {
        roles: parseBullets(sectionLines(content, /3\.1.*role exclusions/i)),
        seniority: parseBullets(sectionLines(content, /3\.2.*seniority exclusions/i)),
        languages: parseBullets(sectionLines(content, /3\.3.*language exclusions/i))
    };
}

async function getUserContext() {
    if (!(await fs.pathExists(BRIEF_PATH))) {
        console.warn('CLIENT_BRIEF.md not found in brain directory.');
        return null;
    }

    const content = await fs.readFile(BRIEF_PATH, 'utf8');

    return {
        source_file: 'CLIENT_BRIEF.md',
        profile: parseProfile(content),
        skills: parseSkills(content),
        exclusions: parseExclusions(content)
    };
}

async function getFullContext() {
    return getUserContext();
}

module.exports = { getUserContext, getFullContext };
