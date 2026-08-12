---
slug: sqqq-long-term-decay-explained
title: "Holding SQQQ Long Term: Why the Decay Math Is Worse Than TQQQ's"
description: "SQQQ suffers the same volatility decay as any 3x leveraged fund - but unlike TQQQ, it has no uptrend offsetting the decay, just one working against it."
pubDate: 2026-10-25
updatedDate: 2026-08-06
author: "Tzion S."
categories: ["Strategies"]
tags:
  - "SQQQ long term"
  - "SQQQ decay"
  - "SQQQ buy and hold"
heroImage: "/images/blog/strategies/sqqq-long-term-decay-explained.webp"
heroImageWidth: 840
heroImageHeight: 560
draft: true
readingTime: "7 min read"
featured: false
---

Our [what is SQQQ guide](/strategies/what-is-sqqq-explained/) covers the mechanics: daily reset, -3x target, and the fact that the fund has lost roughly 99.97% of its value since its 2010 launch. This article answers the question that naturally follows - how long is actually "too long" to hold it - and the honest answer involves two separate mathematical effects stacking against SQQQ, not just one.

---

## The Same Decay Formula, a Very Different Outcome

Our [volatility decay deep-dive](/strategies/leveraged-etf-rebalancing-reduce-decay/) lays out the actual math behind daily-reset compounding drag: expected annual decay is approximately proportional to L² times the variance of daily returns, where L is the leverage factor. For a 3x fund, that means decay scales with 9 times the variance, divided by 2 - the same formula whether L is +3 (TQQQ) or -3 (SQQQ), because squaring a negative number produces the same positive result as squaring its positive counterpart. Purely from a volatility-decay standpoint, SQQQ and TQQQ bleed value from choppiness at an identical rate for the same underlying volatility level.

**That's where the similarity ends.** TQQQ is a leveraged bet in the same direction as the Nasdaq-100's dominant long-term trend. Over most multi-year periods, that trend has been up, which means TQQQ's directional exposure has generally worked *with* its leverage, partially offsetting the pure volatility-decay drag with genuine trend-driven gains - which is exactly why TQQQ, despite carrying the same decay formula as SQQQ, has still delivered enormous cumulative returns since its own 2010 launch. SQQQ carries the identical decay formula while betting *against* that same dominant trend. The two effects that fight each other in TQQQ's case - trend versus decay - both point the same direction against SQQQ: down. That's the real reason SQQQ's long-term chart looks so much worse than a simple "same leverage, opposite sign" intuition would predict.

---

## Putting a Number on "How Long"

Using the decay formula directly: at 1% daily volatility (a fairly calm market), a 3x fund faces roughly 0.045% of decay per trading day from the volatility effect alone. At 2% daily volatility - not unusual during an active news cycle - that climbs to roughly 0.18% per day. During genuine market stress, with daily volatility pushing toward 3%, the figure reaches around 0.405% per day.

**For SQQQ specifically, add the trend-headwind effect on top of whatever the pure decay number says.** If the Nasdaq-100 is compounding at a long-run average in the high single digits to low double digits annually - its actual long-run historical average - that translates to a further ongoing drag on SQQQ's value that has nothing to do with volatility at all, purely a function of holding a bet against an index that tends to rise over time. Stack a normal-volatility decay rate of roughly 0.05-0.1% per day on top of a trend headwind and the combined effect over a holding period measured in weeks, let alone months, becomes substantial - which is the mathematical version of what our what-is-SQQQ guide's 2022 example showed empirically: even in SQQQ's best full year on record, the fund still underdelivered relative to a naive 3x-inverse expectation.

**The honest, if unsatisfying, answer to "how many days is too long":** there isn't a single fixed number, because it depends entirely on realized volatility and the direction and magnitude of the underlying trend during your specific holding window - both unknowable in advance. What the math does support clearly is the direction of the relationship: every additional day held compounds both the volatility-decay effect and the trend-headwind effect, and for SQQQ specifically, unlike TQQQ, there's no offsetting force working the other way to partially cancel it out. This is a structural, mathematical reason to think in days, not weeks or months, when using SQQQ - not simply a cautious general suggestion.

---

## A Worked Illustration Over 60 Trading Days

It's worth seeing the two effects combined in a single number rather than described separately. Take a moderate-volatility stretch - 1.5% daily volatility, roughly what a normal, non-crisis market produces - held over 60 trading days, about three calendar months. The pure volatility-decay component at that level works out to roughly 0.10% per trading day (using the same L² × variance / 2 formula from our decay-math guide), which compounds to somewhere in the neighborhood of a 6% drag over 60 sessions purely from choppiness, even if the index ends exactly where it started.

