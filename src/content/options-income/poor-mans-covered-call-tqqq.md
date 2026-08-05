---
slug: poor-mans-covered-call-tqqq
title: "The Poor Man's Covered Call on TQQQ Explained (2026)"
description: "A poor man's covered call replaces the 100 shares in a traditional covered call with a deep-in-the-money LEAPS call, requiring far less capital. On TQQQ, this means combining two separate leverage sources in one position - here's exactly what that changes."
pubDate: 2026-08-24
updatedDate: 2026-08-05
author: "Tzion S."
categories: ["Options Income"]
keywords: "poor mans covered call TQQQ, PMCC TQQQ strategy, diagonal spread TQQQ options, LEAPS covered call alternative"
tags:
  - "poor mans covered call TQQQ"
  - "PMCC TQQQ strategy"
  - "diagonal spread TQQQ options"
heroImage: "/images/blog/options-income/poor-mans-covered-call-tqqq.webp"
heroImageWidth: 840
heroImageHeight: 560
draft: true
readingTime: "10 min read"
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

**Assignment risk on the short call works differently.** In a traditional covered call, assignment simply means selling shares you already own - a clean, bounded outcome. In a PMCC, if the short call is assigned, you need to deliver shares you don't actually hold; this typically requires exercising the long LEAPS call (or selling it and buying shares) to cover the obligation, an extra mechanical step that can involve additional cost or a less favorable execution than a traditional covered call's straightforward share delivery.

**The LEAPS leg still has an expiration date.** Unlike genuine share ownership, the entire position has a finite life determined by the LEAPS expiration - a structural difference from a traditional covered call, which can be run indefinitely against a permanent share position.

---

## A Worked Comparison

**Traditional covered call:** own 100 TQQQ shares ($8,500 at $85/share), sell a 30-day call against them, collect premium. Capital required: $8,500.

**Poor man's covered call:** buy a 2-year LEAPS call at a deep-in-the-money strike (perhaps $2,000-$2,500 depending on implied volatility), sell the same 30-day call against the LEAPS position, collect the same premium. Capital required: roughly a quarter of the traditional approach.

**What the capital savings doesn't capture:** the LEAPS leg's own time decay, the compounded leverage on TQQQ's underlying moves, and the more complex assignment-handling mechanics if the short call goes in-the-money. The lower capital requirement is real. The risk reduction implied by "poor man's" in the name is not automatic - it depends entirely on how the position is sized and managed.

---

## Who This Actually Suits

A PMCC on TQQQ suits an options-experienced trader who specifically wants covered-call-style income exposure without committing the full capital a traditional covered call requires, and who fully understands the compounded leverage and expiration mechanics involved. It does not suit an investor looking for a lower-risk or simpler alternative to owning shares outright - it is a different, more complex position, not a discount version of the same one.

---

## Practical Considerations

- **Choose the LEAPS strike and expiration deliberately** - deeper in the money means higher delta (closer to share-like behavior) but higher upfront cost; less far in the money means lower cost but less share-like behavior and more sensitivity to the LEAPS' own time decay.
- **Have a specific plan for assignment on the short call**, since covering it requires action on the LEAPS leg rather than simply delivering shares.
- **Track the LEAPS expiration separately from the ongoing short-call cycle** - the overall position has a finite life even though you may be selling calls against it repeatedly.

---

## Bottom Line

The poor man's covered call genuinely reduces the capital required to run a covered-call-style income strategy - but on TQQQ specifically, it does so by substituting an already-more-leveraged position for straightforward share ownership, not by reducing risk proportionally to the capital saved. Treat the name as a description of the capital requirement, not a description of the risk level.

---

*This article is for informational purposes only and does not constitute financial or trading advice. Options trading carries substantial risk of loss and is not suitable for all investors. Consult a licensed financial advisor before implementing any options strategy.*

## Related Guides

- [LEAPS on TQQQ: Long-Term Options Strategy Guide](/options-income/leaps-options-strategy-tqqq/)
- [Selling Covered Calls on TQQQ](/options-income/selling-covered-calls-tqqq/)
- [TQQQ Implied Volatility Strategies](/options-income/tqqq-implied-volatility-strategies/)
