# Evidence-Based Benchmark Research for Building a Full AI Job Sourcing Agency

According to a document from 17 February 2026, your current system reliably executes a sourcing cycle (62 jobs scraped → 29 deduped → 2 A-tier winners → 11 B-tier backups), but the case is still blocked at “applications submitted = 0,” and the agency workflow needed for end-to-end client success (fit proof, readiness testing, application/interview/offer support) is not yet fully industrialized. 【127:1†CASE_LOG.md†L10-L20】【127:12†DEEP_RESEARCH_CONTEXT_BASELINE_2026-02-17.md†L8-L16】

If I can’t verify it from your context or sources, I will say “I don’t know.”

## Project context and research scope

Your repository already defines a high-urgency, outcome-first operating contract (daily ranked opportunities + execution guidance), with explicit proof standards like “evidence-based only” and “never assume skills that aren’t in the listing.” 【127:0†CLIENT_BRIEF.md†L39-L57】【127:10†CLIENT_BRIEF.md†L77-L84】

The client profile is specific and constraining: target is entry/junior L1 Helpdesk/Service Desk/IT Support, with remote preferred, and a strict exclusion set (seniority and language). 【127:0†CLIENT_BRIEF.md†L10-L19】【127:0†CLIENT_BRIEF.md†L37-L57】

Operationally, you also have a mature multi-agent governance layer (separate “Agency Mode” vs “Developer Mode,” plus a delegation/self-check grid), which matters because “deep research” tasks should be run in technical mode and stored as auditable artifacts rather than client-facing prose. 【131:0†ENFORCEMENT.md†L9-L26】【131:7†AGENTS.md†L9-L26】

Your internal baseline correctly identifies the core weakness you’re trying to solve with this research: the system can find and score jobs, but it must now replicate how real agencies prove fit and manage the client lifecycle (readiness, applications, follow-ups, interviews, offers). 【127:12†DEEP_RESEARCH_CONTEXT_BASELINE_2026-02-17.md†L36-L45】【38:5†A_TIER_FIT_DOSSIER_TEMPLATE.md†L11-L14】

This research therefore needs to answer, with evidence, these questions:

- How do top-tier providers structure the full lifecycle (intake → matching → validation → execution → conversion support)?
- What deliverables/templates are used at each stage (not theories—real, published artifacts)?
- What governance and ethics standards exist for recruitment agencies and AI-enabled recruiting?
- What should your “agency benchmark database” look like so it can be reused and expanded without hallucination?

## How leading staffing and recruiting providers operate

“Top-tier agencies” is not one single operating model. In practice, the industry splits into distinct provider types, each with different incentives, deliverables, and compliance constraints.

### Global staffing and recruitment firms

Large staffing firms publish market share rankings (typically via industry research) and operate at scale across temporary staffing and permanent placement. citeturn0search12turn0search28  
Examples of consistently top-ranked global staffing firms include entity["company","Randstad","global staffing firm"], entity["company","Adecco Group","global staffing firm"], entity["company","ManpowerGroup","global workforce solutions"], entity["company","Allegis Group","global staffing firm"], and entity["company","Recruit Holdings","japan hr services"]. citeturn0search28turn0search12  
A key operational characteristic: their “client” is usually the employer (who pays), while candidates are sourced, screened, and submitted into employer-controlled hiring funnels.

What this implies for Northstar: if you want to replicate “agency-grade operations,” you need to borrow their rigor (screening, documentation, compliance) but adapt the lifecycle for a job-seeker-first service model.

### Recruitment Process Outsourcing providers

RPO providers run (or partially run) an employer’s recruiting function; performance is measured through enterprise recruitment outcomes rather than “job discovery.” citeturn2view0  
A practical, evidence-based source for identifying prominent RPO providers is the entity["organization","HRO Today","hr media and research"] “Baker’s Dozen” customer satisfaction rankings, which publishes methodology and ranked lists. citeturn2view0  
For 2025 Enterprise RPO, the “Overall Enterprise RPO Leaders” list includes entity["company","Cielo","rpo provider"], entity["company","Korn Ferry","talent advisory and rpo"], entity["company","PeopleScout","rpo provider"], and others. citeturn2view0

