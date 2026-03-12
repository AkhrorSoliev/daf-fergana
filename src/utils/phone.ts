export const PHONE_PREFIX = "+998 ";
export const PHONE_PATTERN = /^\+998\s\d{2}\s\d{3}\s\d{2}\s\d{2}$/;

export function formatUzbekPhone(input: string): string {
  const digits = input.replace(/\D/g, "");
  const afterPrefix = digits.startsWith("998") ? digits.slice(3) : digits;
  const limited = afterPrefix.slice(0, 9);
  const part1 = limited.slice(0, 2);
  const part2 = limited.slice(2, 5);
  const part3 = limited.slice(5, 7);
  const part4 = limited.slice(7, 9);
  const groups = [part1, part2, part3, part4].filter(Boolean);
  return PHONE_PREFIX + groups.join(" ");
}
