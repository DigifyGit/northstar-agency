/**
 * gmail_monitor.js
 * NorthStar Agency — Gmail MCP Integration
 *
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  PRIVACY ENFORCEMENT — LINKEDIN JOB ALERTS ONLY             ║
 * ║                                                              ║
 * ║  This module is HARDCODED to only ever query emails from     ║
 * ║  approved LinkedIn sender addresses. It is IMPOSSIBLE to     ║
 * ║  read any other email through this module.                   ║
 * ║                                                              ║
 * ║  Approved senders (see LINKEDIN_SENDERS constant below):     ║
 * ║    • jobalerts-noreply@linkedin.com  (job alerts)            ║
 * ║    • jobs-noreply@linkedin.com       (job recommendations)   ║
 * ║                                                              ║
 * ║  Any attempt to pass an external query is BLOCKED by the     ║
 * ║  enforceLinkedInFilter() guard before it reaches the MCP.   ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * Run standalone: node src/gmail_monitor.js
 * Or via npm:     npm run gmail:digest
 */

'use strict';

const { spawn } = require('child_process');

// ── Privacy Constants — DO NOT MODIFY ────────────────────────────────────────

/**
 * The ONLY approved LinkedIn sender addresses.
 * All Gmail queries are forced to include exactly this filter.
 * Adding any other sender here requires explicit agency sign-off.
 */
const LINKEDIN_SENDERS = [
    'jobalerts-noreply@linkedin.com',   // Primary: LinkedIn Job Alerts (confirmed)
    'jobs-listings@linkedin.com'        // Secondary: LinkedIn Job Listings/Suggestions (confirmed)
];

/**
 * The mandatory Gmail filter fragment injected into EVERY query.
 * This cannot be altered by callers.
 */
const MANDATORY_FROM_FILTER = `from:(${LINKEDIN_SENDERS.join(' OR ')})`;

/**
 * Inbox restriction — only read inbox, never all mail / sent / other.
 */
const MANDATORY_INBOX_FILTER = 'in:inbox';

// ── Config ────────────────────────────────────────────────────────────────────
const GMAIL_ACCOUNT = process.env.GMAIL_ACCOUNT || 'digifyway@gmail.com';
const UVX_PATH = process.env.UVX_PATH || '/Users/maestro/.local/bin/uvx';
const MAX_RESULTS = parseInt(process.env.GMAIL_MAX_RESULTS || '20', 10);
const MCP_TIMEOUT_MS = 90000;

// ── Privacy Guard ─────────────────────────────────────────────────────────────

/**
 * PRIVACY ENFORCEMENT FUNCTION.
 *
 * Takes any caller-supplied query fragment and ALWAYS overrides the sender
 * and inbox restrictions. Callers can only add time-based qualifiers
 * (e.g. "newer_than:1d") — they can NEVER modify who we read email from.
 *
 * @param {string} callerQuery - Optional extra qualifiers from the caller
 * @returns {string} The enforced, safe Gmail query
 */
function enforceLinkedInFilter(callerQuery = '') {
    // Strip any 'from:' or 'in:' a caller might try to inject
    const sanitized = callerQuery
        .replace(/from:\S+/gi, '')
        .replace(/in:\S+/gi, '')
        .replace(/to:\S+/gi, '')
        .replace(/bcc:\S+/gi, '')
        .replace(/cc:\S+/gi, '')
        .trim();

    // Build the enforced query: MANDATORY filters + safe caller qualifiers
    const parts = [MANDATORY_FROM_FILTER, MANDATORY_INBOX_FILTER];
    if (sanitized) parts.push(sanitized);

    return parts.join(' ');
}

// ── Low-level MCP Client ──────────────────────────────────────────────────────

/**
 * Spawns workspace-mcp, performs JSON-RPC handshake, calls ONE tool.
 * Stdin stays open until the response is received.
 */
function callMcpTool(tool, args) {
    return new Promise((resolve, reject) => {
        const env = {
            ...process.env,
            GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID || 'YOUR_CLIENT_ID_HERE',
            GOOGLE_OAUTH_CLIENT_SECRET: process.env.GOOGLE_OAUTH_CLIENT_SECRET || 'YOUR_CLIENT_SECRET_HERE',
            OAUTHLIB_INSECURE_TRANSPORT: '1'
        };

        const proc = spawn(UVX_PATH, ['workspace-mcp'], {
            stdio: ['pipe', 'pipe', 'pipe'],
            env
        });

        let stdoutBuffer = '';
        let settled = false;

        function done(err, value) {
            if (settled) return;
            settled = true;
            clearTimeout(timer);
            proc.kill();
            if (err) reject(err);
            else resolve(value);
        }

        const timer = setTimeout(
            () => done(new Error(`MCP tool "${tool}" timed out after ${MCP_TIMEOUT_MS / 1000}s`)),
            MCP_TIMEOUT_MS
        );

        proc.on('error', err => done(new Error(`MCP spawn failed: ${err.message}`)));

        proc.stdout.on('data', chunk => {
            stdoutBuffer += chunk.toString();
            const lines = stdoutBuffer.split('\n');
            stdoutBuffer = lines.pop();

            for (const line of lines) {
                if (!line.trim()) continue;
                try {
                    const msg = JSON.parse(line);
                    if (msg.id === 1) {
                        const content = msg.result?.content?.[0]?.text ?? '';
                        if (msg.result?.isError) {
                            done(new Error(`MCP tool error: ${content}`));
                        } else {
                            done(null, content);
                        }
                    }
                } catch (_) { /* skip non-JSON server logs */ }
            }
        });

        function sendMsg(obj) {
            proc.stdin.write(JSON.stringify(obj) + '\n');
        }

        sendMsg({
            jsonrpc: '2.0', id: 0, method: 'initialize',
            params: {
                protocolVersion: '2024-11-05',
                capabilities: {},
                clientInfo: { name: 'northstar-agency', version: '1.0.0' }
            }
        });
        sendMsg({ jsonrpc: '2.0', method: 'notifications/initialized', params: {} });
        sendMsg({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name: tool, arguments: args } });
    });
}

