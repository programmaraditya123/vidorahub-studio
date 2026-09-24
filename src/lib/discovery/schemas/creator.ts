import { SITE_URL } from "../config/site";
import type { CreatorEntity } from "../types";
import { absoluteUrl } from "../urls/canonical";
import { creatorPath } from "../urls/creator";
import { publicUrl, validDate } from "../utils/evidence";
import { breadcrumbJsonLd } from "./breadcrumb";
export function creatorJsonLd(creator: CreatorEntity) {
  const url = absoluteUrl(creatorPath(creator));
  const name = creator.name || creator.username || "Creator";
  return [{
    "@context": "https://schema.org", "@type": "ProfilePage", "@id": url + "#profile", url,
    dateCreated: validDate(creator.createdAt), dateModified: validDate(creator.updatedAt),
    mainEntity: { "@type": "Person", "@id": url + "#creator", name, url,
      identifier: creator._id, alternateName: creator.username,
      image: publicUrl(creator.profilePicUrl), description: creator.bio,
      knowsLanguage: creator.languages, knowsAbout: creator.tags,
      address: creator.location || creator.city || creator.state,
      sameAs: (creator.platforms || []).map(platform => publicUrl(platform.url)).filter(Boolean),
    },
  }, breadcrumbJsonLd([{ name: "Home", item: SITE_URL }, { name: "Creators", item: absoluteUrl("/creators") }, { name, item: url }])];
}
