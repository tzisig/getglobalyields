// pages/api/tqqq-candles.ts
// Server-side proxy for Yahoo Finance — avoids CORS block in browser.
// Call from client: fetch('/api/tqqq-candles')

import type { APIRoute } from 'astro';

export const prerender = false;   // must be SSR, not static

export const GET: APIRoute = async () => {
  try {
    const period1 = Math.floor(Date.UTC(2022, 0, 1) / 1000);
    const period2 = Math.floor(Date.now() / 1000) + 86400;
    const url =
      `https://query1.finance.yahoo.com/v8/finance/chart/TQQQ` +
      `?interval=1d&period1=${period1}&period2=${period2}` +
      `&events=history&includeAdjustedClose=true`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; bot/1.0)',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'upstream_error', status: response.status }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const payload = await response.json();
    const result  = payload?.chart?.result?.[0];
    const timestamps: number[] = result?.timestamp || [];
    const quote   = result?.indicators?.quote?.[0] || {};

    const candles = timestamps
      .map((ts: number, idx: number) => ({
        time:  new Date(ts * 1000).toISOString().slice(0, 10),
        open:  Number(quote.open?.[idx]),
        high:  Number(quote.high?.[idx]),
        low:   Number(quote.low?.[idx]),
        close: Number(quote.close?.[idx]),
      }))
      .filter(
        (row) =>
          row.time  >= '2022-01-01'      &&
          Number.isFinite(row.open)      &&
          Number.isFinite(row.high)      &&
          Number.isFinite(row.low)       &&
          Number.isFinite(row.close)
      );

    return new Response(JSON.stringify(candles), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        // Cache for 15 minutes so repeated page loads don't hammer Yahoo
        'Cache-Control': 'public, max-age=900, stale-while-revalidate=300',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'fetch_failed', detail: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
