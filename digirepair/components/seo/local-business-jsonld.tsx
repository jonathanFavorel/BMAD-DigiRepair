export function LocalBusinessJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "DigiRepair",
    description:
      "Reparation de smartphones, tablettes, PC, Mac et consoles a Haulchin (59121) et dans un rayon de 40km.",
    url: "https://digirepair.fr",
    telephone: "+33600000000",
    email: "contact@digirepair.fr",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Haulchin",
      postalCode: "59121",
      addressCountry: "FR",
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 50.315,
        longitude: 3.458,
      },
      geoRadius: "40000",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "47",
    },
    priceRange: "$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
