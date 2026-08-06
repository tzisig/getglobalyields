---
slug: covered-calls-vs-cash-secured-puts-compared
title: "Covered Calls vs Cash-Secured Puts: Which Income Strategy Fits You"
description: "Both strategies collect option premium with defined risk, and both show up constantly in options-income content as if they're interchangeable. They aren't - they require different starting positions, suit different situations, and carry a genuinely different tax and capital-efficiency picture worth understanding fully."
pubDate: 2026-09-16
updatedDate: 2026-08-06
author: "Tzion S."
categories: ["Options Income"]
keywords: "covered calls vs cash secured puts, which options income strategy, covered call vs put selling comparison"
tags:
  - "covered calls vs cash secured puts"
  - "which options income strategy"
  - "covered call vs put selling"
heroImage: "/images/blog/options-income/covered-calls-vs-cash-secured-puts.webp"
heroImageWidth: 840
heroImageHeight: 560
draft: true
readingTime: "11 min read"
featured: false
---

> **Before you read further:** This article compares covered calls and cash-secured puts as income strategies. It is educational content, not a trading recommendation. Options trading involves the risk of significant financial loss.

[Covered calls](/options-income/selling-covered-calls-tqqq/) and [cash-secured puts](/options-income/cash-secured-puts-high-iv/) are the two foundational strategies behind virtually everything else in this category - the [wheel strategy](/options-income/wheel-strategy-tqqq/) is literally just alternating between them. They get discussed together so often that it's easy to lose track of what actually distinguishes them and when one genuinely suits your situation better than the other.

---

## The Core Difference: What You Start With

**A covered call requires owning the underlying shares already.** You sell a call against stock you hold, collecting premium in exchange for capping your upside at the strike price. This is a strategy for someone who already owns TQQQ (or is buying it specifically to run this strategy) and wants to generate income against that existing position.

**A cash-secured put requires cash, not shares.** You sell a put and set aside enough cash to buy the shares if assigned, collecting premium in exchange for taking on the obligation to buy at the strike price if the stock falls below it. This is a strategy for someone who does not yet own the shares but is willing to buy them at a specific (lower) price if the market comes to them.

---

## The Practical Question Each One Answers

**"I own TQQQ and want to generate income from it"** → covered call. You're monetizing an existing position, accepting a capped upside in exchange for premium.

**"I want to own TQQQ, but only at a lower price than today's"** → cash-secured put. You're getting paid to wait for a price you'd be happy to buy at, with the premium serving as a small consolation if the price never gets there and the put simply expires worthless.

---

## Risk Profile Comparison

**Covered call:** your downside risk is the same as owning the shares outright (TQQQ can fall to zero, in the extreme case), partially offset by the premium collected. Your upside is capped at the strike price plus premium - if TQQQ rallies sharply past your strike, you miss out on gains beyond that point, since your shares get called away.

**Cash-secured put:** your downside risk is buying shares at the strike price even if the market price has fallen well below it, partially offset by the premium collected (your effective cost basis is the strike minus the premium). Your upside is capped at the premium collected - if TQQQ rallies, the put simply expires worthless and you keep the (comparatively modest) premium, without participating in the rally the way owning shares outright would have.

**A subtlety worth noting:** these two strategies have very similar risk profiles in practice - a covered call's payoff diagram and a cash-secured put's payoff diagram at the same strike are close to mirror images of each other, a relationship options traders call put-call parity. The meaningful practical difference is less about raw risk and more about what you start with (shares vs. cash) and which direction you're trying to transition (owning to income-generating, or cash to owning).

---

## Capital Efficiency: A Real, Practical Difference

**A covered call requires the full capital of 100 shares tied up in the underlying position** - $8,500 at a TQQQ price of $85. **A cash-secured put requires cash set aside equal to the strike price times 100 shares**, which, for an out-of-the-money strike below the current price, means a somewhat smaller capital commitment than owning the shares outright at the current market price. This is a genuine, though often overlooked, practical difference: a cash-secured put at a $75 strike ties up $7,500 rather than the $8,500 a covered call on the same TQQQ position at $85 would require.

**Cash set aside for a cash-secured put can, in some cases, earn interest while waiting** - depending on your broker's specific cash-yield structure, covered in more detail in our [multi-currency accounts guide](/us-investing/multi-currency-investment-accounts/) - a modest additional consideration that doesn't apply to shares already deployed in a covered call position, which don't generate a separate interest yield the way uninvested cash can.

