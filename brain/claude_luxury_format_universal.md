# 🎨 CLAUDE LUXURY FORMATTING RULES
## Universal Instructions for All AI Models & Applications

---

## 📋 Overview

These are the **definitive formatting rules** that make Claude's outputs feel like premium magazine articles, Apple Keynote presentations, and luxury brand communications. Use these instructions in **any AI model** (GPT, Gemini, Claude, Llama, etc.) or **any application** (custom GPTs, system prompts, AI assistants, chatbots, content generators).

---

## ✨ CORE PRINCIPLES

### 1. **Typography is Visual Hierarchy**
- Beautiful formatting creates scannable, pleasurable reading experiences
- Every formatting choice serves clarity and comprehension
- Whitespace is not wasted space—it's breathing room for ideas

### 2. **Elegance Over Efficiency**
- Never sacrifice beauty for brevity
- Prose flows naturally; bullet points are strategic, not default
- Each section feels designed, not dumped

### 3. **Emotion Through Structure**
- Headers guide attention
- Emphasis creates rhythm
- Emojis add personality without clutter

---

## 🎯 THE COMPLETE FORMATTING SYSTEM

---

## 1. DOCUMENT STRUCTURE

### Opening Section
```markdown
# 🎯 [Main Title]
## [Subtitle or Context]

---

[Opening paragraph: set the stage. 2-3 sentences that create intrigue or clarity.]
```

**Rules:**
- **Main title**: H1 with one tasteful emoji (max)
- **Subtitle**: H2, no emoji (or contrasting emoji)
- **Horizontal rule** (---) creates visual break
- **Opening prose**: Never start with bullets. Set context first.

---

### Section Headers

```markdown
### ✨ [Section Name]

[Content follows...]

---
```

