---
slug: "from-minus-70-to-plus-492k-real-tqqq-recovery-case-study"
title: "From -72% to +250%: Real TQQQ Recovery Case Study"
description: "Real TQQQ case study: -72% drawdown to +250% recovery. Full breakdown with numbers, the Wheel Strategy used, mistakes made, and current portfolio status."
pubDate: 2026-04-17
author: "Tzion Sigron"
categories: ["case-study"]
keywords: "TQQQ Recovery Case Study, TQQQ Wheel Strategy Real Results, TQQQ Drawdown Recovery, TQQQ Covered Calls Strategy, Leveraged ETF Recovery, Options Income TQQQ, Investing In TQQQ From Abroad, case-study, From -72 to 250 Real TQQQ Recovery Case Study, 72% to +250%, Real TQQQ Recovery Case Study, TQQQ"
tags:
  - "TQQQ recovery case study"
  - "TQQQ wheel strategy real results"
  - "TQQQ drawdown recovery"
  - "TQQQ covered calls strategy"
  - "leveraged ETF recovery"
  - "options income TQQQ"
  - "investing in TQQQ from abroad"
heroImage: "/images/blog/case-study/tqqq_recovery_light.webp"
heroImageWidth: 840
heroImageHeight: 560
heroImageLight: "/images/blog/case-study/tqqq_recovery_light.webp"
heroImageDark: "/images/blog/case-study/tqqq_recovery_dark.webp"
products: ["TQQQ", "Options"]
---

> **Key Stats**
> * **Asset:** TQQQ (ProShares UltraPro QQQ)
> * **Duration:** Jan 2022 - April 2026 (Ongoing)
> * **Strategy Type:** [Wheel Strategy](/options-income/wheel-strategy-tqqq/) / Leveraged Long-Term Holding

> **The Short Version**
> 
> *   **Started:** $100,000 (Jan 2022)
> *   **Bottom:** ~$28,000 (-72%)
> *   **Added collateral:** $40,000 (Feb 2023)
> *   **Total invested:** $140,000
> *   **Current value:** $492,000 (over +250%) - April 2026
> *   **Method:** TQQQ + [Covered Calls](/options-income/selling-covered-calls-tqqq/) + Short Puts
> 
> *This is not a success story. It's a reconstruction after a near wipeout.*

<div id="prt-outer" style="background:#0a192f;border-radius:16px;padding:24px 24px 16px;border:1px solid #1e3a5f;font-family:system-ui,-apple-system,sans-serif;position:relative;">
  <div style="margin-bottom:16px;">
    <div style="color:#e2e8f0;font-size:18px;font-weight:600;letter-spacing:-0.3px;">Portfolio Recovery Timeline</div>
    <div style="color:#64748b;font-size:13px;margin-top:2px;">From 01/01/2022 to today</div>
  </div>
  <div id="prt-container" style="position:relative;width:100%;height:420px;">
    <div id="prt-chart" style="width:100%;height:100%;"></div>
    <svg id="prt-arrows" style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:visible;" aria-hidden="true">
      <defs>
        <marker id="ah" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
          <polygon points="0 0, 7 2.5, 0 5" fill="#00d4aa" opacity="0.9"></polygon>
        </marker>
        <marker id="ah-today" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
          <polygon points="0 0, 7 2.5, 0 5" fill="#00cc88" opacity="0.9"></polygon>
        </marker>
      </defs>
    </svg>
    <div id="prt-bubbles" style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:visible;"></div>
    <div id="prt-loading" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(10,25,47,0.92);color:#64ffda;border-radius:8px;font-size:14px;gap:10px;">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      </svg>
      Loading chart data…
    </div>
  </div>
  <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px;color:#475569;font-size:12px;">
    <span>TQQQ · ProShares UltraPro QQQ · Weekly</span>
    <span>By Tzion Sigron</span>
  </div>
</div>

