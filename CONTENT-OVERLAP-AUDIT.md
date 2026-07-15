# GetGlobalYields Content Overlap Audit

Audit date: 2026-07-15  
Scope: all 72 Markdown article files under `src/content/`  
Mode: analysis only; no article, redirect, or internal-link changes were made

## Method and interpretation

Every article body and its frontmatter were included in the audit. The review combined full-body normalized text comparison (including seven-word sequence matching), duplicate-slug checks, title/description/heading comparison, and manual review of the flagged pages' scope, depth, audience, and likely search intent.

“Overlap level” describes content and intent overlap, not merely shared vocabulary. Country-specific tax pages naturally reuse concepts such as W-8BEN, dividend withholding, and capital gains; they are not duplicates when the country qualifier changes the search intent. A recommendation to delete is conditional on first preserving useful content in the primary page. No deletion or redirect is being performed by this audit.

URL notes:

- URLs below follow the repository's collection route plus frontmatter `slug`.
- `w8ben-form-non-us-investors.md` is routed at `/taxes/w8ben-form-non-us-investors/` but declares `https://getglobalyields.com/w8ben-form-non-us-investors` as its canonical URL. That mismatch should be considered separately from this overlap audit.
- In the two Critical groups, both source files declare the same slug. Removing one file therefore removes no distinct public URL and requires no 301.

## Priority overview

| Priority | Group | Core issue | Recommended action |
|---|---|---|---|
| Critical | 1 | Two TQQQ/SOXL/UPRO files publish the same slug and are approximately 95% identical | Merge/retain stronger file; delete redundant file; no redirect |
| Critical | 2 | Two 225-day moving-average files publish the same slug and are approximately 95% identical | Merge/retain stronger file; delete redundant file; no redirect |
| High | 3 | Two pages target the same “TQQQ long-term outlook/holding” intent | Merge into the newer outlook page; 301 the older URL |
| High | 4 | Three pages compete for the broad TQQQ options-income system intent | Merge two weaker pages into the comprehensive strategy guide; retain specialist guides |
| Medium | 5 | IBKR review and IBKR Lite-vs-Pro page both behave like broad IBKR reviews | Differentiate; keep both |
| Medium | 6 | TQQQ risk-management, hedging, and rebalancing pages repeat adjacent frameworks | Differentiate; keep all |
| Medium | 7 | Broad broker list, options-broker list, and account-opening guide share broker comparisons | Differentiate; keep all |
| Medium | 8 | Israeli broker, investing, and tax pages share broker/W-8BEN/tax sections | Differentiate; keep all |
| Low | 9 | Two rebalancing titles look interchangeable but answer different questions | Keep both, with sharper positioning |
| Low | 10 | Income/ETF comparison pages share instruments but have distinct tasks | Keep all, with sharper positioning |
| Low | 11 | Country investing guides and same-country treaty guides share tax sections | Keep all; search intents differ |
| Low | 12 | Country treaty guides use similar titles and a shared compliance framework | Keep all; country intent differs |
| Low | 13 | W-8BEN, dividend-withholding, PFIC, and TQQQ-tax pages share tax concepts | Keep all; entity/form-specific intent differs |
| Low | 14 | “High-yield options” and “high-yield investments” look similar by title | Keep both; asset-class intent differs |

---

## Critical priority

### Group 1 — Duplicate TQQQ vs SOXL vs UPRO comparison

| File | URL | Main topic | Search intent | Unique content |
|---|---|---|---|---|
| `src/content/strategies/tqqq-vs-soxl-vs-upro.md` | `/strategies/tqqq-vs-soxl-vs-upro-best-leveraged-etf-2026/` | Comparison of TQQQ, SOXL, and UPRO by index, performance, drawdown, decay, concentration, and investor fit | Commercial/informational comparison: “TQQQ vs SOXL vs UPRO” and “best leveraged ETF 2026” | No substantive unique section; it is the slightly older/shorter copy |
| `src/content/strategies/tqqq-vs-soxl-vs-upro-best-leveraged-etf-2026.md` | `/strategies/tqqq-vs-soxl-vs-upro-best-leveraged-etf-2026/` | Same | Same | Adds three short sets of contextual internal references; otherwise the article is the same |

