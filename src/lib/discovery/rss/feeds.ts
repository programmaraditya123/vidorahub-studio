import { SITE_NAME, SITE_URL } from "../config/site";
import { getAllBrands, getAllCreators } from "../search/entities";
import { brandPath } from "../urls/brand";
import { creatorPath } from "../urls/creator";
import { escapeFeedText } from "../utils/sanitize";
import { validDate } from "../utils/evidence";
async function entries() {
  const [creators, brands] = await Promise.all([getAllCreators(), getAllBrands()]);
  return [...creators.map(creator => ({ title: creator.name || creator.username || "Creator", link: creatorPath(creator), date: validDate(creator.updatedAt || creator.createdAt), summary: creator.bio || "Public creator profile." })),
    ...brands.map(brand => ({ title: brand.name || "Brand", link: brandPath(brand), date: validDate(brand.updatedAt || brand.createdAt), summary: brand.bio || "Public brand profile." }))]
    .filter((entry): entry is typeof entry & { date: string } => !!entry.date)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date)).slice(0, 100);
}
export async function rss() {
  const items = await entries();
  return '<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>' + SITE_NAME + '</title><link>' + SITE_URL + '</link><description>Recently updated public creator and brand profiles.</description>'
    + items.map(item => '<item><title>' + escapeFeedText(item.title) + '</title><link>' + escapeFeedText(SITE_URL + item.link) + '</link><guid>' + escapeFeedText(SITE_URL + item.link) + '</guid><pubDate>' + new Date(item.date).toUTCString() + '</pubDate><description>' + escapeFeedText(item.summary) + '</description></item>').join('') + '</channel></rss>';
}
export async function atom() {
  const items = await entries();
  const updated = items[0]?.date || "1970-01-01T00:00:00.000Z";
  return '<?xml version="1.0" encoding="UTF-8"?><feed xmlns="http://www.w3.org/2005/Atom"><title>' + SITE_NAME + '</title><id>' + SITE_URL + '/</id><updated>' + updated + '</updated><author><name>' + SITE_NAME + '</name></author><link href="' + SITE_URL + '/atom.xml" rel="self"/><link href="' + SITE_URL + '/"/>'
    + items.map(item => '<entry><title>' + escapeFeedText(item.title) + '</title><id>' + escapeFeedText(SITE_URL + item.link) + '</id><link href="' + escapeFeedText(SITE_URL + item.link) + '"/><updated>' + item.date + '</updated><summary>' + escapeFeedText(item.summary) + '</summary></entry>').join('') + '</feed>';
}
