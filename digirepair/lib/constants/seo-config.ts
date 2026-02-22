import {
  Smartphone,
  Tablet,
  Laptop,
  Apple,
  Gamepad2,
  Cpu,
  type LucideIcon,
} from "lucide-react";

// ===========================
// TYPES
// ===========================

export interface SeoCategory {
  slug: string;
  label: string;
  description: string;
  icon: LucideIcon;
  priceFrom: number;
  repairs: SeoRepair[];
  faq: SeoFaq[];
}

export interface SeoRepair {
  title: string;
  description: string;
  priceFrom: number;
}

export interface SeoFaq {
  question: string;
  answer: string;
}

export interface SeoCity {
  slug: string;
  name: string;
  postalCode: string;
  distanceKm: number;
}

export interface SeoSlugData {
  category: SeoCategory;
  city: SeoCity;
  slug: string;
}

// ===========================
// CATEGORIES (6)
// ===========================

export const SEO_CATEGORIES: SeoCategory[] = [
  {
    slug: "telephone",
    label: "Telephones",
    description:
      "Reparation de smartphones : ecran, batterie, connecteur de charge, boutons et plus.",
    icon: Smartphone,
    priceFrom: 29,
    repairs: [
      { title: "Remplacement ecran", description: "Ecran LCD ou OLED casse, tactile defaillant", priceFrom: 49 },
      { title: "Changement batterie", description: "Batterie qui ne tient plus la charge", priceFrom: 29 },
      { title: "Connecteur de charge", description: "Port de charge defectueux ou oxyde", priceFrom: 35 },
      { title: "Boutons et haut-parleur", description: "Bouton power, volume, haut-parleur HS", priceFrom: 25 },
    ],
    faq: [
      { question: "Combien de temps dure une reparation de telephone ?", answer: "La plupart des reparations de telephone sont effectuees en moins de 2 heures. Les cas complexes comme la microsoudure peuvent prendre 24 a 48h." },
      { question: "Garantie sur la reparation ?", answer: "Toutes nos reparations sont garanties 6 mois pieces et main d'oeuvre." },
      { question: "Faut-il prendre rendez-vous ?", answer: "Non, vous pouvez passer directement a notre atelier de Haulchin. Pour un diagnostic rapide, contactez-nous d'abord via WhatsApp." },
    ],
  },
  {
    slug: "tablette",
    label: "Tablettes",
    description:
      "Reparation de tablettes iPad et Android : ecran, batterie, connectique.",
    icon: Tablet,
    priceFrom: 49,
    repairs: [
      { title: "Remplacement ecran", description: "Vitre tactile ou ecran LCD casse", priceFrom: 69 },
      { title: "Changement batterie", description: "Batterie gonflee ou usee", priceFrom: 49 },
      { title: "Connecteur de charge", description: "Port Lightning ou USB-C defectueux", priceFrom: 45 },
    ],
    faq: [
      { question: "Reparezez-vous les iPad et les tablettes Android ?", answer: "Oui, nous reparons toutes les marques : iPad, Samsung Galaxy Tab, Huawei, Lenovo et plus." },
      { question: "Combien coute une reparation d'ecran de tablette ?", answer: "Les prix varient selon le modele, a partir de 69 euros. Contactez-nous pour un devis gratuit et precis." },
      { question: "Faut-il prendre rendez-vous ?", answer: "Non, vous pouvez passer directement a notre atelier de Haulchin. Pour un diagnostic rapide, contactez-nous d'abord via WhatsApp." },
    ],
  },
  {
    slug: "pc-portable",
    label: "PC Portables",
    description:
      "Reparation de PC portables : ecran, clavier, charniere, upgrade SSD/RAM, nettoyage.",
    icon: Laptop,
    priceFrom: 39,
    repairs: [
      { title: "Remplacement ecran", description: "Ecran casse ou taches sur la dalle", priceFrom: 79 },
      { title: "Changement clavier", description: "Touches defaillantes ou liquide renverse", priceFrom: 49 },
      { title: "Reparation charniere", description: "Charniere cassee ou desserree", priceFrom: 39 },
      { title: "Upgrade SSD/RAM", description: "Amelioration des performances avec SSD ou RAM supplementaire", priceFrom: 49 },
    ],
    faq: [
      { question: "Mon PC portable est tres lent, pouvez-vous l'accelerer ?", answer: "Oui ! Un upgrade SSD + nettoyage logiciel transforme les performances. Resultat garanti des 49 euros." },
      { question: "Reparezez-vous toutes les marques de PC portable ?", answer: "Oui : HP, Lenovo, Dell, Asus, Acer, MSI et toutes les autres marques." },
      { question: "Combien de temps pour une reparation de PC portable ?", answer: "En general 24 a 48h. Les upgrades SSD/RAM sont faits en quelques heures." },
    ],
  },
  {
    slug: "mac",
    label: "Mac",
    description:
      "Reparation MacBook et iMac : ecran, batterie, carte mere, recuperation de donnees.",
    icon: Apple,
    priceFrom: 59,
    repairs: [
      { title: "Remplacement ecran MacBook", description: "Ecran Retina casse ou defaillant", priceFrom: 149 },
      { title: "Changement batterie", description: "Batterie gonflee ou cycle depasse", priceFrom: 79 },
      { title: "Reparation carte mere", description: "Diagnostic et microsoudure carte mere", priceFrom: 99 },
      { title: "Recuperation de donnees", description: "Recuperation sur disque SSD ou HDD defaillant", priceFrom: 59 },
    ],
    faq: [
      { question: "Etes-vous agrees Apple ?", answer: "Nous sommes un reparateur independant specialise Mac. Nos reparations sont de qualite professionnelle avec des pieces compatibles certifiees." },
      { question: "Combien coute une reparation de MacBook ?", answer: "Les prix varient selon le modele et la panne, a partir de 59 euros. Devis gratuit avant toute intervention." },
      { question: "Pouvez-vous recuperer mes donnees ?", answer: "Oui, nous proposons un service de recuperation de donnees a partir de 59 euros. Taux de reussite > 90%." },
    ],
  },
  {
    slug: "console",
    label: "Consoles",
    description:
      "Reparation de consoles PS5, Xbox, Nintendo Switch : HDMI, lecteur, joystick drift.",
    icon: Gamepad2,
    priceFrom: 35,
    repairs: [
      { title: "Reparation port HDMI", description: "Port HDMI arrache ou defectueux (PS5, Xbox)", priceFrom: 69 },
      { title: "Remplacement lecteur", description: "Lecteur Blu-ray qui ne lit plus les jeux", priceFrom: 49 },
      { title: "Joystick drift Switch", description: "Joy-Con qui derive, remplacement du stick", priceFrom: 35 },
      { title: "Nettoyage ventilateur", description: "Surchauffe, bruit de ventilateur excessif", priceFrom: 35 },
    ],
    faq: [
      { question: "Reparezez-vous le drift des Joy-Con Nintendo Switch ?", answer: "Oui, c'est l'une de nos reparations les plus frequentes. Remplacement du stick analogique a partir de 35 euros, en moins d'1 heure." },
      { question: "Ma PS5 n'affiche plus d'image, c'est reparable ?", answer: "Dans la majorite des cas, c'est un probleme de port HDMI reparable par microsoudure. Diagnostic gratuit." },
      { question: "Combien de temps pour reparer ma console ?", answer: "La plupart des reparations sont effectuees en 24 a 48h. Le drift Joy-Con est fait en 1 heure." },
    ],
  },
  {
    slug: "microsoudure",
    label: "Microsoudure",
    description:
      "Reparation avancee de composants CMS, rebillage, diagnostics carte mere.",
    icon: Cpu,
    priceFrom: 49,
    repairs: [
      { title: "Diagnostic carte mere", description: "Analyse composant par composant avec microscope", priceFrom: 49 },
      { title: "Remplacement composant CMS", description: "Soudure de composants miniatures (condensateurs, IC)", priceFrom: 69 },
      { title: "Rebillage puce", description: "Retrait et ressoudage de puces BGA", priceFrom: 89 },
      { title: "Reparation piste circuit", description: "Reconstruction de pistes coupees ou corrodees", priceFrom: 59 },
    ],
    faq: [
      { question: "Qu'est-ce que la microsoudure ?", answer: "C'est une technique de reparation de precision qui permet de remplacer des composants electroniques miniatures (< 1mm) sur les cartes meres. Necessite un microscope et un equipement specialise." },
      { question: "Tous les appareils sont-ils reparables en microsoudure ?", answer: "Non, certaines pannes sont irreparables (composants introuvables, corrosion trop avancee). Nous effectuons un diagnostic gratuit avant toute intervention." },
      { question: "Combien de temps prend une reparation en microsoudure ?", answer: "Entre 24h et 72h selon la complexite. Le diagnostic initial est fait dans les 24h." },
    ],
  },
];

