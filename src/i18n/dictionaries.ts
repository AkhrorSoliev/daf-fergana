import { uz } from "./dictionaries/uz";
import { de } from "./dictionaries/de";

export type Locale = "uz" | "de";

export type Dict = typeof uz;

export const dictionaries: Record<Locale, Dict> = { uz, de };

export function getFromDict(dict: unknown, path: string): string {
  const value = path
    .split(".")
    .reduce(
      (acc, key) =>
        acc && typeof acc === "object" && acc !== null && key in acc
          ? (acc as Record<string, unknown>)[key]
          : undefined,
      dict
    );
  return typeof value === "string" ? value : "";
}