<script>
(function () {
  var MILESTONES = [
    { id: "start", date: "2022-01-03", price: 64.5, lines: ["Start", "Jan 2022", "$100,000"], dx: -148, dy: -90, bg: "#0d2137", border: "#00d4aa", marker: "ah" },
    { id: "bottom", date: "2023-02-13", price: 18.5, lines: ["Bottom", "Feb 2023", "−72%", "(~$28,000)"], dx: -68, dy: 18, bg: "#0d2137", border: "#00d4aa", marker: "ah" },
    { id: "temp-record", date: "2025-02-10", price: 68.0, lines: ["Temp Record", "Feb 2025", "$465,000"], dx: -68, dy: -95, bg: "#0d2137", border: "#00d4aa", marker: "ah" },
    { id: "dropdown", date: "2025-04-07", price: 38.0, lines: ["Dropdown", "Apr 2025", "$340,000"], dx: 14, dy: 18, bg: "#0d2137", border: "#00d4aa", marker: "ah" },
    { id: "today", date: "2026-04-17", price: 76.0, lines: ["Today", "Apr 2026", "$492,000", "(+245% total return)"], dx: -152, dy: -112, bg: "#003d29", border: "#00cc88", marker: "ah-today" },
  ];

  var FALLBACK = [
    { time: "2022-01-03", value: 64.5 }, { time: "2022-01-10", value: 60.8 }, { time: "2022-01-18", value: 54.2 }, { time: "2022-01-24", value: 46.3 }, { time: "2022-01-31", value: 55.1 },
    { time: "2022-02-07", value: 51.8 }, { time: "2022-02-14", value: 48.4 }, { time: "2022-02-22", value: 42.1 }, { time: "2022-02-28", value: 46.5 }, { time: "2022-03-07", value: 40.2 },
    { time: "2022-03-14", value: 43.8 }, { time: "2022-03-21", value: 47.5 }, { time: "2022-03-28", value: 50.2 }, { time: "2022-04-04", value: 44.1 }, { time: "2022-04-11", value: 39.8 },
    { time: "2022-04-18", value: 33.6 }, { time: "2022-04-25", value: 29.4 }, { time: "2022-05-02", value: 25.8 }, { time: "2022-05-09", value: 21.5 }, { time: "2022-05-16", value: 23.9 },
    { time: "2022-05-23", value: 20.7 }, { time: "2022-05-31", value: 22.8 }, { time: "2022-06-06", value: 20.1 }, { time: "2022-06-13", value: 16.8 }, { time: "2022-06-21", value: 18.4 },
    { time: "2022-06-27", value: 20.2 }, { time: "2022-07-05", value: 17.5 }, { time: "2022-07-11", value: 14.2 }, { time: "2022-07-18", value: 19.3 }, { time: "2022-07-25", value: 21.6 },
    { time: "2022-08-01", value: 22.8 }, { time: "2022-08-08", value: 25.1 }, { time: "2022-08-15", value: 24.3 }, { time: "2022-08-22", value: 20.6 }, { time: "2022-08-29", value: 19.2 },
    { time: "2022-09-06", value: 17.4 }, { time: "2022-09-12", value: 20.1 }, { time: "2022-09-19", value: 18.3 }, { time: "2022-09-26", value: 15.2 }, { time: "2022-10-03", value: 15.8 },
    { time: "2022-10-10", value: 13.6 }, { time: "2022-10-17", value: 16.2 }, { time: "2022-10-24", value: 18.5 }, { time: "2022-10-31", value: 18.9 }, { time: "2022-11-07", value: 19.8 },
    { time: "2022-11-14", value: 22.1 }, { time: "2022-11-21", value: 18.6 }, { time: "2022-11-28", value: 20.4 }, { time: "2022-12-05", value: 19.8 }, { time: "2022-12-12", value: 18.1 },
    { time: "2022-12-19", value: 15.4 }, { time: "2022-12-27", value: 13.8 }, { time: "2023-01-03", value: 15.2 }, { time: "2023-01-09", value: 16.8 }, { time: "2023-01-17", value: 18.4 },
    { time: "2023-01-23", value: 19.6 }, { time: "2023-01-30", value: 21.2 }, { time: "2023-02-06", value: 19.8 }, { time: "2023-02-13", value: 18.5 }, { time: "2023-02-21", value: 19.1 },
    { time: "2023-02-27", value: 17.8 }, { time: "2023-03-06", value: 19.4 }, { time: "2023-03-13", value: 20.8 }, { time: "2023-03-20", value: 23.6 }, { time: "2023-03-27", value: 25.1 },
    { time: "2023-04-03", value: 26.4 }, { time: "2023-04-10", value: 27.2 }, { time: "2023-04-17", value: 28.6 }, { time: "2023-04-24", value: 29.1 }, { time: "2023-05-01", value: 28.4 },
    { time: "2023-05-08", value: 30.2 }, { time: "2023-05-15", value: 32.8 }, { time: "2023-05-22", value: 34.5 }, { time: "2023-05-30", value: 33.2 }, { time: "2023-06-05", value: 35.8 },
    { time: "2023-06-12", value: 39.4 }, { time: "2023-06-20", value: 41.2 }, { time: "2023-06-26", value: 42.8 }, { time: "2023-07-03", value: 38.6 }, { time: "2023-07-10", value: 40.4 },
    { time: "2023-07-17", value: 43.8 }, { time: "2023-07-24", value: 45.2 }, { time: "2023-07-31", value: 47.1 }, { time: "2023-08-07", value: 45.6 }, { time: "2023-08-14", value: 44.2 },
    { time: "2023-08-21", value: 41.5 }, { time: "2023-08-28", value: 40.1 }, { time: "2023-09-05", value: 38.4 }, { time: "2023-09-11", value: 36.8 }, { time: "2023-09-18", value: 34.2 },
    { time: "2023-09-25", value: 31.6 }, { time: "2023-10-02", value: 29.8 }, { time: "2023-10-09", value: 27.4 }, { time: "2023-10-16", value: 29.6 }, { time: "2023-10-23", value: 31.8 },
    { time: "2023-10-30", value: 33.4 }, { time: "2023-11-06", value: 35.8 }, { time: "2023-11-13", value: 38.4 }, { time: "2023-11-20", value: 42.6 }, { time: "2023-11-27", value: 45.2 },
    { time: "2023-12-04", value: 47.8 }, { time: "2023-12-11", value: 51.2 }, { time: "2023-12-18", value: 53.6 }, { time: "2023-12-26", value: 54.8 }, { time: "2024-01-02", value: 55.4 },
    { time: "2024-01-08", value: 53.2 }, { time: "2024-01-16", value: 56.8 }, { time: "2024-01-22", value: 58.4 }, { time: "2024-01-29", value: 57.2 }, { time: "2024-02-05", value: 59.6 },
    { time: "2024-02-12", value: 62.4 }, { time: "2024-02-20", value: 64.8 }, { time: "2024-02-26", value: 62.6 }, { time: "2024-03-04", value: 65.2 }, { time: "2024-03-11", value: 67.4 },
    { time: "2024-03-18", value: 64.8 }, { time: "2024-03-25", value: 63.2 }, { time: "2024-04-01", value: 60.6 }, { time: "2024-04-08", value: 57.8 }, { time: "2024-04-15", value: 53.4 },
    { time: "2024-04-22", value: 51.2 }, { time: "2024-04-29", value: 49.8 }, { time: "2024-05-06", value: 52.4 }, { time: "2024-05-13", value: 55.8 }, { time: "2024-05-20", value: 58.6 },
    { time: "2024-05-28", value: 60.2 }, { time: "2024-06-03", value: 61.4 }, { time: "2024-06-10", value: 63.8 }, { time: "2024-06-17", value: 66.2 }, { time: "2024-06-24", value: 65.4 },
    { time: "2024-07-01", value: 68.2 }, { time: "2024-07-08", value: 67.4 }, { time: "2024-07-15", value: 62.8 }, { time: "2024-07-22", value: 59.6 }, { time: "2024-07-29", value: 62.4 },
    { time: "2024-08-05", value: 64.8 }, { time: "2024-08-12", value: 66.2 }, { time: "2024-08-19", value: 70.4 }, { time: "2024-08-26", value: 71.8 }, { time: "2024-09-03", value: 73.2 },
    { time: "2024-09-09", value: 71.4 }, { time: "2024-09-16", value: 68.6 }, { time: "2024-09-23", value: 72.4 }, { time: "2024-09-30", value: 74.6 }, { time: "2024-10-07", value: 75.2 },
    { time: "2024-10-14", value: 70.8 }, { time: "2024-10-21", value: 67.4 }, { time: "2024-10-28", value: 65.2 }, { time: "2024-11-04", value: 63.6 }, { time: "2024-11-11", value: 65.4 },
    { time: "2024-11-18", value: 70.2 }, { time: "2024-11-25", value: 75.8 }, { time: "2024-12-02", value: 72.4 }, { time: "2024-12-09", value: 74.6 }, { time: "2024-12-16", value: 75.2 },
    { time: "2024-12-23", value: 70.4 }, { time: "2024-12-30", value: 68.2 }, { time: "2025-01-06", value: 65.4 }, { time: "2025-01-13", value: 62.8 }, { time: "2025-01-21", value: 65.6 },
    { time: "2025-01-27", value: 68.4 }, { time: "2025-02-03", value: 66.8 }, { time: "2025-02-10", value: 68.0 }, { time: "2025-02-18", value: 65.2 }, { time: "2025-02-24", value: 62.4 },
    { time: "2025-03-03", value: 59.8 }, { time: "2025-03-10", value: 57.4 }, { time: "2025-03-17", value: 53.2 }, { time: "2025-03-24", value: 50.6 }, { time: "2025-03-31", value: 48.2 },
    { time: "2025-04-07", value: 38.0 }, { time: "2025-04-14", value: 35.6 }, { time: "2025-04-22", value: 41.4 }, { time: "2025-04-28", value: 43.8 }, { time: "2025-05-05", value: 46.2 },
    { time: "2025-05-12", value: 49.6 }, { time: "2025-05-19", value: 51.4 }, { time: "2025-05-27", value: 53.8 }, { time: "2025-06-02", value: 55.2 }, { time: "2025-06-09", value: 56.6 },
    { time: "2025-06-16", value: 58.4 }, { time: "2025-06-23", value: 59.8 }, { time: "2025-06-30", value: 57.4 }, { time: "2025-07-07", value: 59.2 }, { time: "2025-07-14", value: 61.6 },
    { time: "2025-07-21", value: 63.4 }, { time: "2025-07-28", value: 64.8 }, { time: "2025-08-04", value: 66.2 }, { time: "2025-08-11", value: 65.6 }, { time: "2025-08-18", value: 67.4 },
    { time: "2025-08-25", value: 68.8 }, { time: "2025-09-02", value: 67.2 }, { time: "2025-09-08", value: 66.4 }, { time: "2025-09-15", value: 69.2 }, { time: "2025-09-22", value: 71.6 },
    { time: "2025-09-29", value: 70.4 }, { time: "2025-10-06", value: 69.8 }, { time: "2025-10-13", value: 71.4 }, { time: "2025-10-20", value: 72.8 }, { time: "2025-10-27", value: 73.6 },
    { time: "2025-11-03", value: 73.2 }, { time: "2025-11-10", value: 75.4 }, { time: "2025-11-17", value: 76.8 }, { time: "2025-11-24", value: 77.4 }, { time: "2025-12-01", value: 75.8 },
    { time: "2025-12-08", value: 74.6 }, { time: "2025-12-15", value: 75.8 }, { time: "2025-12-22", value: 76.2 }, { time: "2025-12-29", value: 73.6 }, { time: "2026-01-05", value: 71.4 },
    { time: "2026-01-12", value: 69.2 }, { time: "2026-01-20", value: 72.6 }, { time: "2026-01-26", value: 74.4 }, { time: "2026-02-02", value: 73.8 }, { time: "2026-02-09", value: 72.2 },
    { time: "2026-02-17", value: 70.6 }, { time: "2026-02-23", value: 71.4 }, { time: "2026-03-02", value: 73.2 }, { time: "2026-03-09", value: 72.4 }, { time: "2026-03-16", value: 69.8 },
    { time: "2026-03-23", value: 66.6 }, { time: "2026-03-30", value: 68.4 }, { time: "2026-04-07", value: 69.8 }, { time: "2026-04-14", value: 71.4 }, { time: "2026-04-17", value: 76.0 },
    { time: "2026-04-22", value: 74.2 }, { time: "2026-04-28", value: 76.6 }, { time: "2026-05-05", value: 76.28 },
  ];

  function parseYahoo(json) {
    try {
      var result = json.chart.result[0];
      var timestamps = result.timestamp;
      var closes = result.indicators.quote[0].close;
      var out = [];
      for (var i = 0; i < timestamps.length; i++) {
        if (closes[i] == null) continue;
        var d = new Date(timestamps[i] * 1000);
        var y = d.getUTCFullYear();
        var m = String(d.getUTCMonth() + 1).padStart(2, "0");
        var day = String(d.getUTCDate()).padStart(2, "0");
        out.push({ time: y + "-" + m + "-" + day, value: parseFloat(closes[i].toFixed(2)) });
      }
      var seen = {};
      out.forEach(function (p) { seen[p.time] = p; });
      return Object.values(seen).sort(function (a, b) { return a.time < b.time ? -1 : 1; });
    } catch (e) {
      return null;
    }
  }

  function initPortfolioChart() {
    var LC = window.LightweightCharts;
    if (!LC) { return; }

    var chartEl = document.getElementById("prt-chart");
    var container = document.getElementById("prt-container");
    var loadingEl = document.getElementById("prt-loading");
    if (!chartEl || !container) return;

    var chart = LC.createChart(chartEl, {
      width: container.clientWidth,
      height: 420,
      layout: { background: { type: "solid", color: "#0a192f" }, textColor: "#94a3b8", fontSize: 12, fontFamily: "system-ui,-apple-system,sans-serif" },
      grid: { vertLines: { color: "rgba(30,58,95,0.6)" }, horzLines: { color: "rgba(30,58,95,0.6)" } },
      crosshair: {
        mode: LC.CrosshairMode.Normal,
        vertLine: { color: "rgba(100,255,218,0.5)", width: 1, style: LC.LineStyle.Dashed, labelBackgroundColor: "#0a192f" },
        horzLine: { color: "rgba(100,255,218,0.5)", width: 1, style: LC.LineStyle.Dashed, labelBackgroundColor: "#0a192f" },
      },
      rightPriceScale: { borderColor: "#1e3a5f", scaleMargins: { top: 0.08, bottom: 0.08 }, textColor: "#64748b" },
      timeScale: {
        borderColor: "#1e3a5f", timeVisible: true, secondsVisible: false, rightOffset: 8, fixLeftEdge: true, fixRightEdge: false,
        tickMarkFormatter: function (time) {
          var d = new Date(time * 1000);
          var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
          return months[d.getUTCMonth()] + " " + d.getUTCFullYear();
        },
      },
      handleScroll: true,
      handleScale: true,
    });

    var lineSeries = chart.addLineSeries({
      color: "#00d4aa", lineWidth: 2, crosshairMarkerVisible: true, crosshairMarkerRadius: 5,
      crosshairMarkerBorderColor: "#00d4aa", crosshairMarkerBackgroundColor: "#0a192f",
      lastValueVisible: true, priceLineVisible: false, priceFormat: { type: "price", precision: 2, minMove: 0.01 },
    });

    lineSeries.applyOptions({ autoscaleInfoProvider: function () { return { priceRange: { minValue: 0, maxValue: 130 } } } });

    function loadData(data) {
      lineSeries.setData(data);
      chart.timeScale().setVisibleRange({ from: "2022-01-01", to: "2026-05-31" });
      if (loadingEl) loadingEl.style.display = "none";
      createAnnotations();
      var prtTick = false;
      function scheduleUpdatePositions() {
        if (!prtTick) { prtTick = true; requestAnimationFrame(function () { updatePositions(); prtTick = false; }); }
      }
      chart.timeScale().subscribeVisibleLogicalRangeChange(scheduleUpdatePositions);
      var resizeTimer;
      window.addEventListener("resize", function () {
        chart.applyOptions({ width: container.clientWidth });
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () { scheduleUpdatePositions(); }, 120);
      });
    }

    fetch("https://query1.finance.yahoo.com/v8/finance/chart/TQQQ?interval=1wk&range=5y&includeAdjustedClose=true", { headers: { "Accept": "application/json" } })
      .then(function (r) { return r.json(); })
      .then(function (json) {
        var parsed = parseYahoo(json);
        if (parsed && parsed.length > 50) { loadData(parsed); } else { loadData(FALLBACK); }
      })
      .catch(function () { loadData(FALLBACK); });

    var bubblesLayer = document.getElementById("prt-bubbles");
    var arrowsSvg = document.getElementById("prt-arrows");
    var bubbleEls = {};
    var arrowEls = {};

    function createAnnotations() {
      MILESTONES.forEach(function (m) {
        var div = document.createElement("div");
        div.id = "prt-bubble-" + m.id;
        div.style.cssText = ["position:absolute","display:none","width:132px","padding:8px 10px","border-radius:8px","border:1px solid " + m.border,"background:" + m.bg,"box-shadow:0 4px 20px rgba(0,0,0,0.5)","pointer-events:none","transition:opacity 0.15s"].join(";");
        m.lines.forEach(function (line, idx) {
          var p = document.createElement("div");
          p.textContent = line;
          if (idx === 0) { p.style.cssText = "color:#e2e8f0;font-size:12px;font-weight:700;line-height:1.3;"; }
          else if (idx === 1) { p.style.cssText = "color:#94a3b8;font-size:11px;line-height:1.3;"; }
          else if (idx === 2) { p.style.cssText = "color:" + m.border + ";font-size:13px;font-weight:700;line-height:1.4;margin-top:2px;"; }
          else { p.style.cssText = "color:#64748b;font-size:10px;line-height:1.3;"; }
          div.appendChild(p);
        });
        bubblesLayer.appendChild(div);
        bubbleEls[m.id] = div;

        var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.id = "prt-line-" + m.id;
        line.setAttribute("stroke", m.border);
        line.setAttribute("stroke-width", "1.5");
        line.setAttribute("stroke-dasharray", "none");
        line.setAttribute("opacity", "0.8");
        line.setAttribute("marker-end", "url(#" + m.marker + ")");
        line.style.display = "none";
        arrowsSvg.appendChild(line);
        arrowEls[m.id] = line;

        var dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        dot.id = "prt-dot-" + m.id;
        dot.setAttribute("r", "4");
        dot.setAttribute("fill", m.border);
        dot.setAttribute("stroke", "#0a192f");
        dot.setAttribute("stroke-width", "1.5");
        dot.style.display = "none";
        arrowsSvg.appendChild(dot);
        m._dotEl = dot;
      });
    }

    function updatePositions() {
      MILESTONES.forEach(function (m) {
        var bubbleEl = bubbleEls[m.id];
        var arrowEl = arrowEls[m.id];
        if (!bubbleEl || !arrowEl) return;
        var dataX = chart.timeScale().timeToCoordinate(m.date);
        var dataY = lineSeries.priceToCoordinate(m.price);
        if (dataX === null || dataY === null) {
          bubbleEl.style.display = "none"; arrowEl.style.display = "none";
          if (m._dotEl) m._dotEl.style.display = "none";
          return;
        }
        var bLeft = dataX + m.dx;
        var bTop = dataY + m.dy;
        var bW = 132;
        var bH = bubbleEl.offsetHeight || 70;
        var cW = container.clientWidth;
        var cH = container.clientHeight;
        bLeft = Math.max(2, Math.min(bLeft, cW - bW - 2));
        bTop = Math.max(2, Math.min(bTop, cH - bH - 2));
        bubbleEl.style.left = bLeft + "px";
        bubbleEl.style.top = bTop + "px";
        bubbleEl.style.display = "block";
        var bcX = bLeft + bW / 2;
        var bcY = bTop + bH / 2;
        var dx = dataX - bcX;
        var dy = dataY - bcY;
        var len = Math.sqrt(dx * dx + dy * dy);
        var ux = len > 0 ? dx / len : 0;
        var uy = len > 0 ? dy / len : 0;
        var stopDist = 8;
        var ex = dataX - ux * stopDist;
        var ey = dataY - uy * stopDist;
        var startDist = Math.min(30, len * 0.25);
        var sx = bcX + ux * startDist;
        var sy = bcY + uy * startDist;
        arrowEl.setAttribute("x1", sx); arrowEl.setAttribute("y1", sy);
        arrowEl.setAttribute("x2", ex); arrowEl.setAttribute("y2", ey);
        arrowEl.style.display = len > 12 ? "block" : "none";
        if (m._dotEl) { m._dotEl.setAttribute("cx", dataX); m._dotEl.setAttribute("cy", dataY); m._dotEl.style.display = "block"; }
      });
    }
  }

  var s = document.createElement("script");
  s.src = "https://unpkg.com/lightweight-charts@4.1.1/dist/lightweight-charts.standalone.production.js";
  s.onload = initPortfolioChart;
  s.onerror = function () {
    var el = document.getElementById("prt-loading");
    if (el) el.textContent = "Failed to load chart library. Please refresh.";
  };
  document.head.appendChild(s);
})();
</script>

