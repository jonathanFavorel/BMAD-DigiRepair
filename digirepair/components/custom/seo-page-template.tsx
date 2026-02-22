import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { ServiceJsonLd } from "@/components/seo/service-jsonld";
import { Star } from "lucide-react";
import type { SeoCategory, SeoCity } from "@/lib/constants/seo-config";
import { generateBreadcrumbs } from "@/lib/utils/seo-helpers";

interface SEOPageTemplateProps {
  category: SeoCategory;
  city: SeoCity;
}

export function SEOPageTemplate({ category, city }: SEOPageTemplateProps) {
  const breadcrumbs = generateBreadcrumbs(category, city);
  const whatsappMessage = `Bonjour, je cherche une reparation ${category.label.toLowerCase()} a ${city.name}.`;

  return (
    <>
      <ServiceJsonLd category={category} city={city} />
      <Breadcrumbs items={breadcrumbs} />
      <HeroSection category={category} city={city} whatsappMessage={whatsappMessage} />
      <RepairsSection category={category} city={city} />
      <FaqSection category={category} city={city} />
      <CtaSection city={city} whatsappMessage={whatsappMessage} />
    </>
  );
}

function HeroSection({
  category,
  city,
  whatsappMessage,
}: {
  category: SeoCategory;
  city: SeoCity;
  whatsappMessage: string;
}) {
  const IconComponent = category.icon;

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-2xl md:text-4xl font-bold text-dr-dark leading-tight">
              Reparation {category.label} a {city.name}
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed">
              {category.description} DigiRepair intervient a {city.name} ({city.postalCode}) et dans un rayon de 40km autour de Haulchin. Devis gratuit et reparation rapide.
            </p>

            <div className="flex gap-6">
              <div>
                <p className="text-2xl md:text-3xl font-bold text-dr-dark">
                  Des {category.priceFrom}&euro;
                </p>
                <p className="text-xs font-medium text-muted-foreground">
                  tarif de base
                </p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-dr-dark">
                  6 mois
                </p>
                <p className="text-xs font-medium text-muted-foreground">
                  garantie
                </p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-dr-dark">
                  48h
                </p>
                <p className="text-xs font-medium text-muted-foreground">
                  delai moyen
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <WhatsAppButton variant="inline" message={whatsappMessage} />
            </div>
          </div>

          <div className="relative aspect-square md:aspect-[4/3] rounded-lg bg-dr-alt flex items-center justify-center overflow-hidden">
            <IconComponent className="h-24 w-24 text-dr-dark/20" />
            <Image
              src="/og-image.png"
              alt={`Reparation ${category.label} a ${city.name}`}
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

function RepairsSection({
  category,
  city,
}: {
  category: SeoCategory;
  city: SeoCity;
}) {
  return (
    <section className="py-12 md:py-16 bg-dr-alt">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-xl md:text-3xl font-semibold text-dr-dark text-center mb-8 md:mb-12">
          Reparations {category.label} disponibles a {city.name}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {category.repairs.map((repair) => (
            <Card
              key={repair.title}
              className="rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <CardHeader className="pb-2">
                <h3 className="text-lg md:text-xl font-semibold leading-none tracking-tight">
                  {repair.title}
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  {repair.description}
                </p>
                <Badge variant="secondary">Des {repair.priceFrom}&euro;</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection({
  category,
  city,
}: {
  category: SeoCategory;
  city: SeoCity;
}) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: category.faq.map((item) => ({
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
          Questions frequentes — {category.label} a {city.name}
        </h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {category.faq.map((item) => (
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

function CtaSection({
  city,
  whatsappMessage,
}: {
  city: SeoCity;
  whatsappMessage: string;
}) {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
        <h2 className="text-xl md:text-3xl font-semibold text-dr-dark mb-4">
          Besoin d&apos;une reparation a {city.name} ?
        </h2>
        <p className="text-base text-muted-foreground mb-6 max-w-xl mx-auto">
          Contactez-nous pour un devis gratuit. Nous intervenons a {city.name} et dans toutes les communes dans un rayon de 40km autour de Haulchin.
        </p>
        <div className="flex justify-center">
          <WhatsAppButton variant="inline" message={whatsappMessage} />
        </div>
        <div className="flex items-center justify-center gap-1 mt-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-dr-warning text-dr-warning" />
          ))}
          <span className="text-sm text-muted-foreground ml-1">5/5 sur Google</span>
        </div>
      </div>
    </section>
  );
}
