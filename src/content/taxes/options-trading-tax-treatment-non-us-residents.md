---
slug: options-trading-tax-treatment-non-us-residents
title: "Options Trading Tax Treatment for Non-US Residents"
description: "Selling covered calls, cash-secured puts, or trading options generally does not trigger US withholding for non-US investors - premium income is treated as capital gain, not FDAP income. The mechanics, the 183-day exception, and what your home country still taxes."
pubDate: 2026-09-22
updatedDate: 2026-08-05
author: "Tzion Sigron"
categories: ["Taxes"]
tags:
  - "options trading tax non-US residents"
  - "options premium tax nonresident alien"
  - "covered call tax foreign investor"
heroImage: "/images/blog/taxes/options-trading-tax-treatment-non-us-residents.webp"
heroImageWidth: 840
heroImageHeight: 560
draft: true
readingTime: "9 min read"
featured: false
seo:
  metaTitle: "Options Trading Tax Treatment for Non-US Residents (2026)"
  metaDescription: "Options premium income is generally treated as capital gain for non-US investors, not FDAP income subject to withholding. The mechanics of covered calls, cash-secured puts, and the 183-day exception."
  ogTitle: "Options Trading Tax Treatment for Non-US Residents (2026)"
  ogDescription: "Options premium income is generally treated as capital gain for non-US investors, not FDAP income subject to withholding. The mechanics of covered calls, cash-secured puts, and the 183-day exception."
  ogImage: "/images/blog/taxes/options-trading-tax-non-us-residents.webp"
  twitterCard: "summary_large_image"
schema:
  type: "article"
  headline: "Options Trading Tax Treatment for Non-US Residents (2026)"
  description: "Options premium income is generally treated as capital gain for non-US investors, not FDAP income subject to withholding. The mechanics of covered calls, cash-secured puts, and the 183-day exception."
  author: "Tzion Sigron"
  datePublished: "2026-08-05"
  dateModified: "2026-08-05"
  image: "/images/blog/taxes/options-trading-tax-non-us-residents.webp"
  mainEntityOfPage: "https://getglobalyields.com/taxes/options-trading-tax-treatment-non-us-residents"
---

If you sell covered calls or cash-secured puts on US stocks and ETFs as a non-US investor - a strategy covered extensively in our [options-income category](/options-income/) - you may have noticed that your broker does not withhold anything from the premium you collect, unlike the withholding applied to dividends. This is not an oversight. Options premium income is treated fundamentally differently from dividends under US tax law for non-resident aliens, and understanding why avoids both unnecessary worry and a real exception worth knowing about.

---

## Why Options Premium Isn't FDAP Income

The 30%-or-treaty-rate withholding covered throughout this site's tax guides applies specifically to FDAP income - Fixed, Determinable, Annual, or Periodical income, which in practice mostly means dividends and certain interest. Options premium does not fall into this category. Instead, gains and losses from options trading are treated as capital gain or loss from the disposition of personal property - the same broad category that covers ordinary stock capital gains.

**And non-resident aliens are generally not subject to US tax on capital gains from personal property**, provided the gain is not effectively connected to a US trade or business and the investor does not meet the 183-day substantial presence test for the year (more on this exception below). This is the same underlying principle that makes stock capital gains generally untaxed for NRAs, covered in the [main dividend withholding guide](/taxes/taxes-us-dividends-foreign-investors/) - and it extends to options premium.

---

## How This Plays Out for Common Strategies

**Selling a covered call:** the premium received is not included in income at the time the call is sold. Income or loss is recognized only when the position closes - by expiring worthless, by being closed with a buy-to-close transaction, or by assignment.

- If the call **expires worthless**, the premium is treated as a short-term capital gain, regardless of how long the position was actually open.
- If the call is **assigned**, the strike price plus the premium received becomes the effective sale price of the underlying stock, and the resulting gain or loss depends on the stock's holding period and cost basis - the option premium effectively gets folded into the stock sale calculation rather than treated separately.
- If the call is **bought back to close** before expiration, the difference between the premium received and the cost to close is a capital gain or loss at that point.

**Selling a cash-secured put** follows the same general framework - premium collected is not immediately taxable income, with the ultimate treatment determined by whether the put expires worthless, is closed early, or is assigned (resulting in a stock purchase at an effectively discounted basis).

**In every one of these scenarios, the result for a non-US investor is the same general outcome as ordinary stock capital gains: generally not subject to US withholding or US tax**, assuming the 183-day test does not apply.

---

## The 183-Day Exception

This is the one real exception worth flagging clearly. Under IRC §871(a)(2), if a non-resident alien individual is physically present in the United States for **183 days or more** during the tax year, capital gains from US sources - including options-related gains - become subject to US tax at a flat 30% rate, applied to net US-source capital gains for the year.

This is a narrow, specific rule that does not describe most international investors trading remotely from their home country. But it is directly relevant to anyone who splits significant time in the US - an extended stay, a long visit, or genuinely dual-based living - and should not be dismissed as a formality if you are close to that threshold in a given year.

---

## What This Doesn't Cover

