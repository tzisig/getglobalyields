# Keyword viability check

Goal: decide whether an article's target keyword is worth keeping, using only
signals you can actually back up — never a fabricated search-volume number.

## Priority order for demand data

1. **User-supplied real data.** If the user provides Keyword Planner exports,
   GSC impressions/clicks/position for the existing keyword, Ahrefs/Semrush
   data, or output from their own automated tooling — use it directly and cite
   it as such ("per the GSC data you provided, this keyword gets ~X
   impressions/month"). This is the only case where you may state or imply an
   actual volume number.
2. **No real data available.** Do not guess a number. Instead, produce a
   **relative, clearly-labeled estimate** built from:
   - **Google Trends** — real, retrievable interest-over-time signal (relative
     0–100 scale, not absolute volume). Compare the candidate keyword against
     2–3 known-reasonable reference terms in the same niche to give the number
     context.
   - **Autocomplete + "People Also Ask" breadth** — how many distinct real
     queries cluster around this topic. More real variations suggests more
     actual search interest; a term with no autocomplete/PAA activity at all is
     a signal of low demand, not just "unclear."
   - Label the output explicitly, every time: *"Relative demand estimate (not
     a search-volume number): ..."* Never drop the qualifier in later stages of
     the pipeline, even in summaries.

## Competition assessment (this one can be assessed directly, no tool needed)

Look at who currently ranks for the keyword:
- How many of the top 10 results are high-authority, purpose-built pages on
  exactly this query (vs. tangential mentions on broad pages)?
- Is there already a comprehensive, well-sourced, non-templated answer in the
  top 3? If yes, competition is high regardless of who the domains are.
- Are the top results from sites with an obvious authority/scale advantage
  (major financial publishers, government sites) that a smaller site can't
  realistically out-rank without a genuinely different angle?

Rate competition as Low / Medium / High with a one-line reason tied to what you
actually observed in the SERP — not a generic "this seems competitive."

## Decision

- **Demand present (by either data source) + Low/Medium competition** → keep
  or confirm the keyword.
- **Demand present + High competition** → only keep it if Stage 2 (Angle) in
  the main pipeline can name a real differentiator; otherwise treat as a fail.
- **No real demand signal** (no Trends signal, thin/no autocomplete-PAA
  activity, and no user-supplied data) → fail. Propose alternatives.
- **Fails** → propose 2–3 alternative keywords in the same topic area, each
  with the same labeled demand estimate and competition rating, and stop for
  the user's confirmation before proceeding — a keyword change can require a
  slug change, which affects the live URL.

## What never to do

- Never state a specific number of monthly searches unless it came directly
  from user-supplied real data.
- Never silently swap the keyword and continue writing without the user
  confirming — this is a live-site/SEO-equity decision, not a stylistic one.
- Never treat "I couldn't find good demand signals" as the same thing as "this
  keyword definitely has no demand" — say what you actually found and let the
  user weigh in if it's a close call.