- **Estimated overlap:** Near-duplicate. Approximately 0.949 full-body Jaccard similarity and 0.994 containment on normalized seven-word sequences; the longer file differs by six inserted lines.
- **Should both remain separate?** No. They cannot serve separate intents and declare the same slug.
- **Recommended action:** **Merge**, then **delete one after merging**. Retain `tqqq-vs-soxl-vs-upro-best-leveraged-etf-2026.md`, because it contains all of the shorter file plus the extra contextual references. Before deletion, confirm there are no build/import assumptions tied to the older filename.
- **Primary URL:** `/strategies/tqqq-vs-soxl-vs-upro-best-leveraged-etf-2026/`
- **301 required:** None. Both files resolve to the same URL; there is no distinct old public URL to redirect.
- **Reason:** Keeping two collection entries with identical slug, title, metadata, and article content risks duplicate collection records/build ambiguity without creating any search value.
- **Confidence:** Very high.

### Group 2 — Duplicate QQQ 225-day moving-average guide

| File | URL | Main topic | Search intent | Unique content |
|---|---|---|---|---|
| `src/content/strategies/qqq-225-day-moving-average-strategy.md` | `/strategies/tqqq-qqq-225-day-moving-average-strategy/` | Rules, evidence, implementation, tax considerations, and limitations of the QQQ 225-day SMA strategy, including use with TQQQ | “QQQ 225-day moving average strategy” and “TQQQ moving-average exit strategy” | Contains a slightly longer opening explanation of the character's uncertainty |
| `src/content/strategies/tqqq-qqq-225-day-moving-average-strategy.md` | `/strategies/tqqq-qqq-225-day-moving-average-strategy/` | Same | Same | Adds links to the TQQQ-vs-QQQ, long-term, DCA, compounding, TQQQ-tax, options, and broker resources |

- **Estimated overlap:** Near-duplicate. Approximately 0.945 full-body Jaccard similarity and 0.979 containment; only a few opening/concluding lines differ.
- **Should both remain separate?** No. Both declare exactly the same slug and target exactly the same query.
- **Recommended action:** **Merge**, then **delete one after merging**. Use `tqqq-qqq-225-day-moving-average-strategy.md` as the retained file, while preserving the useful explanatory sentence from the other copy if editorially desired.
- **Primary URL:** `/strategies/tqqq-qqq-225-day-moving-average-strategy/`
- **301 required:** None, because both files already map to the same public URL.
- **Reason:** This is a duplicate collection entry, not a defensible topic cluster.
- **Confidence:** Very high.

---

## High priority

### Group 3 — TQQQ long-term outlook versus long-term holding analysis

| File | URL | Main topic | Search intent | Unique content |
|---|---|---|---|---|
| `src/content/strategies/analyzing-long-term-outlook-holding-tqqq.md` | `/strategies/analyzing-long-term-outlook-holding-tqqq/` | Historical track record, decay, drawdowns, Nasdaq thesis, rolling returns, estate tax, entry timing, and suitability of holding TQQQ | “holding TQQQ long term,” “TQQQ long-term outlook,” and whether long-term ownership is viable | More explicit entry-point section and a concise estate-tax treatment; frames the subject as a holder analysis |
| `src/content/strategies/tqqq-long-term-outlook.md` | `/strategies/tqqq-long-term-outlook/` | Verified performance plus forward bull/bear scenarios, structural drivers, rolling returns, and holder suitability | “TQQQ long-term outlook,” “TQQQ 2026 outlook,” and long-term return expectations | Newer and more complete forward-looking bull/bear analysis, AI/datacenter thesis, rate/valuation risks, three success conditions, and FAQ |
| `src/content/strategies/tqqq-long-term-strategy-buy-and-hold.md` | `/strategies/tqqq-long-term-strategy-buy-and-hold/` | How to structure, size, rebalance, and behaviorally sustain a TQQQ position | “Can I buy and hold TQQQ?” and “TQQQ long-term strategy” | Fund-flow/behavioral case study, allocation limits, rebalancing rules, moving-average circuit breaker, and DCA implementation |