// ===========================
// VILLES (rayon 40km autour de Haulchin 59121)
// ===========================

export const SEO_CITIES: SeoCity[] = [
  { slug: "haulchin", name: "Haulchin", postalCode: "59121", distanceKm: 0 },
  { slug: "valenciennes", name: "Valenciennes", postalCode: "59300", distanceKm: 8 },
  { slug: "denain", name: "Denain", postalCode: "59220", distanceKm: 5 },
  { slug: "douai", name: "Douai", postalCode: "59500", distanceKm: 25 },
  { slug: "cambrai", name: "Cambrai", postalCode: "59400", distanceKm: 30 },
  { slug: "maubeuge", name: "Maubeuge", postalCode: "59600", distanceKm: 38 },
  { slug: "anzin", name: "Anzin", postalCode: "59410", distanceKm: 7 },
  { slug: "saint-amand-les-eaux", name: "Saint-Amand-les-Eaux", postalCode: "59230", distanceKm: 18 },
  { slug: "aulnoy-lez-valenciennes", name: "Aulnoy-lez-Valenciennes", postalCode: "59300", distanceKm: 10 },
  { slug: "conde-sur-l-escaut", name: "Conde-sur-l'Escaut", postalCode: "59163", distanceKm: 15 },
  { slug: "bouchain", name: "Bouchain", postalCode: "59111", distanceKm: 12 },
  { slug: "wallers", name: "Wallers", postalCode: "59135", distanceKm: 14 },
  { slug: "escaudain", name: "Escaudain", postalCode: "59124", distanceKm: 4 },
  { slug: "raismes", name: "Raismes", postalCode: "59590", distanceKm: 12 },
  { slug: "lourches", name: "Lourches", postalCode: "59156", distanceKm: 3 },
];

