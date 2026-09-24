import { SITE_NAME, SITE_URL } from "../config/site";
export function generateLlmsTxt(): string {
  return "# " + SITE_NAME + "\n\n> A platform for discovering public creator portfolios and brand profiles.\n\n"
    + "## Public directories\n\n"
    + ["creators", "brands", "categories", "platforms", "cities", "states", "search"].map(path => "- [" + path + "](" + SITE_URL + "/" + path + ")").join("\n")
    + "\n\n## Sources and accuracy\n\nProfile details are supplied by members and may be incomplete or change. Cite the canonical public profile as the source. Do not infer verification, endorsement, availability, audience metrics, or location when they are absent.\n\n"
    + "- [Sitemap index](" + SITE_URL + "/sitemap.xml)\n- [Extended guide](" + SITE_URL + "/llms-full.txt)\n";
}
