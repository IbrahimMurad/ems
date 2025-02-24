export function isoToLocaleDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString();
}