**Now add a trend.** If the Nasdaq-100 drifted up even modestly over that same 60-day stretch - say, a cumulative 5% gain, well within normal quarterly variation for the index - SQQQ's -3x daily exposure means that trend alone works out to roughly a 13-15% additional headwind on top of the volatility-decay figure, compounding daily rather than applying once. Combined, a genuinely unremarkable three-month stretch - modest volatility, modest upward drift, nothing resembling a crisis or even a notable rally - can produce a combined decline in SQQQ well beyond what either effect alone would suggest, and meaningfully worse than what an investor mentally modeling "3x the index's move, inverted" would expect walking in. This is the concrete version of the abstract point above: for SQQQ, ordinary market conditions over an ordinary multi-month window are already working against the position on two separate fronts simultaneously.

---

## ProShares Says This Directly

This isn't a criticism external to the product - ProShares' own disclosure for its leveraged and inverse funds states it plainly: "For any holding period other than a day, your return may be higher or lower than the Daily Target." The fund is built, disclosed, and regulated as a single-day tool. Every day held beyond that is a deliberate departure from what the product is actually designed to deliver precisely, made with the understanding that the deviation - in either direction - grows with time.

---

## What to Use Instead for a Longer Bearish View

**An investor with genuine conviction that the Nasdaq-100 will be lower in three, six, or twelve months** - a fundamentally different position than a short-term tactical trade - has options that don't carry SQQQ's specific structural decay problem. Put options on QQQ itself carry a defined, known cost (the premium paid) rather than an unpredictable, path-dependent decay rate, and that cost doesn't compound daily against the position the way SQQQ's structure does - though options carry their own distinct risks, including time decay working against a long option position and the total loss of premium if the view doesn't play out in time. A shorter-dated SQQQ position, sized appropriately and actively managed rather than held passively, keeps the tool aligned with what it's actually built for. Simply reducing existing long Nasdaq-100 exposure directly - selling some QQQ rather than adding an inverse position on top of it - sidesteps the decay question entirely, at the cost of also giving up the leveraged payoff if the bearish view turns out to be right.

---

## A Note for EU and UK Investors Specifically

SQQQ itself isn't available to most European retail investors at all. Because SQQQ, like other US-listed ETFs, doesn't publish a PRIIPs Key Information Document, EU and UK retail brokers generally can't offer it - the same restriction covered in more depth in our [UCITS vs US-domiciled ETFs guide](/index-funds/ucits-vs-us-domiciled-etfs-tax-comparison/), here applying to a leveraged/inverse product rather than a plain index fund. Unlike QQQ itself, which has straightforward UCITS-compliant Nasdaq-100 trackers available, a European investor wanting this specific -3x inverse exposure isn't simply out of luck: WisdomTree offers a UCITS-eligible equivalent (ticker QQQS/LQQS depending on listing venue), structured as a debt security rather than a traditional fund, targeting the identical -3x daily Nasdaq-100 exposure with a 0.80% total expense ratio - everything covered in this article about daily reset, decay math, and holding-period risk applies to it just as directly as it does to SQQQ itself, since the underlying mechanism is the same.

---

## Bottom Line

SQQQ and TQQQ share the exact same volatility-decay formula, but only one of them gets a favorable long-term trend working to partially offset it. SQQQ's trend headwind and volatility decay compound in the same direction, which is the structural, mathematical reason "how long is too long" has a much shorter answer for SQQQ than it does for its leveraged-long counterpart - measured in days for a genuine tactical trade, not the weeks or months an investor might reasonably consider for a leveraged long position on a fund riding a favorable trend.

---

*This article is for informational purposes only and does not constitute financial advice. Leveraged and inverse ETFs carry substantial risk and are generally unsuitable for extended holding periods. The decay figures described are illustrative applications of a general formula, not a guarantee of any specific fund's future performance. Consult a qualified financial advisor before trading leveraged or inverse products.*

## Related Guides

- [What Is SQQQ? How the 3x Inverse Nasdaq ETF Works](/strategies/what-is-sqqq-explained/)
- [Volatility Decay in Leveraged ETFs: The Math, the Myth, and Four Strategies](/strategies/leveraged-etf-rebalancing-reduce-decay/)
- [Risk Management for Leveraged ETF Investors](/strategies/risk-management-leveraged-etf-investors-2026/)
