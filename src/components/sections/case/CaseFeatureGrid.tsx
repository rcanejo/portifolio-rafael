import type { CaseFeature, Locale } from "@/content/types";
import { localize } from "@/lib/content";
import { CaseIcon } from "./CaseIcon";

interface CaseFeatureGridProps {
  items: CaseFeature[];
  locale: Locale;
}

export function CaseFeatureGrid({ items, locale }: CaseFeatureGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.icon + localize(item.title, locale)}
          className="rounded-lg border border-line bg-panel p-6 transition duration-200 hover:border-emerald/60"
        >
          <CaseIcon name={item.icon} className="h-8 w-8 text-emerald" />
          <h3 className="font-display mt-4 text-base font-semibold">
            {localize(item.title, locale)}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {localize(item.description, locale)}
          </p>
        </div>
      ))}
    </div>
  );
}
