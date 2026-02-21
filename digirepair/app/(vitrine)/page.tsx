import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { LocalBusinessJsonLd } from "@/components/seo/local-business-jsonld";
import {
  Smartphone,
  Tablet,
  Laptop,
  Apple,
  Gamepad2,
  Cpu,
  MessageCircle,
  Package,
  CheckCircle,
  Star,
} from "lucide-react";

export default function HomePage() {
  return (
    <>
      <LocalBusinessJsonLd />
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <ReviewsSection />
    </>
  );
}

/* ==============================
   HERO SECTION (AC #1)
   ============================== */

function HeroSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: text + stats */}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-5xl font-bold text-dr-dark leading-tight">
              Reparation d&apos;appareils electroniques a Haulchin
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed">
              Smartphones, tablettes, PC, Mac et consoles — reparation
              professionnelle avec suivi en temps reel. Devis gratuit et
              transparent.
            </p>

            {/* Stats */}
            <div className="flex gap-6">
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary">
                  347+
                </p>
                <p className="text-xs font-medium text-muted-foreground">
                  appareils repares
                </p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary">
                  4.9/5
                </p>
                <p className="text-xs font-medium text-muted-foreground">
                  avis Google
                </p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary">
                  48h
                </p>
                <p className="text-xs font-medium text-muted-foreground">
                  delai moyen
                </p>
              </div>
            </div>

            {/* Double CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <WhatsAppButton variant="inline" />
              <Button variant="outline" asChild>
                <Link href="/tarifs">Voir les tarifs</Link>
              </Button>
            </div>
          </div>

          {/* Right: image placeholder (Scene3D in Story 2.6) */}
          <div className="relative aspect-square md:aspect-[4/3] rounded-lg bg-dr-alt flex items-center justify-center overflow-hidden">
            <Image
              src="/og-image.png"
              alt="DigiRepair - Reparation electronique"
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

/* ==============================
   SERVICES SECTION (AC #2)
   ============================== */

const services = [
  {
    icon: Smartphone,
    title: "Telephones",
    description: "Ecran, batterie, connecteur de charge, boutons et plus.",
    price: "29",
  },
  {
    icon: Tablet,
    title: "Tablettes",
    description: "Reparation d'ecran, batterie, connectique pour iPad et Android.",
    price: "49",
  },
  {
    icon: Laptop,
    title: "PC Portables",
    description: "Ecran, clavier, charniere, upgrade SSD/RAM, nettoyage.",
    price: "39",
  },
  {
    icon: Apple,
    title: "Mac",
    description: "MacBook, iMac — ecran, batterie, carte mere, recupération de donnees.",
    price: "59",
  },
  {
    icon: Gamepad2,
    title: "Consoles",
    description: "PS5, Xbox, Nintendo Switch — HDMI, lecteur, joystick drift.",
    price: "35",
  },
  {
    icon: Cpu,
    title: "Microsoudure",
    description: "Reparation avancee de composants CMS, rebillage, diagnostics carte mere.",
    price: "69",
  },
];

function ServicesSection() {
  return (
    <section id="services" className="py-12 md:py-16 bg-dr-alt">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-xl md:text-3xl font-semibold text-dr-dark text-center mb-8 md:mb-12">
          Nos services de reparation
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service) => (
            <Card
              key={service.title}
              className="rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <service.icon className="h-8 w-8 text-primary shrink-0" />
                <CardTitle className="text-lg md:text-xl">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  {service.description}
                </p>
                <Badge variant="secondary">Des {service.price}&euro;</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==============================
   HOW IT WORKS SECTION (AC #3)
   ============================== */

const steps = [
  {
    number: 1,
    icon: MessageCircle,
    title: "Contactez-nous",
    description:
      "Decrivez votre panne par WhatsApp ou via le formulaire. Nous vous repondons rapidement avec un devis gratuit.",
  },
  {
    number: 2,
    icon: Package,
    title: "Deposez votre appareil",
    description:
      "Amenez votre appareil a notre atelier de Haulchin ou envoyez-le par colis securise.",
  },
  {
    number: 3,
    icon: CheckCircle,
    title: "Recuperez-le repare",
    description:
      "Suivez la reparation en temps reel. Une fois termine, recuperez votre appareil comme neuf.",
  },
];

function HowItWorksSection() {
  return (
    <section className="py-12 md:py-16 bg-dr-soft">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-xl md:text-3xl font-semibold text-dr-dark text-center mb-8 md:mb-12">
          Comment ca marche ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center text-center space-y-3">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground font-bold text-lg">
                {step.number}
              </div>
              <step.icon className="h-8 w-8 text-primary" />
              <h3 className="text-lg md:text-xl font-semibold text-dr-dark">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==============================
   REVIEWS SECTION (AC #4)
   ============================== */

const reviews = [
  {
    name: "Sophie M.",
    rating: 5,
    text: "Ecran de mon iPhone repare en moins de 2h. Travail soigne et prix tres correct. Je recommande !",
    date: "Janvier 2026",
  },
  {
    name: "Thomas D.",
    rating: 5,
    text: "Mon PC portable ne demarrait plus, diagnostic rapide et reparation efficace. Service au top.",
    date: "Fevrier 2026",
  },
  {
    name: "Marie L.",
    rating: 4,
    text: "Tres bon service pour la reparation de ma Nintendo Switch. Le suivi en ligne est un vrai plus.",
    date: "Fevrier 2026",
  },
];

function ReviewsSection() {
  return (
    <section className="py-12 md:py-16 bg-dr-soft">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h2 className="text-xl md:text-3xl font-semibold text-dr-dark text-center mb-2">
          Ce que disent nos clients
        </h2>
        <div className="flex items-center justify-center gap-2 mb-8 md:mb-12">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-5 w-5 fill-dr-warning text-dr-warning"
              />
            ))}
          </div>
          <span className="font-semibold text-dr-dark">4.9/5</span>
          <span className="text-sm text-muted-foreground">&mdash; 47 avis Google</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {reviews.map((review) => (
            <Card key={review.name} className="rounded-lg shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-dr-warning text-dr-warning"
                    />
                  ))}
                  {[...Array(5 - review.rating)].map((_, i) => (
                    <Star
                      key={`empty-${i}`}
                      className="h-4 w-4 text-muted-foreground/30"
                    />
                  ))}
                </div>
                <p className="text-sm text-foreground mb-3">{review.text}</p>
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-dr-dark">
                    {review.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
