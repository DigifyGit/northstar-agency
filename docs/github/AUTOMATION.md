# Nightly Automation (GitHub)

## Scope
Nightly automation is intentionally limited to **safe, non-scraping tasks**:
- Generate a daily status summary from repo-available artifacts.
- Post or update one comment in a designated GitHub issue.

The workflow does **not** run LinkedIn scraping, browser login, or session automation.

## Workflows
- CI: `.github/workflows/ci.yml`
- Nightly update: `.github/workflows/nightly-mark-update.yml`

## Nightly Output Contract
- Script: `src/ops/nightly_mark_update.js`
- NPM command: `npm run nightly:update`
- Output file: `tmp/nightly_mark_update.md`
- Update target: issue comment containing marker `<!-- northstar-nightly-mark-update -->`

## Required Secret
Set repository secret:
- `DAILY_UPDATE_ISSUE_NUMBER`: numeric issue ID where the daily update comment is maintained.

## Optional Setup Steps
1. Create an issue named "Daily NorthStar Update".
2. Copy its number and set `DAILY_UPDATE_ISSUE_NUMBER`.
3. Run the workflow manually once with `workflow_dispatch`.
4. Confirm comment creation, then let schedule run daily.

## Failure Modes
- Missing `DAILY_UPDATE_ISSUE_NUMBER` secret: workflow fails at comment step.
- No report/data files available: workflow still succeeds and posts "no fresh data" note.
- Permission errors: ensure workflow `issues: write` permission is present.

## Security Notes
- `.env` files are ignored from Git.
- Browser profile folders (`user_data*`) are ignored.
- Runtime report/data outputs are ignored to reduce sensitive/noisy commits.
