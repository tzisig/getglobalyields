# Internal Link Relevance Audit

Audit date: 2026-07-15  
Scope: repository-wide internal links in article Markdown and Astro source files  
Status: analysis only, except for the separately approved removal of homepage/taxes-index cards for the Egypt and Uganda draft articles

## Method

The audit reviewed internal destinations for two questions:

1. Does the destination resolve in the generated site?
2. Does the destination fulfill the promise made by the anchor text and surrounding sentence or paragraph?

The source review included 774 Markdown internal-link instances plus static/dynamic links in Astro page and component source. Repeated global navigation, footer, disclosure, tool, and collection-card links were checked for destination existence but were not treated as editorial relevance problems when their function was unambiguous.

Country-name links were not automatically classified as wrong. A country link to a country investing guide can be useful when the paragraph discusses market access, brokers, accounts, or investing workflow. It becomes a relevance concern when the surrounding claim is specifically about treaty rates, local tax treatment, or a regulator and the destination does not substantiate that claim.

No relevance issue listed below has been fixed.

## Draft-page handling

Immediately before card removal, both destination files were verified as unpublished:

- `src/content/taxes/us-egypt-tax-treaty-investors.md`: `draft: true`
- `src/content/taxes/us-uganda-tax-treaty-investors.md`: `draft: true`

Their article files, draft values, and content remain unchanged. Only collection filtering on the homepage and taxes index was adjusted so draft entries do not produce cards there.

## Relevance issues

### 1. UK investing guide used to support an FCA-regulation reference

- **Source file:** `src/content/best-brokers/best-brokers-international-investors-2026.md`
- **Line:** 89
- **Section:** `The 7 Non-Negotiables: What International Investors Actually Need in 2026?`
- **Anchor text:** `UK`
- **Surrounding sentence:** “Regulation by Tier-1 authorities such as the SEC, FINRA, FCA (UK), CySEC (EU), or MAS (Singapore).”
- **Current URL:** `/us-investing/invest-us-stocks-uk/`
- **Recommended URL:** No internal link; retain “UK” as plain text unless a regulator-specific resource is created.
- **Reason:** The destination is a guide to investing in US stocks from the UK, not evidence or explanation of FCA regulation.
- **Confidence:** High

### 2. Canadian investing guide used to support an IIROC-regulation reference

- **Source file:** `src/content/best-brokers/best-brokers-international-investors-2026.md`
- **Line:** 230
- **Section:** `1. Interactive Brokers (IBKR) — Best Overall for International Investors`
- **Anchor text:** `Canada`
- **Surrounding sentence:** “Regulation: SEC/FINRA (US), FCA (UK), IIROC (Canada), MAS (Singapore), and more.”
- **Current URL:** `/us-investing/how-to-invest-in-us-stocks-from-canada/`
- **Recommended URL:** No internal link; retain “Canada” as plain text unless a Canadian-regulation resource is created.
- **Reason:** The country investing guide does not substantiate IBKR's IIROC/Canadian regulatory status.
- **Confidence:** High

### 3. Australian investing guide used to support an ASIC-regulation reference

- **Source file:** `src/content/best-brokers/best-brokers-international-investors-2026.md`
- **Line:** 260
- **Section:** `3. eToro — Best for Beginner International Investors`
- **Anchor text:** `Australia`
- **Surrounding sentence:** “Regulated by FCA (UK), CySEC (EU), and ASIC (Australia).”
- **Current URL:** `/us-investing/how-to-invest-in-us-stocks-from-australia/`
- **Recommended URL:** No internal link; retain “Australia” as plain text unless an ASIC/eToro regulation resource is created.
- **Reason:** The destination covers how Australians invest in US stocks, not eToro's ASIC regulation.
- **Confidence:** High

### 4. UK investing guide linked from a claim that Winvesta is UK-regulated

- **Source file:** `src/content/us-investing/invest-us-stocks-india.md`
- **Line:** 129
- **Section:** `Winvesta`
- **Anchor text:** `UK`
- **Surrounding sentence:** “UK-regulated platform that has built a significant Indian user base.”
- **Current URL:** `/us-investing/invest-us-stocks-uk/`
- **Recommended URL:** No internal link; leave “UK-regulated” as plain text unless a source about Winvesta's regulation is available.
- **Reason:** A UK investor guide does not support Winvesta's regulatory status.
- **Confidence:** High

