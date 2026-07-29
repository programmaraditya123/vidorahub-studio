import type { Metadata } from "next";
import { CollectionPage } from "@/lib/discovery";
import { collectionMetadata } from "@/lib/discovery";

export const metadata: Metadata = collectionMetadata("platforms");

export default function Page() {
  return <CollectionPage kind="platforms" />;
}
