import { notFound, permanentRedirect } from "next/navigation";
import BrandProfile from "@/components/brand/BrandProfile/BrandProfile";
import Footer from "@/components/Creator/Footer/Footer";
import { Discovery, JsonLd, brandJsonLd } from "@/lib/discovery";
import styles from "../../page.module.css";

export const revalidate = 900;
export const generateStaticParams = Discovery.metadata.generateBrandStaticParams;
export const generateMetadata = Discovery.metadata.generateBrandMetadata;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const { id, brand, canonicalPath, redirectPath } = await Discovery.metadata.resolveBrandRoute(slug);

  if (!id || !brand || !canonicalPath) notFound();
  if (redirectPath) permanentRedirect(redirectPath);

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
