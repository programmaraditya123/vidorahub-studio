export function isSitemapPath(path: string): boolean {
  return path.startsWith("/") && path.endsWith(".xml");
}
