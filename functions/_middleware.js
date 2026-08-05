// Runs at the Cloudflare edge on every request to the site.
// Reads the country Cloudflare already detected (no extra lookup/latency)
// and, if the visitor doesn't have a geo_country cookie yet, sets one.
// The Header.astro script reads this cookie to auto-pick a language.
export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // Enforce one canonical URL form (trailing slash) so Google doesn't index
  // /page and /page/ as two separate pages and split ranking signal between them.
  // Every internal link and the sitemap already use the trailing-slash form.
  const lastSegment = url.pathname.split('/').pop();
  const looksLikeFile = lastSegment.includes('.');
  if (
    (request.method === 'GET' || request.method === 'HEAD') &&
    !url.pathname.endsWith('/') &&
    !looksLikeFile
  ) {
    url.pathname = `${url.pathname}/`;
    return Response.redirect(url.toString(), 301);
  }

  const response = await next();

  const cookieHeader = request.headers.get('Cookie') || '';
  if (/geo_country=/.test(cookieHeader)) {
    return response;
  }

  const country = request.headers.get('cf-ipcountry') || 'XX';
  const headers = new Headers(response.headers);
  headers.append(
    'Set-Cookie',
    `geo_country=${country}; Path=/; Max-Age=31536000; SameSite=Lax`
  );

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
