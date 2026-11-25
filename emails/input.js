// Validates wrapper input and makes it safe to put into HTML.

const HTML_ESCAPES = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function escapeHtml(value) {
  if (value == null) return "";
  return String(value).replace(/[&<>"']/g, (c) => HTML_ESCAPES[c]);
}

export function safeUrl(url) {
  if (typeof url !== "string" || url.length === 0) {
    throw new TypeError("safeUrl: expected non-empty string url");
  }
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    throw new TypeError(`safeUrl: invalid URL "${url}"`);
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:" && parsed.protocol !== "mailto:") {
    throw new TypeError(`safeUrl: rejected protocol "${parsed.protocol}" — only http, https, mailto allowed`);
  }
  return escapeHtml(parsed.toString());
}

export function requireString(value, name) {
  if (typeof value !== "string" || value.length === 0) {
    throw new TypeError(`${name} is required and must be a non-empty string`);
  }
  return value;
}

export function requireCta(cta, name) {
  if (!cta || typeof cta !== "object") {
    throw new TypeError(`${name} is required and must be { label, url }`);
  }
  requireString(cta.label, `${name}.label`);
  requireString(cta.url, `${name}.url`);
  return { label: escapeHtml(cta.label), url: safeUrl(cta.url) };
}
