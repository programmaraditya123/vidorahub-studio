import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import JsonLd from "@/components/seo/JsonLd";
import { CreatorSemanticEntityBlocks } from "@/components/seo/SemanticEntityBlocks";
import { getAllCreators, getCreatorById } from "@/lib/seo/data";
import { creatorJsonLd } from "@/lib/seo/jsonLd";
import { creatorMetadata, creatorPath } from "@/lib/seo/metadata";
import { extractObjectId } from "@/lib/seo/slugs";
import CreatorProfileClient from "./CreatorProfileClient";

export const revalidate = 900;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const creators = await getAllCreators(1000);
  return creators.map((creator) => ({
    slug: creatorPath(creator).split("/").pop() || creator._id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const id = extractObjectId(slug);
  if (!id) return {};

  const creator = await getCreatorById(id);
  if (!creator) return {};

  return creatorMetadata(creator);
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const id = extractObjectId(slug);
  if (!id) notFound();

  const creator = await getCreatorById(id);
  if (!creator) notFound();

  const canonicalPath = creatorPath(creator);
  if (`/creator/${slug}` !== canonicalPath) {
    permanentRedirect(canonicalPath);
  }

  return (
    <>
      <JsonLd data={creatorJsonLd(creator)} />
      <CreatorProfileClient creatorId={id} />
      <CreatorSemanticEntityBlocks creator={creator} />
    </>
  );
}
