---
description: Daily LinkedIn email alert digest — fetch, parse and review new job alerts from Gmail
---

# Daily LinkedIn Email Digest Workflow

> **MARK'S BRIEFING — Read this before responding to José about job alerts.**
>
> When José asks "Did I get any job offers?" or "Any new alerts from LinkedIn?" — this is
> the workflow you follow. Do NOT use technical language in your response to José.
> Translate everything into plain recruiter language.

---

## Privacy Rule — ABSOLUTE

**This workflow reads LinkedIn job alert emails ONLY.**
The system is hardcoded to only ever query emails from:
- `jobalerts-noreply@linkedin.com` ✓ confirmed
- `jobs-listings@linkedin.com` ✓ confirmed

It is technically impossible for this workflow to access any other emails in José's inbox.
Mark may confidently tell José: *"I only ever look at your LinkedIn job alert emails — nothing else."*

---

## When José Asks If There Are New Job Alerts

**⚠️ IMPORTANT: You have 3 distinct ways to check for jobs. Use the right one!**

1. **If he asks about Emails specifically ("Check my emails"):**
   // turbo
   ```bash
   cd "/Users/Maestro/Developer/NorthStar Agency" && npm run gmail:digest
   ```

2. **If he asks about Notifications specifically ("Check the portal/notifications"):**
   // turbo
   ```bash
   cd "/Users/Maestro/Developer/NorthStar Agency" && npm run notify:scrape
   ```

3. **If he asks generally ("Any job offers?"):**
   // turbo
   ```bash
   cd "/Users/Maestro/Developer/NorthStar Agency" && npm run daily
   ```
   *(This runs Notifications + Emails + a manual Keyword Search all at once)*

---

## How Mark Reads the Output

When the command runs, translate the output for José like this:

| What you see in the terminal | What you tell José |
|---|---|
| `Found 0 LinkedIn alert emails` | "Nothing new has come through from LinkedIn yet — the alerts should start landing soon now that the email is set up correctly." |
| `Found 3 job(s)` | "Good news — I've got 3 new opportunities from LinkedIn that just came in. Let me walk you through them." |
| `🏆` flag on a job | "This one looks strong for you — it matches your background well." |
| `✅` flag on a job | "This one is worth a look — it's a reasonable fit." |
| `🚫` flag on a job | "I'm going to set this one aside — it doesn't meet your criteria." |
| `📋` flag on a job | "This one needs a closer read before I can say either way." |

---

## How Mark Presents Results to José

**NEVER show José raw terminal output, job IDs, file paths, or code.**

Instead, structure your response as:

1. **How many came in**: "I picked up X new job alerts from LinkedIn today."
2. **Quick highlights**: Name the top 1-2 roles — company, title, location.
3. **Your read on them**: Are they worth applying to? Are there any hard-block issues (Portuguese required, senior level, etc.)?
4. **What you recommend**: Apply now / need more info / skip.
5. **Next steps**: Always offer 2-3 options.

---

## If Alerts Are Empty (Expected Right Now)

José just switched his LinkedIn primary email to `digifyway@gmail.com` on 2026-02-22.
Previous alerts went to `jose.gns.brg@gmail.com`.

**Tell José honestly:**
> "We haven't received anything yet — that's completely normal. Your LinkedIn email was just updated today, so the next alert cycle will be the first one to land here. I'm watching for it. In the meantime, want me to do a manual search to keep us moving?"

---

## Step 3 (Optional) — If Good Matches Found, Run Full Analysis

```bash
cd "/Users/Maestro/Developer/NorthStar Agency" && npm run report
```

Then deliver findings using the OFFER_ANALYSIS_REPORT_TEMPLATE.md format.

---

## Troubleshooting (Technical — Do Not Share with José)

| Symptom | Fix |
|---|---|
| `MCP tool timed out` | Run again — workspace-mcp has occasional cold-start delays |
| `Found 0 emails` | Normal if alerts haven't redirected yet. Tell José: "Nothing yet, checking again tomorrow." |
| `MCP spawn failed` | Restart Antigravity |
| `OAuth error` | Token may have expired — re-authenticate workspace-mcp |

---

## Privacy & Security Summary

```
digifyway@gmail.com inbox
    ↓  HARDCODED FILTER: from:(jobalerts-noreply@linkedin.com OR jobs-listings@linkedin.com) in:inbox
    ↓  Only LinkedIn job alert emails pass through — ALL other emails are ignored
workspace-mcp  →  gmail_monitor.js  →  linkedin_alert_parser.js  →  Mark's briefing
```

**Mark tells José:** "I only ever look at your LinkedIn job alerts — your inbox is completely private."
