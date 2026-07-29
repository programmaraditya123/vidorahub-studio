import type { Metadata } from "next";
import { CollectionPage } from "@/lib/discovery";
import { collectionMetadata } from "@/lib/discovery";

export const metadata: Metadata = collectionMetadata("cities");

export default function Page() {
  return <CollectionPage kind="cities" />;
}
