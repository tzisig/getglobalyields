---
slug: what-is-sqqq-explained
title: "What Is SQQQ? How the 3x Inverse Nasdaq ETF Actually Works"
description: "SQQQ is built to deliver -3x the Nasdaq-100's daily return, and 'daily' is doing all the work in that sentence. The real mechanics behind the fund, the fact that it's lost 99.97% of its value since 2010, and why that number isn't a warning sign - it's the fund working as designed."
pubDate: 2026-10-22
updatedDate: 2026-08-06
author: "Tzion S."
categories: ["Strategies"]
tags:
  - "what is SQQQ"
  - "SQQQ explained"
  - "how does SQQQ work"
heroImage: "/images/blog/strategies/what-is-sqqq-explained.webp"
heroImageWidth: 840
heroImageHeight: 560
draft: true
readingTime: "7 min read"
featured: false
---

SQQQ is ProShares UltraPro Short QQQ - a fund built to deliver three times the *inverse* of the Nasdaq-100's daily return. If the index falls 1% on a given trading day, SQQQ is designed to rise roughly 3%. If the index rises 1%, SQQQ is designed to fall roughly 3%. That single sentence explains what most people searching "what is SQQQ" actually want to know, and it also explains almost everything about why the fund behaves the way it does over any period longer than a day.

---

## The Word "Daily" Is Not a Minor Detail

SQQQ doesn't promise -3x the Nasdaq-100's return over a week, a month, or a year. It promises -3x the return for a single trading session, then resets. Every day after the market closes, ProShares rebalances the fund's derivative positions - swaps and futures contracts, not short sales of the actual 100 underlying stocks - so that the next trading day starts fresh at the -3x target, calculated against that day's new starting price.

This is the single most important fact about SQQQ, and it's also the thing most new users misunderstand. A fund that resets its target every 24 hours does not behave like a simple "3x short" position held over time. It behaves like 3x-short-for-one-day, repeated, compounding on itself, day after day - and compounding a negative, leveraged daily return produces genuinely different math than most people intuitively expect.

---

## How the Fund Actually Achieves -3x Exposure

SQQQ doesn't hold short positions in the 100 individual Nasdaq-100 companies. Instead, it enters swap agreements and futures contracts with counterparties, sized to deliver the fund's target -3x notional exposure to the index. This is a meaningful structural point: SQQQ's performance depends not just on the Nasdaq-100's price movement but on the fund's ability to enter and unwind these derivative positions efficiently every single day, an operational process that runs continuously regardless of whether any individual investor is paying attention to it.

**One practical consequence worth knowing:** because SQQQ is a registered investment company under the Investment Company Act of 1940 - not a commodity or currency pool structured as a partnership - it issues a standard Form 1099 to shareholders, the same tax document you'd get from QQQ or TQQQ. Some other ProShares products, particularly its volatility, currency, and commodity funds, are structured as partnerships that issue a Schedule K-1 instead - a materially different (and more complicated) tax document. SQQQ isn't one of those. For a non-US investor, the same NRA dividend and capital-gain-distribution withholding framework covered throughout this site's [taxes category](/taxes/) applies to SQQQ exactly as it does to any other US-domiciled RIC ETF.

---

## The Number That Explains Everything: -99.97% Since Inception

SQQQ launched on February 9, 2010. Since then, through mid-2026, the fund has lost approximately 99.97% of its value - not a typo, and not evidence that something went wrong with the fund. It's the daily-reset mechanism working exactly as designed, compounding against a long-term uptrend in the underlying index.

**Three forces combine to produce that number, and it's worth separating them:**

**First, the Nasdaq-100 has spent most of the past 16 years in a long-term uptrend.** A fund engineered to move in the opposite direction of an index, at 3x the daily magnitude, is structurally fighting the dominant trend of its entire existence. Every extended rally in the underlying index is, by design, a period where SQQQ loses value at roughly three times the pace.

**Second, daily compounding of a leveraged inverse position decays value even during periods when the underlying index doesn't go anywhere.** A simplified illustration: if the Nasdaq-100 falls 5% one day and rises 5.3% the next (landing almost back where it started), SQQQ doesn't land back near its starting value either. It moves roughly +15% on the down day, then roughly -15.9% on the up day, and the combination leaves SQQQ meaningfully lower than where it started - even though the underlying index round-tripped close to flat. This mathematical drag exists independent of which direction the index eventually trends, and it compounds every single trading day the fund exists.

