---
slug: tax-loss-harvesting-tqqq-qqq
title: "Tax-Loss Harvesting with TQQQ and QQQ: Swapping Without Losing Exposure"
description: "Tax-loss harvesting means realizing a loss for tax purposes while maintaining similar market exposure. TQQQ and QQQ's shared underlying index makes them a natural, though not risk-free, swap pair for this technique - a worked example, the wash sale gray area, and what to know before using it."
pubDate: 2026-09-21
updatedDate: 2026-08-06
author: "Tzion S."
categories: ["Strategies"]
tags:
  - "tax loss harvesting TQQQ QQQ"
  - "TQQQ tax loss swap strategy"
  - "wash sale rule leveraged ETF"
heroImage: "/images/blog/strategies/tax-loss-harvesting-tqqq-qqq.webp"
heroImageWidth: 840
heroImageHeight: 560
draft: true
readingTime: "11 min read"
featured: false
---

Tax-loss harvesting - selling a position at a loss to realize that loss for tax purposes, while replacing it with a similar (but not "substantially identical") position to maintain market exposure - is a well-established technique in US domestic tax planning. Whether and how it applies to you as an international investor depends entirely on your own country's tax rules, but the mechanics of the swap itself, and TQQQ/QQQ's relationship to each other, are worth understanding regardless of which tax system you're operating under.

---

## The Basic Mechanic

If a position has fallen in value, selling it locks in a realized loss, which - depending on your country's tax rules - may be usable to offset realized gains elsewhere in your portfolio, reducing your overall tax bill for the year. The challenge: simply holding cash after the sale means missing any subsequent recovery in the position. Tax-loss harvesting solves this by immediately replacing the sold position with something similar enough to maintain market exposure, while different enough to count as a genuinely new position for tax purposes rather than the same one.