---

## The International Investor's Tax Layer

**Both strategies generally fall under the same NRA capital gains framework covered in our [options trading tax treatment guide](/taxes/options-trading-tax-treatment-non-us-residents/)** - the premium collected from either strategy is generally untaxed by the US for a non-resident alien absent effectively connected income or the 183-day presence test. Where the two can differ practically: a covered call's underlying shares may generate dividend income (subject to standard NRA withholding, covered in our [main dividend withholding guide](/taxes/taxes-us-dividends-foreign-investors/)) while the position is held, whereas a cash-secured put's cash collateral doesn't generate dividend income - only whatever interest yield your broker pays on the cash balance, if any, which follows different tax characterization than dividend income.

---

## Which Actually Suits You

**You already hold TQQQ shares and want income from them without selling:** covered calls are the direct tool, and this is the more common starting point for investors already following the [strategies category](/strategies/)'s buy-and-hold approach.

**You're sitting in cash, want TQQQ exposure, but think the current price is a bit high:** cash-secured puts let you get paid while waiting for a better entry point - though be honest with yourself about whether the strike you're selling actually reflects a price you'd be happy to own at, not just the strike with the fattest premium.

**You want to run both, cycling between them as assignment happens:** this is the [wheel strategy](/options-income/wheel-strategy-tqqq/), covered in detail separately, with its own specific risk considerations on a leveraged ETF like TQQQ.

---

## Frequently Asked Questions

**Can I run both strategies simultaneously on different portions of my portfolio?**
Yes - there's no structural reason you couldn't run a covered call on shares you already own while separately running a cash-secured put with different cash you're holding, treating them as two independent positions rather than an either-or choice, though each still requires its own dedicated capital or shares.

**Does one strategy carry more early assignment risk than the other?**
Both carry the same general early assignment mechanics covered in our [options assignment risk guide](/options-income/options-assignment-risk-international-investors/), including the dividend-related early assignment consideration specific to short calls near ex-dividend dates - a factor that applies to the covered call side but not to cash-secured puts, since early exercise of a put isn't driven by the same dividend-capture incentive.

**Is one strategy generally considered more beginner-friendly than the other?**
Covered calls are sometimes considered slightly more intuitive for newer options traders, since the underlying mechanic (you own something, you sell the right to buy it from you) maps closely to a familiar ownership concept - but both strategies are commonly grouped together as foundational, defined-risk starting points in most options education, including throughout this site.

**Does the choice between the two affect which options approval level I need?**
No - both covered calls and cash-secured puts are typically grouped within the same, most basic options approval tier, covered in more detail in our [options level approval guide](/options-income/options-level-approval-international-investors/), since both carry defined, bounded risk from the broker's perspective.

---

## Practical Checklist

- [ ] Confirm which starting position you actually have - shares (covered call) or cash you're willing to deploy (cash-secured put) - before choosing between them
- [ ] For cash-secured puts, choose a strike that genuinely represents a price you'd want to own the stock at, not simply the highest-premium option available
- [ ] For covered calls, choose a strike that genuinely represents a price you'd be comfortable selling at, for the same reason
- [ ] Compare the capital efficiency difference (cash-secured put collateral vs. full share ownership) for your specific strike selection
- [ ] Remember both strategies cap your upside in exchange for premium - neither is a way to collect income with no trade-off against potential gains

---

## Bottom Line

Covered calls and cash-secured puts are two sides of the same underlying idea - collecting premium in exchange for a defined obligation - distinguished mainly by what you start with and which direction you're moving between cash and shares. Neither is inherently better; the right choice depends entirely on whether you already hold the shares and want income from them, or hold cash and want a disciplined, paid way to wait for a specific entry price, with capital efficiency and dividend exposure as secondary but genuinely practical factors worth weighing.

---

*This article is for informational purposes only and does not constitute financial or trading advice. Options trading carries substantial risk of loss and is not suitable for all investors. Consult a licensed financial advisor before implementing any options strategy.*

## Related Guides

- [Selling Covered Calls on TQQQ](/options-income/selling-covered-calls-tqqq/)
- [Cash-Secured Puts in High IV Environments](/options-income/cash-secured-puts-high-iv/)
- [The Wheel Strategy on TQQQ](/options-income/wheel-strategy-tqqq/)
