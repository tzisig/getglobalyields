# Writing DNA — GetGlobalYields.com

STATUS: starter profile, not yet trained on real samples. The values below are
based only on how the site owner communicates about the work, not on an analysis
of actual published articles. Treat this as a reasonable default, not a finished
voice profile.

**To finish this properly:** give this skill 5-10 full articles you've already
published (or are happy with) and ask it to rerun the analysis process below
against them. Until then, expect the draft's "voice" to be generic-competent
rather than distinctly yours.

## What's known

- Primary language: Hebrew. English used when explicitly requested.
- Audience: non-US investors navigating US markets, brokers, and tax rules —
  assume real friction (W-8BEN, broker access, treaty rates), not a beginner
  audience that needs everything defined from scratch.
- Strong emphasis on independently verified figures over restating what
  competitors say — this is a stated editorial standard, not just a style
  preference. Treat unverified numbers as harder blockers here than a generic
  site might.
- Values a genuine first-hand data point (e.g., a real trade or portfolio
  result) as the strongest kind of content differentiator — reach for that over
  generic explanation when one exists.
- Prefers direct, action-oriented communication generally; corrects speculative
  or over-complicated output firmly. Assume the reader wants the same directness
  the site owner wants from Claude: get to the point, back it up, skip filler.

## Analysis process (run this once real samples are provided)

1. Collect 5-10 full-length published samples.
2. For each, analyze:
   - Structure: how it opens, develops, and closes
   - Language: common words, sentence length, recurring expressions, vocabulary level
   - Personality: stated opinions, humor, confidence markers, emotional tone
   - Reader interaction: direct address, questions, examples, stories
   - Formatting: heading style, list usage, paragraph length, emphasis habits
3. Fill in the profile below from what you actually observe — don't guess at
   values you can't support from the samples.
4. Before every article, compare the draft against this profile.
5. If they don't match, revise the draft to close the gap — don't revise the
   profile to match whatever was easiest to write.

## Profile is per-language

Voice does not transfer directly between English and Hebrew — sentence rhythm,
vocabulary, and idiom differ enough that a profile built from English samples
should not be assumed to apply when writing Hebrew, or vice versa. Keep a
separate profile block for each language the site publishes in. Only fill in a
language's block once you actually have real samples in that language; leave the
whole block marked "not yet analyzed" rather than reusing the other language's
values as a placeholder.

### Profile — English (fill in from real samples — placeholders marked TBD)

```yaml
author_profile_en:
  voice:
    authority: TBD        # e.g. teacher / expert / consultant / researcher
    directness: high       # stated preference, safe to keep until contradicted
    technical_depth: TBD
    humor: TBD

  writing_behavior:
    prefers:
      - direct explanations
      - independently verified figures
      - real personal data points where available
      - honest limitations stated plainly
    avoids:
      - exaggerated marketing language
      - restating competitor content without differentiation
      - unnecessary padding/introductions

  structure:
    paragraph_length: TBD
    sentence_variation: TBD
    bullet_usage: TBD

  punctuation:
    dash: "-"
    avoid: ["–", "—"]

  reader_relationship:
    speaks_directly: TBD
    uses_first_person: TBD

  preferred_expressions: []   # fill from real samples
  forbidden_expressions: []   # fill from real samples, in addition to the
                               # generic AI-tell list in writing-style.md
```

### Profile — Hebrew (not yet analyzed — no Hebrew samples provided yet)

```yaml
author_profile_he:
  status: not_yet_analyzed
  voice:
    authority: TBD
    directness: TBD
    technical_depth: TBD
    humor: TBD

  writing_behavior:
    prefers: []
    avoids: []

  structure:
    paragraph_length: TBD
    sentence_variation: TBD
    bullet_usage: TBD

  punctuation:
    dash: "-"
    avoid: ["–", "—"]

  reader_relationship:
    speaks_directly: TBD
    uses_first_person: TBD

  preferred_expressions: []
  forbidden_expressions: []
```

## Which profile to use

Before drafting, check what language the article is being written in and use the
matching block. If that language's block is still `not_yet_analyzed`, say so and
fall back to the general rules in writing-style.md rather than borrowing the other
language's profile — a borrowed profile will read as translated, not native.

## Generic forbidden vocabulary (applies to both languages until replaced)

Starter forbidden list (generic AI tells — see writing-style.md for the full list
and rationale): leverage, holistic, groundbreaking, game-changer, "in today's
digital world," "it is important to note that." Do not force any "preferred
expression" into a draft just because it's on a list — only use it where it would
occur naturally.

## Evolution log

- v0.1 — Starter profile created from site context and stated editorial
  standards; no real writing samples analyzed yet.
