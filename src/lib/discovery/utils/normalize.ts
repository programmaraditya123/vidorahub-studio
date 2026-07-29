export function compact<T>(items: Array<T | false | null | undefined>): T[] {
  return items.filter(Boolean) as T[];
}