// ===========================
// SLUG GENERATION (Couche 1)
// ===========================

export function generateSeoSlugs(): SeoSlugData[] {
  const slugs: SeoSlugData[] = [];
  for (const category of SEO_CATEGORIES) {
    for (const city of SEO_CITIES) {
      slugs.push({
        category,
        city,
        slug: `reparation-${category.slug}-${city.slug}`,
      });
    }
  }
  return slugs;
}

// ===========================
// TYPES COUCHE 2
// ===========================

export interface SeoBrand {
  slug: string;
  label: string;
}

export interface SeoModel {
  slug: string;
  label: string;
  brand: SeoBrand;
}

export interface SeoPiece {
  slug: string;
  label: string;
}

export interface SeoCouche2Entry {
  categorySlug: string;
  brandSlug: string;
  brandLabel: string;
  modelSlug: string;
  modelLabel: string;
  pieceSlug: string;
  pieceLabel: string;
  priceFrom: number;
  delai: string;
  faq: SeoFaq[];
}

export interface SeoCouche2SlugData {
  entry: SeoCouche2Entry;
  city: SeoCity;
  citySlug: string;
  repairSlug: string;
}

// ===========================
// DONNEES COUCHE 2
// ===========================

function makeFaq(
  pieceLabel: string,
  brandLabel: string,
  modelLabel: string,
): SeoFaq[] {
  return [
    {
      question: `Combien coute le remplacement ${pieceLabel.toLowerCase()} ${brandLabel} ${modelLabel} ?`,
      answer: `Le remplacement ${pieceLabel.toLowerCase()} ${brandLabel} ${modelLabel} est propose a partir du tarif indique. Contactez-nous pour un devis gratuit et precis adapte a l'etat de votre appareil.`,
    },
    {
      question: `Combien de temps pour reparer ${pieceLabel.toLowerCase()} ${modelLabel} ?`,
      answer: `La reparation ${pieceLabel.toLowerCase()} ${brandLabel} ${modelLabel} est effectuee dans le delai indique. Toutes nos reparations sont garanties 6 mois pieces et main d'oeuvre.`,
    },
  ];
}

