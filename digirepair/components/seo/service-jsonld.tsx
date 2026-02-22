import type { SeoCategory, SeoCity } from "@/lib/constants/seo-config";

interface ServiceJsonLdProps {
  category: SeoCategory;
  city: SeoCity;
}

export function ServiceJsonLd({ category, city }: ServiceJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Reparation ${category.label} a ${city.name}`,
    description: `${category.description} Intervention a ${city.name} (${city.postalCode}) et environs.`,
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
    serviceType: `Reparation ${category.label}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: category.priceFrom.toString(),
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: category.priceFrom.toString(),
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