- **Estimated overlap:** High between `analyzing-long-term-outlook-holding-tqqq.md` and `tqqq-long-term-outlook.md`; medium between either of those and the buy-and-hold strategy page.
- **Should all remain separate?** No. The first two answer materially the same outlook/holding question. The buy-and-hold strategy page should remain separate because its dominant intent is implementation and risk structure rather than market outlook.
- **Recommended action:** **Merge** the unique entry-point and estate-tax material from `analyzing-long-term-outlook-holding-tqqq.md` into `tqqq-long-term-outlook.md`, then **delete the older page after merging**. **Differentiate** and keep `tqqq-long-term-strategy-buy-and-hold.md`, positioning it explicitly as the implementation companion.
- **Primary URL:** `/strategies/tqqq-long-term-outlook/` for outlook intent; `/strategies/tqqq-long-term-strategy-buy-and-hold/` remains primary for implementation intent.
- **301 required:** `/strategies/analyzing-long-term-outlook-holding-tqqq/` → `/strategies/tqqq-long-term-outlook/` if the former is removed.
- **Reason:** The 2026-05-31 outlook article is newer, better aligned to the exact head term, and contains the stronger forward-looking analysis. The 2026-05-29 “analyzing” page is the weaker/older version. The strategy article has enough unique procedural content to avoid consolidation if its title, introduction, and headings consistently emphasize implementation.
- **Confidence:** High.

### Group 4 — Broad TQQQ options-income system pages

| File | URL | Main topic | Search intent | Unique content |
|---|---|---|---|---|
| `src/content/strategies/tqqq-covered-calls-cash-secured-puts-strategy.md` | `/strategies/tqqq-covered-calls-cash-secured-puts-strategy/` | Comprehensive TQQQ premium-income system using covered calls, cash-secured puts, and the Wheel | Broad “TQQQ options strategy,” “TQQQ covered calls and cash-secured puts,” and options-income system intent | Deepest combined treatment: IV, Greeks, both legs, Wheel connection, rolling, PDT, assignment, tax, and failure conditions |
| `src/content/options-income/passive-income-tqqq-options.md` | `/options-income/passive-income-tqqq-options/` | Broad overview of generating income from TQQQ options | “TQQQ passive income” and “make monthly income with TQQQ options” | Realistic monthly-income scenario, spreads as an alternative, and explicit assessment of how passive the approach really is |
| `src/content/strategies/tqqq-income-system-market-scenarios-options.md` | `/strategies/tqqq-income-system-market-scenarios-options/` | Short explanation of how the same TQQQ income system behaves in rising, sideways, and falling markets | “How a TQQQ income system works” | Compact three-scenario framing and time-versus-volatility principle; only about 550 words |
| `src/content/options-income/selling-covered-calls-tqqq.md` | `/options-income/selling-covered-calls-tqqq/` | Dedicated covered-call execution guide | “How to sell covered calls on TQQQ” | Detailed strike selection, Greeks, rolling, tax, and covered-call-specific risks |
| `src/content/options-income/wheel-strategy-tqqq.md` | `/options-income/wheel-strategy-tqqq/` | Dedicated TQQQ Wheel guide | “TQQQ Wheel strategy” | Assignment cycle, TQQQ-vs-QQQ/SPY comparison, and Wheel-specific suitability |
| `src/content/options-income/tqqq-implied-volatility-strategies.md` | `/options-income/tqqq-implied-volatility-strategies/` | Selecting multiple strategies by TQQQ IV regime | “TQQQ implied volatility strategy” | IV map/skew and regime-specific use of puts, calls, condors, PMCC, and straddles |

- **Estimated overlap:** High among the first three broad system pages; medium between the comprehensive page and the three specialist guides.
- **Should all remain separate?** No. The broad overview and very short scenarios page do not have enough independent intent to justify competing with the comprehensive combined-strategy guide. The covered-call, Wheel, and IV-regime pages should remain separate because each supports a narrower query and deeper task.
- **Recommended action:** **Merge** the realistic-income/spread material from `passive-income-tqqq-options.md` and the bull/sideways/bear scenario material from `tqqq-income-system-market-scenarios-options.md` into `tqqq-covered-calls-cash-secured-puts-strategy.md`; then **delete both weaker pages after merging**. **Differentiate** and keep the three specialist guides.
- **Primary URL:** `/strategies/tqqq-covered-calls-cash-secured-puts-strategy/` for the broad system. Specialist URLs remain primary for their exact subtopics.
- **301 required:** `/options-income/passive-income-tqqq-options/` → `/strategies/tqqq-covered-calls-cash-secured-puts-strategy/`; `/strategies/tqqq-income-system-market-scenarios-options/` → `/strategies/tqqq-covered-calls-cash-secured-puts-strategy/`.
- **Reason:** The comprehensive page is the strongest single answer and already contains the mechanics of the other two. Consolidating their genuinely useful scenario/income material would improve completeness while reducing broad-intent competition. The specialist pages have clear, defensible long-tail intent.
- **Confidence:** Medium-high. Query/performance data could change which broad URL is commercially strongest, but on repository content alone the comprehensive strategy page is the best primary.