### 5. UK investing guide linked from a claim about Wise's FCA regulation

- **Source file:** `src/content/us-investing/multi-currency-investment-accounts.md`
- **Line:** 98
- **Section:** `3. The IBKR + Wise Combination`
- **Anchor text:** `UK`
- **Surrounding sentence:** “Wise itself is regulated by the FCA in the UK and multiple other jurisdictions...”
- **Current URL:** `/us-investing/invest-us-stocks-uk/`
- **Recommended URL:** No internal link; retain “UK” as plain text unless a Wise/FCA source page is created.
- **Reason:** The destination does not discuss Wise or prove its FCA status.
- **Confidence:** High

### 6. Israeli investing guide linked from W-8BEN treaty-rate text

- **Source file:** `src/content/taxes/w8ben-form-non-us-investors.md`
- **Line:** 58
- **Section:** Opening explanation before `Why the W-8BEN Matters`
- **Anchor text:** `Israeli`
- **Surrounding sentence:** “With it, and with the correct tax treaty applied, that rate drops to 15% for most countries and 25% for Israeli investors.”
- **Current URL:** `/us-investing/how-to-invest-in-us-stocks-from-israel-step-by-step-2026/`
- **Recommended URL:** `/taxes/us-israel-tax-treaty-explained-capital-gains-dividends-2026/`
- **Reason:** The claim is specifically about Israel's treaty withholding rate, which the treaty article addresses directly.
- **Confidence:** High

### 7. Israel investing guide linked inside a US-Israel treaty claim

- **Source file:** `src/content/best-brokers/how-to-open-a-us-brokerage-account-as-a-non-resident-2026-guide.md`
- **Line:** 52
- **Section:** `The W-8BEN Form: What It Is and Why You Need It`
- **Anchor text:** `Israel`
- **Surrounding sentence:** “For example, the US-Israel tax treaty reduces dividend withholding to 25% in most cases...”
- **Current URL:** `/us-investing/how-to-invest-in-us-stocks-from-israel-step-by-step-2026/`
- **Recommended URL:** `/taxes/us-israel-tax-treaty-explained-capital-gains-dividends-2026/`
- **Reason:** A treaty-rate statement should link to the Israel treaty article, not the general investing workflow.
- **Confidence:** High

### 8. “Israeli Tax Authority” wording links to an editorial treaty guide

- **Source file:** `src/content/us-investing/how-to-invest-in-us-stocks-from-israel-step-by-step-2026.md`
- **Line:** 50
- **Section:** `Is It Legal for Israelis to Invest in US Stocks?`
- **Anchor text:** `Israeli Tax`
- **Surrounding sentence:** “...provided you report your foreign income and assets to the Israeli Tax Authority (ITA) as required.”
- **Current URL:** `/taxes/us-israel-tax-treaty-explained-capital-gains-dividends-2026/`
- **Recommended URL:** Keep the current internal URL only if the anchor is later changed to `US-Israel tax treaty guide`; otherwise remove the link from the authority's name.
- **Reason:** The current destination is relevant to investor tax, but the anchor visually promises the official Israeli Tax Authority rather than an internal editorial guide.
- **Confidence:** High

### 9. Israeli investing guide linked from TQQQ options-tax treatment

- **Source file:** `src/content/options-income/passive-income-tqqq-options.md`
- **Line:** 155
- **Section:** `What International Investors Need to Know`
- **Anchor text:** `Israel`
- **Surrounding paragraph:** “Tax treatment of options premium from TQQQ varies by jurisdiction. In Israel, the 25% flat capital gains rate applies.”
- **Current URL:** `/us-investing/how-to-invest-in-us-stocks-from-israel-step-by-step-2026/`
- **Recommended URL:** `/taxes/us-israel-tax-treaty-explained-capital-gains-dividends-2026/`
- **Reason:** The surrounding topic is tax treatment, not the process of investing from Israel. The treaty article is the closest existing tax resource, although it may not fully cover options premiums.
- **Confidence:** Medium

### 10. UK investing guide linked from TQQQ options-tax treatment