interface Couche2Config {
  categorySlug: string;
  brandSlug: string;
  brandLabel: string;
  models: { slug: string; label: string }[];
  pieces: { slug: string; label: string; priceFrom: number; delai: string }[];
}

const COUCHE2_CONFIGS: Couche2Config[] = [
  // Telephones — Apple
  {
    categorySlug: "telephone",
    brandSlug: "apple",
    brandLabel: "Apple",
    models: [
      { slug: "iphone-13", label: "iPhone 13" },
      { slug: "iphone-14", label: "iPhone 14" },
      { slug: "iphone-15", label: "iPhone 15" },
    ],
    pieces: [
      { slug: "ecran", label: "Ecran", priceFrom: 89, delai: "1-2h" },
      { slug: "batterie", label: "Batterie", priceFrom: 49, delai: "1h" },
      { slug: "connecteur", label: "Connecteur de charge", priceFrom: 45, delai: "1-2h" },
    ],
  },
  // Telephones — Samsung
  {
    categorySlug: "telephone",
    brandSlug: "samsung",
    brandLabel: "Samsung",
    models: [
      { slug: "galaxy-s23", label: "Galaxy S23" },
      { slug: "galaxy-s24", label: "Galaxy S24" },
      { slug: "galaxy-a54", label: "Galaxy A54" },
    ],
    pieces: [
      { slug: "ecran", label: "Ecran", priceFrom: 79, delai: "1-2h" },
      { slug: "batterie", label: "Batterie", priceFrom: 39, delai: "1h" },
      { slug: "connecteur", label: "Connecteur de charge", priceFrom: 39, delai: "1-2h" },
    ],
  },
  // Tablettes — Apple
  {
    categorySlug: "tablette",
    brandSlug: "apple",
    brandLabel: "Apple",
    models: [
      { slug: "ipad-10", label: "iPad 10" },
      { slug: "ipad-air-m2", label: "iPad Air M2" },
    ],
    pieces: [
      { slug: "ecran", label: "Ecran", priceFrom: 119, delai: "2-3h" },
      { slug: "batterie", label: "Batterie", priceFrom: 69, delai: "2-3h" },
    ],
  },
  // Tablettes — Samsung
  {
    categorySlug: "tablette",
    brandSlug: "samsung",
    brandLabel: "Samsung",
    models: [
      { slug: "galaxy-tab-a9", label: "Galaxy Tab A9" },
    ],
    pieces: [
      { slug: "ecran", label: "Ecran", priceFrom: 89, delai: "2-3h" },
      { slug: "batterie", label: "Batterie", priceFrom: 59, delai: "2-3h" },
    ],
  },
  // PC Portables — HP
  {
    categorySlug: "pc-portable",
    brandSlug: "hp",
    brandLabel: "HP",
    models: [
      { slug: "pavilion-15", label: "Pavilion 15" },
    ],
    pieces: [
      { slug: "ecran", label: "Ecran", priceFrom: 99, delai: "24-48h" },
      { slug: "clavier", label: "Clavier", priceFrom: 59, delai: "24h" },
      { slug: "batterie", label: "Batterie", priceFrom: 69, delai: "24h" },
    ],
  },
  // PC Portables — Lenovo
  {
    categorySlug: "pc-portable",
    brandSlug: "lenovo",
    brandLabel: "Lenovo",
    models: [
      { slug: "thinkpad-l14", label: "ThinkPad L14" },
    ],
    pieces: [
      { slug: "ecran", label: "Ecran", priceFrom: 109, delai: "24-48h" },
      { slug: "clavier", label: "Clavier", priceFrom: 69, delai: "24h" },
      { slug: "batterie", label: "Batterie", priceFrom: 69, delai: "24h" },
    ],
  },
  // Mac — Apple
  {
    categorySlug: "mac",
    brandSlug: "apple",
    brandLabel: "Apple",
    models: [
      { slug: "macbook-air-m2", label: "MacBook Air M2" },
      { slug: "macbook-pro-14", label: "MacBook Pro 14" },
    ],
    pieces: [
      { slug: "ecran", label: "Ecran", priceFrom: 249, delai: "48-72h" },
      { slug: "batterie", label: "Batterie", priceFrom: 99, delai: "24-48h" },
      { slug: "carte-mere", label: "Carte mere", priceFrom: 199, delai: "48-72h" },
    ],
  },
  // Consoles — Sony
  {
    categorySlug: "console",
    brandSlug: "sony",
    brandLabel: "Sony",
    models: [
      { slug: "ps5", label: "PS5" },
    ],
    pieces: [
      { slug: "hdmi", label: "Port HDMI", priceFrom: 79, delai: "24-48h" },
      { slug: "lecteur", label: "Lecteur", priceFrom: 69, delai: "24h" },
      { slug: "ventilateur", label: "Ventilateur", priceFrom: 49, delai: "24h" },
    ],
  },
  // Consoles — Nintendo
  {
    categorySlug: "console",
    brandSlug: "nintendo",
    brandLabel: "Nintendo",
    models: [
      { slug: "switch", label: "Switch" },
    ],
    pieces: [
      { slug: "joystick", label: "Joystick", priceFrom: 35, delai: "1h" },
      { slug: "ecran", label: "Ecran", priceFrom: 79, delai: "2-3h" },
    ],
  },
  // Consoles — Microsoft
  {
    categorySlug: "console",
    brandSlug: "microsoft",
    brandLabel: "Microsoft",
    models: [
      { slug: "xbox-series-x", label: "Xbox Series X" },
    ],
    pieces: [
      { slug: "hdmi", label: "Port HDMI", priceFrom: 79, delai: "24-48h" },
      { slug: "lecteur", label: "Lecteur", priceFrom: 69, delai: "24h" },
    ],
  },
];

