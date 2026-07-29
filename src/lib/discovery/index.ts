import * as cache from "./cache";
import * as metadata from "./metadata";
import * as og from "./og";
import * as robotsModule from "./robots";
import * as rss from "./rss";
import * as schema from "./schemas";
import * as search from "./search";
import * as sitemap from "./sitemap";
import * as slug from "./urls/slug";
import * as urls from "./urls";
import * as validators from "./validators/urls";

export const Discovery = {
  cache,
  metadata,
  og,
  robots: {
    generate: robotsModule.generateRobots,
    llms: robotsModule.generateLlmsTxt,
    llmsFull: robotsModule.generateLlmsFullTxt,
    humans: robotsModule.generateHumansTxt,
    security: robotsModule.generateSecurityTxt,
  },
  rss,
  schema,
  search,
  sitemap,
  slug: {
    generate: slug.buildEntitySlug,
    extractObjectId: slug.extractObjectId,
    validate: slug.validate,
  },
  urls,
  validators,
};

export type {
  BrandEntity,
  BrandExperience,
  CreatorEntity,
  PaginatedCreators,
  ShowcaseContent,
  SitemapUrl,
  SocialPlatform,
} from "./types";

export { DISCOVERY_CACHE, DISCOVERY_REVALIDATE_PATHS } from "./config/cache";
export {
  INDEXABLE_CATEGORIES,
  INDEXABLE_CITIES,
  INDEXABLE_PLATFORMS,
  INDEXABLE_STATES,
  POPULAR_SEARCHES,
  SITE_LANGUAGE,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
} from "./config/seo";
export { OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE } from "./config/social";
export { default as CollectionPage } from "./components/CollectionPage";
export { default as JsonLd } from "./components/JsonLd";
export { CreatorSemanticEntityBlocks } from "./components/SemanticEntityBlocks";
export { textResponse, xmlResponse } from "./generators/response";
export {
  brandMetadata,
  collectionMetadata,
  creatorMetadata,
  dashboardMetadata,
  generateBrandMetadata,
  generateBrandStaticParams,
  generateCreatorMetadata,
  generateCreatorStaticParams,
  homepageMetadata,
  loginMetadata,
  resolveBrandRoute,
  resolveCreatorRoute,
  searchMetadata,
  signupMetadata,
} from "./metadata";
export {
  brandJsonLd,
  breadcrumbJsonLd,
  creatorJsonLd,
  faqJsonLd,
  imageJsonLd,
  itemListJsonLd,
  organizationJsonLd,
  videoJsonLd,
  websiteJsonLd,
} from "./schemas";
export {
  getAllBrands,
  getAllCreators,
  getBrandById,
  getCreatorById,
} from "./search/entities";
export { sitemapIndex, urlset } from "./sitemap/generator";
export {
  brand as brandPath,
  canonical as absoluteUrl,
  category as categoryPath,
  creator as creatorPath,
  platform as platformPath,
  search as searchPath,
} from "./urls";
export {
  buildEntitySlug,
  extractObjectId,
  isCanonicalEntitySlug,
} from "./urls/slug";
export { slugify, titleizeSlug } from "./utils/slugify";