**Dividends received on the underlying stock while holding a covered call position** are taxed exactly as they would be on any other stock holding - subject to the standard 30%-or-treaty-rate withholding described in the [main dividend withholding guide](/taxes/taxes-us-dividends-foreign-investors/). The options overlay does not change the dividend treatment on the shares themselves.

**Your home country's tax treatment of options income** is entirely separate from this US-side analysis and varies significantly by country - some tax it as capital gains, some as ordinary income, and the categorization can differ meaningfully from how the US treats it. Confirm this separately with a local tax advisor.

---

## A Worked Illustration Across a Full Wheel Cycle

**Consider a non-resident alien investor running the wheel strategy on TQQQ, covered elsewhere in our [options-income category](/options-income/) - selling a cash-secured put, getting assigned, then selling covered calls against the resulting shares until they're eventually called away.** At no point in this cycle does the investor's broker withhold any US tax on the options premium collected, since each leg (the put premium, the eventual call premium) follows the capital-gain-not-FDAP-income treatment described throughout this guide. If the shares are eventually called away at a gain, that capital gain is also generally untaxed by the US for the same reason. The only US withholding event in this entire multi-step cycle would be any dividends received while holding the shares between the put assignment and the eventual call assignment - a genuinely separate, FDAP-income event layered on top of an otherwise untaxed options cycle.

**This worked illustration is useful precisely because it shows how cleanly the two tax frameworks (capital gains for options and stock sales, FDAP withholding for dividends) coexist within a single, multi-step strategy** - rather than needing to track a single blended rate across the whole cycle, each individual event follows its own, distinct rule.

---

## Frequently Asked Questions

**Does this same treatment apply to more complex multi-leg strategies like iron condors, covered elsewhere on this site?**
Yes, generally - the underlying capital-gain characterization applies to each leg of a multi-leg strategy like the [iron condors](/options-income/iron-condors-tqqq-strategy-guide/) or [poor man's covered calls](/options-income/poor-mans-covered-call-tqqq/) covered elsewhere in this category, since each leg is itself an options transaction following the same general framework, though the specific accounting across multiple simultaneous legs is more complex to track than a single covered call or cash-secured put.

**Does assignment on a LEAPS position, covered in our LEAPS guide, follow this same framework?**
Yes - LEAPS are still options contracts, and gains, losses, or assignment outcomes from LEAPS positions follow the same general capital-gain treatment discussed throughout this guide, covered specifically in our [LEAPS on TQQQ guide](/options-income/leaps-options-strategy-tqqq/).

**How does a broker actually report options-related activity if there's no withholding to report on Form 1042-S?**
Options trading activity is generally reported on Form 1099-B or an equivalent transaction summary, distinct from the 1042-S used for FDAP income withholding reporting - since there's no US tax withheld on options gains, there's no 1042-S entry for that specific activity, which is why keeping your own detailed trade records (mentioned in the checklist) matters more for options activity than for dividend income, where the 1042-S provides an official record.

**If I'm close to the 183-day threshold in a given year, does that affect only options gains or also my other US investment income?**
The 183-day substantial presence test's capital gains consequence under §871(a)(2) specifically affects US-source capital gains (including options gains and stock sale gains) for that tax year - it's a separate trigger from the different substantial presence test that can affect your broader US tax residency status, worth discussing both thresholds with a tax advisor if you're spending meaningful time in the US in a given year, since crossing either one has real, different consequences.

---

## Practical Checklist

- [ ] Understand that options premium is generally not FDAP income and does not face the 30%-or-treaty-rate withholding that applies to dividends
- [ ] Track your day-count presence in the US each year - if you are approaching or exceeding 183 days, the capital gains exception under §871(a)(2) may apply to your options gains
- [ ] Remember that dividends on the underlying stock, separate from any options overlay, are still subject to standard withholding rules
- [ ] Confirm how your home country categorizes and taxes options premium income - this is a separate question from the US treatment
- [ ] Keep your own trade records, since options-related capital gains are generally not reported the same way dividend withholding appears on Form 1042-S

---

## Bottom Line

Options premium income - from covered calls, cash-secured puts, or most other common strategies - generally follows the same favorable "not taxed by the US" treatment that applies to ordinary stock capital gains for non-resident aliens, rather than the FDAP withholding framework that applies to dividends. The one real exception is the 183-day substantial presence test, which is worth tracking if you spend meaningful time physically present in the US in a given year.

---

*This article is informational only and does not constitute tax or legal advice. NRA capital gains treatment, including for options transactions, is governed by IRC §871(a) and §865. Consult a qualified cross-border tax professional for advice specific to your situation, particularly if you spend significant time in the US.*

*Sources: IRC §871(a) and §871(a)(2); IRC §865 (source rules for personal property); IRS Publication 519; IRS Publication 515 (2026).*

## Related Guides

- [US Dividend Withholding Tax for Foreign Investors](/taxes/taxes-us-dividends-foreign-investors/)
- [W-8BEN Form Complete Guide for International Investors](/taxes/w8ben-form-non-us-investors/)
- [Selling Covered Calls on TQQQ](/options-income/selling-covered-calls-tqqq/)