- **Source file:** `src/content/options-income/passive-income-tqqq-options.md`
- **Line:** 155
- **Section:** `What International Investors Need to Know`
- **Anchor text:** `UK`
- **Surrounding paragraph:** “In the UK, TQQQ options premium falls under CGT at 18%/24% depending on your rate.”
- **Current URL:** `/us-investing/invest-us-stocks-uk/`
- **Recommended URL:** `/taxes/us-uk-tax-treaty-investors/`
- **Reason:** The paragraph promises UK tax context. The treaty page is more relevant than a general investing guide, though local options classification should still be independently sourced.
- **Confidence:** Medium

### 11. Israeli investing guide linked from options-premium tax analysis

- **Source file:** `src/content/options-income/high-yield-options-strategies.md`
- **Line:** 158
- **Section:** `The Tax Reality`
- **Anchor text:** `Israel`
- **Surrounding paragraph:** “Israeli investors. Capital gains on financial assets—including options premium—are taxed at a flat 25%...”
- **Current URL:** `/us-investing/how-to-invest-in-us-stocks-from-israel-step-by-step-2026/`
- **Recommended URL:** `/taxes/us-israel-tax-treaty-explained-capital-gains-dividends-2026/`
- **Reason:** The destination should support the tax claim, not the investing workflow.
- **Confidence:** Medium

### 12. UK investing guide linked from options-premium CGT analysis

- **Source file:** `src/content/options-income/high-yield-options-strategies.md`
- **Line:** 160
- **Section:** `The Tax Reality`
- **Anchor text:** `UK`
- **Surrounding paragraph:** “UK investors. Options premium income falls under Capital Gains Tax in the UK.”
- **Current URL:** `/us-investing/invest-us-stocks-uk/`
- **Recommended URL:** `/taxes/us-uk-tax-treaty-investors/`
- **Reason:** The tax article is a closer match to tax-focused context than the general investing article.
- **Confidence:** Medium

### 13. UK investing guide linked from covered-call tax treatment

- **Source file:** `src/content/strategies/tqqq-covered-calls-cash-secured-puts-strategy.md`
- **Line:** 324
- **Section:** `Part Nine: Tax Implications - The Full Picture`
- **Anchor text:** `UK`
- **Surrounding paragraph:** “UK: Options premium is taxed under Capital Gains Tax rules...”
- **Current URL:** `/us-investing/invest-us-stocks-uk/`
- **Recommended URL:** `/taxes/us-uk-tax-treaty-investors/`
- **Reason:** The section is entirely tax-focused; the treaty/tax guide is the more relevant internal destination.
- **Confidence:** Medium

### 14. Israeli investing guide linked from leveraged-ETF rebalancing tax treatment

- **Source file:** `src/content/strategies/risk-management-leveraged-etf-investors-2026.md`
- **Line:** 171
- **Section:** `When Position Sizing Drifts: The Rebalancing Trigger`
- **Anchor text:** `Israeli`
- **Surrounding paragraph:** “Tax consideration for Israeli investors: Rebalancing upward...triggers a 25% CGT event...”
- **Current URL:** `/us-investing/how-to-invest-in-us-stocks-from-israel-step-by-step-2026/`
- **Recommended URL:** `/taxes/us-israel-tax-treaty-explained-capital-gains-dividends-2026/`
- **Reason:** The anchor supports a tax assertion rather than an account-opening or investing-process statement.
- **Confidence:** Medium

### 15. Israeli investing guide linked from a capital-gains-rate bullet

- **Source file:** `src/content/strategies/financial-freedom-leveraged-investing.md`
- **Line:** 396
- **Section:** `Tax Treatment for Leveraged ETFs`
- **Anchor text:** `Israel`
- **Surrounding bullet:** “Israel: 25% flat rate on capital gains from securities...”
- **Current URL:** `/us-investing/how-to-invest-in-us-stocks-from-israel-step-by-step-2026/`
- **Recommended URL:** `/taxes/us-israel-tax-treaty-explained-capital-gains-dividends-2026/`
- **Reason:** The treaty/tax guide is better aligned to the tax-rate claim.
- **Confidence:** High

### 16. Israeli investing guide linked from detailed CGT rules

