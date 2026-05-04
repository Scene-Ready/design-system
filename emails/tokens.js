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
    textTertiary: "#9CA3AF",
    textBrand: "#1B2A4A",
    textInverse: "#FFFFFF",
    accent: "#C8102E",
    accentText: "#FFFFFF",
    severity: Object.freeze({
      info: { fg: "#2563EB", bg: "#EFF6FF" },
      success: { fg: "#059669", bg: "#ECFDF5" },
      warning: { fg: "#D97706", bg: "#FFFBEB" },
      danger: { fg: "#DC2626", bg: "#FEF2F2" },
    }),
  }),
  dark: Object.freeze({
    bgPage: "#0F1A30",
    bgCard: "#1B2A4A",
    border: "rgba(255,255,255,0.10)",
    divider: "rgba(255,255,255,0.10)",
    textPrimary: "#F3F4F6",
    textSecondary: "#9CA3AF",
    textTertiary: "#6B7280",
    textBrand: "#FFFFFF",
    textInverse: "#FFFFFF",
    accent: "#E8334E",
    accentText: "#FFFFFF",
    severity: Object.freeze({
      info: { fg: "#60A5FA", bg: "rgba(96,165,250,0.14)" },
      success: { fg: "#34D399", bg: "rgba(52,211,153,0.14)" },
      warning: { fg: "#FBBF24", bg: "rgba(251,191,36,0.14)" },
      danger: { fg: "#F87171", bg: "rgba(248,113,113,0.14)" },
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
    md: "8px",
    full: "999px",
  }),
  font: Object.freeze({
    sans: "Barlow, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    condensed: "'Barlow Condensed', Barlow, system-ui, sans-serif",
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
  layout: Object.freeze({
    contentWidth: "600px",
  }),
});

export const SEVERITIES = Object.freeze(["info", "success", "warning", "danger"]);
