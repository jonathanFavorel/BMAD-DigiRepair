import type { SeoCouche2Entry, SeoCity } from "@/lib/constants/seo-config";

interface ServiceCouche2JsonLdProps {
  entry: SeoCouche2Entry;
  city: SeoCity;
}

export function ServiceCouche2JsonLd({
  entry,
  city,
}: ServiceCouche2JsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Reparation ${entry.pieceLabel} ${entry.brandLabel} ${entry.modelLabel} a ${city.name}`,
    description: `Reparation ${entry.pieceLabel.toLowerCase()} ${entry.brandLabel} ${entry.modelLabel} a ${city.name} (${city.postalCode}). Des ${entry.priceFrom} euros, delai ${entry.delai}. Garantie 6 mois.`,
    provider: {
      "@type": "LocalBusiness",
      name: "DigiRepair",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Haulchin",
        postalCode: "59121",
        addressCountry: "FR",
      },
    },
    areaServed: {
      "@type": "City",
      name: city.name,
      postalCode: city.postalCode,
    },
    serviceType: `Reparation ${entry.pieceLabel} ${entry.brandLabel} ${entry.modelLabel}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: entry.priceFrom.toString(),
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: entry.priceFrom.toString(),
        priceCurrency: "EUR",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