function buildCouche2Entries(): SeoCouche2Entry[] {
  const entries: SeoCouche2Entry[] = [];
  for (const config of COUCHE2_CONFIGS) {
    for (const model of config.models) {
      for (const piece of config.pieces) {
        entries.push({
          categorySlug: config.categorySlug,
          brandSlug: config.brandSlug,
          brandLabel: config.brandLabel,
          modelSlug: model.slug,
          modelLabel: model.label,
          pieceSlug: piece.slug,
          pieceLabel: piece.label,
          priceFrom: piece.priceFrom,
          delai: piece.delai,
          faq: makeFaq(piece.label, config.brandLabel, model.label),
        });
      }
    }
  }
  return entries;
}

export const SEO_COUCHE2_ENTRIES: SeoCouche2Entry[] = buildCouche2Entries();

// ===========================
// SLUG GENERATION (Couche 2)
// ===========================

export function generateSeoCouche2Slugs(): SeoCouche2SlugData[] {
  const slugs: SeoCouche2SlugData[] = [];
  for (const entry of SEO_COUCHE2_ENTRIES) {
    for (const city of SEO_CITIES) {
      slugs.push({
        entry,
        city,
        citySlug: city.slug,
        repairSlug: `${entry.pieceSlug}-${entry.modelSlug}`,
      });
    }
  }
  return slugs;
}
