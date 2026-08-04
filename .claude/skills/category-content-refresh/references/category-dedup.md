# Category dedup baseline

This is the core mechanism for fixing "templated content" at the category
level rather than the article level. It only works if it's kept up to date
throughout the whole rewrite job, not built once and ignored.

## Building the baseline (Stage 0.5)

For every article currently in the category, extract and log:

- **Specific figures**: dollar amounts, portfolio sizes, tax rates,
  percentages, fees — anything with a concrete number attached.
- **Named scenarios/case studies**: "an investor with a $50,000 portfolio...",
  "a retiree receiving $2,000/month in dividends...", etc. — log the shape of
  the example, not just the numbers in it.
- **Structural skeleton**: the heading sequence of the article, at the level of
  "intro → definition → 3 numbered benefits → FAQ → conclusion." Note which
  articles share the same skeleton.
- **Distinctive phrasing or framing devices** reused across articles (e.g. the
  same analogy, the same opening hook style).

Keep this as a simple running list per category, grouped by type (figures /
scenarios / skeletons / phrasing), not per article — the point is to be able
to quickly check "has this number/scenario/skeleton been used anywhere in this
category" while working on any given article.

## Using the baseline (Stage 3 and Stage 5 of the main pipeline)

- **During research (Stage 3)**: before finalizing a figure or example for the
  article being rewritten, check it against the baseline. If it matches
  something already used, the research isn't done yet — find a genuinely
  different, equally real data point. Do not invent a different-looking number
  to dodge the check; if no different real figure exists, say so rather than
  fabricating one.
- **Before marking an article done (Stage 5, hard gate)**: go through the
  finished draft and confirm every figure, scenario, and the overall skeleton
  against the current baseline. A trivial reword of an existing example (same
  portfolio size, different investor name) still counts as a duplicate — the
  test is whether the underlying data point or scenario shape is genuinely
  new, not whether the sentence is worded differently.

## Updating the baseline

After each article passes Stage 5, add its new figures/scenarios/skeleton to
the baseline immediately, before starting the next article. The baseline is
cumulative across the whole job — article #10 must diverge from articles #1–9
as already-rewritten, not from their original pre-rewrite versions.

## What "different enough" looks like

- Different real numbers pulled from different real sources (not just
  different-looking round numbers).
- Different investor scenarios (different income level, different country of
  origin, different investment type — not just a renamed version of the same
  scenario).
- Varied structure: not every article needs FAQ, not every article needs the
  same three-benefits format. Let the topic and the research dictate structure
  (this is also required independently by article-writer's Stage 4).

## What this does not mean

This isn't about writing the same article with a thesaurus. Two articles
covering genuinely different keywords/angles will naturally differ. The
dedup check is there specifically to catch the repeated-example problem, not
to force artificial creativity where the topic itself doesn't call for it.
