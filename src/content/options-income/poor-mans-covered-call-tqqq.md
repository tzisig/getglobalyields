---
slug: poor-mans-covered-call-tqqq
title: "The Poor Man's Covered Call on TQQQ Explained (2026)"
description: "A poor man's covered call swaps 100 shares for a deep ITM LEAPS call, needing less capital. On TQQQ it stacks two leverage sources - tax and rolling explained."
pubDate: 2026-09-09
updatedDate: 2026-08-06
author: "Tzion S."
categories: ["Options Income"]
tags:
  - "poor mans covered call TQQQ"
  - "PMCC TQQQ strategy"
  - "diagonal spread TQQQ options"
heroImage: "/images/blog/options-income/poor-mans-covered-call-tqqq.webp"
heroImageWidth: 840
heroImageHeight: 560
draft: true
readingTime: "12 min read"
featured: false
---

> **Before you read further:** This article explains the poor man's covered call (PMCC) strategy on TQQQ and how it differs meaningfully from a traditional covered call in terms of capital, risk, and leverage. It is educational content, not a trading recommendation. Options trading involves the risk of significant financial loss.

A traditional [covered call](/options-income/selling-covered-calls-tqqq/) requires owning 100 shares of the underlying - $8,500 at a TQQQ price of $85. The "poor man's" version replaces those 100 shares with a deep-in-the-money [LEAPS call](/options-income/leaps-options-strategy-tqqq/) instead, cutting the capital requirement substantially while aiming to replicate a similar income structure. On TQQQ specifically, that substitution changes the strategy's actual risk profile more than it might on a calmer underlying.

---

## How the Structure Works

A poor man's covered call (PMCC), also known as a diagonal spread, combines two legs:

1. **Buy a deep-in-the-money LEAPS call** - far enough in the money that it behaves similarly to owning the shares, with high delta and mostly intrinsic value rather than time value
2. **Sell a shorter-dated call** against that LEAPS position, at a strike above the current price - the same short-call leg used in a traditional covered call, just written against the LEAPS instead of against actual shares

The premium collected from the short call is the "income" side of the trade, same as a traditional covered call. The difference is what backs that short call: a leveraged options position instead of outright share ownership.

---

## Why This Matters More on TQQQ Than on a Typical Stock

**The LEAPS leg is itself more leveraged and more expensive on TQQQ**, for the reasons covered in our [TQQQ LEAPS guide](/options-income/leaps-options-strategy-tqqq/) - TQQQ's elevated implied volatility inflates LEAPS pricing, and the option's own delta-driven leverage compounds with TQQQ's built-in 3x structure. A PMCC on TQQQ is not "a cheaper covered call" in the way it might be framed on a lower-volatility stock - it is a leveraged options position with a covered-call-style income overlay layered on top.

**Assignment risk on the short call works differently.** In a traditional covered call, assignment simply means selling shares you already own - a clean, bounded outcome. In a PMCC, if the short call is assigned, you need to deliver shares you don't actually hold; this typically requires exercising the long LEAPS call (or selling it and buying shares) to cover the obligation, an extra mechanical step that can involve additional cost or a less favorable execution than a traditional covered call's straightforward share delivery, covered in more depth in our [options assignment risk guide](/options-income/options-assignment-risk-international-investors/).

**The LEAPS leg still has an expiration date.** Unlike genuine share ownership, the entire position has a finite life determined by the LEAPS expiration - a structural difference from a traditional covered call, which can be run indefinitely against a permanent share position.

---

## A Worked Comparison

**Traditional covered call:** own 100 TQQQ shares ($8,500 at $85/share), sell a 30-day call against them, collect premium. Capital required: $8,500.

**Poor man's covered call:** buy a 2-year LEAPS call at a deep-in-the-money strike (perhaps $2,000-$2,500 depending on implied volatility), sell the same 30-day call against the LEAPS position, collect the same premium. Capital required: roughly a quarter of the traditional approach.

**What the capital savings doesn't capture:** the LEAPS leg's own time decay, the compounded leverage on TQQQ's underlying moves, and the more complex assignment-handling mechanics if the short call goes in-the-money. The lower capital requirement is real. The risk reduction implied by "poor man's" in the name is not automatic - it depends entirely on how the position is sized and managed.

---

## Repeated Short-Call Cycles Against a Single LEAPS Position

**The typical way a PMCC generates ongoing income is by selling a new short call repeatedly - monthly, for instance - against the same underlying LEAPS leg**, similar to how a traditional covered call seller might roll their short call each cycle against permanently held shares. Each cycle's premium is collected the same way, but the LEAPS leg's own value is simultaneously eroding through time decay as expiration approaches, an ongoing cost the traditional covered call's permanent share position doesn't carry.

