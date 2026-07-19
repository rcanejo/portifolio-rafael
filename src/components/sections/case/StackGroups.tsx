import type { Locale, StackGroup } from "@/content/types";
import { localize } from "@/lib/content";

interface StackGroupsProps {
  groups: StackGroup[];
  locale: Locale;
}

export function StackGroups({ groups, locale }: StackGroupsProps) {
  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <div key={localize(group.category, locale)}>
          <p className="font-mono text-xs uppercase tracking-wider text-emerald">
            {localize(group.category, locale)}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {group.items.map((item) => (
              <span
                key={item}
                className="rounded border border-line px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-muted"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
