import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { ServiceCouche2JsonLd } from "@/components/seo/service-couche2-jsonld";
import { Star, Clock, Shield, ArrowRight } from "lucide-react";
import type { SeoCouche2Entry, SeoCity } from "@/lib/constants/seo-config";
import { SEO_CATEGORIES } from "@/lib/constants/seo-config";
import { generateCouche2Breadcrumbs } from "@/lib/utils/seo-helpers";

interface SEOCouche2TemplateProps {
  entry: SeoCouche2Entry;
  city: SeoCity;
}

export function SEOCouche2Template({ entry, city }: SEOCouche2TemplateProps) {
  const breadcrumbs = generateCouche2Breadcrumbs(entry, city);
  const whatsappMessage = `Bonjour, je souhaite un devis pour la reparation ${entry.pieceLabel.toLowerCase()} de mon ${entry.brandLabel} ${entry.modelLabel} a ${city.name}.`;
  const couche1Slug = `/reparation-${entry.categorySlug}-${city.slug}`;
  const category = SEO_CATEGORIES.find((c) => c.slug === entry.categorySlug);
  const categoryLabel = category ? category.label : entry.categorySlug;

  return (
    <>
      <ServiceCouche2JsonLd entry={entry} city={city} />
      <Breadcrumbs items={breadcrumbs} />
      <HeroSection entry={entry} city={city} whatsappMessage={whatsappMessage} />
      <SpecsSection entry={entry} city={city} />
      <FaqSection entry={entry} city={city} />
      <MaillageSection
        couche1Slug={couche1Slug}
        categoryLabel={categoryLabel}
        city={city}
      />
      <CtaSection entry={entry} city={city} whatsappMessage={whatsappMessage} />
    </>
  );
}

function HeroSection({
  entry,
  city,
  whatsappMessage,
}: {
  entry: SeoCouche2Entry;
  city: SeoCity;
  whatsappMessage: string;
}) {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-2xl md:text-4xl font-bold text-dr-dark leading-tight">
              Reparation {entry.pieceLabel} {entry.brandLabel}{" "}
              {entry.modelLabel} a {city.name}
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed">
              Votre {entry.brandLabel} {entry.modelLabel} a besoin d&apos;une
              reparation {entry.pieceLabel.toLowerCase()} ? DigiRepair
              intervient a {city.name} ({city.postalCode}) et dans un rayon de
              40km autour de Haulchin. Devis gratuit et reparation rapide.
            </p>

            <div className="flex gap-6">
              <div>
                <p className="text-2xl md:text-3xl font-bold text-dr-dark">
                  Des {entry.priceFrom}&euro;
                </p>
                <p className="text-xs font-medium text-muted-foreground">
                  tarif de base
                </p>
              </div>
              <div className="flex items-start gap-1.5">
                <Clock className="h-5 w-5 text-dr-dark mt-1 shrink-0" />
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-dr-dark">
                    {entry.delai}
                  </p>
                  <p className="text-xs font-medium text-muted-foreground">
                    delai estime
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-1.5">
                <Shield className="h-5 w-5 text-dr-dark mt-1 shrink-0" />
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-dr-dark">
                    6 mois
                  </p>
                  <p className="text-xs font-medium text-muted-foreground">
                    garantie
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <WhatsAppButton variant="inline" message={whatsappMessage} />
            </div>
          </div>

          <div className="relative aspect-square md:aspect-[4/3] rounded-lg bg-dr-alt flex items-center justify-center overflow-hidden">
            <Image
              src="/og-image.png"
              alt={`Reparation ${entry.pieceLabel} ${entry.brandLabel} ${entry.modelLabel} a ${city.name}`}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SpecsSection({
  entry,
  city,
}: {
  entry: SeoCouche2Entry;
  city: SeoCity;
}) {
  return (
    <section className="py-12 md:py-16 bg-dr-alt">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-xl md:text-3xl font-semibold text-dr-dark text-center mb-8 md:mb-12">
          Details de la reparation {entry.pieceLabel.toLowerCase()}{" "}
          {entry.modelLabel}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
          <Card className="rounded-lg shadow-sm">
            <CardHeader className="pb-2">
              <h3 className="text-lg md:text-xl font-semibold leading-none tracking-tight">
                Appareil
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {entry.brandLabel} {entry.modelLabel}
              </p>
            </CardContent>
          </Card>
          <Card className="rounded-lg shadow-sm">
            <CardHeader className="pb-2">
              <h3 className="text-lg md:text-xl font-semibold leading-none tracking-tight">
                Reparation
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {entry.pieceLabel}
              </p>
              <Badge variant="secondary" className="mt-2">
                Des {entry.priceFrom}&euro;
              </Badge>
            </CardContent>
          </Card>
          <Card className="rounded-lg shadow-sm">
            <CardHeader className="pb-2">
              <h3 className="text-lg md:text-xl font-semibold leading-none tracking-tight">
                Intervention
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Delai : {entry.delai}
              </p>
              <p className="text-sm text-muted-foreground">
                Zone : {city.name} et environs
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function FaqSection({
  entry,
  city,
}: {
  entry: SeoCouche2Entry;
  city: SeoCity;
}) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entry.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="py-12 md:py-16 bg-dr-soft">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-xl md:text-3xl font-semibold text-dr-dark text-center mb-8 md:mb-12">
          Questions frequentes — {entry.pieceLabel} {entry.modelLabel} a{" "}
          {city.name}
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {entry.faq.map((item) => (
            <div key={item.question}>
              <h3 className="text-lg font-semibold text-dr-dark mb-2">
                {item.question}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MaillageSection({
  couche1Slug,
  categoryLabel,
  city,
}: {
  couche1Slug: string;
  categoryLabel: string;
  city: SeoCity;
}) {
  return (
    <section className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center gap-2">
          <ArrowRight className="h-4 w-4 text-primary shrink-0" />
          <Link
            href={couche1Slug}
            className="text-primary hover:underline font-medium"
          >
            Voir toutes les reparations {categoryLabel.toLowerCase()} a{" "}
            {city.name}
          </Link>
        </div>
      </div>
    </section>
  );
}

function CtaSection({
  entry,
  city,
  whatsappMessage,
}: {
  entry: SeoCouche2Entry;
  city: SeoCity;
  whatsappMessage: string;
}) {
  return (
    <section className="py-12 md:py-16 bg-dr-alt">
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
        <h2 className="text-xl md:text-3xl font-semibold text-dr-dark mb-4">
          Besoin de reparer votre {entry.modelLabel} a {city.name} ?
        </h2>
        <p className="text-base text-muted-foreground mb-6 max-w-xl mx-auto">
          Contactez-nous pour un devis gratuit pour la reparation{" "}
          {entry.pieceLabel.toLowerCase()} de votre {entry.brandLabel}{" "}
          {entry.modelLabel}. Intervention a {city.name} et dans un rayon de
          40km.
        </p>
        <div className="flex justify-center">
          <WhatsAppButton variant="inline" message={whatsappMessage} />
        </div>
        <div className="flex items-center justify-center gap-1 mt-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="h-4 w-4 fill-dr-warning text-dr-warning"
            />
          ))}
          <span className="text-sm text-muted-foreground ml-1">
            5/5 sur Google
          </span>
        </div>
      </div>
    </section>
  );
}