---

## Medium priority

### Group 5 — Interactive Brokers review versus IBKR Lite/Pro comparison

| File | URL | Main topic | Search intent | Unique content |
|---|---|---|---|---|
| `src/content/best-brokers/interactive-brokers-review-2026-the-best-broker-for-international-investors.md` | `/best-brokers/interactive-brokers-review-2026-the-best-broker-for-international-investors/` | General IBKR review for non-US investors | “Interactive Brokers review 2026” and “is IBKR good for international investors?” | Concise full-broker review: fees, FX, tools, options, onboarding, safety, and fit |
| `src/content/best-brokers/interactive-brokers-vs-ibkr-lite-for-non-us-investors.md` | `/best-brokers/interactive-brokers-vs-ibkr-lite-for-non-us-investors/` | Nominally IBKR Lite vs Pro, but also a very broad IBKR review for international and Israeli investors | “IBKR Lite vs Pro for non-US investors” and whether Lite is available abroad | Detailed Lite availability answer, fixed-vs-tiered pricing, Israeli entity/funding/tax detail, country availability, and cost projections |

- **Estimated overlap:** Medium-high in content; medium in intended search intent.
- **Should both remain separate?** Yes, but only with stronger differentiation.
- **Recommended action:** **Differentiate**. Keep the review as the general product verdict. Refocus the Lite/Pro page around eligibility, Lite unavailability outside the US, fixed-vs-tiered Pro pricing, and the decision tree; reduce generic review sections that repeat platform, safety, opening, and broad “who should use IBKR” coverage.
- **Primary URL:** General review intent: `/best-brokers/interactive-brokers-review-2026-the-best-broker-for-international-investors/`. Lite/Pro comparison intent: `/best-brokers/interactive-brokers-vs-ibkr-lite-for-non-us-investors/`.
- **301 required:** None.
- **Reason:** The query modifiers “review” and “Lite vs Pro” are distinct, but the much longer comparison page currently expands into a second general review and can outrank/confuse the intended review page.
- **Confidence:** High.

### Group 6 — TQQQ risk management, hedging, rebalancing, and timing

| File | URL | Main topic / search intent | Unique content |
|---|---|---|---|
| `src/content/strategies/risk-management-leveraged-etf-investors-2026.md` | `/strategies/risk-management-leveraged-etf-investors-2026/` | Broad leveraged-ETF risk-management framework | Kelly sizing, SMA exits, VIX overlay, drift, drawdown limits, hedging, and 2022 post-mortem |
| `src/content/strategies/how-to-hedge-tqqq.md` | `/strategies/how-to-hedge-tqqq/` | Exact “how to hedge TQQQ” execution intent | Protective puts, collars, SQQQ, sizing, and explicit hedge-cost comparisons |
| `src/content/strategies/leveraged-etf-rebalancing-strategy-2026.md` | `/strategies/leveraged-etf-rebalancing-strategy-2026/` | Practical TQQQ portfolio-rebalancing intent | Calendar vs threshold bands, contribution-first/tax-aware process, frequency, HFEA example |
| `src/content/strategies/tqqq-qqq-225-day-moving-average-strategy.md` | `/strategies/tqqq-qqq-225-day-moving-average-strategy/` | Exact moving-average timing/filter intent | Masonson backtest, QQQ signal rules, TQQQ limitation, current signal, implementation |
| `src/content/strategies/dollar-cost-averaging-tqqq.md` | `/strategies/dollar-cost-averaging-tqqq/` | Exact DCA-into-TQQQ intent | Multiple start-date scenarios and behavioral accumulation analysis |

- **Estimated overlap:** Medium. All repeat drawdown, sizing, decay, tax, and “who should use this” concepts, but their execution tasks differ.
- **Should all remain separate?** Yes.
- **Recommended action:** **Differentiate**. Make the risk-management page the hub/framework, and keep each specialist page tightly focused on its named method. Avoid allowing the broad page to become a substitute hedge, rebalancing, moving-average, or DCA tutorial.
- **Primary URL:** Each URL is primary for its exact named method; `/strategies/risk-management-leveraged-etf-investors-2026/` is primary only for the broad risk-management query.
- **301 required:** None.
- **Reason:** Consolidation would create an unwieldy page and lose strong long-tail matches. Cannibalization risk comes from repeated introductory and suitability content, not from the core tasks.
- **Confidence:** Medium-high.

### Group 7 — International broker selection and account-opening pages