What this implies for Northstar: RPO-grade rigor looks like SLAs, auditable workflows, and measurement systems—exactly what your transformation plan already targets (pipeline KPIs → execution KPIs → conversion KPIs). 【38:7†FULL_AGENCY_TRANSFORMATION_PLAN.md†L5-L11】

### Outplacement and career transition providers

Outplacement is employer-sponsored support for employees leaving an organization; it’s relevant to your build because outplacement providers have mature “job seeker enablement” operations: coaching, resume/branding, job lead curation, interview prep, and transition planning. citeturn4search11turn2view2  
For example, entity["organization","Randstad RiseSmart","outplacement brand"] describes outplacement as including one-to-one coaching, resume writing, and “handpicked job leads,” plus coaching “at the heart” and a “job concierge” model for curated leads and networking support. citeturn2view2turn1search2  
Other major outplacement providers include entity["organization","LHH","outplacement and recruitment"] and entity["organization","Right Management","outplacement brand"], whose published materials emphasize coaching, assessments, upskilling, and job search resources. citeturn5search0turn5search4turn5search7

What this implies for Northstar: outplacement is one of the closest “real-world analogs” to your target service promise (“support the client from beginning to end”), because it operationalizes job-search execution support rather than only sourcing.

### Reverse recruiting and job-search concierge services

Reverse recruiting is a newer, candidate-paid service category that explicitly handles job search tasks on behalf of the job seeker; it is operationally similar to what you describe (apply workflows, outreach, tracking), but it also raises serious ethics and transparency risks (e.g., impersonation, over-automation). citeturn5news39turn5search12  
Mainstream reporting describes services that submit large numbers of applications and conduct outreach, sometimes using AI to generate messages “posing as the candidate,” and charging job seekers monthly fees plus a percentage of salary on hire. citeturn5news39turn5search12

What this implies for Northstar: reverse recruiting provides a “feature checklist” of what job seekers want, but you should treat it as a cautionary benchmark: build the capabilities without copying ethically questionable mechanics.

## Evidence-based fit validation and readiness testing practices

Your core complaint is not “scraping quality.” It is “confidence and proof.”

In real recruiting operations, especially high-volume or high-risk hiring, “fit” is usually operationalized through structured evaluations and documented evidence—because undocumented intuition does not scale and is hard to defend.

### Structured interviews and scorecards as the industry baseline for “proof”

Published recruiting operations guidance emphasizes structured interviews and scorecards as mechanisms to systematically collect evidence, reduce ad hoc decision-making, and improve comparability across candidates.

- entity["company","Greenhouse Software","ats provider"] describes interview templates as linking questions to competencies and requiring interviewers to document evidence in a scorecard—turning interviews into a repeatable, structured process rather than ad hoc conversation. citeturn1search0  
- entity["company","Workable","recruiting software"] describes interview kits/scorecards as asking all candidates the same questions in the same order and evaluating responses via a consistent rating scale. citeturn1search1  
- Independent evidence in industrial/organizational psychology literature consistently finds structured interviews to be more reliable and valid than unstructured interviews for predicting job performance. citeturn7search21turn7search24  
- Even updated practitioner-facing synthesis suggests structured interviews may be among the strongest predictors of job performance, reinforcing that “structure + documented evidence” is not optional if you want agency-grade rigor. citeturn7search0

Translating this into Northstar terms: your A-tier Fit Validation Dossier is essentially a “candidate scorecard” turned inside-out (job requirements scored against client evidence), which aligns strongly with how structured hiring systems work in the real world. 【38:5†A_TIER_FIT_DOSSIER_TEMPLATE.md†L11-L14】【38:5†A_TIER_FIT_DOSSIER_TEMPLATE.md†L30-L40】

