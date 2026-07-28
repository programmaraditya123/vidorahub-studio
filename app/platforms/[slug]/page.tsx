import type { Metadata } from "next";
import CollectionPage from "@/components/seo/CollectionPage";
import { INDEXABLE_PLATFORMS } from "@/lib/seo/constants";
import { collectionMetadata } from "@/lib/seo/metadata";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return INDEXABLE_PLATFORMS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return collectionMetadata("platforms", slug);
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <CollectionPage kind="platforms" slug={slug} />;
}