| File | URL | Main topic / search intent | Unique content |
|---|---|---|---|
| `src/content/best-brokers/best-brokers-international-investors-2026.md` | `/best-brokers/best-brokers-international-investors-2026/` | Best overall brokers for international investors | Seven selection criteria, broad broker ranking, tax/compliance and full comparison |
| `src/content/best-brokers/best-options-brokers-international-traders-2026.md` | `/best-brokers/best-options-brokers-international-traders-2026/` | Best options brokers for international traders | Options commissions, options-first platform needs, approval/access, and options-specific ranking |
| `src/content/best-brokers/how-to-open-a-us-brokerage-account-as-a-non-resident-2026-guide.md` | `/best-brokers/how-to-open-a-us-brokerage-account-as-a-non-resident-2026-guide/` | How to open and fund an account from abroad | Document/application/W-8BEN/funding steps, rejection and VPN questions |

- **Estimated overlap:** Medium in broker names and comparison tables; low-to-medium in search intent.
- **Should all remain separate?** Yes.
- **Recommended action:** **Differentiate**. The broad list should own selection/ranking, the options list should rank only on options-specific criteria, and the opening guide should minimize ranking copy and own the procedural workflow.
- **Primary URL:** Each URL is primary for its own intent; no single URL should absorb all three.
- **301 required:** None.
- **Reason:** “Best broker,” “best options broker,” and “how to open an account” represent different user stages and SERP intents even though the same firms recur.
- **Confidence:** High.

### Group 8 — Israeli investor broker/investing/tax cluster

| File | URL | Main topic / search intent | Unique content |
|---|---|---|---|
| `src/content/taxes/best-broker-israeli-investors-us-markets.md` | `/taxes/best-broker-israeli-investors-us-markets/` | Best brokers for Israeli investors accessing US markets | Israel-specific broker comparison and recommendation |
| `src/content/us-investing/how-to-invest-in-us-stocks-from-israel-step-by-step-2026.md` | `/us-investing/how-to-invest-in-us-stocks-from-israel-step-by-step-2026/` | How Israelis can open, fund, and use an account to buy US stocks | Legality, documents, ILS/USD funding, IBKR trade workflow, Israeli bank transfers |
| `src/content/taxes/us-israel-tax-treaty-explained-capital-gains-dividends-2026.md` | `/taxes/us-israel-tax-treaty-explained-capital-gains-dividends-2026/` | US-Israel treaty rates and double-tax mechanics | Treaty rates, Israeli taxation, W-8BEN claim, dual-status and refund questions |
| `src/content/best-brokers/best-brokers-international-investors-2026.md` | `/best-brokers/best-brokers-international-investors-2026/` | Global broker ranking that includes Israeli applicability | Cross-country comparison and non-Israel alternatives |

- **Estimated overlap:** Medium.
- **Should all remain separate?** Yes.
- **Recommended action:** **Differentiate**. Keep the Israeli broker page exclusively comparative, the investing guide procedural, and the treaty page tax/legal. The global broker list should not optimize specifically for “best broker Israel.” Consider the unusual placement of the Israeli broker page in the `taxes` collection during future information-architecture work, but do not move it as part of this audit.
- **Primary URL:** Broker-selection intent: `/taxes/best-broker-israeli-investors-us-markets/`; investing workflow: `/us-investing/how-to-invest-in-us-stocks-from-israel-step-by-step-2026/`; treaty intent: `/taxes/us-israel-tax-treaty-explained-capital-gains-dividends-2026/`.
- **301 required:** None.
- **Reason:** The same user may need all three, but at distinct decision stages. Repeated broker and W-8BEN explanations should be subordinate to each page's primary task.
- **Confidence:** High.

---

## Low priority

### Group 9 — Leveraged-ETF decay versus practical TQQQ rebalancing

| File | URL | Main topic / search intent | Unique content |
|---|---|---|---|
| `src/content/strategies/leveraged-etf-rebalancing-reduce-decay.md` | `/strategies/leveraged-etf-rebalancing-reduce-decay/` | What volatility decay is and which portfolio structures reduce its effect | Decay math; HFEA, threshold bands, calendar-reset ETFs, volatility targeting; explains what rebalancing cannot fix |
| `src/content/strategies/leveraged-etf-rebalancing-strategy-2026.md` | `/strategies/leveraged-etf-rebalancing-strategy-2026/` | When and how to rebalance an actual TQQQ allocation | Calendar/threshold execution, tax traps, contribution-first method, frequency, step-by-step workflow |