### Readiness testing for L1 IT roles

Your system already has a skill signal model (high/medium/negative) tied to L1 tasks such as password resets, Active Directory basics, MFA resets, VPN troubleshooting, and Microsoft 365 admin. 【127:0†CLIENT_BRIEF.md†L61-L78】【127:0†CLIENT_BRIEF.md†L79-L87】

A real-agency equivalent of “readiness proof” would combine:

- a structured “requirements-to-evidence” matrix (you already templated this) 【38:5†A_TIER_FIT_DOSSIER_TEMPLATE.md†L11-L14】
- brief, role-relevant work samples (ticket triage simulation, troubleshooting write-up, account reset steps)
- structured communication assessment (customer empathy + clarity)
- language readiness confirmation (especially relevant because Portugal-based roles often require Portuguese beyond “bonus”) 【127:0†CLIENT_BRIEF.md†L18-L19】

Where Northstar is not yet complete (by your own baseline) is the skills evidence store that turns these assessments into auditable artifacts. Your transformation plan explicitly lists a “Skills evidence ledger + confidence score” as a missing but necessary phase. 【38:4†FULL_AGENCY_TRANSFORMATION_PLAN.md†L35-L43】【38:4†FULL_AGENCY_TRANSFORMATION_PLAN.md†L53-L57】

## Public template library from top-tier providers

You asked specifically for “templates” and “real evidence,” not generic advice. The good news is that many major recruiting and talent providers publish exactly the kind of artifacts your agency needs to replicate.

### Candidate-facing templates from global recruiting brands

- entity["company","Robert Half","recruitment company"] publishes free CV/resume templates (including IT resume templates in some regions) intended to match what their recruiters prefer to see. citeturn3search0turn3search4  
- entity["company","Hays","recruitment company"] publishes an interview follow-up email guide with a template/example, operationalizing post-interview follow-up as a concrete deliverable rather than a vague suggestion. citeturn3search1  
- Adecco publishes structured interview preparation guidance (research company, research role, prepare for industry evaluation) and CV optimization guidance emphasizing job-description keywords and ATS screening realities. citeturn3search2turn3search10  
- Manpower publishes job seeker interview preparation checklists (company research, logistics planning, preparing answers), reflecting the standardized “interview enablement” component common to large providers. citeturn3search3turn3search15  

This matters because your client critique was: “I received a link and nothing else.” These public templates demonstrate what job seekers expect from a professional intermediary: documents, scripts, and stepwise execution guidance.

### Evaluation templates from structured hiring systems

Even though your service is job-seeker-focused, the internal mechanics of “proof” are best copied from structured hiring:

- Greenhouse provides guidance and even example scorecard templates for evaluating candidates consistently. citeturn1search4turn1search0  
- Workable’s interview kit/scorecard system explains the operational rules of structure (same questions, consistent scale, centralized evaluation). citeturn1search1turn1search13  

Northstar adaptation: your “Fit Validation Dossier” becomes the client-facing equivalent of a hiring-team scorecard: it captures requirements, evidence, risk flags, and a GO/CONDITIONAL GO/HOLD gate. 【38:5†A_TIER_FIT_DOSSIER_TEMPLATE.md†L30-L40】

## Building an agency intelligence database and evidence log

You asked for a “database” that can be used to replicate top agencies. The core of this is not a list of logos; it is a reusable, auditable knowledge base that answers: “What do they do? What artifacts prove it? What can we copy legally and ethically?”

### Recommended database structure

Create a single canonical dataset (JSON, YAML, or CSV) where each record is an “Agency/Provider Evidence Card” with these minimum fields:

