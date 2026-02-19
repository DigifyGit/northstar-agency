const knowledgeBase = require('../brain/knowledge_base.json');

function toLower(value) {
    return (value || '').toString().toLowerCase();
}

function unique(values) {
    return [...new Set((values || []).filter(Boolean))];
}

function extractTerms(weightedList) {
    return unique((weightedList || []).map(item => toLower(item.term || item)));
}

function getTierMin(tier, fallback) {
    const min = knowledgeBase?.tiers?.[tier]?.min_score;
    return Number.isFinite(min) ? min : fallback;
}

function isOptionalLanguageMention(text, lang, plusMarkers) {
    const escapedLang = lang.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return plusMarkers.some(marker => {
        const escapedMarker = marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const nearLang = new RegExp(`${escapedLang}.{0,40}${escapedMarker}|${escapedMarker}.{0,40}${escapedLang}`, 'i');
        return nearLang.test(text);
    });
}

/**
 * Scores a job using runtime rules from brain/knowledge_base.json.
 * @param {Object} job - Job payload from scraper.
 * @param {Object} userContext - Parsed CLIENT_BRIEF context (optional).
 * @returns {{score:number,tier:string,reason_short:string}}
 */
function scoreJob(job, userContext = {}) {
    let score = 0;
    const reasons = [];

    const title = toLower(job.title);
    const description = toLower(job.description);
    const location = toLower(job.location_text || job.workplace_type);
    const text = `${title}\n${description}`;

    const runtime = knowledgeBase.runtime_scoring || {};
    const highWeight = Number(runtime?.skill_weights?.high_hit ?? 3);
    const medWeight = Number(runtime?.skill_weights?.medium_hit ?? 1);
    const roleAnchorBonus = Number(runtime?.role_anchor_bonus ?? 10);

    const dropKeywords = unique([
        ...(runtime.drop_keywords || []),
        ...(knowledgeBase?.hard_disqualifiers?.role_terms || []),
        ...(knowledgeBase?.hard_disqualifiers?.seniority_terms || [])
    ].map(toLower));

    for (const kw of dropKeywords) {
        if (!kw) continue;
        if (title.includes(kw)) {
            return { score: -20, tier: 'D', reason_short: `Risk: ${kw} role` };
        }
    }

    const codeToLanguage = {
        de: 'german',
        fr: 'french',
        nl: 'dutch',
        it: 'italian',
        es: 'spanish'
    };
    const disallowedFromKb = (knowledgeBase?.hard_disqualifiers?.language_required_not_in || [])
        .map(toLower)
        .map(term => codeToLanguage[term] || term)
        .filter(term => term.length > 2);
    const forbiddenLangs = unique([
        ...(runtime.forbidden_language_terms || []),
        ...disallowedFromKb
    ].map(toLower));
    const langPlusMarkers = unique((runtime.language_plus_markers || ['plus', 'nice to have']).map(toLower));

    for (const lang of forbiddenLangs) {
        if (!lang) continue;
        if (description.includes(lang) && !isOptionalLanguageMention(description, lang, langPlusMarkers)) {
            return { score: -10, tier: 'D', reason_short: `Penalty: ${lang} mention` };
        }
    }

    for (const item of runtime.heavy_penalty_title_terms || []) {
        const term = toLower(item.term);
        const penalty = Number(item.penalty ?? 10);
        if (term && title.includes(term)) {
            score -= penalty;
            reasons.push(`-${penalty} Broad/Dev Title (${term})`);
        }
    }

    const roleAnchors = extractTerms(knowledgeBase?.skills_weighted?.role_family_anchors);
    const contextRoles = (userContext?.profile?.roles || []).map(toLower);
    const roleTerms = unique([...roleAnchors, ...contextRoles]);
    let isCoreRole = false;
    for (const term of roleTerms) {
        if (!term) continue;
        if (title.includes(term)) {
            score += roleAnchorBonus;
            isCoreRole = true;
            reasons.push(`+${roleAnchorBonus} Core Role (${term})`);
            break;
        }
    }

    const kbHigh = extractTerms(knowledgeBase?.skills_weighted?.high_value);
    const kbMedium = extractTerms(knowledgeBase?.skills_weighted?.medium_value);
    const ctxHigh = (userContext?.skills?.high || []).map(toLower);
    const ctxMedium = (userContext?.skills?.medium || []).map(toLower);
    const highSkills = unique([...kbHigh, ...ctxHigh]);
    const mediumSkills = unique([...kbMedium, ...ctxMedium]);

    for (const skill of highSkills) {
        if (!skill) continue;
        if (text.includes(skill)) {
            score += highWeight;
            reasons.push(`+${highWeight} Skill (${skill})`);
        }
    }

    for (const skill of mediumSkills) {
        if (!skill) continue;
        if (text.includes(skill)) {
            score += medWeight;
            reasons.push(`+${medWeight} Skill (${skill})`);
        }
    }

    for (const item of runtime.tech_heavy_terms || []) {
        const term = toLower(item.term);
        const penalty = Number(item.penalty ?? 5);
        if (term && description.includes(term)) {
            score -= penalty;
            reasons.push(`-${penalty} Tech Heavy (${term})`);
        }
    }

    const expConfig = runtime.experience || {};
    const dropMinYears = Number(expConfig.drop_min_years ?? 5);
    const midMinYears = Number(expConfig.mid_penalty_min_years ?? 3);
    const midPenalty = Number(expConfig.mid_penalty ?? 5);
    const entryBonus = Number(expConfig.entry_bonus ?? 5);
    const expMatch = description.match(
        /(\d+)\s*(?:\+|-\s*\d+)?\s*(?:years?|anos?|de experiência|d['']expérience)/i
    );
    if (expMatch) {
        const years = parseInt(expMatch[1], 10);
        if (years >= dropMinYears) {
            return { score: -20, tier: 'D', reason_short: `DROP: ${dropMinYears}+ years exp` };
        }
        if (years >= midMinYears) {
            score -= midPenalty;
            reasons.push(`-${midPenalty} Mid-Senior Exp (${midMinYears}+ yrs)`);
        } else {
            score += entryBonus;
            reasons.push(`+${entryBonus} Entry Level (0-${Math.max(0, midMinYears - 1)} yrs)`);
        }
    }

    const practical = runtime.practicality || {};
    const easyApplyBonus = Number(practical.easy_apply_bonus ?? 2);
    const remoteBonus = Number(practical.remote_bonus ?? 5);
    const hybridBonus = Number(practical.hybrid_bonus ?? 2);

    if (job.easy_apply_flag) {
        score += easyApplyBonus;
        reasons.push(`+${easyApplyBonus} Easy Apply`);
    }

    if (location.includes('remote')) {
        score += remoteBonus;
        reasons.push(`+${remoteBonus} Remote`);
    } else if (location.includes('hybrid')) {
        score += hybridBonus;
        reasons.push(`+${hybridBonus} Hybrid`);
    }

    const requireCoreRoleForS = Boolean(runtime?.tier_rules?.require_core_role_for_s);
    const sMin = getTierMin('S', 20);
    const aMin = getTierMin('A', 15);
    const bMin = getTierMin('B', 5);
    const cMin = getTierMin('C', 0);

    let tier = 'D';
    if (score >= sMin && (!requireCoreRoleForS || isCoreRole)) tier = 'S';
    else if (score >= aMin) tier = 'A';
    else if (score >= bMin) tier = 'B';
    else if (score >= cMin) tier = 'C';

    return {
        score,
        tier,
        reason_short: unique(reasons).join(', ') || 'Standard Match'
    };
}

module.exports = { scoreJob };