- **Estimated overlap:** Medium by topic, low-to-medium by intent.
- **Should both remain separate?** Yes.
- **Recommended action:** **Keep both** and **differentiate** their titles/snippets and introductions: “volatility decay mechanics/mitigation” versus “portfolio rebalancing execution/tax.”
- **Primary URL:** Each is primary for its quoted intent.
- **301 required:** None.
- **Reason:** The similar “rebalancing” language is misleading, but one page asks whether decay can be reduced and the other asks how to restore portfolio weights.
- **Confidence:** High.

### Group 10 — High-yield ETF and passive-income selection cluster

| File | URL | Main topic / search intent | Unique content |
|---|---|---|---|
| `src/content/strategies/best-high-yield-etfs-2026.md` | `/strategies/best-high-yield-etfs-2026/` | Best high-yield ETFs in 2026 | Cross-category ETF list, verified yields, NAV erosion, tax, investor matching |
| `src/content/strategies/jepi-vs-schd-vs-qyld.md` | `/strategies/jepi-vs-schd-vs-qyld/` | Direct JEPI vs SCHD vs QYLD comparison | Exact three-fund comparison, total-return/yield mechanics, fund-by-fund choice |
| `src/content/strategies/high-yield-investment-strategies-2026.md` | `/strategies/high-yield-investment-strategies-2026/` | High-yield strategies across cash, Treasuries, REITs, CLOs, BDCs, calls, and dividend growth | Multi-asset strategy map and example portfolio, not limited to ETFs |
| `src/content/strategies/build-10k-month-passive-income.md` | `/strategies/build-10k-month-passive-income/` | Portfolio construction to reach a $10,000 monthly-income target | Capital requirement, model portfolios, after-tax income, inflation and bear-market stress tests |
| `src/content/strategies/reits-vs-dividend-stocks.md` | `/strategies/reits-vs-dividend-stocks/` | REITs versus dividend stocks for income | Exact asset-class comparison, tax drag and numerical Israeli-investor cases |

- **Estimated overlap:** Medium in instruments and income vocabulary; low-to-medium in intent.
- **Should all remain separate?** Yes.
- **Recommended action:** **Keep all**, with differentiation. The ETF list should own “best ETFs,” the three-fund page the exact comparison, the strategy page the multi-asset menu, the $10K page goal-based portfolio math, and the REIT page its binary asset-class decision.
- **Primary URL:** Each page is primary for its exact modifier; no merge recommended.
- **301 required:** None.
- **Reason:** These pages may appear similar in a content inventory, but they solve distinct selection, comparison, strategy, goal-planning, and asset-class questions.
- **Confidence:** High.

### Group 11 — Country “how to invest” guides versus same-country tax-treaty guides

| Country | Investing file and URL | Treaty file and URL | Unique intent split |
|---|---|---|---|
| Australia | `how-to-invest-in-us-stocks-from-australia.md` — `/us-investing/how-to-invest-in-us-stocks-from-australia/` | `us-australia-tax-treaty-investors.md` — `/taxes/us-australia-tax-treaty-investors/` | Broker/funding/market-access workflow versus treaty rates, Australian reporting, and tax interaction |
| Canada | `how-to-invest-in-us-stocks-from-canada.md` — `/us-investing/how-to-invest-in-us-stocks-from-canada/` | `us-canada-tax-treaty-investors-2026.md` — `/taxes/us-canada-tax-treaty-investors-2026/` | Broker/FX/Norbert's Gambit and buying workflow versus RRSP/TFSA/non-registered treaty treatment |
| Germany | `how-to-invest-in-us-stocks-from-germany.md` — `/us-investing/how-to-invest-in-us-stocks-from-germany/` | `us-germany-tax-treaty-investors.md` — `/taxes/us-germany-tax-treaty-investors/` | ETF access, broker choice, portfolio and buying workflow versus treaty qualification, rates, Abgeltungsteuer, and dual-residency detail |
| Israel | `how-to-invest-in-us-stocks-from-israel-step-by-step-2026.md` — `/us-investing/how-to-invest-in-us-stocks-from-israel-step-by-step-2026/` | `us-israel-tax-treaty-explained-capital-gains-dividends-2026.md` — `/taxes/us-israel-tax-treaty-explained-capital-gains-dividends-2026/` | Opening/funding/trading workflow versus treaty rates and double-tax treatment |
| United Kingdom | `invest-us-stocks-uk.md` — `/us-investing/invest-us-stocks-uk/` | `us-uk-tax-treaty-investors.md` — `/taxes/us-uk-tax-treaty-investors/` | ISA/SIPP/GIA, brokers and purchase route versus treaty articles, pension exemptions, savings clause, and HMRC developments |

