import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { generateSeoSlugs } from "@/lib/constants/seo-config";
import { parseSeoSlug, generateSeoMetadata } from "@/lib/utils/seo-helpers";
import { SEOPageTemplate } from "@/components/custom/seo-page-template";

export function generateStaticParams() {
  return generateSeoSlugs().map((item) => ({
    ville: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ville: string }>;
}): Promise<Metadata> {
  const { ville } = await params;
  const parsed = parseSeoSlug(ville);
  if (!parsed) return {};
  return generateSeoMetadata(parsed.category, parsed.city);
}

export default async function SeoPage({
  params,
}: {
  params: Promise<{ ville: string }>;
}) {
  const { ville } = await params;
  const parsed = parseSeoSlug(ville);

  if (!parsed) {
    notFound();
  }

  return (
    <SEOPageTemplate category={parsed.category} city={parsed.city} />
  );
}