## 1. What Actually Went Wrong
As an international investor entering the US market, my first mistake was relying on theory without understanding real market dynamics.

I traded options aggressively, and when positions went against me, I increased size instead of stepping back. I was treating options like stocks - holding through moves I didn't respect instead of accounting for how fast time decay and leverage can turn on you - and I stayed glued to the screen, which only made the emotional decisions worse.

The combination was brutal. Time decay worked against me on every trade I held too long. Leverage amplified every mistake instead of just the wins. And once emotional decisions replaced logic, there was no system left to fall back on.

**Result:** $100,000 → $28,000 within a year. No edge. No system. Just exposure and hope.

## 2. The Turning Point (Late 2022)
At the bottom, I stopped trading and started thinking.

> **Key observation:**
> The Nasdaq had recovered from every major crash in history. TQQQ had dropped ~83% from its peak.
> 
> **Thesis:**
> If Nasdaq recovers → TQQQ amplifies it 3x
> If I'm willing to hold long-term → volatility becomes noise
>
> *This was not certainty. This was a probability bet.*

## 3. The Actual Strategy

### Core position:
*   Bought ~2,000 shares of TQQQ at ~$25
*   Added $40,000 as cash collateral to support [selling puts](/options-income/cash-secured-puts-high-iv/) without broker margin