- **Estimated overlap:** Medium within each pair because the investing guides contain necessary tax summaries; low in dominant search intent.
- **Should both remain separate?** Yes, for every country pair.
- **Recommended action:** **Keep both**. Differentiate by keeping tax sections in investing guides concise and action-oriented, while treaty pages remain authoritative deep dives. The investing page should not become a second complete treaty guide.
- **Primary URL:** The `/us-investing/` URL for “how to invest/buy/open/fund” queries; the `/taxes/` URL for “US-[country] treaty/tax/withholding” queries.
- **301 required:** None.
- **Reason:** Geographic similarity does not equal intent duplication. These are complementary funnel stages and should remain separate.
- **Confidence:** High.

### Group 12 — Similar-looking country treaty article titles

Files/URLs reviewed in this title-pattern group:

- `us-australia-tax-treaty-investors.md` — `/taxes/us-australia-tax-treaty-investors/`
- `us-austria-tax-treaty-investors.md` — `/taxes/us-austria-tax-treaty-investors/`
- `us-belgium-tax-treaty-investors.md` — `/taxes/us-belgium-tax-treaty-investors/`
- `us-bulgaria-tax-treaty-investors.md` — `/taxes/us-bulgaria-tax-treaty-investors/`
- `us-canada-tax-treaty-investors-2026.md` — `/taxes/us-canada-tax-treaty-investors-2026/`
- `us-china-tax-treaty-investors.md` — `/taxes/us-china-tax-treaty-investors/`
- `us-czech-republic-tax-treaty-investors.md` — `/taxes/us-czech-republic-tax-treaty-investors/`
- `us-denmark-tax-treaty-investors.md` — `/taxes/us-denmark-tax-treaty-investors/`
- `us-egypt-tax-treaty-investors.md` — `/taxes/us-egypt-tax-treaty-investors/`
- `us-germany-tax-treaty-investors.md` — `/taxes/us-germany-tax-treaty-investors/`
- `us-israel-tax-treaty-explained-capital-gains-dividends-2026.md` — `/taxes/us-israel-tax-treaty-explained-capital-gains-dividends-2026/`
- `us-uganda-tax-treaty-investors.md` — `/taxes/us-uganda-tax-treaty-investors/`
- `us-uk-tax-treaty-investors.md` — `/taxes/us-uk-tax-treaty-investors/`

Main topics are each country's US-investment treaty/default withholding, capital-gains treatment, domestic tax interaction, W-8BEN process, reporting, and country-specific exceptions. Unique content includes, among other examples, Canada's RRSP/TFSA split, the UK's ISA/SIPP and pension rules, Denmark's pension rate and aktiesparekonto issue, the Czech three-year exemption, Bulgaria's ZDDFL exemption, China's broker-access/Hong Kong/FATCA distinctions, and Germany's Abgeltungsteuer/PFIC/LOB detail. Egypt and Uganda are currently very short “coming soon”/placeholder pages, but they target Egypt- and Uganda-specific queries rather than another country's query.

- **Estimated overlap:** Low overall. The highest measured pair among full treaty articles was Australia/Belgium at about 0.043 seven-word-shingle Jaccard similarity (about 8.9% containment of the smaller sequence set), consistent with shared template/compliance wording rather than duplication.
- **Search intent:** Country-qualified treaty research; changing the country changes the legal facts and the query.
- **Should all remain separate?** Yes.
- **Recommended action:** **Keep both/all**. Do not merge country treaty pages. Treat Egypt and Uganda as weak/incomplete pages, not duplicate versions of stronger country pages. Their quality/completeness is a separate content-quality issue.
- **Primary URL:** Each country's own `/taxes/us-[country]-tax-treaty-investors.../` URL.
- **301 required:** None.
- **Reason:** Similar titles and a repeatable article structure are appropriate for distinct country entities. Merging would destroy country-specific relevance and make the result less useful.
- **Confidence:** Very high.

### Group 13 — General US tax-mechanics pages

