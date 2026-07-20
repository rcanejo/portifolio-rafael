import { writeFileSync } from "node:fs";
import * as si from "simple-icons";

const map = {
  n8n: "siN8n",
  supabase: "siSupabase",
  claude: "siAnthropic",
  "google-drive": "siGoogledrive",
  "google-sheets": "siGooglesheets",
  "google-calendar": "siGooglecalendar",
  hetzner: "siHetzner",
  python: "siPython",
  javascript: "siJavascript",
  cursor: "siCursor",
  react: "siReact",
  nextjs: "siNextdotjs",
  typescript: "siTypescript",
  tailwind: "siTailwindcss",
  postgres: "siPostgresql",
  termius: "siTermius",
  portainer: "siPortainer",
};

const html5 = si.siHtml5;
const css = si.siCss;

const out = {};
for (const [id, key] of Object.entries(map)) {
  const icon = si[key];
  out[id] = { color: `#${icon.hex}`, path: icon.path };
}

out["html-css"] = {
  color: `#${html5.hex}`,
  path: html5.path,
  extras: [{ color: `#${css.hex}`, path: css.path }],
};

out.pgvector = {
  color: `#${si.siPostgresql.hex}`,
  path: si.siPostgresql.path,
};

writeFileSync("scripts/icon-data.json", JSON.stringify(out, null, 2));
console.log("written", Object.keys(out).length, "icons");
