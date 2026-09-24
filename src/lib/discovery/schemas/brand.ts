import { SITE_NAME, SITE_URL } from "../config/site";
import type { BrandEntity } from "../types";
import { absoluteUrl } from "../urls/canonical";
import { brandPath } from "../urls/brand";
import { publicUrl, validDate } from "../utils/evidence";
import { breadcrumbJsonLd } from "./breadcrumb";
export function brandJsonLd(brand: BrandEntity) {
  const url = absoluteUrl(brandPath(brand));
  const name = brand.name || "Brand";
  return [{ "@context": "https://schema.org", "@type": "ProfilePage", "@id": url + "#profile", url,
    dateCreated: validDate(brand.createdAt), dateModified: validDate(brand.updatedAt),
    mainEntity: { "@type": "Organization", "@id": url + "#brand", name, url,
      identifier: brand._id, image: publicUrl(brand.profilePicUrl || brand.logoUrl),
      logo: publicUrl(brand.logoUrl || brand.profilePicUrl), description: brand.bio, address: brand.location,
      sameAs: publicUrl(brand.website) ? [publicUrl(brand.website)] : undefined,
    },
  }, breadcrumbJsonLd([{ name: "Home", item: SITE_URL }, { name: "Brands", item: absoluteUrl("/brands") }, { name, item: url }])];
}
export function organizationJsonLd() {
  return { "@context": "https://schema.org", "@type": "Organization", "@id": SITE_URL + "#organization", name: SITE_NAME, url: SITE_URL };
}
