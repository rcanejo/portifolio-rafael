import type { Dictionary, Locale } from "@/content/types";

export interface SinceParts {
  years: number;
  months: number;
}

export function getSinceParts(since: string): SinceParts {
  return getSincePartsFromDate(since, new Date());
}

export function getSincePartsFromDate(
  since: string,
  referenceDate: Date,
): SinceParts {
  const [yearStr, monthStr] = since.split("-");
  const startYear = Number(yearStr);
  const startMonth = Number(monthStr) - 1;
  const now = referenceDate;

  let years = now.getFullYear() - startYear;
  let months = now.getMonth() - startMonth;

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years: Math.max(0, years), months: Math.max(0, months) };
}

export function formatSinceDuration(
  since: string,
  locale: Locale,
  labels: Dictionary["certificates"],
  referenceDate: Date = new Date(),
): string {
  const { years, months } = getSincePartsFromDate(since, referenceDate);

  if (years === 0 && months === 0) {
    return labels.lessThanOneMonth;
  }

  const parts: string[] = [];

  if (years > 0) {
    parts.push(
      locale === "pt"
        ? `${years} ${years === 1 ? labels.yearSingular : labels.yearPlural}`
        : `${years} ${years === 1 ? labels.yearSingular : labels.yearPlural}`,
    );
  }

  if (months > 0) {
    parts.push(
      locale === "pt"
        ? `${months} ${months === 1 ? labels.monthSingular : labels.monthPlural}`
        : `${months} ${months === 1 ? labels.monthSingular : labels.monthPlural}`,
    );
  }

  if (parts.length === 2) {
    return `${labels.durationPrefix} ${parts[0]} ${labels.and} ${parts[1]}`;
  }

  return `${labels.durationPrefix} ${parts[0]}`;
}
