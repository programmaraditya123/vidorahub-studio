import type { Metadata } from "next";
import { CollectionPage } from "@/lib/discovery";
import { collectionMetadata } from "@/lib/discovery";

export async function generateMetadata(): Promise<Metadata> { return collectionMetadata("categories"); }

export default function Page() {
  return <CollectionPage kind="categories" />;
}
