import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import BrandProfile from "@/components/brand/BrandProfile/BrandProfile";
import Footer from "@/components/Creator/Footer/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { getAllBrands, getBrandById } from "@/lib/seo/data";
import { brandJsonLd } from "@/lib/seo/jsonLd";
import { brandMetadata, brandPath } from "@/lib/seo/metadata";
import { extractObjectId } from "@/lib/seo/slugs";
import styles from "../../page.module.css";

export const revalidate = 900;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const brands = await getAllBrands();
  return brands.map((brand) => ({
    slug: brandPath(brand).split("/").pop() || brand._id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const id = extractObjectId(slug);
  if (!id) return {};

  const brand = await getBrandById(id);
  if (!brand) return {};

  return brandMetadata(brand);
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const id = extractObjectId(slug);
  if (!id) notFound();

  const brand = await getBrandById(id);
  if (!brand) notFound();

  const canonicalPath = brandPath(brand);
  if (`/brand/${slug}` !== canonicalPath) {
    permanentRedirect(canonicalPath);
  }

  return (
    <>
      <JsonLd data={brandJsonLd(brand)} />
      <div className={styles.page}>
        <BrandProfile brandId={id} canonicalPath={canonicalPath} />
        <Footer />
      </div>
    </>
  );
}
