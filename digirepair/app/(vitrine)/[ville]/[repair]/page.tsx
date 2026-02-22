import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { generateSeoCouche2Slugs } from "@/lib/constants/seo-config";
import {
  parseCouche2Slug,
  generateCouche2Metadata,
} from "@/lib/utils/seo-helpers";
import { SEOCouche2Template } from "@/components/custom/seo-couche2-template";

export function generateStaticParams() {
  return generateSeoCouche2Slugs().map((item) => ({
    ville: item.citySlug,
    repair: item.repairSlug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ville: string; repair: string }>;
}): Promise<Metadata> {
  const { ville, repair } = await params;
  const parsed = parseCouche2Slug(ville, repair);
  if (!parsed) return {};
  return generateCouche2Metadata(parsed.entry, parsed.city);
}

export default async function SeoCouche2Page({
  params,
}: {
  params: Promise<{ ville: string; repair: string }>;
}) {
  const { ville, repair } = await params;
  const parsed = parseCouche2Slug(ville, repair);
  if (!parsed) {
    notFound();
  }
  return <SEOCouche2Template entry={parsed.entry} city={parsed.city} />;
}
