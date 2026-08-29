const CSP_META = `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; img-src data: blob:; font-src data:; connect-src 'none'; form-action 'none'; base-uri 'none'">`;

export function secureSrcDoc(html: string) {
  const withoutBase = html
    .replace(/<base\b[^>]*>/gi, "")
    .replace(/<meta\b[^>]*http-equiv=["']?refresh["']?[^>]*>/gi, "");
  return /<head\b[^>]*>/i.test(withoutBase)
    ? withoutBase.replace(/<head\b[^>]*>/i, (head) => `${head}${CSP_META}`)
    : `<!doctype html><html><head>${CSP_META}</head><body>${withoutBase}</body></html>`;
}
