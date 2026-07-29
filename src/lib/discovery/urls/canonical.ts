import { SITE_URL } from "../config/site";

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}