| File | URL | Main topic / search intent | Unique content |
|---|---|---|---|
| `src/content/taxes/w8ben-form-non-us-investors.md` | Route: `/taxes/w8ben-form-non-us-investors/`; declared canonical: `https://getglobalyields.com/w8ben-form-non-us-investors` | How to complete, file, and renew W-8BEN | Line-by-line form process, mistakes, expiry, scope, and broker handling |
| `src/content/taxes/taxes-us-dividends-foreign-investors.md` | `/taxes/taxes-us-dividends-foreign-investors/` | US dividend withholding for foreign investors | Dividend-specific default/treaty rates, calculation, reclaim/credit and planning implications |
| `src/content/taxes/pfic-rules-international-investors.md` | `/taxes/pfic-rules-international-investors/` | PFIC rules affecting US persons holding non-US pooled investments | PFIC classification, punitive regimes, forms and avoidance—different taxpayer/entity direction |
| `src/content/taxes/tqqq-tax-international-investors.md` | `/taxes/tqqq-tax-international-investors/` | Tax treatment of holding/trading TQQQ as a non-US investor | TQQQ-specific dividends, gains, options/strategy implications and international considerations |

- **Estimated overlap:** Low-to-medium. W-8BEN and dividend withholding are the closest pair, but one is form-completion intent and the other is tax-liability intent.
- **Should all remain separate?** Yes.
- **Recommended action:** **Keep all** and differentiate. Let W-8BEN own procedural form queries, dividend withholding own rate/calculation queries, PFIC own US-person/non-US-fund classification, and TQQQ tax own instrument-specific application.
- **Primary URL:** Each page is primary for its named entity/form/instrument. For W-8BEN, resolve the route/canonical mismatch separately before judging its preferred public URL.
- **301 required:** None for overlap purposes.
- **Reason:** Shared explanations are necessary context, but the user tasks and regulated objects are different.
- **Confidence:** High.

### Group 14 — Similar “high-yield” titles with different asset-class intent

| File | URL | Main topic | Search intent | Unique content |
|---|---|---|---|---|
| `src/content/options-income/high-yield-options-strategies.md` | `/options-income/high-yield-options-strategies/` | Covered calls, cash-secured puts, Wheel, PMCC, and covered-call ETFs | “High-yield options strategies” and options income for international investors | Options mechanics, $50K income comparison, broker/tax requirements, strategy matching |
| `src/content/strategies/high-yield-investment-strategies-2026.md` | `/strategies/high-yield-investment-strategies-2026/` | Multi-asset income strategies | “High-yield investment strategies 2026” | Cash/Treasuries, REITs, CLO ETFs, BDCs, dividend growth, yield-trap screening, full example portfolio |

- **Estimated overlap:** Low-to-medium.
- **Should both remain separate?** Yes.
- **Recommended action:** **Keep both**. Differentiate snippets and introductions by explicitly stating “options-only” versus “multi-asset portfolio.”
- **Primary URL:** `/options-income/high-yield-options-strategies/` for options queries; `/strategies/high-yield-investment-strategies-2026/` for broad investment queries.
- **301 required:** None.
- **Reason:** The titles look close, but “options strategies” is a specific trading-method intent while “investment strategies” spans unrelated income asset classes.
- **Confidence:** High.

---

## Audit conclusions

### Strong consolidation candidates

1. Resolve the two same-slug duplicate-file pairs first; they are repository-level duplication with no defensible SEO separation.
2. Consolidate the older `analyzing-long-term-outlook-holding-tqqq.md` into the newer `tqqq-long-term-outlook.md` and redirect the distinct older URL if removed.
3. Consolidate the broad/short TQQQ options-income pages into the comprehensive combined strategy guide, while preserving dedicated covered-call, Wheel, and IV-regime pages.

### Pages that look similar but should remain separate

The country investing/treaty pairs, individual country treaty pages, specific options-method guides, IBKR review versus Lite/Pro comparison, general broker ranking versus account opening, and “high-yield options” versus broad “high-yield investments” all have defensible intent separation. Their risk is blurred positioning and repeated introductory material, not true duplication.

## Summary table

Counts below use **groups** except where the row explicitly says **article files**.

| Metric | Count | Notes |
|---|---:|---|
| Total articles reviewed | 72 | Every Markdown article under `src/content/` |
| Suspected duplicate groups | 2 | The two Critical same-slug, near-duplicate pairs |
| Overlap groups recommended for merging | 4 | Groups 1–4 |
| Article files recommended for deletion after merging | 5 | One redundant file in Group 1, one in Group 2, one in Group 3, and two in Group 4 |
| Overlap groups recommended to remain separate | 10 | Groups 5–14; some require differentiation |

No article files, redirects, internal links, or other repository content were changed as part of this audit.
