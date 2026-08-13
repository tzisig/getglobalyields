---
name: article-writer
description: Research, outline, draft, humanize, fact-check, and finalize long-form articles for GetGlobalYields.com (or any content site) so they read as written by a knowledgeable human, not an AI. Use this skill whenever the user asks to write, draft, outline, edit, humanize, fact-check, or SEO-review an article, blog post, guide, or comparison piece — including requests like "כתוב מאמר על...", "write an article about...", "תעזור לי עם מאמר", or "check this draft for AI patterns." Also use it before publishing any content-site article, even if the user only asks for one stage (e.g. just "humanize this" or just "fact-check this").
---

# Article Writer

This skill turns a topic into a publish-ready article through a fixed pipeline of
stages. Do not skip stages and do not write final prose before Stage 4. Each stage
has a hard gate — if the gate isn't met, stop and ask the user rather than guessing.

Read `references/constitution.md` once at the start of any article job — it holds
the non-negotiable rules (truth, evidence, priority order) that apply to every stage.

## The pipeline

**Stage 1 — Strategy.** Before anything else, establish:
- Who is the reader, and what do they already know?
- What should they be able to do after reading?
- Why does this article need to exist — what will it say that the top-ranking
  pages on this topic don't already say? A generic restatement of existing
  content is a failure at this stage, not something to fix later.

If the user hasn't given you enough to answer these, ask — don't assume a generic
"international investor" reader when the site context (see below) gives you a more
specific one.

**Stage 2 — Intent and keywords.** Classify search intent (informational,
commercial-investigation, transactional, navigational). If the user has already
supplied primary/secondary keywords (e.g. from their own keyword-research
tooling), use those directly instead of re-deriving them — just confirm they
make sense for the topic. Otherwise identify the primary keyword and 3-6
secondary/related terms and questions yourself. Keywords describe what to
cover, not phrases to insert mechanically — see `references/writing-style.md` for
the SEO rules.

**Stage 3 — Research (hard gate).** Every factual claim, number, rate, fee,
regulation, or comparison in the eventual article must trace to a real source you
actually retrieved — web search, a fetched page, an uploaded document, or a figure
the user gives you directly. This is a hard gate: if you have not done the
research (or the user hasn't supplied it), you do not have inputs to write from,
and you say so instead of drafting. See `references/constitution.md` for the full
evidence policy, including source priority and what to do when nothing verifiable
exists.

**Stage 4 — Outline.** Build a structure that follows from the topic, the reader,
and what the research actually turned up — not a fixed template. Avoid generic
"Introduction / What is X / Benefits / FAQ / Conclusion" skeletons unless the
topic genuinely calls for that shape. Vary heading style and depth article to
article; a site full of identically-structured pages reads as machine-produced
even if each one is well written.

**Stage 5 — Draft.** Write the full article using the voice in
`references/writing-dna.md` and the rules in `references/writing-style.md`. Every
claim in the draft must map back to something from Stage 3 — do not fill gaps with
plausible-sounding detail. If a needed fact wasn't found, flag it inline as
`[NEEDS SOURCE: ...]` rather than inventing it or quietly softening it into vague
language.

**Stage 6 — Humanize pass.** Re-read the draft looking specifically for AI
tells (see the checklist in `references/writing-style.md`): uniform sentence
rhythm, symmetrical paragraphs, generic transitions, hedge-everything phrasing,
forbidden vocabulary. Fix naturalness only — never change a fact, a number, or a
source in this pass.

**Stage 7 — Fact-check.** Go claim by claim through the final draft. For each one:
does it have a source, is the source reliable, is the wording an accurate
representation of what the source said? Anything that fails gets removed or
rewritten as an explicit uncertainty, not smoothed over.

**Stage 8 — Final review.** Run the checklist in
`references/fact-check-and-review.md` before calling anything done. The closing
test: would someone who actually knows this topic be willing to put their name on
this article? If not, say specifically what's still wrong and fix it before
delivering — don't deliver something you wouldn't sign.

## Site context (GetGlobalYields.com)

When the article is for GetGlobalYields.com, apply these on top of the general
pipeline:
- Audience is non-US investors dealing with US markets/brokers — assume real
  friction points (W-8BEN, broker access, tax treaties) are relevant background,
  not exotic edge cases.
- The site has previously been flagged for thin/duplicate content. Duplicate
  detection is normally handled by the user's own external tooling before this
  skill is invoked — if the user says a topic/keyword has already been cleared
  for duplicates, take that as given. Only raise the duplicate question
  yourself if the user hasn't mentioned it and you have a specific reason to
  think a close match exists on the site.
- A genuine personal data point (e.g. a real trade or portfolio outcome) is a
  strong potential differentiator when one exists and the user wants to use it
  — but never assume it should be included by default, and never reuse one
  from a previous article without asking. Whether to include a specific
  personal data point is the user's call each time (they may have reasons not
  to, including reasons unrelated to the article itself).
- The site currently publishes in English; Hebrew content may be added later.
  Use whichever language the user requests for a given article, and pull the
  matching per-language block from `references/writing-dna.md` (see that file
  for what to do if the requested language hasn't been analyzed yet). Keep the
  dash and formatting rules in `references/writing-style.md` regardless of language.

## Required frontmatter (GetGlobalYields.com)

Every finished article for this site must ship with this exact frontmatter
block above the body, all fields filled in (never left as empty placeholders
in the delivered output — if something is genuinely unknown, say so to the
user rather than delivering a blank field):

```yaml
---
slug:
title:
description:
pubDate:
updatedDate:
author: "Tzion Sigron"
categories: ["Taxes"]
keywords:
tags:
heroImage:
heroImageWidth: 840
heroImageHeight: 560
draft: false
readingTime:
featured:
seo:
  metaTitle:
  metaDescription:
  ogTitle:
  ogDescription:
  ogImage:
  twitterCard:
schema:
  type: "article"
  headline:
  description:
  author: "Tzion Sigron"
  datePublished:
  dateModified:
  image: ".webp"
  mainEntityOfPage:
---
```

Notes:
- `categories` defaults to `["Taxes"]` in the template above only as an
  example — set it to whatever category actually fits the article topic.
- `heroImageWidth`/`heroImageHeight` stay at 840x560 to match the site's image
  pipeline unless told otherwise.
- `metaTitle`/`metaDescription` are not an afterthought — write them with the
  same care as the primary/secondary keyword work in Stage 2, and check them
  against the final draft in Stage 8 (they must accurately describe what the
  article actually says).
- `schema.image` should point to a real `.webp` asset path, not a placeholder.

## Partial requests

If the user only asks for one stage — "just humanize this," "fact-check this
draft," "build me an outline" — do that stage only, using the relevant reference
file, but still apply the hard gates that stage depends on (e.g. you can't
fact-check claims that don't cite anything without saying so).

## When inputs are missing

Never quietly substitute a guess for a missing input (reader, sources, real
writing samples for voice). State plainly what's missing and ask, or proceed with
an explicitly-labeled assumption the user can correct. This matters more than
finishing fast.
