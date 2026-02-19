const fs = require('fs-extra');
const path = require('path');

const ROOT = process.cwd();
const STORE_PATH = path.join(ROOT, 'data', 'application_tracker.json');
const CASE_LOG_PATH = path.join(ROOT, 'brain', 'CASE_LOG.md');

const STATES = [
    'sourcing',
    'fit_review',
    'ready_to_apply',
    'applied',
    'follow_up',
    'interview_scheduled',
    'interview_complete',
    'offer_received',
    'on_hold',
    'accepted',
    'rejected'
];

const TERMINAL_STATES = new Set(['accepted', 'rejected']);

function today() {
    return new Date().toISOString().slice(0, 10);
}

function addDays(dateStr, days) {
    const dt = new Date(`${dateStr}T00:00:00Z`);
    dt.setUTCDate(dt.getUTCDate() + days);
    return dt.toISOString().slice(0, 10);
}

function compareDates(a, b) {
    return String(a).localeCompare(String(b));
}

function defaultStore() {
    return {
        version: '1.0',
        updated_at: new Date().toISOString(),
        applications: []
    };
}

async function loadStore() {
    if (!(await fs.pathExists(STORE_PATH))) {
        await fs.ensureDir(path.dirname(STORE_PATH));
        const empty = defaultStore();
        await fs.writeJson(STORE_PATH, empty, { spaces: 2 });
        return empty;
    }
    return fs.readJson(STORE_PATH);
}

async function saveStore(store) {
    const next = {
        ...store,
        updated_at: new Date().toISOString()
    };
    await fs.writeJson(STORE_PATH, next, { spaces: 2 });
    await syncCaseLog(next);
    return next;
}

function isValidState(state) {
    return STATES.includes(state);
}

function canTransition(currentState, nextState) {
    if (!currentState) return isValidState(nextState);
    if (currentState === nextState) return true;
    if (TERMINAL_STATES.has(currentState)) return false;

    if (nextState === 'on_hold') return true;
    if (currentState === 'on_hold') return !TERMINAL_STATES.has(nextState);

    const currentIdx = STATES.indexOf(currentState);
    const nextIdx = STATES.indexOf(nextState);
    if (currentIdx < 0 || nextIdx < 0) return false;

    if (TERMINAL_STATES.has(nextState)) {
        return currentState === 'offer_received' || currentState === 'interview_complete';
    }

    return nextIdx >= currentIdx && nextIdx <= currentIdx + 2;
}

async function updateStatus(jobId, newState, notes = '', metadata = {}) {
    const normalizedState = String(newState || '').trim();
    if (!isValidState(normalizedState)) {
        throw new Error(`Invalid state: ${newState}`);
    }

    const id = String(jobId || '').trim();
    if (!id) {
        throw new Error('jobId is required');
    }

    const store = await loadStore();
    const date = today();
    let app = store.applications.find(item => item.jobId === id);

    if (!app) {
        app = {
            jobId: id,
            company: metadata.company || 'Unknown',
            role: metadata.role || 'Unknown',
            state: 'sourcing',
            created_at: date,
            updated_at: date,
            follow_up_due_on: null,
            history: [
                {
                    date,
                    state: 'sourcing',
                    notes: 'Application record initialized'
                }
            ]
        };
        store.applications.push(app);
    }

    if (!canTransition(app.state, normalizedState)) {
        throw new Error(`Invalid transition: ${app.state} -> ${normalizedState}`);
    }

    app.state = normalizedState;
    app.updated_at = date;
    if (metadata.company) app.company = metadata.company;
    if (metadata.role) app.role = metadata.role;

    if (normalizedState === 'applied' && !app.applied_at) {
        app.applied_at = date;
        app.follow_up_due_on = addDays(date, 2);
    }

    if (normalizedState === 'follow_up') {
        app.follow_up_due_on = addDays(date, 7);
    }

    if (TERMINAL_STATES.has(normalizedState)) {
        app.follow_up_due_on = null;
        app.closed_at = date;
    }

    app.history.push({
        date,
        state: normalizedState,
        notes: String(notes || '').trim() || 'Status updated'
    });

    await saveStore(store);
    return app;
}

async function getDueFollowUps(onDate = today()) {
    const store = await loadStore();
    return store.applications
        .filter(app => !TERMINAL_STATES.has(app.state))
        .filter(app => app.state === 'applied' || app.state === 'follow_up')
        .filter(app => app.follow_up_due_on && compareDates(app.follow_up_due_on, onDate) <= 0)
        .sort((a, b) => compareDates(a.follow_up_due_on, b.follow_up_due_on));
}