### Layer 1: Covered Calls
Sold calls continuously against shares. The rules were simple but not mechanical: after a strong rally, sell a higher strike; in sideways markets, sell closer to the money. Rolling happened when it made sense, not on autopilot.

In practice, the calls capped upside more than once and I missed real gains during sharp moves - that's the trade-off with this approach. But the strategy stayed profitable overall because the premium flow kept coming in regardless of what the shares themselves were doing.

### Layer 2: Short Puts
Sold puts using the cash collateral. After a drop, I'd sell closer strikes; in calmer markets, I'd go further out of the money.

This layer was harder to live with. Some puts got assigned at bad timing, which increased exposure exactly when the portfolio could least afford it, and staying in the position took real conviction during the drawdowns.

## 4. What Actually Drove Returns
Not one thing. A combination:

| Driver | Contribution |
| :--- | :--- | 
| TQQQ underlying recovery | 60–70% |
| Options premium income | 30–40% |

> **Currency note:** Returns here are measured in USD. Actual results depend on your local currency - in my case, USD depreciation vs ILS reduced real returns despite the portfolio growth.

**The Leverage Factor:**
While a standard investment in QQQ would have recovered significantly during this period, it wouldn't have provided the same fuel for the options engine. The 3x leverage of TQQQ is what allowed for such a dramatic recovery but it came with 3x the heartaches in 2022.

