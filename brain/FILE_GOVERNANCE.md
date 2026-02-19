# 🔒 File Governance — Version Control & Overwrite Prevention

> **Authority level:** MANDATORY — All agents MUST comply. No exceptions.
> **Created by:** Opus (Project Manager) after overwrite incident on 2026-02-18
> **Purpose:** Prevent destructive file operations across all NorthStar agents

---

## 1 · The Rule (Non-Negotiable)

```
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║   NO AGENT MAY OVERWRITE, REPLACE, OR REWRITE AN EXISTING     ║
║   FILE'S CONTENT IN-PLACE.                                     ║
║                                                                ║
║   EVER.                                                        ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
```

---

## 2 · What You CAN Do

| Action | How | Example |
|:---|:---|:---|
| **Add lines** to an existing file | Insert/append — do not delete existing content | Add a new section to `CLIENT_BRIEF.md` |
| **Edit specific fields** in an existing file | Targeted replacement of specific values only | Change `"confidence": "unknown"` → `"confidence": "gap"` in JSON |
| **Create a new version** of a file | Write to a new filename with version suffix | `Client_Profile_v2_2026-02-18.md` |
| **Create a brand new file** | Write to a path that doesn't exist yet | `docs/imports/New_Analysis.md` |

---

## 3 · What You CANNOT Do

| Prohibited Action | Why |
|:---|:---|
| ❌ `cat > existing_file.md <<'EOF' ... EOF` (full overwrite) | Destroys previous content with no recovery |
| ❌ Overwrite tool with `Overwrite: true` on files you didn't just create | Same — destroys previous version |
| ❌ Delete a file and recreate it | Same effect as overwrite |
| ❌ Rewrite an entire file "to improve formatting" | If you want a better version, make a NEW file |

---

## 4 · Versioning Protocol

When you need to create an updated version of an existing file:

```
STEP 1:  Keep the original file UNTOUCHED
STEP 2:  Create the new version with a versioned filename:
           {filename}_v{N}_{YYYY-MM-DD}.{ext}
         Example:
           Client_Profile_SingleSourceOfTruth_v2_2026-02-18.md
STEP 3:  Add a note to the original file's edit history (if it has one)
         pointing to the new version
STEP 4:  Report to Maestro which version is active
```

---

## 5 · The Only Exception

The **only** case where overwriting is acceptable:

- You are writing to a file **you created in this same session** (within the last 5 minutes)
- AND you are fixing a mistake in your own output
- AND the file has not been reviewed by Maestro yet

If Maestro has seen it, reviewed it, or referenced it: **it is locked. Make a new version.**

---

## 6 · What Happens If You Break This Rule

1. Maestro will catch it
2. The original content may be unrecoverable
3. You will be told about it in very clear terms
4. Trust in the agent is damaged

This rule exists because on 2026-02-18, an agent overwrote `Client_Profile_SingleSourceOfTruth.md` with a completely different format, destroying the original document. The content was recovered, but the incident should never have happened.

---

## 7 · Agent Self-Check (Add to Pre-Action Checklist)

Before any file write operation, every agent must confirm:

```
□ Am I writing to a NEW file path?
  → YES → Proceed
  → NO  → Continue ↓

□ Am I making a TARGETED EDIT (changing specific lines/values)?
  → YES → Proceed with minimal edit only
  → NO  → Continue ↓

□ Am I about to REWRITE or REPLACE the entire file content?
  → YES → STOP. Create a new versioned file instead.
  → NEVER proceed with full-file overwrite.
```

---

<sub>NorthStar Agency · File Governance · Created 2026-02-18 after incident</sub>
