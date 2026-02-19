const fs = require('fs');
const path = require('path');

const MARKER = '<!-- northstar-nightly-mark-update -->';

function safeReadJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (_) {
    return null;
  }
}

function latestDateFromFiles(dirPath, regex) {
  if (!fs.existsSync(dirPath)) return null;
  const files = fs.readdirSync(dirPath);
  const dates = files
    .map((name) => {
      const m = name.match(regex);
      return m ? m[1] : null;
    })
    .filter(Boolean)
    .sort();
  return dates.length ? dates[dates.length - 1] : null;
}

function summarizeWinners(repoRoot) {
  const winnerPath = path.join(repoRoot, 'reports', 'WINNER_REPORT_TODAY.json');
  const winner = safeReadJson(winnerPath);
  if (!winner) {
    return {
      hasData: false,
      line: '- No `reports/WINNER_REPORT_TODAY.json` found in the repo snapshot.',
      details: null
    };
  }

  const date = winner.date || 'unknown';
  const winners = Number(winner.winners_sa_count || 0);
  const backup = Number(winner.backup_b_count || 0);
  const unique = Number(winner.unique_rows || 0);

  return {
    hasData: true,
    line: `- Winners snapshot date: **${date}** (S/A: **${winners}**, B backup: **${backup}**, unique rows: **${unique}**).`,
    details: winner
  };
}

function summarizeCaseLog(repoRoot) {
  const caseLog = path.join(repoRoot, 'brain', 'CASE_LOG.md');
  if (!fs.existsSync(caseLog)) {
    return '- `brain/CASE_LOG.md` not found.';
  }

  const stat = fs.statSync(caseLog);
  return `- CASE_LOG last modified: **${stat.mtime.toISOString()}**.`;
}

function summarizeData(repoRoot) {
  const latestCsv = latestDateFromFiles(path.join(repoRoot, 'data'), /^job_results_(\d{4}-\d{2}-\d{2})\.csv$/);
  if (!latestCsv) {
    return '- No `data/job_results_YYYY-MM-DD.csv` files found in the repo snapshot.';
  }
  return `- Latest scraped CSV date present: **${latestCsv}**.`;
}

function buildBody(repoRoot) {
  const now = new Date().toISOString();
  const winners = summarizeWinners(repoRoot);
  const caseLogLine = summarizeCaseLog(repoRoot);
  const dataLine = summarizeData(repoRoot);

  let md = `${MARKER}\n`;
  md += `## NorthStar Daily Update\n`;
  md += `Generated at: **${now}**\n\n`;
  md += `### Status\n`;
  md += `${winners.line}\n`;
  md += `${dataLine}\n`;
  md += `${caseLogLine}\n\n`;
  md += `### Safety\n`;
  md += `- This workflow performs **no LinkedIn scraping** and **no browser login/session automation**.\n`;
  md += `- It summarizes repo-available artifacts only.\n`;

  if (!winners.hasData) {
    md += `\n### Note\n`;
    md += `- No fresh winner snapshot is available in tracked files. This is expected if runtime reports are git-ignored.\n`;
  }

  return md;
}

function main() {
  const repoRoot = process.cwd();
  const body = buildBody(repoRoot);

  const outDir = process.env.NIGHTLY_OUTPUT_DIR
    ? path.resolve(process.env.NIGHTLY_OUTPUT_DIR)
    : path.join(repoRoot, 'tmp');
  fs.mkdirSync(outDir, { recursive: true });

  const outputPath = path.join(outDir, 'nightly_mark_update.md');
  fs.writeFileSync(outputPath, body, 'utf8');

  // Print for local runs and workflow logs.
  console.log(body);
  console.log(`\nSaved nightly update to ${outputPath}`);
}

if (require.main === module) {
  main();
}

module.exports = {
  buildBody
};