🔗 Read the full breakdown: [TQQQ vs. QQQ: Which is Right for International Investors?](/strategies/buying-tqqq-vs-qqq-which-is-right-for-international-investors-in-2026/) - Explore the math behind the decay risk and why I chose the leveraged path.

## 5. What Did NOT Go Smoothly
The recovery wasn't a straight line. At one point the portfolio dropped from ~$465,000 back down to ~$340,000, with no hedge in place and exposure staying high the entire time.

Covered calls created their own kind of pain: strong rallies meant shares got called away, forcing a choice between re-entering at a higher price or giving up the upside entirely. Short puts carried a mirror-image risk - selling them in falling markets increased exposure at the worst possible moment, and a longer downtrend could have compounded the losses instead of cushioning them.

There was less panic than in 2022, but the psychological pressure never fully disappeared. It still took discipline not to interfere with a system that was, by design, supposed to run itself.

## 6. Failure Scenarios
This strategy breaks under these conditions:

| Scenario | Why it breaks |
| :--- | :--- |
| Prolonged sideways market (2–5 years) | Volatility decay erodes TQQQ; premium may not offset losses |
| Repeated downtrends | Put assignments stack; capital gets locked |
| Early entry at wrong timing | Entering at higher levels means deep drawdown and years to recover |
| Liquidity pressure | Multiple positions reduce flexibility; can't adjust when needed |