**Third, the 0.95% expense ratio is a continuous, guaranteed drag layered on top of both of the above** - smaller in magnitude than the compounding effects, but real, permanent, and unaffected by market conditions.

None of this means SQQQ is a poorly-designed or defective product. It means SQQQ is doing exactly what its prospectus says it does - delivering -3x daily exposure - and that a fund built for single-day exposure, held for 16 years across a dominant bull market, produces a result that looks catastrophic on a since-inception chart while having nothing to do with the fund malfunctioning.

---

## Even SQQQ's Best Year Shows the Decay at Work

2022 is the closest thing SQQQ has had to an ideal environment since launch: a sustained, largely directional decline in the Nasdaq-100 across a full calendar year, with QQQ finishing the year down roughly 32.6% on a total-return basis. If SQQQ delivered a clean, undecayed 3x inverse of that figure, it would have returned somewhere around 98% for the year. It actually returned approximately 82%.

That gap - roughly 16 percentage points of return that a naive "just multiply by three" expectation would have predicted but didn't materialize - is the daily-reset compounding drag showing up even during SQQQ's single best full year on record. 2022 wasn't a smooth, uninterrupted slide; it included real rallies along the way (including a sharp bear-market bounce in the summer), and every one of those up days cost SQQQ more, proportionally, than an equivalent down day gained it back. The fund still delivered a large, genuinely useful gain that year for anyone positioned correctly - but even its best year on record understates what a simple multiple of the index's return would suggest, which is the clearest illustration available of why "SQQQ roughly triples whatever QQQ does, inverted" is a useful first approximation and a genuinely incorrect one over any period longer than a single session.

---

## What SQQQ Is Actually Built For

**SQQQ is a tool for expressing a short-term, high-conviction view that the Nasdaq-100 is about to fall, held for a period measured in days, not years.** Traders use it tactically - as a short-term hedge against a broader portfolio's Nasdaq exposure ahead of a specific known event, or as a directional bet during a period of genuine, sustained decline - and then exit, rather than holding it as a standing position. The since-inception performance above isn't really a critique of that use case; a trader who bought SQQQ for three days during a sharp selloff and sold experienced something completely different from the fund's 16-year chart, because they weren't exposed to 16 years of compounding drag working against them.

**The deeper mechanics of exactly how long is "too long" to hold SQQQ, what the fund has actually done during specific historical drawdowns, and how it compares to alternative ways of expressing the same bearish view** are covered in more depth in our companion guide on [holding SQQQ over longer periods](/strategies/sqqq-long-term-decay-explained/) - this article's job is making sure the underlying mechanism is genuinely understood first, since the "how long to hold" question doesn't make sense without it.

---

## Trading SQQQ in Practice

SQQQ trades on NYSE Arca like any standard ETF, through any brokerage account that offers US market access - no special account type is required to buy shares outright, the same way you'd buy QQQ or any other ETF. Options on SQQQ also trade, for investors looking to express a bearish Nasdaq view through a defined-risk structure rather than the ETF shares directly, though that's a materially different strategy with its own separate risk profile from simply holding shares. With roughly $3 billion in assets under management as of 2026, SQQQ is liquid enough for retail-sized trades to execute without unusual difficulty, though as with any leveraged or inverse product, checking your specific broker's margin and suitability requirements before trading is worth doing directly rather than assuming access is automatic.

---

## Bottom Line

SQQQ delivers exactly what it's built to deliver: three times the inverse of the Nasdaq-100's daily return, reset every trading day. That daily reset is the entire story - it's why the fund can move sharply in your favor during a short, sharp decline, and it's also the mechanical reason SQQQ has lost 99.97% of its value since its 2010 launch despite the Nasdaq-100 falling plenty of times along the way. Understanding that the daily reset, not any flaw in the product, produces both outcomes is the actual prerequisite for deciding whether and how to use SQQQ at all.

---

*This article is for informational purposes only and does not constitute financial or investment advice. Leveraged and inverse ETFs carry substantial risk and are generally unsuitable for long-term holding. Historical performance figures do not predict future results. Consult a qualified financial advisor before trading leveraged or inverse products.*

## Related Guides

- [Holding SQQQ Over the Long Term: The Decay Math](/strategies/sqqq-long-term-decay-explained/)
- [QQQ vs SPY: Nasdaq-100 vs S&P 500](/index-funds/qqq-vs-spy-nasdaq-100-sp500-comparison/)
- [Why TQQQ and QQQ Aren't Truly Diversified From Each Other](/strategies/why-tqqq-qqq-not-diversified/)