**Whether this technique applies to you at all depends on your country's tax system.** Many countries covered throughout this site's [taxes category](/taxes/) do not tax capital gains and losses the same way the US domestic system does for its own residents - some have flat rates with different loss-offsetting rules, some have holding-period-based distinctions, and some (like Colombia's two-year ganancia ocasional threshold, covered in our [Colombia investing guide](/us-investing/how-to-invest-in-us-stocks-from-colombia/)) have entirely different mechanics. Confirm whether loss-harvesting is even a relevant concept under your specific country's tax rules before planning around it.

---

## Why TQQQ and QQQ Are a Natural Swap Pair

Both track the identical underlying index - the Nasdaq-100 - as covered in detail in our [TQQQ/QQQ diversification guide](/strategies/why-tqqq-qqq-not-diversified/). This shared underlying exposure is exactly what makes them a candidate swap pair for loss harvesting: selling a losing TQQQ position and immediately buying QQQ (or vice versa) maintains meaningful exposure to the same underlying index while technically being a different security.

**A worked example of the mechanic:** an investor holding TQQQ purchased at $110/share, now worth $70/share, has a $40/share unrealized loss. Selling the position realizes that loss for tax purposes (subject to whatever loss-offsetting rules apply in the investor's own country). Immediately buying QQQ with the proceeds maintains Nasdaq-100 exposure going forward - though, as discussed below, at a meaningfully different leverage level than the original TQQQ position, which is the key trade-off this technique involves.

---

## The US Wash Sale Rule - Relevant Mainly to US Taxpayers

The US wash sale rule (IRC §1091) disallows a loss deduction if you buy a "substantially identical" security within 30 days before or after the sale that generated the loss. **This rule specifically applies to US taxpayers filing US returns** - it is not a rule that most non-US investors' home countries impose in the same form, though some countries have their own analogous anti-abuse provisions worth checking separately.

**Whether TQQQ and QQQ count as "substantially identical" under the US wash sale rule has not been definitively tested in a way this guide can confirm with certainty** - they track the same index but have meaningfully different structures (leveraged vs. unleveraged, different expense ratios, different daily rebalancing mechanics), which is generally understood to support treating them as sufficiently different, but this is genuinely a gray area rather than a clearly settled question. **This matters specifically to US citizens, green card holders, or anyone else who files a US tax return** - which describes a meaningful subset of readers on an international-investor site, given how many countries' residents include US persons living abroad. If this applies to you, get current advice from a US tax professional rather than assuming TQQQ/QQQ swaps are automatically wash-sale-safe.

---

## QQQM as a Third Swap Candidate

**QQQM, covered in our [QQQ vs QQQM vs VGT comparison](/strategies/qqq-vs-qqqm-vs-vgt-comparison/), tracks the identical Nasdaq-100 index as QQQ**, meaning it's mechanically another candidate swap partner alongside QQQ itself. For a US taxpayer specifically concerned about the wash-sale gray area between TQQQ and QQQ, swapping TQQQ into a different index entirely (rather than any Nasdaq-100-tracking fund, whether QQQ or QQQM) would more clearly sidestep the "substantially identical" question, since the underlying index itself would genuinely differ - though this comes at the cost of not maintaining Nasdaq-100-specific exposure, which may or may not be an acceptable trade-off depending on your investment goals.

---

## What This Swap Does and Doesn't Preserve

**Preserves:** general exposure to the Nasdaq-100's overall direction and the mega-cap technology concentration that defines the index.

**Does not preserve:** your original leverage level. Swapping TQQQ for QQQ (or the reverse) changes your effective leverage substantially - this is a real portfolio change, not a like-for-like substitution, and should be sized and understood as such rather than treated as a purely mechanical tax move with no investment-exposure consequence. An investor who swaps their entire TQQQ position into QQQ has meaningfully de-risked their portfolio (moving from 3x to 1x leverage), not simply executed a tax-neutral substitution - worth being deliberate about whether that leverage change is actually intended, or whether a subsequent swap back into TQQQ (respecting any applicable wash-sale timing) is part of the plan.

---

## Frequently Asked Questions

**Does the swap need to happen on the same day as the loss-generating sale?**
For a US taxpayer navigating the wash sale rule's 30-day window, timing matters specifically to that rule's mechanics - but for a non-US investor whose country doesn't impose an equivalent restriction, the timing of the replacement purchase is more a market-exposure consideration (how long you're willing to be out of the market) than a tax-rule-driven requirement.

**Is there a minimum loss size that makes this technique worthwhile?**
This depends on your own transaction costs and the specific tax benefit available under your country's rules - a very small loss may not justify the transaction costs of executing the swap, while a larger loss with a meaningful available tax benefit under your country's system makes the technique more clearly worthwhile; there's no universal dollar threshold this guide can responsibly provide.

**Can this technique be used repeatedly throughout the year as TQQQ's price fluctuates?**
In principle, yes, subject to your specific country's rules on how frequently losses can be harvested and any anti-abuse provisions that might apply - though repeated swapping also means more frequent leverage-level changes (per the point above) and more transaction costs, worth weighing against the incremental tax benefit of each additional harvest.

**Does this swap technique interact with the currency-conversion considerations covered elsewhere on this site?**
Not directly, since the swap is typically executed entirely within the USD-denominated brokerage account without a currency conversion step - but if the swap changes your overall cash needs or timing (for instance, if you need to add cash to fully replace the sold position), the standard currency-banking considerations covered throughout this site would apply the same way they would to any other funding event.

---

## Practical Checklist

- [ ] Confirm whether loss-harvesting is a relevant concept under your specific country's tax system before planning around it - many countries' rules work differently from the US domestic framework
- [ ] If you are a US person (citizen, green card holder, or otherwise required to file US returns) considering a TQQQ/QQQ swap, get current advice on the wash sale rule's application to this specific pair, since it is not definitively settled
- [ ] Consider QQQM as an alternative swap candidate to QQQ, and consider swapping into a genuinely different index if avoiding any wash-sale ambiguity is a priority
- [ ] Understand that swapping between TQQQ and QQQ changes your effective leverage level, not just your tax lot - size the resulting position deliberately
- [ ] Keep clear records of the swap timing and rationale, useful for both tax documentation and your own future reference

---

## Bottom Line

TQQQ and QQQ's shared underlying index makes them a natural pair for maintaining Nasdaq-100 exposure through a tax-loss-harvesting swap, but this technique's actual tax benefit depends entirely on your country's specific rules - and for US taxpayers specifically, the wash sale rule's application to this exact pair is a genuine gray area worth professional confirmation rather than assumption. Whichever swap partner you choose, recognize that you're deliberately changing your leverage level, not executing a purely mechanical, exposure-neutral tax move.

---

*This article is for informational purposes only and does not constitute tax or financial advice. Tax-loss harvesting rules vary significantly by country, and the US wash sale rule's application to TQQQ/QQQ swaps specifically has not been definitively confirmed by this guide. Consult a qualified tax professional in your country of residence before implementing this technique.*

## Related Guides

- [Why TQQQ and QQQ Aren't Truly Diversified From Each Other](/strategies/why-tqqq-qqq-not-diversified/)
- [QQQ vs QQQM vs VGT: Choosing a Core Tech Holding](/strategies/qqq-vs-qqqm-vs-vgt-comparison/)
- [TQQQ Tax Guide for International Investors](/taxes/tqqq-tax-international-investors/)