- Provider identity: name, category (staffing / RPO / outplacement / reverse recruiting), geographies served
- Documented service model: phases and deliverables
- Published templates: resume templates, email scripts, interview prep guides, scorecards, playbooks
- KPIs / outcome claims: only if explicitly stated
- Ethics/standards adherence: code of conduct, AI governance principles, data/privacy commitments
- Source provenance: URL, access date, excerpt (≤25 words), and a “claim-to-source” mapping

This aligns with your internal “evidence-based only” rule and avoids hallucination by forcing each extracted artifact to be attached to a real source. 【127:10†CLIENT_BRIEF.md†L81-L84】

### Seed list for your database

Below is a “starter seed” of provider targets (not exhaustive) with high-quality evidence anchors that you can immediately log:

- Global staffing benchmarking anchor: entity["organization","Staffing Industry Analysts","staffing market research"] reporting and republished summaries identifying the world’s largest staffing firms (e.g., Randstad, Adecco, ManpowerGroup). citeturn0search12turn0search28  
- RPO benchmarking anchor: HRO Today’s 2025 RPO Baker’s Dozen methodology + ranked lists (includes Cielo, Korn Ferry, PeopleScout, etc.). citeturn2view0  
- Outplacement operations anchors: Randstad RiseSmart outplacement services (coaching, resume writing, job concierge/handpicked leads), plus LHH and Right Management outplacement offerings and guides. citeturn2view2turn5search0turn5search7  
- Candidate template anchors: Robert Half resume/CV templates; Hays follow-up email template; Adecco CV and interview preparation guidance. citeturn3search0turn3search1turn3search10  
- Structured evaluation anchor: Greenhouse and Workable documentation on scorecards/interview kits. citeturn1search1turn1search0  

### Research agent instructions to grow the database

Your current deep research master prompt pack is a strong foundation (Prompt A/B/C). 【38:0†DEEP_RESEARCH_MASTER_PROMPT.md†L8-L15】【38:1†DEEP_RESEARCH_MASTER_PROMPT.md†L10-L33】

To make it “benchmark-and-template capable,” add a new required module to your agent instructions:

- **Benchmark Harvest Module**: identify top providers per category (staffing, RPO, outplacement, reverse recruiting), pull their published deliverables/templates, and summarize “what they operationalize” in a format that can be stored as database records with citations.
- **Template Extraction Module**: for each template source, extract the structure (sections, fields, workflow placement) rather than copying full content. This preserves copyright compliance while still giving you replicable structure.
- **Proof Standard Module**: every extracted claim (e.g., “coaching,” “job concierge,” “structured interview kits”) must be linked to a source snippet—not inferred.

This mirrors your internal requirement that agents must detect whether they should be in Agency Mode or Developer Mode and default to technical mode for architecture/research work. 【131:0†ENFORCEMENT.md†L11-L18】

## Integration roadmap for your repository

Your repo already has the right “skeleton” for an agency: charter, client brief, case log, style guide, technical spec, and enforcement system. 【127:4†AGENCY.md†L20-L29】【127:1†CASE_LOG.md†L10-L19】【127:5†SCRAPER_SPEC.md†L18-L28】

What you need next is to attach the benchmark research into that skeleton in a way agents can execute repeatedly.

### Repository additions

Add three new, canonical layers:

- **Benchmark database layer**: `research/agency_benchmarks/agency_benchmark_db.json` (or CSV) + `research/agency_benchmarks/sources/` (raw excerpts, metadata).
- **Template library layer**: `templates/external/` (structures distilled from Robert Half/Hays/Adecco/Greenhouse/Workable sources) + `templates/internal/` (your adapted versions).
- **Readiness proof layer**: `brain/SKILLS_EVIDENCE_LEDGER.json` (as already specified in your transformation plan) plus attachments that store completed micro-assessments. 【38:4†FULL_AGENCY_TRANSFORMATION_PLAN.md†L51-L57】

### Workflow enforcement upgrades

Your internal operating contract already states that every client interaction must include an A-tier fit-proof statement and follow-up options (fit dossier, CV tailoring, interview prep). That directly resolves the specific failure mode you described (“only a link”). 【127:4†AGENCY.md†L44-L52】

