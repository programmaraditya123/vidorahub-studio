import type { Metadata } from "next";
import CollectionPage from "@/components/seo/CollectionPage";
import { collectionMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = collectionMetadata("brands");

export default function Page() {
  return <CollectionPage kind="brands" />;
}
