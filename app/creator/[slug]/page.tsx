import { notFound, permanentRedirect } from "next/navigation";
import {
  CreatorSemanticEntityBlocks,
  Discovery,
  JsonLd,
  creatorJsonLd,
} from "@/lib/discovery";
import CreatorProfileClient from "./CreatorProfileClient";

export const revalidate = 900;
export const generateStaticParams = Discovery.metadata.generateCreatorStaticParams;
export const generateMetadata = Discovery.metadata.generateCreatorMetadata;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const { id, creator, redirectPath } = await Discovery.metadata.resolveCreatorRoute(slug);

  if (!id || !creator) notFound();
  if (redirectPath) permanentRedirect(redirectPath);

  return (
    <>
      <JsonLd data={creatorJsonLd(creator)} />
      <CreatorProfileClient creatorId={id} />
      <CreatorSemanticEntityBlocks creator={creator} />
    </>
  );
}
