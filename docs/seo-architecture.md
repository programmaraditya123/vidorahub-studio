# VidoraHub Studio SEO, AEO and GEO Architecture

VidoraHub Studio treats every public creator and brand profile as a stable entity. Public URLs use a readable slug plus the MongoDB ObjectId, for example `/creator/aditya-saini-69974bc1f19a0c7fe0a42de0`. The slug is cosmetic; all profile data is resolved by ObjectId. If the display name changes, the old URL permanently redirects to the new canonical URL.

## Public Crawl Surface

- `/creator/{slug}-{objectId}` and `/brand/{slug}-{objectId}` generate dynamic metadata, canonical URLs, OpenGraph/Twitter cards, JSON-LD and OG images.
- `/creators`, `/brands`, `/categories`, `/platforms`, `/cities` and `/states` provide crawlable discovery pages.
- `/search` supports query filters. `/search/{segment}` and `/search/{category}/{city}` provide indexable search landing URLs for high-value combinations.
- `/sitemap.xml` is a sitemap index pointing to creator, brand, category, platform, city, state, search, image and video sitemaps.
- `/rss.xml`, `/atom.xml`, `/llms.txt`, `/llms-full.txt`, `/humans.txt`, `/security.txt` and `/.well-known/security.txt` are generated dynamically.

## Automatic Regeneration

The route handlers use ISR cache windows. Backend profile mutations should call:

```txt
POST /api/revalidate?secret=$REVALIDATE_SECRET
Content-Type: application/json

{ "type": "creator", "id": "69974bc1f19a0c7fe0a42de0" }
```

or:

```txt
{ "type": "brand", "id": "69974bc1f19a0c7fe0a42de0" }
```

This invalidates profile paths, sitemap routes, feeds and AI guidance files without manual deployment.

## Scaling Notes

For millions of creators or brands, split child sitemaps into paginated sitemap files of at most 50,000 URLs each, backed by API pagination. Keep the sitemap index stable and add numbered child routes such as `/creator-sitemap-1.xml`. The slug/ObjectId strategy remains unchanged, so backlinks and canonical identity stay stable while names remain editable.
