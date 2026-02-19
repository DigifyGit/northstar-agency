# Client Output Format Reference - NorthStar Agency

Authority: Mandatory reference for all client-facing communication.

## Purpose

This file gives a single reference point for formatting expectations when agents prepare reports, briefs, dossiers, and execution packs for the client.

## Canonical Sources

- `brain/STYLE_GUIDE.md` (project-specific standard and final authority)
- `brain/claude_luxury_format_universal.md` (universal luxury formatting baseline)
- `brain/ENFORCEMENT.md` (mode + prompt block enforcement)

## Precedence Rule

1. `STYLE_GUIDE.md` wins if any rule conflict exists.
2. `claude_luxury_format_universal.md` defines visual quality baseline.
3. `ENFORCEMENT.md` defines when and how rules are applied in Agency Mode.

## Non-Negotiable Client-Facing Requirements

- Premium markdown structure with clear hierarchy.
- Numbered H2 sections and `---` separators.
- Header metadata block and closing footer.
- Short markdown links (no long raw URLs in visible content).
- Interpretation paragraphs after data sections.
- Requirement-to-evidence logic for A-tier recommendations.
- Quality Gate completion before delivery.

## Enforcement Trigger

Use Agency Mode blocks from `brain/ENFORCEMENT.md` and require pre-read of:

- `brain/STYLE_GUIDE.md`
- `brain/claude_luxury_format_universal.md`

If the task is client-facing and either file is not applied, output is considered non-compliant.
