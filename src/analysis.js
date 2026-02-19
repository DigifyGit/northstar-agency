const fs = require('fs-extra');
const path = require('path');
const csv = require('csv-parser');
const knowledgeBase = require('../brain/knowledge_base.json');

async function generateReport(dateStr) {
    const dataDir = path.join(process.cwd(), 'data');
    const reportDir = path.join(process.cwd(), 'reports');
    await fs.ensureDir(reportDir);

    const csvPath = path.join(dataDir, `job_results_${dateStr}.csv`);
    if (!(await fs.pathExists(csvPath))) {
        console.error(`No data found for date: ${dateStr}`);
        return;
    }

    const allJobs = [];

    // Read CSV
    await new Promise((resolve, reject) => {
        fs.createReadStream(csvPath)
            .pipe(csv())
            .on('data', (data) => allJobs.push(data))
            .on('end', resolve)
            .on('error', reject);
    });

    if (allJobs.length === 0) {
        console.log('No jobs to analyze.');
        return;
    }

    // Group by Keyword
    // Note: CSV headers are Capitalized (Keyword, Tier, Score, etc.)
    const jobsByKeyword = {};
    allJobs.forEach(job => {
        const kw = job.Keyword || 'Unknown';
        if (!jobsByKeyword[kw]) jobsByKeyword[kw] = [];
        jobsByKeyword[kw].push(job);
    });

    const generatedReports = [];

    // --- OVERLAP & DUPLICATION ANALYSIS ---
    const allJobsMap = new Map(); // key -> { keywords: [], job: {} }
    let totalUniqueJobs = 0;

    // First pass: Build global map of unique jobs
    for (const [keyword, jobs] of Object.entries(jobsByKeyword)) {
        jobs.forEach(job => {
            // Create a stable key: Prioritize Job ID, fallback to composite
            const key = (job['Job ID'] && job['Job ID'] !== 'unknown')
                ? job['Job ID']
                : `${job['Job Title'].toLowerCase()}|${job['Company'].toLowerCase()}|${job['Location'].toLowerCase()}`;

            if (!allJobsMap.has(key)) {
                allJobsMap.set(key, {
                    keywords: new Set(),
                    data: job
                });
                totalUniqueJobs++;
            }
            allJobsMap.get(key).keywords.add(keyword);
        });
    }

    // Second pass: Calculate overlap stats per keyword
    const overlapStats = {};
    for (const keyword of Object.keys(jobsByKeyword)) {
        let uniqueToKw = 0;
        let overlapCount = 0;

        jobsByKeyword[keyword].forEach(job => {
            // Consistent key logic
            const key = (job['Job ID'] && job['Job ID'] !== 'unknown')
                ? job['Job ID']
                : `${job['Job Title'].toLowerCase()}|${job['Company'].toLowerCase()}|${job['Location'].toLowerCase()}`;
            const entry = allJobsMap.get(key);
            if (entry.keywords.size > 1) {
                overlapCount++;
            } else {
                uniqueToKw++;
            }
        });

        const total = jobsByKeyword[keyword].length;
        overlapStats[keyword] = {
            unique: uniqueToKw,
            overlap: overlapCount,
            overlapRate: total > 0 ? ((overlapCount / total) * 100).toFixed(1) + '%' : '0%'
        };
    }

    console.log('Global Unique Jobs:', totalUniqueJobs);
    console.log('Overlap Stats:', overlapStats);

    // --- REPORT GENERATION ---
    // Process each keyword
    for (const [keyword, jobs] of Object.entries(jobsByKeyword)) {
        console.log(`Generating report for: ${keyword}`);

        // ... existing tier counts logic ...
        const total = jobs.length;
        const tierCounts = { S: 0, A: 0, B: 0, C: 0, D: 0 };
        jobs.forEach(j => { if (tierCounts[j.Tier] !== undefined) tierCounts[j.Tier]++; });

        const signalCount = tierCounts.S + tierCounts.A;
        const signalRatePct = total > 0 ? (signalCount / total) * 100 : 0;
        const signalRate = `${signalRatePct.toFixed(1)}%`;

        // Determine Verdict
        let verdict = 'RETIRE';
        if (signalRatePct > 20) verdict = 'PROMOTE';
        else if (signalRatePct > 5) verdict = 'MODIFY';

        // --- C) Pattern Findings (Heuristic) ---
        // Simple aggregation of top disqualifiers to deduce patterns
        const dTiers = jobs.filter(j => j.Tier === 'D' || j.Tier === 'C');
        const patternNotes = [];

        let noiseCount = 0;
        let langCount = 0;
        let appSupportCount = 0;
        dTiers.forEach(j => {
            if (j.Reason.includes("Noise") || j.Reason.includes("Advanced Tech")) appSupportCount++;
            if (j.Reason.includes("Missing Language")) langCount++;
        });

        if (appSupportCount > dTiers.length / 3) {
            patternNotes.push({
                pattern: "Heavily skewed toward technical Application Support/Engineering.",
                evidence: dTiers.slice(0, 3).map(j => `${j.Company} (${j['Job Title']})`).join(', '),
                impact: "Keyword attracts roles requiring SQL/Dev skills."
            });
        }
        if (langCount > dTiers.length / 3) {
            patternNotes.push({
                pattern: "High frequency of language-gated roles (German/French).",
                evidence: dTiers.filter(j => j.Reason.includes("Language")).slice(0, 3).map(j => `${j.Company} (${j['Job Title']})`).join(', '),
                impact: "Keyword is popular with BPOs serving other markets."
            });
        }
        if (patternNotes.length === 0) {
            patternNotes.push({
                pattern: "General mix of unrelated roles.",
                evidence: dTiers.slice(0, 2).map(j => `${j.Company} (${j['Job Title']})`).join(', '),
                impact: "Keyword may be too broad."
            });
        }


        // --- D) Top Opportunities (S & A) ---
        const topJobs = jobs.filter(j => ['S', 'A'].includes(j.Tier))
            .sort((a, b) => parseFloat(b.Score) - parseFloat(a.Score));

        // --- E) Disqualifications ---
        const dqJobs = dTiers.sort((a, b) => parseFloat(a.Score) - parseFloat(b.Score)); // Lowest score first

        // --- H) Data Fixes ---
        const fixes = [];
        if (jobs.some(j => !j.URL)) fixes.push("Ensure Job URL is verified.");
        if (jobs.some(j => j.Workplace === "Unknown")) fixes.push("Improve Workplace Type extraction.");


        // === GENERATE MARKDOWN ===
        // Filename: LI_Keyword_Report__<keyword>__Portugal__<date>.md
        const safeKw = keyword.replace(/[^a-zA-Z0-9]/g, '_');

        let md = `# 📊 LinkedIn Keyword Report: ${keyword}\n`;
        md += `**Subtitle**: Automated Intelligence Report\n\n---\n\n`;

        // SECTION A: METADATA & METRICS
        md += `## A) Metadata & Metrics\n`;
        md += `- **Total Jobs Scraped:** ${total}\n`;
        md += `- **Unique Jobs:** ${overlapStats[keyword].unique}\n`;
        md += `- **Overlap Rate:** ${overlapStats[keyword].overlapRate} (Shared with other keywords)\n`;
        md += `- **Signal Rate:** ${signalRate} (S+A Tiers)\n`;
        md += `- **Action Verdict:** ${verdict}\n\n`;
        md += `**Location scope:** Portugal\n`;
        md += `**Results captured:** ${total}\n\n---\n\n`;

        // B) Signal vs Noise
        md += `### 📈 B) Signal vs Noise Summary\n\n`;
        md += `**S tier:** ${tierCounts.S}\n`;
        md += `**A tier:** ${tierCounts.A}\n`;
        md += `**B tier:** ${tierCounts.B}\n`;
        md += `**C tier:** ${tierCounts.C}\n`;
        md += `**D tier:** ${tierCounts.D}\n\n`;
        md += `**Signal rate:** ${signalRatePct.toFixed(1)}%\n\n`;
        md += `**Verdict:** ${verdict}\n`;
        md += `---\n\n`;

        // C) Patterns
        md += `### 🧠 C) Pattern Findings\n\n`;
        patternNotes.forEach((p, i) => {
            md += `**Pattern ${i + 1}:** ${p.pattern}\n`;
            md += `**Evidence:** ${p.evidence}\n`;
            md += `**Impact:** ${p.impact}\n\n`;
        });
        md += `---\n\n`;

        // D) Top Opportunities
        md += `### 🏆 D) Top Opportunities (S and A)\n\n`;
        if (topJobs.length === 0) {
            md += `_No S or A tier jobs found for this keyword._\n\n`;
        } else {
            topJobs.forEach(job => {
                md += `#### ${job.Tier} | ${job.Score} | ${job.Company} | ${job['Job Title']}\n\n`;
                md += `**Location:** ${job.Location} (${job.Workplace})\n`;
                md += `**Posted:** ${job.Posted}\n`;
                md += `**Easy Apply:** ${job['Easy Apply']}\n`;
                md += `**URL:** ${job.URL || "I don't know"}\n\n`;
                md += `**Why it fits:**\n`;
                // Parse reasons from short string
                const reasons = job.Reason ? job.Reason.split(',').map(s => s.trim()).filter(s => s.startsWith('+')) : [];
                if (reasons.length > 0) reasons.forEach(r => md += `• ${r.replace(/^\+/, '')}\n`);
                else md += `• Matches keyword criteria\n`;
                md += `\n`;

                md += `**Risks / gaps:**\n`;
                const risks = job.Reason ? job.Reason.split(',').map(s => s.trim()).filter(s => s.startsWith('-') || s.startsWith('0')) : [];
                if (risks.length > 0) risks.forEach(r => md += `• ${r.replace(/^-/, '')}\n`);
                else md += `• None detected\n`;
                md += `\n`;

                md += `**Next action:** Apply now\n\n`;
            });
        }
        md += `---\n\n`;

        // E) Disqualifications
        md += `### 🧯 E) Disqualifications (Hard No)\n\n`;
        if (dqJobs.length === 0) {
            md += `_No disqualifications listed._\n\n`;
        } else {
            dqJobs.slice(0, 10).forEach(job => {
                md += `• **${job.Company}** | ${job['Job Title']} — ${job.Reason}\n`;
            });
        }
        md += `\n---\n\n`;

        // F) Improvements
        md += `### 🧰 F) Keyword Improvements (Evidence Based)\n\n`;
        if (verdict === "RETIRE") {
            md += `**Suggestion 1:** Stop using this keyword.\n`;
            md += `**Why:** Signal rate is too low.\n\n`;
        } else {
            md += `**Suggestion 1:** Continue monitoring.\n`;
            md += `**Why:** Sufficient signal found.\n\n`;
        }
        md += `---\n\n`;

        // G) Apply Pipeline
        md += `### ⚙️ G) Apply Pipeline\n\n`;
        md += `**Apply now:**\n`;
        topJobs.slice(0, 5).forEach(j => md += `• ${j.Company} | ${j['Job Title']} | ${j.URL}\n`);
        md += `\n`;

        md += `---\n\n`;

        // I) Continuous Plan / Next Steps (Data Driven)
        md += `### 🔮 I) Continuous Plan & Next Steps\n\n`;

        const policy = knowledgeBase.planner_policy;
        const currentPool = knowledgeBase.planner_policy.next_keyword_pool;

        // Determine Status based on Policy Thresholds
        let status = 'STABLE';
        let action = 'MONITOR';
        let nextKeywords = [];

        // Parsing percentages
        const sRate = signalRatePct;
        const oRate = parseFloat(overlapStats[keyword].overlapRate);

        if (sRate <= policy.retire.signal_rate_max * 100) {
            status = '🔴 CRITICAL FAILURE';
            action = 'PIVOT';
            // Suggest next 3 keywords from pool that aren't the current one
            nextKeywords = currentPool.filter(k => k.toLowerCase() !== keyword.toLowerCase()).slice(0, 3);
        } else if (oRate >= policy.retire.overlap_rate_min * 100) {
            status = '🟡 REDUNDANT';
            action = 'RETIRE';
        } else if (sRate >= 20) {
            status = '🟢 HEALTHY';
            action = 'INCREASE_FREQUENCY';
        }

        md += `**Status:** ${status}\n`;
        md += `**Action Verdict:** ${action}\n\n`;

        if (action === 'PIVOT') {
            md += `**Analysis:** Zero signal detected. Current keyword bucket is empty or irrelevant.\n`;
            md += `**Next Strategic Move:** Rotate to fresh keywords from the Knowledge Base.\n\n`;
            md += `**Recommended 🚀 Next Tasks:**\n`;
            nextKeywords.forEach((k, idx) => md += `${idx + 1}. Scrape keyword: "**${k}**"\n`);
        } else if (action === 'RETIRE') {
            md += `**Analysis:** High overlap (${overlapStats[keyword].overlapRate}) with other keywords.\n`;
            md += `**Recommendation:** Stop scraping '${keyword}' to save resources. Rely on the primary keyword that shares these results.\n`;
        } else if (action === 'INCREASE_FREQUENCY') {
            md += `**Analysis:** High quality signal found. This is a winning vector.\n`;
            md += `**Recommendation:** Promote to Daily Routine.\n`;
        } else {
            md += `**Analysis:** Moderate performance. Keep in rotation.\n`;
        }
        md += `\n`;

        const reportFilename = `LI_Keyword_Report__${safeKw}__Portugal__${dateStr}.md`;
        const reportFullPath = path.join(reportDir, reportFilename);
        await fs.writeFile(reportFullPath, md);
        console.log(`Generated: ${reportFullPath}`);
        generatedReports.push(reportFullPath);
    }

    return generatedReports;
}

if (require.main === module) {
    const dateStr = process.argv[2] || new Date().toISOString().split('T')[0];
    generateReport(dateStr).catch(console.error);
}

module.exports = { generateReport };
