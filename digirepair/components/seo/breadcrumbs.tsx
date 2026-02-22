import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { BreadcrumbItem } from "@/lib/utils/seo-helpers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://digirepair.fr";

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Fil d'Ariane" className="max-w-7xl mx-auto px-4 md:px-8 py-3">
        <ol className="flex items-center gap-1 text-sm text-muted-foreground overflow-hidden">
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center gap-1 min-w-0">
              {index > 0 && (
                <ChevronRight className="h-3 w-3 shrink-0" />
              )}
              {index < items.length - 1 ? (
                <Link
                  href={item.href}
                  className="hover:text-primary transition-colors truncate"
                >
                  {item.name}
                </Link>
              ) : (
                <span className="text-foreground font-medium truncate">
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