- **Source file:** `src/content/strategies/leveraged-etf-rebalancing-strategy-2026.md`
- **Line:** 233
- **Section:** `For Non-US Investors`
- **Anchor text:** `Israeli`
- **Surrounding paragraph:** “Israeli residents pay 25% capital gains tax on the real...gain from the sale of securities...”
- **Current URL:** `/us-investing/how-to-invest-in-us-stocks-from-israel-step-by-step-2026/`
- **Recommended URL:** `/taxes/us-israel-tax-treaty-explained-capital-gains-dividends-2026/`
- **Reason:** The link accompanies detailed tax rates, surtax thresholds, and loss-offset rules.
- **Confidence:** High

### 17. Israeli investing guide linked from DCA tax consequences

- **Source file:** `src/content/strategies/dollar-cost-averaging-tqqq.md`
- **Line:** 295
- **Section:** `A Note for Non-US Investors`
- **Anchor text:** `Israel`
- **Surrounding paragraph:** “Israeli investors should note that capital gains on TQQQ are subject to 25% tax in Israel...”
- **Current URL:** `/us-investing/how-to-invest-in-us-stocks-from-israel-step-by-step-2026/`
- **Recommended URL:** `/taxes/tqqq-tax-international-investors/`
- **Reason:** This is specifically a TQQQ tax statement. The same paragraph already links the TQQQ tax guide later, so the country link could also be plain text to avoid redundant links.
- **Confidence:** High

### 18. German investing guide linked from options-premium taxation

- **Source file:** `src/content/strategies/high-yield-investment-strategies-2026.md`
- **Line:** 153
- **Section:** `Strategy 5: Covered Calls on Quality Dividend Stocks`
- **Anchor text:** `Germany`
- **Surrounding paragraph:** “...in Germany, premiums fall under Abgeltungsteuer at 26.375%...”
- **Current URL:** `/us-investing/how-to-invest-in-us-stocks-from-germany/`
- **Recommended URL:** `/taxes/us-germany-tax-treaty-investors/`
- **Reason:** The surrounding claim is German taxation, not how to access US markets from Germany.
- **Confidence:** Medium

### 19. UK investing guide linked from options-premium taxation

- **Source file:** `src/content/strategies/high-yield-investment-strategies-2026.md`
- **Line:** 153
- **Section:** `Strategy 5: Covered Calls on Quality Dividend Stocks`
- **Anchor text:** `UK`
- **Surrounding paragraph:** “...in the UK, under CGT rules.”
- **Current URL:** `/us-investing/invest-us-stocks-uk/`
- **Recommended URL:** `/taxes/us-uk-tax-treaty-investors/`
- **Reason:** Tax-focused surrounding text calls for the tax/treaty guide.
- **Confidence:** Medium

### 20. Israeli investing guide linked from a tax-treaty statement

- **Source file:** `src/content/strategies/buying-tqqq-vs-qqq-which-is-right-for-international-investors-in-2026.md`
- **Line:** 118
- **Section:** `Tax Considerations for Non-US Investors`
- **Anchor text:** `Israel`
- **Surrounding bullet:** “Reduced via tax treaties (e.g., Israel, EU).”
- **Current URL:** `/us-investing/how-to-invest-in-us-stocks-from-israel-step-by-step-2026/`
- **Recommended URL:** `/taxes/us-israel-tax-treaty-explained-capital-gains-dividends-2026/`
- **Reason:** The anchor sits directly inside a treaty-rate claim.
- **Confidence:** High

### 21. Israeli investing guide linked from a REIT treaty-withholding claim

- **Source file:** `src/content/strategies/reits-vs-dividend-stocks.md`
- **Line:** 47
- **Section:** `Bottom Line Up Front`
- **Anchor text:** `Israel`
- **Surrounding paragraph:** “REIT distributions attract 25% US withholding under the US-Israel treaty...”
- **Current URL:** `/us-investing/how-to-invest-in-us-stocks-from-israel-step-by-step-2026/`
- **Recommended URL:** `/taxes/us-israel-tax-treaty-explained-capital-gains-dividends-2026/`
- **Reason:** The sentence is explicitly about treaty withholding.
- **Confidence:** High

### 22. Country tax table links to general investing guides

