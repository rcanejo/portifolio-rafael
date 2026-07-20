import type { ToolIconId } from "@/content/types";

interface ToolIconProps {
  id: ToolIconId;
  className?: string;
  colored?: boolean;
}

const brandColors: Partial<Record<ToolIconId, string>> = {
  n8n: "#EA4B71",
  supabase: "#3ECF8E",
  claude: "#D97757",
  openai: "#10A37F",
  "google-drive": "#4285F4",
  "google-sheets": "#0F9D58",
  "google-calendar": "#4285F4",
  hetzner: "#D50C2D",
  python: "#3776AB",
  javascript: "#F7DF1E",
  cursor: "#000000",
  lovable: "#FF6B9D",
  react: "#61DAFB",
  nextjs: "#000000",
  typescript: "#3178C6",
  tailwind: "#06B6D4",
  "html-css": "#E34F26",
  postgres: "#4169E1",
  pgvector: "#336791",
  termius: "#00C853",
  portainer: "#13BEF9",
};

export function ToolIcon({ id, className = "h-5 w-5", colored = false }: ToolIconProps) {
  const color = colored ? (brandColors[id] ?? "currentColor") : "currentColor";

  switch (id) {
    case "n8n":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <circle cx="12" cy="12" r="10" fill={color} fillOpacity={colored ? 1 : 0.15} />
          <text x="12" y="16" textAnchor="middle" fill={colored ? "#fff" : color} fontSize="9" fontWeight="700" fontFamily="system-ui">n8n</text>
        </svg>
      );
    case "supabase":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path fill={color} d="M12 2L3 20h6l3-8 3 8h6L12 2z" />
        </svg>
      );
    case "claude":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <circle cx="12" cy="12" r="10" fill={color} />
          <path
            d="M8 14c1.5-3 3-4 4-4s2.5 1 4 4"
            stroke={colored ? "#fff" : "currentColor"}
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      );
    case "openai":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path fill={color} d="M12 2a7 7 0 00-4 12.7V18a2 2 0 002 2h4a2 2 0 002-2v-3.3A7 7 0 0012 2zm0 3a4 4 0 014 4v1.5a1 1 0 01-1 1h-6a1 1 0 01-1-1V9a4 4 0 014-4z" />
        </svg>
      );
    case "google-drive":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path fill={color} d="M8 4l-5 8.5L8 21h8l5-8.5L16 4H8z" opacity={colored ? 1 : 0.85} />
          <path fill={colored ? "#FBBC04" : color} d="M8 4H3l5 8.5L13 4H8z" />
        </svg>
      );
    case "google-sheets":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <rect x="4" y="3" width="16" height="18" rx="2" fill={color} />
          <path stroke={colored ? "#fff" : "currentColor"} strokeWidth="1.2" d="M8 9h8M8 12h8M8 15h5" />
        </svg>
      );
    case "google-calendar":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <rect x="4" y="5" width="16" height="16" rx="2" fill={color} />
          <rect x="4" y="5" width="16" height="5" fill={colored ? "#fff" : color} fillOpacity={0.35} />
          <text x="12" y="17" textAnchor="middle" fill={colored ? "#fff" : "currentColor"} fontSize="8" fontWeight="600">31</text>
        </svg>
      );
    case "hetzner":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <rect x="3" y="8" width="18" height="8" rx="1" fill={color} />
          <text x="12" y="14" textAnchor="middle" fill={colored ? "#fff" : "currentColor"} fontSize="7" fontWeight="700">H</text>
        </svg>
      );
    case "python":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path fill={color} d="M12 2C8 2 8 4 8 4v3h4V5h4c1 0 2 1 2 2v2h-3v2h5c2 0 3-1 3-3V5c0-2-2-3-4-3h-3zm-4 9H3c-2 0-3 1-3 3v5c0 2 2 3 4 3h3v-3h-4v-2h4v-4z" />
          <circle cx="10" cy="5.5" r="1" fill={colored ? "#FFD43B" : "currentColor"} />
          <circle cx="14" cy="18.5" r="1" fill={colored ? "#FFD43B" : "currentColor"} />
        </svg>
      );
    case "javascript":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <rect x="2" y="2" width="20" height="20" rx="2" fill={color} />
          <text x="12" y="16" textAnchor="middle" fill={colored ? "#000" : "currentColor"} fontSize="10" fontWeight="700">JS</text>
        </svg>
      );
    case "cursor":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path fill={color} d="M5 3l14 8.5L12 13l-2 8L5 3z" />
        </svg>
      );
    case "lovable":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path fill={color} d="M12 21s-7-4.5-7-10a4 4 0 017-2 4 4 0 017 2c0 5.5-7 10-7 10z" />
        </svg>
      );
    case "react":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <circle cx="12" cy="12" r="2.2" fill={color} />
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke={color} strokeWidth="1.2" fill="none" />
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke={color} strokeWidth="1.2" fill="none" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke={color} strokeWidth="1.2" fill="none" transform="rotate(120 12 12)" />
        </svg>
      );
    case "nextjs":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <circle cx="12" cy="12" r="10" fill={color} />
          <path fill={colored ? "#fff" : "currentColor"} d="M8 8v8l8-4-8-4z" />
        </svg>
      );
    case "typescript":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <rect x="2" y="2" width="20" height="20" rx="2" fill={color} />
          <text x="12" y="16" textAnchor="middle" fill={colored ? "#fff" : "currentColor"} fontSize="9" fontWeight="700">TS</text>
        </svg>
      );
    case "tailwind":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path fill={color} d="M12 6c-2.5 0-4 1.25-4.5 3.75C6.5 7.25 5 6 3 6 1 6 0 7.5 0 9.5s1.5 3.5 4 3.5c2.5 0 4-1.25 4.5-3.75C9.5 10.75 11 12 13 12c2 0 3-1.5 3-3.5S15 6 12 6z" />
        </svg>
      );
    case "html-css":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path fill={colored ? "#E34F26" : color} d="M4 3l1.5 17 6.5 2 6.5-2L20 3H4z" />
          <path fill={colored ? "#1572B6" : color} fillOpacity={0.7} d="M12 21V5h7.5L18 18l-6 2V21z" />
        </svg>
      );
    case "postgres":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path fill={color} d="M12 2C8 2 5 4 5 8v8c0 4 3 6 7 6s7-2 7-6V8c0-4-3-6-7-6zm0 3c1.5 0 2.5.8 2.5 2v1H9.5V7c0-1.2 1-2 2.5-2z" />
        </svg>
      );
    case "pgvector":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="3" fill={color} fillOpacity={0.2} stroke={color} strokeWidth="1.5" />
          <text x="12" y="15" textAnchor="middle" fill={color} fontSize="6" fontWeight="700">pg</text>
        </svg>
      );
    case "termius":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <rect x="4" y="4" width="16" height="16" rx="4" fill={color} />
          <text x="12" y="15" textAnchor="middle" fill={colored ? "#fff" : "currentColor"} fontSize="9" fontWeight="700">T</text>
        </svg>
      );
    case "portainer":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path fill={color} d="M12 3L4 8v8l8 5 8-5V8l-8-5zm0 3.5l5 3.1v6.8l-5 3.1-5-3.1v-6.8l5-3.1z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <circle cx="12" cy="12" r="8" fill={color} fillOpacity={0.2} stroke={color} />
        </svg>
      );
  }
}