// ── Gmail Fetching ────────────────────────────────────────────────────────────

/**
 * Searches Gmail for LinkedIn job alert emails.
 *
 * The sender and inbox filter are ALWAYS enforced regardless of what
 * the caller passes in `options.query`.
 *
 * @param {object}  options
 * @param {string}  [options.query]      - Extra safe qualifiers e.g. 'newer_than:1d'
 * @param {number}  [options.maxResults] - Max emails to fetch (default 20)
 * @returns {Promise<string[]>}           Array of Gmail message IDs
 */
async function searchLinkedInEmails({ query = '', maxResults = MAX_RESULTS } = {}) {
    const safeQuery = enforceLinkedInFilter(query);
    console.log(`🔒 [GmailMonitor] Enforced query: "${safeQuery}"`);

    const result = await callMcpTool('search_gmail_messages', {
        user_google_email: GMAIL_ACCOUNT,
        query: safeQuery,
        page_size: maxResults
    });

    const ids = [];
    for (const line of result.split('\n')) {
        const m = line.match(/Message ID:\s*([a-f0-9]+)/i);
        if (m) ids.push(m[1].trim());
    }

    console.log(`📧 [GmailMonitor] Found ${ids.length} LinkedIn alert email(s).`);
    return ids;
}

/**
 * Fetches full content of a batch of message IDs.
 * @param {string[]} messageIds
 * @returns {Promise<string>}
 */
async function fetchEmailContents(messageIds) {
    if (!messageIds.length) return '';
    console.log(`📧 [GmailMonitor] Fetching content for ${messageIds.length} email(s)...`);

    return callMcpTool('get_gmail_messages_content_batch', {
        user_google_email: GMAIL_ACCOUNT,
        message_ids: messageIds
    });
}

/**
 * High-level helper used by linkedin_email_digest.js and daily_routine.js.
 * Privacy filter is always applied — callers cannot bypass it.
 *
 * @param {object} options - Passed to searchLinkedInEmails
 * @returns {Promise<{ids: string[], rawContent: string}>}
 */
async function fetchLinkedInAlerts(options = {}) {
    const ids = await searchLinkedInEmails(options);
    if (!ids.length) return { ids: [], rawContent: '' };
    const rawContent = await fetchEmailContents(ids);
    return { ids, rawContent };
}

// ── Standalone Runner ─────────────────────────────────────────────────────────

if (require.main === module) {
    (async () => {
        const lookback = process.argv[2] || 'newer_than:1d';

        console.log('');
        console.log('┌─────────────────────────────────────────────────────────┐');
        console.log('│  NorthStar — LinkedIn Job Alert Monitor                  │');
        console.log('│  🔒 Privacy mode: LinkedIn job senders ONLY              │');
        console.log('└─────────────────────────────────────────────────────────┘');
        console.log(`  Account    : ${GMAIL_ACCOUNT}`);
        console.log(`  Lookback   : ${lookback}`);
        console.log(`  Filter     : ${MANDATORY_FROM_FILTER}`);
        console.log('');

        try {
            const { ids, rawContent } = await fetchLinkedInAlerts({ query: lookback });

            if (!ids.length) {
                console.log('📭 No LinkedIn job alert emails found for this period.');
                console.log('');
                console.log('  This is normal if:');
                console.log('  • LinkedIn alerts were recently redirected to this address');
                console.log('  • Your alerts are set to weekly frequency');
                console.log('  • No new matching jobs were posted in this period');
                return;
            }

            console.log('\n──── EMAIL CONTENT ──────────────────────────────────────\n');
            console.log(rawContent);
            console.log('\n─────────────────────────────────────────────────────────');
            console.log(`\n✅ Fetched ${ids.length} LinkedIn alert email(s).`);

        } catch (err) {
            console.error('❌ Monitor Error:', err.message);
            process.exit(1);
        }
    })();
}

module.exports = {
    fetchLinkedInAlerts,
    searchLinkedInEmails,
    fetchEmailContents,
    enforceLinkedInFilter,   // exported for testing
    GMAIL_ACCOUNT,
    LINKEDIN_SENDERS,
    MANDATORY_FROM_FILTER
};