async function getStats() {
    const store = await loadStore();
    const total = store.applications.length;
    const byState = STATES.reduce((acc, state) => {
        acc[state] = store.applications.filter(app => app.state === state).length;
        return acc;
    }, {});

    const appliedCount = byState.applied + byState.follow_up + byState.interview_scheduled + byState.interview_complete + byState.offer_received + byState.on_hold + byState.accepted + byState.rejected;
    const interviews = byState.interview_scheduled + byState.interview_complete + byState.offer_received + byState.accepted;
    const offers = byState.offer_received + byState.accepted;
    const accepted = byState.accepted;

    return {
        total,
        byState,
        conversion: {
            applied: appliedCount,
            interviews,
            offers,
            accepted,
            interview_rate: appliedCount ? Number(((interviews / appliedCount) * 100).toFixed(1)) : 0,
            offer_rate: appliedCount ? Number(((offers / appliedCount) * 100).toFixed(1)) : 0,
            acceptance_rate: offers ? Number(((accepted / offers) * 100).toFixed(1)) : 0
        },
        due_follow_ups: (await getDueFollowUps()).length,
        updated_at: store.updated_at
    };
}

function trackerSectionMarkdown(store) {
    const rows = [...store.applications]
        .sort((a, b) => compareDates(b.updated_at, a.updated_at))
        .slice(0, 12);

    let md = '';
    md += '## 7 · Application Lifecycle Tracker\n\n';
    md += '> Auto-managed by `src/application_tracker.js`.\n\n';
    md += '| State | Meaning |\n';
    md += '|:---|:---|\n';
    md += '| `sourcing` | Active job search |\n';
    md += '| `fit_review` | A-tier dossier under preparation |\n';
    md += '| `ready_to_apply` | Dossier = GO, application packet ready |\n';
    md += '| `applied` | Application submitted |\n';
    md += '| `follow_up` | Follow-up sequence active |\n';
    md += '| `interview_scheduled` | Interview confirmed |\n';
    md += '| `interview_complete` | Awaiting result |\n';
    md += '| `offer_received` | Offer under evaluation |\n';
    md += '| `accepted` | Case successful |\n';
    md += '| `rejected` | Rejection - learning loop active |\n';
    md += '| `on_hold` | Client paused case |\n\n';

    md += '| Job ID | Company | Role | State | Follow-up Due | Updated |\n';
    md += '|:---|:---|:---|:---|:---|:---|\n';

    if (rows.length === 0) {
        md += '| — | No tracked applications yet | — | sourcing | — | — |\n\n';
    } else {
        rows.forEach(app => {
            md += `| ${app.jobId} | ${app.company} | ${app.role} | ${app.state} | ${app.follow_up_due_on || '—'} | ${app.updated_at || '—'} |\n`;
        });
        md += '\n';
    }

    return md;
}

async function syncCaseLog(store) {
    if (!(await fs.pathExists(CASE_LOG_PATH))) return;

    const content = await fs.readFile(CASE_LOG_PATH, 'utf8');
    const startMarker = '<!-- NS_TRACKER_START -->';
    const endMarker = '<!-- NS_TRACKER_END -->';
    const section = `${startMarker}\n${trackerSectionMarkdown(store)}${endMarker}`;

    let nextContent = content;
    if (content.includes(startMarker) && content.includes(endMarker)) {
        nextContent = content.replace(new RegExp(`${startMarker}[\\s\\S]*?${endMarker}`), section);
    } else {
        nextContent = `${content.trim()}\n\n---\n\n${section}\n`;
    }

    await fs.writeFile(CASE_LOG_PATH, nextContent, 'utf8');
}

async function cli() {
    const [command, ...rest] = process.argv.slice(2);

    if (!command || command === 'stats') {
        const stats = await getStats();
        console.log(JSON.stringify(stats, null, 2));
        return;
    }

    if (command === 'due') {
        const due = await getDueFollowUps();
        console.log(JSON.stringify(due, null, 2));
        return;
    }

    if (command === 'update') {
        const [jobId, newState, ...noteParts] = rest;
        const notes = noteParts.join(' ').trim();
        if (!jobId || !newState) {
            throw new Error('Usage: node src/application_tracker.js update <jobId> <newState> [notes]');
        }
        const app = await updateStatus(jobId, newState, notes);
        console.log(JSON.stringify(app, null, 2));
        return;
    }

    throw new Error('Supported commands: stats | due | update');
}

if (require.main === module) {
    cli().catch(err => {
        console.error(err.message);
        process.exit(1);
    });
}

module.exports = {
    STATES,
    updateStatus,
    getDueFollowUps,
    getStats
};
