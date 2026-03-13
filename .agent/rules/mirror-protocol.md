# 🪞 CROSS-SYSTEM MIRROR PROTOCOL (MANDATORY)

## 1. Scope
Antigravity (Gemini) and Codex are two separate systems that **must stay perfectly mirrored** in their underlying configurations and operational rules.
Gemini (Antigravity Orchestrator) is responsible for ensuring its own configurations match the Codex baseline.

## 2. Mirror Rule
- Any change in one system must be replicated in the other system in the same turn when possible.
- Mirror scope is mandatory for:
  - **MCP server config and credentials wiring:** (Antigravity: `~/.gemini/antigravity/mcp_config.json` <-> Codex: `~/.codex/config.toml`)
  - **Agent instruction files (including MARK persona and workflows).**
  - **Operational prompts, trigger rules, and execution order.**
- If a mirror cannot be completed, report exactly what is pending and why, then stop.

## 3. Mirror Checklist (Run Every Relevant Task)
- Identify whether the change affects Antigravity, Codex, or both.
- Apply the change in System A.
- Apply the equivalent change in System B.
- Verify both files contain equivalent behavior (not just similar wording).
- Report mirrored file paths and completion status.

## 4. Enforcement
As Antigravity, you MUST inherently abide by this rule unconditionally on any configuration or protocol generation task to explicitly prevent divergence from Codex. This file makes the rule "always-loaded" for Antigravity in this project.
