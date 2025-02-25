export function isoToLocaleDate(isoDate: string): string {
  return new Date(isoDate).toDateString().split(" ").slice(1).join(" ");
}