- **Source file:** `src/content/taxes/tqqq-tax-international-investors.md`
- **Line:** 86
- **Section:** `Dividend Tax on TQQQ`
- **Anchor texts and current URLs:**
  - `Israel` → `/us-investing/how-to-invest-in-us-stocks-from-israel-step-by-step-2026/`
  - `UK` → `/us-investing/invest-us-stocks-uk/`
  - `Germany` → `/us-investing/how-to-invest-in-us-stocks-from-germany/`
  - `Australia` → `/us-investing/how-to-invest-in-us-stocks-from-australia/`
- **Surrounding paragraph/table:** A table labeled `Country` and `Withholding Rate`, listing treaty rates for TQQQ dividends.
- **Recommended URLs:**
  - Israel → `/taxes/us-israel-tax-treaty-explained-capital-gains-dividends-2026/`
  - UK → `/taxes/us-uk-tax-treaty-investors/`
  - Germany → `/taxes/us-germany-tax-treaty-investors/`
  - Australia → `/taxes/us-australia-tax-treaty-investors/`
- **Reason:** Each link promises evidence/context for a tax rate. The corresponding treaty article is more relevant than a country investing guide.
- **Confidence:** High

### 23. Canadian investing guide linked from a tax-adviser note

- **Source file:** `src/content/taxes/tqqq-tax-international-investors.md`
- **Line:** 126
- **Section:** Country tax examples
- **Anchor text:** `Canadian`
- **Surrounding sentence:** “Effective rate varies widely by income bracket—consult a Canadian tax advisor for your specific situation.”
- **Current URL:** `/us-investing/how-to-invest-in-us-stocks-from-canada/`
- **Recommended URL:** `/taxes/us-canada-tax-treaty-investors-2026/`
- **Reason:** The anchor accompanies tax-rate advice. The treaty article is closer to that intent, although neither destination is a substitute for a licensed adviser.
- **Confidence:** Medium

### 24. UK investing guide linked from a treaty-comparison sentence

- **Source file:** `src/content/taxes/us-germany-tax-treaty-investors.md`
- **Line:** 49
- **Section:** Opening/background
- **Anchor text:** `UK`
- **Surrounding sentence:** “The US has comparable agreements with the UK, Ireland, and the Netherlands that deliver the same headline rates.”
- **Current URL:** `/us-investing/invest-us-stocks-uk/`
- **Recommended URL:** `/taxes/us-uk-tax-treaty-investors/`
- **Reason:** The context compares tax treaties, making the UK treaty article the direct match.
- **Confidence:** High

## Additional link-quality observation

`src/content/best-brokers/best-options-brokers-international-traders-2026.md`, line 143, contains malformed nested Markdown around `covered calls`:

```md
[[covered calls](/options-income/selling-covered-calls-tqqq/)](/options-income/selling-covered-calls-tqqq/)
```

The destination itself exists and is relevant, so this is not a destination-relevance failure. It should be normalized in a separately approved editing task because nested link syntax can render an incorrect anchor.

## Links reviewed but intentionally not flagged

- Country-name links in broker/access discussions were retained as relevant when the destination explains how residents of that country can invest.
- Country investing guides linked from portfolio/account-wrapper discussions were retained where those guides cover ISA, SIPP, RRSP, TFSA, superannuation, broker access, or funding.
- General dividend-withholding, W-8BEN, PFIC, broker-review, Broker Finder, calculator, options-strategy, disclosure, and glossary links generally matched their anchors.
- The manually corrected Germany destination `/us-investing/how-to-invest-in-us-stocks-from-germany/` and UK destination `/us-investing/invest-us-stocks-uk/` were not changed during this task.

## Verification results

Verification values in this section reflect the final build and crawl performed after the approved draft-card removal.

- **Astro build:** Passed; 91 pages generated.
- **Egypt homepage card/link:** Absent from the rendered homepage.
- **Uganda homepage card/link:** Absent from the rendered homepage.
- **Egypt taxes-index card/link:** Absent from the rendered taxes index.
- **Uganda taxes-index card/link:** Absent from the rendered taxes index.
- **Germany corrected destination:** `/us-investing/how-to-invest-in-us-stocks-from-germany/` generated successfully. The old `/us-investing/invest-us-stocks-germany/` form has no remaining source references.
- **UK corrected destination:** `/us-investing/invest-us-stocks-uk/` generated successfully.
- **Internal-link crawl:** 6,503 built-page internal links checked.
- **Remaining broken internal links:** 0.

No relevance issue in this report has been fixed.
