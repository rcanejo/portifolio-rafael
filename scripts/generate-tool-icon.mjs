import { readFileSync, writeFileSync } from "node:fs";

const data = JSON.parse(readFileSync("scripts/icon-data.json", "utf8"));

data.openai = {
  color: "#412991",
  path: "M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .742 7.097 5.98 5.98 0 0 0 .511 4.911 6.051 6.051 0 0 0 6.515 2.899A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023-.141-.085-4.774-2.758a.781.781 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z",
};

data.lovable = {
  color: "#FF6B9D",
  path: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
};

const order = [
  "n8n", "supabase", "claude", "openai", "google-drive", "google-sheets",
  "google-calendar", "hetzner", "python", "javascript", "cursor", "lovable",
  "react", "nextjs", "typescript", "tailwind", "html-css", "postgres",
  "pgvector", "termius", "portainer",
];

function fmtIcon(id, icon) {
  let block = `  ${JSON.stringify(id)}: {\n    color: ${JSON.stringify(icon.color)},\n    path: ${JSON.stringify(icon.path)},`;
  if (icon.extras?.length) {
    block += `\n    extras: [\n`;
    for (const e of icon.extras) {
      block += `      { path: ${JSON.stringify(e.path)}, color: ${JSON.stringify(e.color)} },\n`;
    }
    block += `    ],`;
  }
  block += `\n  },`;
  return block;
}

const iconsBlock = order.map((id) => fmtIcon(id, data[id])).join("\n");

const file = `import type { ToolIconId } from "@/content/types";

interface ToolIconProps {
  id: ToolIconId;
  className?: string;
  colored?: boolean;
}

type IconDef = {
  path: string;
  color: string;
  extras?: { path: string; color: string }[];
};

/** Paths from Simple Icons (inline, no runtime dependency). */
const icons: Record<ToolIconId, IconDef> = {
${iconsBlock}
};

export function ToolIcon({ id, className = "h-5 w-5", colored = false }: ToolIconProps) {
  const icon = icons[id];
  if (!icon) {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden>
        <circle cx="12" cy="12" r="8" fill="currentColor" fillOpacity={0.2} />
      </svg>
    );
  }

  const fill = colored ? icon.color : "currentColor";

  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden role="img">
      <path fill={fill} d={icon.path} />
      {colored &&
        icon.extras?.map((extra) => (
          <path key={extra.path.slice(0, 24)} fill={extra.color} d={extra.path} />
        ))}
    </svg>
  );
}
`;

writeFileSync("src/components/sections/ToolIcon.tsx", file);
console.log("ToolIcon.tsx generated");