**This means the strategy's total return needs to account for both the cumulative short-call premium collected and the LEAPS leg's own value trajectory over the same period** - a genuinely more complex accounting exercise than tracking a traditional covered call's premium income against a stable underlying share position. An investor who tracks only the premium collected, without separately monitoring the LEAPS leg's own value erosion, can end up with an incomplete and overly optimistic picture of the strategy's actual performance.

---

## The International Investor's Layer: Tax and Documentation

**Both legs of a PMCC - the LEAPS gains/losses and the short-call premium - generally fall under the same NRA capital gains framework covered in our [options trading tax treatment guide](/taxes/options-trading-tax-treatment-non-us-residents/)**, generally untaxed by the US for a non-resident alien absent effectively connected income or the 183-day presence test. The multi-leg nature of the strategy doesn't change this underlying principle, though it does mean more individual transactions to track and reconcile on your own records, since the LEAPS leg and each cycle of the short call are separate transactions with their own cost basis and outcome.

**Confirm your specific broker correctly reports each leg separately** and that your own tracking captures the full picture across both legs, rather than only the more frequently occurring short-call premium - a genuinely easy thing to under-track given how much more often the short-call leg generates activity compared to the LEAPS leg, which may sit unchanged for months between adjustments.

---

## Who This Actually Suits

A PMCC on TQQQ suits an options-experienced trader who specifically wants covered-call-style income exposure without committing the full capital a traditional covered call requires, and who fully understands the compounded leverage and expiration mechanics involved. It does not suit an investor looking for a lower-risk or simpler alternative to owning shares outright - it is a different, more complex position, not a discount version of the same one.

---

## Frequently Asked Questions

**Can the LEAPS leg itself be assigned or exercised early?**
Early exercise of a long LEAPS position is a decision made by you, the holder, not something that happens to you automatically - unlike the short call leg, which can be assigned against your will if it goes in the money, the LEAPS leg's exercise timing is entirely your own choice.

**Does a PMCC require a different options approval level than a traditional covered call?**
Generally yes - because a PMCC combines a long options position with a short options position in a diagonal spread structure, it typically requires a higher options approval tier than a simple covered call, covered in more detail in our [options level approval guide](/options-income/options-level-approval-international-investors/), worth confirming with your specific broker before assuming you're already approved for this strategy.

**What happens to the position if the LEAPS leg's value declines significantly while the short-call cycles continue generating premium?**
This is a genuine risk scenario worth planning for - the cumulative short-call premium collected over time may not fully offset a significant decline in the LEAPS leg's value, particularly if TQQQ moves against the position's overall directional bias; this is exactly the kind of scenario where tracking both legs together, rather than focusing only on premium collected, matters most.

**Is a PMCC ever preferable to simply buying TQQQ shares outright and selling calls against them, for an investor who does have the full capital available?**
For an investor who genuinely has the capital for a traditional covered call, the added complexity, expiration risk, and compounded leverage of a PMCC generally isn't worth taking on purely for capital efficiency they don't actually need - the PMCC's real value proposition is specifically for investors capital-constrained relative to TQQQ's share price, not a generally superior structure for investors who could do either.

---

## Practical Considerations

- **Choose the LEAPS strike and expiration deliberately** - deeper in the money means higher delta (closer to share-like behavior) but higher upfront cost; less far in the money means lower cost but less share-like behavior and more sensitivity to the LEAPS' own time decay.
- **Have a specific plan for assignment on the short call**, since covering it requires action on the LEAPS leg rather than simply delivering shares.
- **Track the LEAPS expiration separately from the ongoing short-call cycle** - the overall position has a finite life even though you may be selling calls against it repeatedly.
- **Track both legs' performance together**, not just the more frequent short-call premium, to get an accurate picture of the strategy's total return.

---

## Bottom Line

The poor man's covered call genuinely reduces the capital required to run a covered-call-style income strategy - but on TQQQ specifically, it does so by substituting an already-more-leveraged position for straightforward share ownership, not by reducing risk proportionally to the capital saved. Treat the name as a description of the capital requirement, not a description of the risk level, and track both legs of the position together to get an accurate picture of actual performance.

---

*This article is for informational purposes only and does not constitute financial or trading advice. Options trading carries substantial risk of loss and is not suitable for all investors. Consult a licensed financial advisor before implementing any options strategy.*

## Related Guides

- [LEAPS on TQQQ: Long-Term Options Strategy Guide](/options-income/leaps-options-strategy-tqqq/)
- [Selling Covered Calls on TQQQ](/options-income/selling-covered-calls-tqqq/)
- [Options Assignment Risk for International Investors](/options-income/options-assignment-risk-international-investors/)
