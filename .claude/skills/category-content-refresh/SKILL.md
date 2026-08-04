---
name: category-content-refresh
description: Batch-rewrite every published article in a given content category (currently GetGlobalYields.com's "Taxes" category) to fix templated, low-value content — the specific issue that caused a Google AdSense rejection ("low value content") for this site. Rewrites each article with fresh data, fresh examples, and a keyword that has been checked for real viability (demand vs. competition), while actively making sure no two articles in the category reuse the same numbers, case studies, or structural skeleton. Use this skill when the user asks to "refresh," "de-templatize," "diversify," or "rewrite the whole category" of articles — not for writing or editing a single article, which is what the article-writer skill is for.
---

# Category Content Refresh

This skill depends on the **article-writer** skill. It does not duplicate
article-writer's rules — it loads and reuses them directly for the actual
writing (Stage 4 onward below maps onto article-writer's Stage 1–8). If
article-writer is not available, stop and say so; do not improvise writing
rules from scratch.

Read these before starting, in this order:
1. `references/keyword-viability.md` — how to check whether a keyword is
   actually worth targeting, and what to do when the current one isn't.
2. `references/category-dedup.md` — the mechanism that prevents this rewrite
   from producing the exact same templated problem again, just with nicer prose.
3. `../article-writer/references/constitution.md`,
   `../article-writer/references/writing-style.md`,
   `../article-writer/references/writing-dna.md`,
   `../article-writer/references/fact-check-and-review.md` — same rules that
   govern article-writer, unchanged.

## Why this skill exists

The site's articles were flagged by Google as "low value content" for AdSense.
The root cause named by the user is not a single bad article — it's that
articles in the same category read as templated: similar structure, and worse,
**the same illustrative numbers and examples reused across articles** (e.g. the
same portfolio size, the same withholding rate example, the same case study
shape). Rewriting one article at a time with no memory of the others just
reproduces the same problem with different wording. This skill's entire reason
for existing is to fix that at the category level, not the article level.

## Voice source when writing-dna.md is still a placeholder

`../article-writer/references/writing-dna.md` may still be an unfilled starter
profile. When that's the case, do not draft in a generic voice — instead, read
the actual article files the user provides directly (the real, currently-published
articles, including the ones about to be rewritten) and extract the voice from
them: sentence rhythm, paragraph length, vocabulary choices, how technical
explanations are framed, how the author transitions between ideas. This is a
**voice-only** extraction — tone, cadence, word choice — never structure,
never specific numbers, never specific examples or case studies. Those are
exactly what Stage 0.5/Stage 5's dedup gate exists to move away from. Reading
the same files for voice and refusing to reuse their structure/data are not in
conflict — they're two different layers of the same source material.

If real sample articles are provided, prefer them over the (empty)
writing-dna.md for this run, and note to the user that writing-dna.md itself
still hasn't been populated — populating it properly (see article-writer's own
notes on this) would let future runs skip re-deriving voice from scratch every
time.

## The pipeline

**Stage 0 — Inventory.** Get the full list of currently published articles in
the target category (ask the user for the list/URLs/content if not already
provided — do not guess which articles exist). For each, capture: current
slug, current primary keyword, current URL (for preserving SEO equity).

**Stage 0.5 — Baseline map (hard gate before any rewriting starts).** Read
through every article in the category as it exists today and build a working
inventory of what's already been used: specific numbers, rates, dollar/portfolio
amounts, named scenarios, case-study shapes, and structural skeletons (e.g.
"intro → what is X → 3 benefits → FAQ → conclusion" repeated verbatim). See
`references/category-dedup.md` for the exact format. This inventory is not
optional context — it is the thing every subsequent rewrite must diverge from.
**Update it after every article is rewritten**, so article #10 also diverges
from articles #1–9's *new* content, not just their original content.

**Stage 1 — Keyword viability (per article).** For each article's current
primary keyword, follow `references/keyword-viability.md` to determine whether
it's worth keeping. If the user has supplied real demand data (Keyword Planner
export, GY-OS/GSC data, Ahrefs/Semrush), use that. Otherwise produce a clearly-labeled
qualitative estimate — never present a guessed search-volume number as real
data. If the current keyword fails the check, propose 2–3 alternatives with the
same labeling and **get the user's confirmation before changing it** — a keyword
change can mean a slug change, which affects the published URL.

**Stage 2 — Angle (maps to article-writer Stage 1).** Same requirement as
article-writer: what will this version say that the top-ranking pages don't
already say. Additionally here: what will this version say that **the other
articles in this category, per the Stage 0.5 baseline, don't already say**.
Both checks must pass.

**Stage 3 — Research (maps to article-writer Stage 3, hard gate).** Research
must produce genuinely new figures/examples for this article — not reuse
anything logged in the Stage 0.5 baseline. If the only sources available give
you the same numbers already used elsewhere in the category, say so rather than
inventing different-looking numbers to satisfy the dedup rule; a fabricated
number to avoid repetition is worse than the repetition.

**Stage 4 — Outline, Draft, Humanize, Fact-check, Final review** — run exactly
as article-writer's Stages 4–8, using article-writer's reference files
unmodified.

**Stage 5 — Category-level dedup gate (hard gate, in addition to
article-writer's Stage 8 checklist).** Before marking any article done, check it
against the live Stage 0.5 baseline: does any number, example, case study, or
scenario duplicate (or trivially reword) one already used elsewhere in this
category? If yes, the article fails this gate — go back to Stage 3 for that
element specifically. This is the actual fix for "why does this look
templated" and must be checked explicitly, not assumed from good writing alone.

## Workflow: one article at a time

Process and present articles **one at a time**, not as a silent batch. After
each article, show: old keyword → new keyword (if changed), the new
examples/data used, and confirmation that it passed the Stage 5 dedup gate —
then wait before moving to the next one. Given the AdSense stakes and that
these are live public pages, do not auto-rewrite the entire category and
present everything at once unless the user explicitly asks for that.

## Output per article

- The full rewritten article, in the same voice/format as article-writer's
  output, with complete frontmatter per the template in
  `../article-writer/SKILL.md`.
- Preserve the existing slug/URL by default (SEO equity from existing rankings
  and backlinks). Only change the slug if the keyword change in Stage 1 makes
  the old slug actively misleading — flag this explicitly to the user rather
  than changing it silently.
- A short change log: keyword (unchanged / old → new + why), what new
  data/examples were introduced, and explicit confirmation the dedup gate
  passed.

## When inputs are missing

Same rule as article-writer: never quietly substitute a guess for missing
input (the article list, real keyword data, sources for new claims). State
what's missing and ask, or proceed with an explicitly-labeled assumption the
user can correct.
