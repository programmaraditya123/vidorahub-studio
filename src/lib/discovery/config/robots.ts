// A single policy applies equally to search crawlers and AI crawlers.
// Public noindex pages remain crawlable so their metadata can be read.
export const ALLOWED_BOTS: string[] = [];
export const PUBLIC_BOT_DISALLOW = ["/api/", "/private/", "/admin/"];
export const DEFAULT_BOT_DISALLOW = PUBLIC_BOT_DISALLOW;
