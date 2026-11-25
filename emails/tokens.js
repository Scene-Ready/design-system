// Email-safe inlined token values.
// Mirrors tokens.css; kept in sync manually because email clients do not
// support CSS custom properties. When tokens.css changes, update both.

export const TOKENS = Object.freeze({
  light: Object.freeze({
    bgPage: "#F9FAFB",
    bgCard: "#FFFFFF",
    border: "#E5E7EB",
    divider: "#E5E7EB",
    textPrimary: "#111827",
    textSecondary: "#6B7280",
    textTertiary: "#9CA3AF", // placeholders and decorative text only (2.5:1); content uses textSecondary
    textBrand: "#1B2A4A",
    textInverse: "#FFFFFF",
    accent: "#C8102E",
    accentText: "#FFFFFF",
    link: "#C8102E",
    // fg: status text (the -dark tones, AA on bg); base: dots, bars and other non-text marks (mirrors --*-mark).
    severity: Object.freeze({
      info: { fg: "#1D4ED8", base: "#2563EB", bg: "#EFF6FF" },
      success: { fg: "#047857", base: "#059669", bg: "#ECFDF5" },
      warning: { fg: "#B45309", base: "#D97706", bg: "#FFFBEB" },
      danger: { fg: "#B91C1C", base: "#DC2626", bg: "#FEF2F2" },
      neutral: { fg: "#4B5563", base: "#6B7280", bg: "#F3F4F6" },
    }),
  }),
  dark: Object.freeze({
    bgPage: "#0F1A30",
    bgCard: "#1B2A4A",
    border: "rgba(255,255,255,0.10)",
    divider: "rgba(255,255,255,0.10)",
    textPrimary: "#F3F4F6",
    textSecondary: "#9CA3AF",
    textTertiary: "#9CA3AF",
    textBrand: "#FFFFFF",
    textInverse: "#FFFFFF",
    accent: "#C8102E", // button fill: white text on Red 500 would be 4.2:1
    accentText: "#FFFFFF",
    link: "#F28C9A", // Red 300: Red 500 text is 3.4:1 on Navy 700
    severity: Object.freeze({
      info: { fg: "#93C5FD", base: "#60A5FA", bg: "rgba(96,165,250,0.14)" },
      success: { fg: "#34D399", base: "#34D399", bg: "rgba(52,211,153,0.14)" },
      warning: { fg: "#FBBF24", base: "#FBBF24", bg: "rgba(251,191,36,0.14)" },
      danger: { fg: "#FCA5A5", base: "#F87171", bg: "rgba(248,113,113,0.14)" },
      neutral: { fg: "#D1D5DB", base: "#9CA3AF", bg: "rgba(255,255,255,0.08)" },
    }),
  }),
  space: Object.freeze({
    1: "4px",
    2: "8px",
    3: "12px",
    4: "16px",
    5: "20px",
    6: "24px",
    8: "32px",
  }),
  radius: Object.freeze({
    lg: "8px",
    full: "9999px",
  }),
  font: Object.freeze({
    // BRANDING §5.2's email stacks: clients don't know system-ui, and Outlook needs Arial named.
    sans: "Barlow, Arial, Helvetica, sans-serif",
    condensed: "'Barlow Condensed', 'Arial Narrow', Arial, sans-serif",
  }),
  fontSize: Object.freeze({
    xs: "12px",
    sm: "14px",
    base: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "30px",
  }),
  // BRANDING §5.5: uppercase text. Mirrors --tracking-caps / --tracking-eyebrow.
  tracking: Object.freeze({
    caps: "0.05em",
    eyebrow: "0.1em",
  }),
  layout: Object.freeze({
    contentWidth: "600px",
  }),
});

export const SEVERITIES = Object.freeze(["info", "success", "warning", "danger", "neutral"]);