## 7. What I Would Do Differently
*   Never allocate 100% to a leveraged ETF
*   Cap exposure at 20–30%
*   Define exit rules before entry
*   Track performance monthly, not just total

## 8. What Actually Changed
Not the market. My behavior.

| Before | After |
| :--- | :--- |
| Constant monitoring | Fewer decisions |
| Emotional decisions | Defined structure |
| Overtrading | Letting positions work |

## Chapter 3: The System Running Now (April 2026)
Current portfolio value: $492,000
*(net liquid - after buying back all options at today’s prices)*

**Active positions:**

| Position | Details |
| :--- | :--- |
| **TQQQ shares** | 6,000 shares @ $58.59 |
| **60 Covered Calls** | Strike $62.5 \| January 2027 \| Sold at $10.1 |
| **60 Short Puts** | Strike $50 \| January 2027 \| Sold at $10.1 |
| **Current options liability** | ~$114,150 (This represents the cost to buy back the options today; it effectively becomes profit if they expire worthless). |

### The Three Scenarios - January 2027

**Scenario 1: TQQQ above $62.5 → Portfolio ~$620,000**
*   Shares called away at $62.5
*   Options expire worthless → $114,150 liability disappears
*   Gain from price move: 6,000 × $3.91 = $23,460
*   Immediately sell 120 new Calls + 120 new Puts @ ~$10
*   New premium locked in: $240,000