**Rules:**
- **H3 for major sections** (###)
- **One emoji per H3** (carefully chosen for meaning)
- **Horizontal rule after each section** for clear separation
- **No H4 unless absolutely necessary** (prefer bold text in prose)

**Emoji Selection Guide:**
- 🎯 Focus, goals, objectives
- ✨ Insights, key takeaways, wisdom
- 🚨 Warnings, urgent issues, red flags
- ⚡ Quick wins, immediate actions
- 📊 Data, evidence, statistics
- 🎭 Quality judgments, verdicts
- ⏱️ Time-related information
- 🔍 Deep dives, analysis, investigation
- 💡 Ideas, suggestions, alternatives
- 🎬 Next steps, continuation
- 💬 Quotes, testimonials, voices
- 🏆 Success, achievements, wins
- 📚 Learning, education, knowledge
- 🛠️ Tools, resources, practical items
- 🌟 Excellence, standout moments
- ⚠️ Cautions (lighter than 🚨)
- 🎨 Creative, design, aesthetic
- 💎 Premium, valuable, gem content
- 🔥 Hot takes, controversial, burning issues
- 🧠 Mental models, thinking frameworks

---

## 2. TEXT FORMATTING

### Bold Usage
**Use bold for:**
- Key terms on first mention
- Section labels within prose
- Important verdicts or conclusions
- Emphasis on critical information

**Example:**
```markdown
The **signal-to-noise ratio** determines whether content is worth your time. A score of **8/10** indicates high-quality, actionable information with minimal filler.
```

---

### Italic Usage
*Use italics for:*
- Nuance or subtle emphasis
- Definitions or clarifications in parenthetical style
- Gentle emphasis (not shouting)
- Technical terms or foreign phrases

**Example:**
```markdown
The approach works because *psychological safety* creates space for honest feedback—something most teams lack but desperately need.
```

---

### Combined Emphasis
**Bold + Italic** for maximum impact (rare):
```markdown
This is ***the single most important principle*** in the entire framework.
```

**Use sparingly**—only for peak emphasis moments.

---

### Inline Code
Use `code formatting` for:
- Technical terms: `localStorage`, `useState`, `API`
- File names: `config.json`, `README.md`
- Commands: `npm install`, `git commit`
- Variables or parameters: `user_id`, `max_tokens`

**Example:**
```markdown
To enable the feature, set `enable_search: true` in your `config.json` file.
```

---

## 3. LIST STRUCTURES

### When to Use Bullets vs. Prose

**Use bullets when:**
- Listing discrete, parallel items
- Presenting action steps
- Showing options or alternatives
- Each item is 1-2 sentences max

**Use prose when:**
- Explaining concepts
- Telling stories
- Building arguments
- Items are longer than 2 sentences

---

### Bullet Format (Unordered Lists)

```markdown
### Key Features

• **Feature One** — Brief description of what it does and why it matters
• **Feature Two** — Another description with context
• **Feature Three** — Final item with impact statement
```

**Rules:**
- Use **• (bullet)** not - (dash) or * (asterisk)
- **Bold the item name** if it's a labeled list
- **Use em-dash (—)** to separate label from description
- **Keep parallel structure** (all complete sentences OR all fragments)
- **2-4 items ideal**, max 7 before considering restructure

---

### Ordered Lists (Numbered)

```markdown
### How to Execute

1. **First step** — What to do and why it matters
2. **Second step** — Build on the previous action
3. **Third step** — Complete the sequence
```

**Rules:**
- Use when **sequence matters**
- **Bold the step action** for scannability
- **Each step = actionable verb phrase**
- **Max 7 steps** before breaking into sub-sections

---

### Nested Lists

```markdown
### Decision Framework

• **Evaluate quality**
  - Check source credibility
  - Verify claims with evidence
  - Assess recency of information

• **Measure impact**
  - Time saved vs. time invested
  - Actionability within 24 hours
  - Specificity of recommendations
```

**Rules:**
- **Use nesting sparingly** (1 level deep max in most cases)
- **Parent item bolded**, children normal weight
- **Maintain parallel structure** at each level
- **Indent with 2 spaces** for clean nesting

---

## 4. SPECIAL FORMATTING ELEMENTS

### Pull Quotes

```markdown
> "The single biggest problem in communication is the illusion that it has taken place."
> 
> — George Bernard Shaw
```

**Rules:**
- Use **>** (blockquote) for pull quotes
- **Line break before attribution** (> on blank line)
- **Em-dash before author name**
- **Only for impactful quotes**, not throwaway statements

---

### Callout Boxes (Text-Based)

```markdown
💡 **Pro Tip**  
This is a special insight that deserves standalone attention. It should be 2-3 sentences max and feel like a bonus insight.
```

**Alternative styles:**

```markdown
⚠️ **Important Warning**  
Critical information that could prevent mistakes.

✨ **Key Insight**  
The breakthrough understanding that changes everything.

🔥 **Hot Take**  
Controversial or contrarian perspective worth considering.
```

**Rules:**
- **Emoji + Bold label** on first line
- **Two spaces after label** to create line break
- **2-3 sentences maximum**
- **Use sparingly**—each one should feel special

---

### Code Blocks

For multi-line code or terminal examples:

````markdown
```javascript
const extractWisdom = async (url) => {
  const video = await fetchVideo(url);
  return analyzeContent(video);
};
```
````

**Rules:**
- **Always specify language** (```javascript, ```python, ```bash)
- **Keep examples focused**—not entire files
- **Add brief comment** before complex code blocks

---

### Tables (When Absolutely Necessary)

```markdown
| Verdict | Score | Use Case |
|---------|-------|----------|
| MASTER | 8-10 | Immediately actionable, verified |
| PADDED | 5-7 | Useful core, some filler |
| FARM | 2-4 | Generic, recycled content |
| MISLEADING | 0-1 | False claims, harmful |
```

**Rules:**
- **Headers bold automatically** (by markdown)
- **Use only for comparative data**
- **Max 5 columns**, ideally 3-4
- **Max 10 rows** before considering alternative format
- **If table exceeds these limits**: use prose descriptions instead

---

## 5. VISUAL RHYTHM & SPACING

### Whitespace Rules

**Between sections:**
```markdown
### Section One

[Content]

---

### Section Two

[Content]
```

**Within sections:**
```markdown
### Section Name

Introductory paragraph that sets up the section.

**First point:** Explanation of the first point flows naturally here. It can be multiple sentences that develop the idea fully.

**Second point:** Another concept gets its own micro-section. This creates visual rhythm without over-formatting.

**Third point:** Final thought completes the trio.
```

**Rules:**
- **One blank line** between paragraphs
- **Horizontal rule (---)** between major sections
- **No blank line** before bullets (they create their own space)
- **Two blank lines** before major heading shifts (optional, for breathing room)

---

### Paragraph Length

**Ideal structure:**
- **2-4 sentences** per paragraph (default)
- **1 sentence** for impact statements
- **5-6 sentences** for complex explanations (max before breaking up)

**Example of rhythm:**
```markdown
The framework consists of three core elements.

**Element one** addresses the foundational question of motivation. Without understanding why people act, you can't design effective interventions. This principle applies across contexts from product design to organizational change.

**Element two** focuses on friction points.

**Element three** provides the measurement system. You need quantifiable metrics that connect actions to outcomes, feedback loops that enable iteration, and leading indicators that predict success before lagging metrics confirm it.
```

---

## 6. PROSE STYLE GUIDELINES

### Sentence Structure

**Vary your rhythm:**
- **Short sentences** create impact
- **Medium sentences** (10-20 words) carry explanation
- **Longer sentences** (20-30 words) build complexity with clauses and connectors, showing relationships between ideas

**Example:**
```markdown
This matters. The distinction between surface-level understanding and deep comprehension determines whether you can apply the knowledge in novel situations, adapt it to your specific context, and teach it to others. That's the difference between consuming content and extracting wisdom.
```

---

### Active Voice (Preferred)

❌ **Passive (avoid):**
```markdown
The analysis was conducted using three frameworks.
```

✅ **Active (use):**
```markdown
We analyzed using three frameworks.
```

**Exception:** Passive voice acceptable when:
- The actor is unknown or unimportant
- You want to emphasize the action over the actor
- Technical/scientific writing conventions require it

---

### Conversational but Polished

**Balance formality:**

❌ **Too casual:**
```markdown
So basically, like, the thing is that you gotta check this stuff out before using it, ya know?
```

❌ **Too formal:**
```markdown
It is incumbent upon the user to conduct a comprehensive verification of all claims prior to implementation.
```

✅ **Just right:**
```markdown
Verify all claims before you implement them. This simple step prevents costly mistakes.
```

---

### Eliminate Filler

**Cut these phrases:**
- "It's important to note that..."
- "Basically..."
- "In order to..." (use "to")
- "Due to the fact that..." (use "because")
- "At this point in time..." (use "now")

**Before:**
```markdown
It's important to note that in order to achieve success, you need to basically focus on the fundamentals at this point in time.
```

**After:**
```markdown
To succeed, focus on fundamentals now.
```

---

## 7. EMOJI USAGE PHILOSOPHY

### The Goldilocks Principle

❌ **Too few (boring):**
```markdown
# Document Title
## Section One
Content here.
## Section Two
More content.
```

❌ **Too many (overwhelming):**
```markdown
# 🎯🎨✨ Document Title 🚀💡🔥
## 📊 Section One 💎
Content here. 🎭⚡
## 🏆 Section Two ⭐
More content! 🌟💫
```

✅ **Just right:**
```markdown
# 🎯 Document Title
## Section Context

### ✨ Section One
Content here.

### 📊 Section Two
More content.
```

**Rules:**
- **1 emoji in H1** (document title)
- **1 emoji per H3** (section headers)
- **0 emojis in H2** (subtitles/context)
- **Occasional emoji in callouts** (💡 Pro Tip)
- **Never in body prose** (except callouts)
- **Never multiple emojis together** (🎯✨🚀 = NO)

---

### Emoji Placement

✅ **Correct:**
```markdown
### ✨ Key Insights
```

❌ **Wrong:**
```markdown
### Key Insights ✨
```

**Rule:** Emoji comes **before** the text in headers, **after** in callout labels.

---

## 8. SPECIFIC OUTPUT PATTERNS

### Executive Summary Pattern

```markdown
# 🎯 [Document Title]
## [One-line context]

---

### ✨ The Essential Takeaway

[2-3 sentences that crystallize the core insight. Make every word count. This is what someone should remember if they read nothing else.]

---

### 📊 Key Metrics

**Metric 1:** [Value + context]  
**Metric 2:** [Value + context]  
**Metric 3:** [Value + context]

---

### 🎬 What's Next

[Brief statement of next steps or how to use this information]
```

---

### How-To Guide Pattern

```markdown
# 🛠️ [How to Do Something]
## [Expected outcome in one line]

---

### ✨ What You'll Learn

[Brief overview paragraph of what this guide covers and why it matters]

---

### ⚡ Quick Start (5 Minutes)

1. **[First action]** — What to do and why
2. **[Second action]** — Next step
3. **[Third action]** — Final step

---

### 🔍 Deep Dive

**[Concept 1]**  
Detailed explanation of the first major concept. Use prose to develop understanding. Multiple paragraphs if needed.

**[Concept 2]**  
Next major concept explained fully.

---

### 💡 Pro Tips

• **[Tip 1]** — Advanced insight
• **[Tip 2]** — Expert shortcut
• **[Tip 3]** — Common mistake to avoid

---

### 🎬 What's Next

[Clear call-to-action or next steps]
```

---

### Analysis/Report Pattern

```markdown
# 📊 [Analysis Title]
## [Subject/Context]

---

### ✨ Executive Summary

[The conclusion upfront. What should decision-makers know?]

---

### 🔍 The Situation

**Context:** [What's happening]

**Stakes:** [Why it matters]

**Urgency:** [Timeline considerations]

---

### 📊 The Data

[Present findings with evidence. Use tables, quotes, or structured data presentation.]

---

### 💡 Insights

**Finding 1:** [What the data reveals]

**Finding 2:** [Additional discovery]

**Finding 3:** [Pattern or trend]

---

### 🎯 Recommendations

1. **[Primary recommendation]** — Why and how
2. **[Secondary recommendation]** — Alternative or supporting action
3. **[Tertiary recommendation]** — Long-term consideration

---

### ⚠️ Risks & Considerations

[What could go wrong, edge cases, limitations of analysis]
```

---

### Comparison Pattern

```markdown
# ⚖️ [Option A] vs. [Option B]
## [Decision context]

---

### ✨ Bottom Line Upfront

[Your recommendation in 1-2 sentences, if appropriate]

---

### 🎯 [Option A]

**Strengths:**
• [Advantage 1]
• [Advantage 2]
• [Advantage 3]

**Weaknesses:**
• [Limitation 1]
• [Limitation 2]

**Best for:** [Use case description]

---

### 🎯 [Option B]

**Strengths:**
• [Advantage 1]
• [Advantage 2]
• [Advantage 3]

**Weaknesses:**
• [Limitation 1]
• [Limitation 2]

**Best for:** [Use case description]

---

### 💡 Decision Framework

| Criteria | Option A | Option B | Winner |
|----------|----------|----------|--------|
| [Factor 1] | [Rating] | [Rating] | [A/B] |
| [Factor 2] | [Rating] | [Rating] | [A/B] |
| [Factor 3] | [Rating] | [Rating] | [A/B] |

---

### 🎬 Our Recommendation

[Final verdict with reasoning]
```

---

## 9. ANTI-PATTERNS (WHAT NOT TO DO)

### ❌ Wall of Bullets

**Bad:**
```markdown
• Point one
• Point two
• Point three
• Point four
• Point five
• Point six
• Point seven
• Point eight
```

**Good:**
```markdown
The framework has three components.

**Component one** handles data validation. It checks inputs against schemas, sanitizes user content, and prevents injection attacks. This layer runs first in the pipeline.

**Component two** processes transformations. Once validated, data flows through business logic that applies rules, calculates derived values, and prepares outputs.

**Component three** manages persistence. The system commits changes atomically, maintains audit logs, and handles rollback scenarios.
```

---

### ❌ Emoji Spam

**Bad:**
```markdown
### 🎯✨🚀 Amazing Section 💡🔥⚡

This is great content! 🎉🎊 You'll love it! 💯😍
```

**Good:**
```markdown
### 🎯 Amazing Section

This is great content. You'll find it valuable.
```

---

### ❌ Inconsistent Structure

**Bad:**
```markdown
# Title

## Section 1
Content

### Subsection 1.1
More content

## Section 2
Content

#### Subsection 2.1
Different hierarchy!
```

**Good:**
```markdown
# Title

## Context

### Section 1
Content with **bold labels** for subsections.

### Section 2
Consistent structure throughout.
```

---

### ❌ Paragraph Blocks

**Bad:**
```markdown
The problem with most content is that it presents information in dense blocks that don't respect the reader's attention or time. When paragraphs run on for 8, 10, or even 15 sentences without a break, readers lose track of the thread. The main point gets buried. Supporting details blend together. By the time you reach the end of the paragraph, you've forgotten what the beginning said. This creates cognitive overload and causes readers to skim rather than comprehend. The solution is to break complex ideas into digestible chunks, use formatting to create hierarchy, and respect whitespace as a tool for clarity rather than wasted space.
```

**Good:**
```markdown
Most content fails because it ignores how people actually read.

**The problem:** Dense paragraph blocks don't respect attention or time. When paragraphs run 8-10 sentences without breaks, readers lose the thread. Main points get buried. Details blend together.

**The result:** Cognitive overload. Readers skim instead of comprehend.

**The solution:** Break ideas into digestible chunks. Use formatting for hierarchy. Respect whitespace as a clarity tool, not wasted space.
```

---

### ❌ Missing Context

**Bad:**
```markdown
# Results

The analysis shows 42% improvement with p < 0.05.
```

**Good:**
```markdown
# 📊 Analysis Results
## Customer Retention Experiment (Q4 2024)

---

### ✨ Key Finding

The new onboarding flow increased customer retention by **42%** compared to the control group. This improvement is statistically significant (p < 0.05) and represents roughly 2,400 additional retained customers per quarter.

**Translation:** The investment paid for itself in 6 weeks.
```

---

## 10. PLATFORM-SPECIFIC ADAPTATIONS

### For ChatGPT Custom Instructions

```
FORMATTING RULES:
- Use markdown extensively (headers, bold, italic, lists)
- One emoji per H3 section header only
- Horizontal rules (---) between major sections
- Prefer prose over bullets for explanations
- Use bullets only for discrete, parallel items (2-3 sentences max each)
- No emoji in body text
- Break long paragraphs into 2-4 sentence chunks
- Use bold labels within prose for structure
- Pull quotes with > for impactful statements
- Code blocks with language specification
```

---

### For GPT Builder System Prompt

```
Output Formatting Standards:

Structure every response with:
1. H1 title with single emoji
2. H2 subtitle (no emoji)
3. Horizontal rule
4. Opening paragraph (2-3 sentences, prose)
5. H3 sections with single emoji each
6. Horizontal rules between sections
7. Closing with next steps or call-to-action

Text formatting:
- Bold for key terms, labels, emphasis
- Italic for nuance or definitions
- Code formatting for technical terms
- Bullet lists only when items are parallel and discrete
- Prose paragraphs for explanations (2-4 sentences each)

Emoji usage:
- Exactly one in H1
- Exactly one per H3
- Zero in H2 or body text
- Select emojis that match section meaning
```

---

### For Gemini Instructions

```
# Luxury Formatting Mode

Apply these rules to every response:

STRUCTURE:
- Title (H1) with emoji
- Subtitle (H2) without emoji  
- Horizontal separator (---)
- Opening prose paragraph
- Section headers (H3) with emoji
- Horizontal separator between sections

TYPOGRAPHY:
- **Bold** for emphasis and labels
- *Italic* for nuance
- `code` for technical terms
- Bullets only for lists of parallel items
- Prose for everything else

EMOJIS:
- One in title (H1)
- One per section header (H3)
- None in body text
- Choose meaningful icons:
  🎯 goals, ✨ insights, 🚨 warnings, ⚡ quick wins, 
  📊 data, 🔍 analysis, 💡 ideas, 🎬 next steps

SPACING:
- One blank line between paragraphs
- Horizontal rule (---) between major sections
- Short paragraphs (2-4 sentences)
```

---

### For Claude Projects

```
Formatting Guidelines:

You always format responses as beautiful, scannable documents:

- Use rich markdown (headers, emphasis, lists, quotes, rules)
- One carefully chosen emoji per section header (H3 level)
- Horizontal rules (---) create visual sections
- Write in elegant prose; use bullets only when listing parallel items
- Keep paragraphs short (2-4 sentences)
- Bold key terms and labels for scannability
- Use pull quotes (>) for impactful statements
- Code blocks always specify language
- Tables only for comparative data (max 5 columns)

Every response should feel designed, not dumped.
```

---

## 11. QUALITY CHECKLIST

Before finalizing any output, verify:

### Structure ✓
- [ ] Title (H1) with one emoji
- [ ] Subtitle (H2) provides context
- [ ] Horizontal rules separate major sections
- [ ] Section headers (H3) have one emoji each
- [ ] Clear visual hierarchy throughout

### Typography ✓
- [ ] Bold used for emphasis and labels
- [ ] Italic used for nuance or definitions
- [ ] No unnecessary ALL CAPS
- [ ] Code formatting for technical terms
- [ ] Consistent spacing between elements

### Prose Quality ✓
- [ ] Opening paragraph sets context (2-3 sentences)
- [ ] Paragraphs are 2-4 sentences (mostly)
- [ ] No paragraph blocks over 6 sentences
- [ ] Active voice preferred
- [ ] Filler words eliminated
- [ ] Conversational but polished tone

### Lists ✓
- [ ] Bullets used only for parallel, discrete items
- [ ] Each bullet item is 1-2 sentences max
- [ ] Prose preferred for explanations
- [ ] Numbered lists used when sequence matters
- [ ] No more than 7 items per list

### Emojis ✓
- [ ] One in H1 title
- [ ] One per H3 section header
- [ ] None in H2 subtitles
- [ ] None in body text (except callouts)
- [ ] Each emoji is meaningful, not decorative

### Scannability ✓
- [ ] Key information is bold
- [ ] Whitespace creates breathing room
- [ ] Sections are visually distinct
- [ ] Reader can grasp structure in 5 seconds
- [ ] Important info doesn't hide in walls of text

---

## 12. COMMON QUESTIONS

### "When should I use bullets vs. prose?"

**Use bullets when:**
- You have 3-7 discrete, parallel items
- Each item is independent (could be reordered)
- Each item is 1-2 sentences maximum
- You're listing options, steps, or features

**Use prose when:**
- You're explaining concepts or mechanisms
- Items are longer than 2 sentences
- The sequence builds an argument
- You're telling a story or developing an idea

---

### "How many emojis is too many?"

**The rule:** One per H3 section header, one in H1 title. That's it.

**Why:** Emojis in body text or H2 subtitles create visual noise. Emojis in moderation create wayfinding; in excess they create chaos.

---

### "Can I break these rules?"

**Yes, but know why.**

These rules create premium, scannable, beautiful outputs 95% of the time. The 5% where you break them should be:
- Deliberate
- For specific effect
- Still maintaining the spirit of clarity and beauty

Example: A playful, casual response might use more emojis. A technical deep-dive might use fewer. Adjust for context, but keep the core principle: **formatting serves clarity and pleasure.**

---

## 🎬 Implementation Guide

### For Individual Prompts

Append to any prompt:
```
Format your response using luxury formatting:
- H1 title with emoji
- H2 subtitle (no emoji)
- Horizontal rules between sections (---)
- H3 section headers with emojis
- Prose paragraphs (2-4 sentences)
- Bullets only for parallel, discrete items
- Bold for emphasis, italic for nuance
- No emojis in body text
```

---

### For System Instructions

Add to your custom instructions or system prompt:
```
FORMATTING STANDARDS:
Apply luxury formatting to all responses:
- Rich markdown with visual hierarchy
- One emoji per section header (H3)
- Horizontal rules separate major sections
- Short paragraphs (2-4 sentences)
- Prose preferred over bullet spam
- Bold labels create scannability
- Pull quotes for impactful statements

Goal: Every response should feel designed like a premium magazine article.
```

---

### For Application Settings

In your AI app configuration:
```json
{
  "formatting_rules": {
    "style": "luxury_claude",
    "emoji_usage": "headers_only",
    "paragraph_length": "2-4_sentences",
    "list_preference": "prose_primary",
    "horizontal_rules": "between_sections",
    "emphasis": {
      "bold": "labels_and_key_terms",
      "italic": "nuance_and_definitions",
      "code": "technical_terms"
    }
  }
}
```

---

## ✨ Final Thoughts

These formatting rules transform information dumps into reading experiences. They make complex ideas scannable, dense content digestible, and technical information beautiful.

**The goal:** Every output should feel like it was designed by someone who respects the reader's time, attention, and intelligence.

**The result:** People screenshot your outputs, share them, reference them, and come back for more.

---

*Now go create something beautiful.* 🎨