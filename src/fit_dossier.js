const fs = require('fs-extra');
const path = require('path');

const ROOT = process.cwd();
const WINNER_PATH = path.join(ROOT, 'reports', 'WINNER_REPORT_TODAY.json');
const UNIQUE_PATH = path.join(ROOT, 'reports', 'codex_map7_latest_cycle_unique_best.json');
const BRIEF_PATH = path.join(ROOT, 'brain', 'CLIENT_BRIEF.md');
const LEDGER_PATH = path.join(ROOT, 'brain', 'SKILLS_EVIDENCE_LEDGER.json');
const TEMPLATE_PATH = path.join(ROOT, 'brain', 'A_TIER_FIT_DOSSIER_TEMPLATE.md');
const REPORTS_DIR = path.join(ROOT, 'reports');

const CONFIDENCE_POINTS = {
    confirmed: 3,
    probable: 1,
    unknown: 0,
    gap: 0
};

function toText(v) {
    return (v || '').toString();
}

function normalize(v) {
    return toText(v)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
}

function cleanUrl(url) {
    const m = toText(url).match(/linkedin\.com\/jobs\/view\/(\d+)/i);
    if (m) return `https://www.linkedin.com/jobs/view/${m[1]}/`;
    return toText(url).trim();
}

function safeFilePart(value) {
    return toText(value)
        .trim()
        .replace(/[^a-zA-Z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '') || 'unknown_company';
}

function parseClientName(briefContent) {
    const m = briefContent.match(/^\|\s*(?:\*\*)?Name(?:\*\*)?\s*\|\s*([^|]+)\|/mi);
    return m ? m[1].trim() : 'Client';
}

function buildSkillIndex(ledger) {
    const skills = Array.isArray(ledger?.skills) ? ledger.skills : [];
    return skills.map(skill => {
        const terms = new Set();
        const skillName = toText(skill.skill);
        terms.add(normalize(skillName));

        for (const token of normalize(skillName).split(/[^a-z0-9]+/g)) {
            if (token.length >= 3) terms.add(token);
        }

        const synonyms = [
            ['active directory basics', ['active directory', 'ad user', 'password reset']],
            ['microsoft 365 admin', ['microsoft 365', 'office 365', 'm365']],
            ['windows 10/11 support', ['windows 10', 'windows 11', 'windows support']],
            ['troubleshooting methodology', ['troubleshooting', 'root cause', 'diagnosis']],
            ['vpn troubleshooting', ['vpn', 'remote access']],
            ['password resets / mfa', ['password reset', 'mfa', 'multi-factor']],
            ['remote desktop support', ['remote desktop', 'rdp']],
            ['basic networking (wi-fi, dns, ip)', ['wifi', 'dns', 'ip', 'network connectivity']],
            ['printer triage', ['printer', 'print queue']],
            ['english communication', ['english', 'communication']],
            ['portuguese communication', ['portuguese', 'portugues']],
            ['customer empathy & patience', ['empathy', 'customer', 'patience']]
        ];

        for (const [key, values] of synonyms) {
            if (normalize(skillName) === key) {
                values.forEach(v => terms.add(normalize(v)));
            }
        }

        return {
            ...skill,
            normalized_terms: [...terms]
        };
    });
}

function extractRequirements(description, indexedSkills) {
    const raw = toText(description)
        .replace(/\r/g, '\n')
        .replace(/[\t ]+/g, ' ')
        .trim();

    if (!raw) return [];

    const requirements = [];
    const lines = raw.split(/\n+/).map(l => l.trim()).filter(Boolean);
    const triggerRegex = /(must|required|experience|familiar|knowledge|proficient|ability|support|troubleshoot|admin|network|windows|microsoft|active directory|ticket)/i;

    for (const line of lines) {
        if (triggerRegex.test(line)) {
            requirements.push(line.replace(/^[-*•]\s*/, '').slice(0, 180));
        }
    }

    const sentenceRegex = /[^.!?\n]{20,220}[.!?]/g;
    const sentences = raw.match(sentenceRegex) || [];
    for (const sentence of sentences) {
        if (triggerRegex.test(sentence)) {
            requirements.push(sentence.trim().slice(0, 180));
        }
    }

    for (const skill of indexedSkills) {
        for (const term of skill.normalized_terms) {
            if (term.length < 3) continue;
            if (normalize(raw).includes(term)) {
                requirements.push(`Requirement evidence: ${skill.skill}`);
                break;
            }
        }
    }

    const seen = new Set();
    const unique = [];
    for (const req of requirements) {
        const key = normalize(req).replace(/[^a-z0-9]+/g, ' ').trim();
        if (!key || key.length < 6) continue;
        if (seen.has(key)) continue;
        seen.add(key);
        unique.push(req);
        if (unique.length >= 10) break;
    }

    return unique;
}

function overlapScore(textA, textB) {
    const aTokens = new Set(normalize(textA).split(/[^a-z0-9]+/g).filter(t => t.length >= 3));
    const bTokens = new Set(normalize(textB).split(/[^a-z0-9]+/g).filter(t => t.length >= 3));
    let overlap = 0;
    for (const t of aTokens) {
        if (bTokens.has(t)) overlap++;
    }
    return overlap;
}

function mapRequirementToEvidence(requirement, indexedSkills) {
    let best = null;
    let bestScore = 0;

    for (const skill of indexedSkills) {
        const joinedTerms = skill.normalized_terms.join(' ');
        const score = overlapScore(requirement, joinedTerms);
        if (score > bestScore) {
            bestScore = score;
            best = skill;
        }
    }

    if (!best || bestScore === 0) {
        return {
            requirement,
            confidence: 'unknown',
            evidence: 'No matching evidence in ledger',
            action: 'Validate through assessment before applying',
            match: '⚠️'
        };
    }

    const confidence = best.confidence || 'unknown';
    const evidence = best.evidence_detail || best.notes || 'Skill present in evidence ledger';
    const match = confidence === 'confirmed' ? '✅' : confidence === 'probable' ? '⚠️' : '❌';
    const action = confidence === 'confirmed'
        ? 'Use as primary fit proof in CV/application'
        : confidence === 'probable'
            ? 'Reference cautiously and prioritize quick verification'
            : 'Treat as gap and add readiness action';

    return {
        requirement,
        skill: best.skill,
        confidence,
        evidence,
        action,
        match
    };
}

function computeRiskPenalty(job, description, mappedRequirements) {
    let penalty = 0;
    const risks = [];
    const text = normalize(`${job.job_title || ''}\n${description}`);

    if (/(senior|lead|principal|manager|head of)/i.test(text) || /(\b[4-9]\+\s*(years|anos))/i.test(text)) {
        penalty += 20;
        risks.push({
            area: 'Seniority',
            description: 'Role appears to request senior profile or 4+ years experience',
            severity: 'High',
            mitigation: 'Move to backup unless strong contradictory evidence exists'
        });
    }

    if (/(german|french|dutch|italian|spanish)/i.test(text)) {
        penalty += 20;
        risks.push({
            area: 'Language',
            description: 'Potential foreign-language requirement outside current evidence',
            severity: 'High',
            mitigation: 'Confirm language requirement is optional before applying'
        });
    }

    const unknownCount = mappedRequirements.filter(r => r.confidence === 'unknown' || r.confidence === 'gap').length;
    const unknownRatio = mappedRequirements.length > 0 ? unknownCount / mappedRequirements.length : 1;
    if (unknownRatio >= 0.5) {
        penalty += 10;
        risks.push({
            area: 'Skills Proof',
            description: 'Half or more requirements are unverified',
            severity: 'Medium',
            mitigation: 'Run technical/behavioral readiness checks before execution'
        });
    }

    if (/on-?site/.test(normalize(job.workplace || '')) && /porto|lisbon/.test(normalize(job.location || ''))) {
        risks.push({
            area: 'Logistics',
            description: 'On-site expectation may require schedule/commute confirmation',
            severity: 'Low',
            mitigation: 'Confirm commute and availability before submission'
        });
    }

    if (risks.length === 0) {
        risks.push({
            area: 'General',
            description: 'No critical risk detected from available signals',
            severity: 'Low',
            mitigation: 'Proceed with standard quality checks'
        });
    }

    return { penalty, risks };
}

function gateFromScore(score) {
    if (score >= 80) return 'GO';
    if (score >= 50) return 'CONDITIONAL GO';
    return 'HOLD';
}

function confidenceLabel(score) {
    if (score >= 80) return 'High';
    if (score >= 50) return 'Medium';
    return 'Guarded';
}

function renderDossier({ date, clientName, job, mappedRequirements, rawFitScore, adjustedFitScore, gate, riskAudit }) {
    const applyUrl = cleanUrl(job.job_url);
    const roleTier = job.tier || 'A';
    const jobId = job.job_id || 'N/A';
    const workplace = job.workplace || 'Unknown';

    let md = '';
    md += '# A-Tier Fit Validation Dossier\n\n';
    md += `> **Prepared by** NorthStar Agency · **Date** ${date}\n`;
    md += `> **Client** ${clientName} · **Market** Portugal · **Case** ${clientName}\n\n`;
    md += '---\n\n';

    md += '## 1 · Role Snapshot\n\n';
    md += '| Field | Value |\n';
    md += '|:---|:---|\n';
    md += `| **Company** | ${job.company || 'Unknown'} |\n`;
    md += `| **Role Title** | ${job.job_title || 'Unknown'} |\n`;
    md += `| **Tier** | ${roleTier} |\n`;
    md += `| **Score** | ${job.score ?? 'N/A'} |\n`;
    md += `| **Job ID** | ${jobId} |\n`;
    md += `| **Work Model** | ${workplace} |\n`;
    md += `| **Apply Link** | [Apply ->](${applyUrl}) |\n\n`;
    md += `**What this means ->** The role was surfaced as ${roleTier}-tier with a requirement-level evidence pass. Final gate is based on verified capability confidence and explicit risk checks.\n\n`;

    md += '---\n\n';
    md += '## 2 · Why This Role Was Ranked A-Tier\n\n';
    md += '| Criterion | Evidence from Listing | Weight | Outcome |\n';
    md += '|:---|:---|---:|:---:|\n';
    md += `| Role-family anchor | ${job.keyword || 'IT Support family'} | 10 | ✅ |\n`;
    md += `| Core skills overlap | ${mappedRequirements.length} mapped requirements | 30 | ${mappedRequirements.length ? '✅' : '⚠️'} |\n`;
    md += `| Seniority fit | ${riskAudit.risks.some(r => r.area === 'Seniority') ? 'Potential mismatch detected' : 'No seniority conflict detected'} | 20 | ${riskAudit.risks.some(r => r.area === 'Seniority') ? '⚠️' : '✅'} |\n`;
    md += `| Language fit | ${riskAudit.risks.some(r => r.area === 'Language') ? 'Language risk present' : 'No hard language risk detected'} | 20 | ${riskAudit.risks.some(r => r.area === 'Language') ? '⚠️' : '✅'} |\n`;
    md += `| Practicality | ${job.easy_apply || 'Unknown'} Easy Apply, ${workplace} | 20 | ✅ |\n\n`;
    md += `**What this means ->** Raw fit score is ${rawFitScore}%. After risk penalties (${riskAudit.penalty} points), adjusted fit score is ${adjustedFitScore}% and gate decision is **${gate}**.\n\n`;

    md += '---\n\n';
    md += '## 3 · Requirement-to-Client Match Matrix\n\n';
    md += '| # | Employer Requirement | Listing Evidence | Client Evidence (Database/Test/CV) | Match | Action |\n';
    md += '|:---:|:---|:---|:---|:---:|:---|\n';

    if (mappedRequirements.length === 0) {
        md += '| 1 | No explicit requirement extracted | Listing text unavailable | No evidence available | ❌ | Hold until full description is collected |\n';
    } else {
        mappedRequirements.forEach((row, idx) => {
            const requirement = row.requirement.replace(/\|/g, '\\|');
            const listingEvidence = requirement;
            const clientEvidence = `${row.skill || 'N/A'} - ${toText(row.evidence).replace(/\|/g, '\\|')}`;
            md += `| ${idx + 1} | ${requirement} | ${listingEvidence} | ${clientEvidence} | ${row.match} | ${row.action} |\n`;
        });
    }

    md += '\n**Match legend:** `✅ Confirmed` = verified evidence, `⚠️ Probable` = likely fit but needs proof, `❌ Gap` = unproven or missing.\n\n';

    md += '---\n\n';
    md += '## 4 · Risk & Confidence Audit\n\n';
    md += '| Risk Area | Risk Description | Severity | Mitigation |\n';
    md += '|:---|:---|:---:|:---|\n';
    riskAudit.risks.forEach(risk => {
        md += `| ${risk.area} | ${risk.description} | ${risk.severity} | ${risk.mitigation} |\n`;
    });
    md += `\n**Overall confidence:** ${confidenceLabel(adjustedFitScore)}\n\n`;

    md += '---\n\n';
    md += '## 5 · Application Readiness Gate (Mandatory)\n\n';
    md += '| Gate | Status | Notes |\n';
    md += '|:---|:---:|:---|\n';
    md += `| Role Fit Gate | ${adjustedFitScore >= 50 ? '✅' : '❌'} | Adjusted fit score ${adjustedFitScore}% |\n`;
    md += `| Skills Proof Gate | ${mappedRequirements.some(r => r.confidence === 'confirmed') ? '✅' : '⚠️'} | Confirmed requirements: ${mappedRequirements.filter(r => r.confidence === 'confirmed').length} |\n`;
    md += `| Language Gate | ${riskAudit.risks.some(r => r.area === 'Language') ? '⚠️' : '✅'} | ${riskAudit.risks.some(r => r.area === 'Language') ? 'Potential language mismatch to verify' : 'No hard mismatch detected'} |\n`;
    md += '| Logistics Gate | ✅ | No blocking logistics signal from current data |\n';
    md += '| CV Alignment Gate | ⚠️ | Requires role-tailored CV bullets before submission |\n\n';
    md += `**Final decision:** ${gate}\n\n`;

    md += '---\n\n';
    md += '## 6 · Client Execution Support\n\n';
    md += '| Step | What NorthStar Provides | Client Action |\n';
    md += '|:---:|:---|:---|\n';
    md += '| 1 | Tailored CV bullets mapped to top requirements | Review and approve |\n';
    md += '| 2 | Role-specific application message | Submit with application |\n';
    md += '| 3 | 5-question interview prep pack | Practice and prepare examples |\n';
    md += '| 4 | Follow-up message sequence (48h, day 7-10, day 21) | Send based on tracker prompts |\n\n';
    md += '**What this means ->** This dossier is operational, not informational. Once approved, it becomes the execution packet for submission and follow-up management.\n\n';

    md += '---\n\n';
    md += '## 7 · Data Provenance\n\n';
    md += '| Source | Purpose |\n';
    md += '|:---|:---|\n';
    md += '| `reports/WINNER_REPORT_TODAY.json` | Tier and score baseline |\n';
    md += '| `reports/codex_map7_latest_cycle_unique_best.json` | Full listing description evidence |\n';
    md += '| `brain/CLIENT_BRIEF.md` | Client constraints and targets |\n';
    md += '| `brain/SKILLS_EVIDENCE_LEDGER.json` | Confidence-labeled capability evidence |\n';
    md += '| `brain/A_TIER_FIT_DOSSIER_TEMPLATE.md` | Canonical dossier template structure |\n\n';

    md += `<sub>Generated by NorthStar Agency · A-tier Fit Validation Protocol · ${date}</sub>\n`;
    return md;
}

async function loadJson(filePath, fallback) {
    if (!(await fs.pathExists(filePath))) return fallback;
    return fs.readJson(filePath);
}

async function main() {
    await fs.ensureDir(REPORTS_DIR);

    const [winner, uniqueJobs, briefContent, ledger, _template] = await Promise.all([
        loadJson(WINNER_PATH, null),
        loadJson(UNIQUE_PATH, []),
        fs.pathExists(BRIEF_PATH).then(exists => (exists ? fs.readFile(BRIEF_PATH, 'utf8') : '')),
        loadJson(LEDGER_PATH, { skills: [] }),
        fs.pathExists(TEMPLATE_PATH).then(exists => (exists ? fs.readFile(TEMPLATE_PATH, 'utf8') : ''))
    ]);

    if (!winner || !Array.isArray(winner.winners)) {
        throw new Error('Missing or invalid reports/WINNER_REPORT_TODAY.json');
    }

    const indexedSkills = buildSkillIndex(ledger);
    const uniqueById = new Map((uniqueJobs || []).map(job => [toText(job.job_id), job]));
    const aTierJobs = winner.winners.filter(job => ['A', 'S'].includes(toText(job.tier).toUpperCase()));

    if (aTierJobs.length === 0) {
        console.log('No A/S tier winners found. No dossier generated.');
        return;
    }

    const clientName = parseClientName(briefContent);
    const date = winner.date || new Date().toISOString().split('T')[0];

    const outputs = [];

    for (const job of aTierJobs) {
        const fullRecord = uniqueById.get(toText(job.job_id)) || {};
        const mergedJob = { ...fullRecord, ...job };
        const winnerDescription = toText(job.description);
        const fullDescription = toText(fullRecord.description);
        const description = fullDescription.length > winnerDescription.length
            ? fullDescription
            : toText(mergedJob.description || mergedJob.reason || '');

        const requirements = extractRequirements(description, indexedSkills);
        const mappedRequirements = requirements.map(req => mapRequirementToEvidence(req, indexedSkills));

        const totalRequirements = mappedRequirements.length || 1;
        const numerator = mappedRequirements.reduce((sum, req) => sum + (CONFIDENCE_POINTS[req.confidence] || 0), 0);
        const rawFitScore = Math.round((numerator / (totalRequirements * 3)) * 100);

        const riskAudit = computeRiskPenalty(mergedJob, description, mappedRequirements);
        const adjustedFitScore = Math.max(0, rawFitScore - riskAudit.penalty);
        const gate = gateFromScore(adjustedFitScore);

        const dossier = renderDossier({
            date,
            clientName,
            job: mergedJob,
            mappedRequirements,
            rawFitScore,
            adjustedFitScore,
            gate,
            riskAudit
        });

        const filename = `A_TIER_FIT_DOSSIER_${safeFilePart(mergedJob.company)}_${date}.md`;
        const outPath = path.join(REPORTS_DIR, filename);
        await fs.writeFile(outPath, dossier, 'utf8');
        outputs.push(path.relative(ROOT, outPath));
    }

    console.log(`Generated ${outputs.length} dossier file(s):`);
    outputs.forEach(file => console.log(`- ${file}`));
}

if (require.main === module) {
    main().catch(err => {
        console.error(err.message);
        process.exit(1);
    });
}

module.exports = { main };
