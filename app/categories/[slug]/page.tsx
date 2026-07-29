import type { Metadata } from "next";
import { CollectionPage } from "@/lib/discovery";
import { INDEXABLE_CATEGORIES } from "@/lib/discovery";
import { collectionMetadata } from "@/lib/discovery";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return INDEXABLE_CATEGORIES.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return collectionMetadata("categories", slug);
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <CollectionPage kind="categories" slug={slug} />;
}