Operationalize it by making this rule non-optional:

- If an A-tier job is surfaced, it must be accompanied by a Fit Validation Dossier (or at minimum a “mini dossier”) and a readiness gate result. 【38:5†A_TIER_FIT_DOSSIER_TEMPLATE.md†L30-L40】【127:14†STYLE_GUIDE.md†L1-L12】

### KPI alignment with industry benchmarks

Your transformation plan’s KPI expansion (pipeline → fit quality → execution → conversion → client experience) matches how RPO and staffing providers measure performance, even though your “client” is the job seeker rather than the employer. 【38:7†FULL_AGENCY_TRANSFORMATION_PLAN.md†L5-L11】

A minimal “agency-grade” reporting cadence that aligns with real providers:

- daily: execution metrics (applications submitted, follow-ups due)
- weekly: conversion metrics (reply rate, interviews)
- monthly: quality metrics (A-tier false positives, readiness gate pass rate)

This also resolves your internal gap detection that “applications counter is 0” and there is no end-to-end execution loop. 【127:1†CASE_LOG.md†L18-L20】【131:8†ENFORCEMENT.md†L75-L79】

## Risks, compliance, and operational integrity

A “real agency replication” requires ethics and compliance, not just output polish.

### Platform constraints and automation risk

entity["company","LinkedIn","professional network platform"] explicitly warns that using prohibited tools can violate its User Agreement and risks account restriction or shutdown. citeturn1search3  
LinkedIn also publishes crawling terms that restrict automated crawling/indexing use cases and impose conditions on how collected data can be used. citeturn1search19

Implication: your deep research build should include a compliance-reviewed sourcing strategy (e.g., prioritize approved APIs/feeds, direct company career pages, job boards with permissive terms) instead of relying exclusively on automation that may create account-risk.

### Ethical AI expectations in recruitment

The entity["organization","World Employment Confederation","employment industry trade body"] states that its members follow a Code of Conduct and also references a dedicated code of ethical principles for AI use in the recruitment and employment industry. citeturn0search11turn0search2  
WEC also emphasizes that AI governance should be clear, transparent, accountable, and privacy-aware. citeturn4search5

Implication: Northstar’s “fit scoring” and “readiness gates” should always be explainable, evidence-based, and auditable (which is consistent with your dossier protocol), and must avoid deceptive automation.

### Candidate-paid placement services in Portugal

For entity["country","Portugal","eu member state"] specifically, the consolidated legal regime governing private placement agencies (Decreto‑Lei 260/2009, per Diário da República) explicitly describes “the principle of gratuity” of services provided by private placement agencies to the job candidate and indicates agencies should not charge job candidates for services rendered, referencing protection of job candidates and alignment with international frameworks. citeturn8search2

I don’t know exactly how this applies to your intended business model (e.g., “career coaching,” “training,” “CV writing,” and “job search concierge” services may be regulated differently from “job placement agency” services).  
UNCERTAIN fastest manual verification step: read the relevant provisions of Decreto‑Lei 260/2009 in full on Diário da República and confirm interpretation with entity["organization","Instituto do Emprego e Formação Profissional","public employment service portugal"] (IEFP) or a Portuguese labor-law professional before charging job seekers for placement-like services. citeturn8search7turn8search2turn8search8

This is important because “replicating an agency” is not only operational—it’s also regulatory.

### Avoiding the “reverse recruiting ethics trap”

Mainstream reporting on reverse recruiting includes examples of outreach “posing as the candidate,” high-volume application submission, and opaque automation. citeturn5news39turn5search12  
Even if some clients report results, this pattern introduces reputational and ethical risk (and may backfire if employers detect non-authentic outreach). citeturn5news39turn5search16

Implication: Northstar should prefer “client-in-the-loop” execution—templates, prep packs, and structured validation—over impersonation or undisclosed automation.

