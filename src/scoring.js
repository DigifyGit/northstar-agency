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

    // --- ADVANCED PORTUGUESE HARD-BLOCK SENSORS ("Give the scraper eyes") ---
    // 1. Proximity regex for Portuguese requirements
    const ptRegex = /(?:portugu[eê]s|portuguese)[^.]{0,40}(?:c[12]|fluente|native|nativo|obrigat[oó]rio|mandat[oó]rio|required|mandatory|essential|m[ií]nimo|falado e escrito)|(?:c[12]|fluente|native|nativo|obrigat[oó]rio|mandat[oó]rio|required|mandatory|essential|m[ií]nimo)[^.]{0,40}(?:portugu[eê]s|portuguese)/i;

    if (ptRegex.test(description)) {
        if (!isOptionalLanguageMention(description, "portuguese", langPlusMarkers) &&
            !isOptionalLanguageMention(description, "português", langPlusMarkers)) {
            return { score: -50, tier: 'D', reason_short: `HARD BLOCK: Strict PT requirement detected` };
        }
    }

    // 2. Language Density Heuristic (Is the JD written in Portuguese?)
    const ptDensityWords = ['experiência', 'conhecimentos', 'requisitos', 'gestão', 'resolução', 'funções', 'equipas', 'projetos', 'desenvolvimento', 'cliente', 'suporte técnico'];
    let ptWordCount = 0;
    for (const word of ptDensityWords) {
        // Use word boundaries to count occurrences
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        const matches = description.match(regex);
        if (matches) ptWordCount += matches.length;
    }

    if (ptWordCount >= 6) {
        return { score: -50, tier: 'D', reason_short: `HARD BLOCK: JD written in Portuguese (${ptWordCount} pt-words)` };
    }
    // -----------------------------------------------------------------------

    // --- AGGREGATOR / GHOST LISTING SENSORS ---
    if (knowledgeBase.runtime_scoring && knowledgeBase.runtime_scoring.aggregator_rules) {
        const ar = knowledgeBase.runtime_scoring.aggregator_rules;
        for (const phrase of ar.aggregator_phrases) {
            if (description.includes(phrase)) {
                score -= ar.ghost_penalty;
                reasons.push(`Ghost Listing Penalty (-${ar.ghost_penalty} pt): '${phrase}' detected`);
            }
        }
    }
    // ------------------------------------------

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

    // Normalize to 1-10 scale for client reporting
    // Max typical score is ~30. Below 0 is bad.
    let score1To10 = 1;
    if (score >= 25) score1To10 = 10;
    else if (score >= 20) score1To10 = 9;
    else if (score >= 15) score1To10 = 8;
    else if (score >= 10) score1To10 = 7;
    else if (score >= 7) score1To10 = 6;
    else if (score >= 4) score1To10 = 5;
    else if (score >= 1) score1To10 = 4;
    else if (score >= -5) score1To10 = 3;
    else if (score > -20) score1To10 = 2;
    else score1To10 = 1;

    return {
        score: score1To10,
        tier,
        reason_short: unique(reasons).join(', ') || 'Standard Match'
    };
}

module.exports = { scoreJob };