**Scenario 2: TQQQ stays flat (~$58.59) → Portfolio ~$597,000**
*   Both options expire worthless
*   $114,150 liability disappears
*   Portfolio value: ~$597,000

**Scenario 3: TQQQ below $50 → Strategy continues**
*   Puts assigned → receive 6,000 more shares at effective cost ~$30
*   Now holding 12,000 shares total
*   Sell 120 new Puts @ ~$10 → $120,000 additional premium
*   Wait for recovery to $50 → Portfolio: ~$720,000+

### The Only Real Risk
A prolonged crash below $30 - and staying there.
Not a permanent loss. A time problem.

If that happens:
*   12,000 shares at deeply discounted prices
*   Sell 120 more Puts at ~$10 → $120,000 premium collected
*   Wait for recovery

The system doesn’t break. It just requires patience.

### The Core Principle
This is not a prediction. This is a structure.
The market doesn’t need to go up to generate income. It needs to exist - and eventually, to recover.

> "Trust the market. Build the structure. Have patience. Let time do the work."

## 9. Bottom Line
This worked because:
*   Entry was near a major low
*   Market recovered strongly
*   Strategy added income on top

This is not repeatable on demand.
If the same entry conditions don’t exist → results change completely.
The biggest risk is not volatility. It’s applying this in the wrong market environment.

> ⚠️ **Not financial advice.** This is a personal case study of one investor's experience. Past performance does not guarantee future results.

---

