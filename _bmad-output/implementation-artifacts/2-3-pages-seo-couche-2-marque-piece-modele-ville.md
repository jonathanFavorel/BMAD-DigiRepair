# Story 2.3: Pages SEO Couche 2 — Marque x Piece x Modele x Ville

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **visiteur**,
I want **trouver une page specifique pour ma reparation exacte (ex: ecran iPhone 15 Valenciennes)**,
So that **je vois le prix estime, le delai et je suis convaincu de contacter DigiRepair**.

## Acceptance Criteria

1. **Given** les donnees referentiel statiques (marques, modeles, pieces, villes), **When** je navigue vers `/valenciennes/ecran-iphone-15`, **Then** je vois une page specifique avec titre, fourchette prix, delai estime, FAQ filtree (FR3)
2. **Given** les pages SEO Couche 2, **When** elles sont generees au build, **Then** elles utilisent `generateStaticParams` (full static, pas de `revalidate` — incompatible cacheComponents Next.js 16) (FR10)
3. **Given** une page SEO Couche 2, **When** je verifie le markup, **Then** Schema.org Service + AggregateRating sont presents dans le JSON-LD (FR9)
4. **Given** les pages SEO generees, **When** je verifie le sitemap, **Then** `app/sitemap.ts` inclut toutes les URLs SEO Couche 1 ET Couche 2 (NFR34)
5. **Given** une page SEO Couche 2, **When** la page se charge, **Then** le Header, Footer et FloatingCTA du layout vitrine sont presents
6. **Given** une page SEO Couche 2, **When** je regarde la navigation, **Then** des breadcrumbs Schema.org structures a 4 niveaux sont affiches (Accueil > Categorie > Marque > Ville)
7. **Given** les donnees SEO, **When** je verifie les meta tags, **Then** title, meta description et og:tags sont dynamiques et uniques par page
8. **Given** une page SEO Couche 2, **When** je regarde le maillage interne, **Then** un lien vers la page chapeau Couche 1 (categorie x ville) est present

## Tasks / Subtasks

- [ ] **Task 1 : Etendre seo-config.ts avec les donnees marques/modeles/pieces** (AC: #1, #2)
  - [ ] 1.1 Ajouter interfaces `SeoBrand`, `SeoModel`, `SeoPiece`, `SeoCouche2Entry`
  - [ ] 1.2 Ajouter `SEO_BRANDS` : 3-5 marques par categorie (Apple, Samsung, HP, Lenovo, Sony, Nintendo, etc.)
  - [ ] 1.3 Ajouter `SEO_COUCHE2_ENTRIES` : tableau plat de combinaisons piece x marque x modele avec priceFrom et delai
  - [ ] 1.4 Fonction `generateSeoCouche2Slugs()` → tableau de `{ citySlug, repairSlug, entry }` pour `generateStaticParams`
  - [ ] 1.5 Exporter types TypeScript

- [ ] **Task 2 : Etendre seo-helpers.ts avec parsing Couche 2** (AC: #6, #7)
  - [ ] 2.1 Ajouter `parseCouche2Slug(citySlug, repairSlug)` → `{ entry, city }` ou `null`
  - [ ] 2.2 Ajouter `generateCouche2Metadata(entry, city)` → `Metadata` Next.js
  - [ ] 2.3 Ajouter `generateCouche2Breadcrumbs(entry, city)` → 4 niveaux (Accueil > Categorie > Marque > Ville)
  - [ ] 2.4 Tests co-localises pour les nouvelles fonctions

- [ ] **Task 3 : Creer la route dynamique Couche 2** (AC: #1, #2, #5, #7)
  - [ ] 3.1 Creer `app/(vitrine)/[ville]/[repair]/page.tsx` avec `generateStaticParams` et `generateMetadata`
  - [ ] 3.2 Pas de `export const revalidate` (incompatible cacheComponents Next.js 16)
  - [ ] 3.3 Parser avec `parseCouche2Slug()`, retourner `notFound()` si slug invalide
  - [ ] 3.4 Rendre le composant SEO Couche 2 avec les donnees de l'entree et ville

- [ ] **Task 4 : Creer le template SEO Couche 2** (AC: #1, #8)
  - [ ] 4.1 Creer `components/custom/seo-couche2-template.tsx` — template specifique Couche 2
  - [ ] 4.2 Hero : titre H1 specifique "Reparation {piece} {marque} {modele} a {ville}", prix, delai, garantie
  - [ ] 4.3 Section specifications : details de la reparation specifique
  - [ ] 4.4 Section FAQ : questions contextualisees a la reparation
  - [ ] 4.5 Section CTA WhatsApp avec message pre-rempli ultra-specifique
  - [ ] 4.6 Maillage interne : lien vers la page chapeau Couche 1 (categorie x ville)

- [ ] **Task 5 : Creer le Schema.org Couche 2** (AC: #3)
  - [ ] 5.1 Creer `components/seo/service-couche2-jsonld.tsx` — Schema.org Service + AggregateRating
  - [ ] 5.2 Donnees : @type Service, provider DigiRepair, areaServed ville, serviceType specifique
  - [ ] 5.3 AggregateRating avec donnees statiques (ratingValue, reviewCount)
  - [ ] 5.4 Inclure dans chaque page SEO Couche 2

- [ ] **Task 6 : Etendre le sitemap** (AC: #4)
  - [ ] 6.1 Modifier `app/sitemap.ts` pour inclure les URLs Couche 2
  - [ ] 6.2 Priorite Couche 2 : 0.6 (inferieure a Couche 1 qui est 0.8)
  - [ ] 6.3 Verifier que les URLs Couche 1 existantes ne sont pas impactees

- [ ] **Task 7 : Etendre les breadcrumbs** (AC: #6)
  - [ ] 7.1 Le composant `Breadcrumbs` existant est deja generique (accepte un tableau d'items)
  - [ ] 7.2 Generer 4 niveaux dans `generateCouche2Breadcrumbs()` : Accueil > Categorie > Marque > Page
  - [ ] 7.3 Schema.org BreadcrumbList avec 4 elements

- [ ] **Task 8 : Ecrire les tests** (AC: all)
  - [ ] 8.1 Tests `seo-config.test.ts` : nouvelles donnees Couche 2, generateSeoCouche2Slugs, unicite des slugs
  - [ ] 8.2 Tests `seo-helpers.test.ts` : parseCouche2Slug, generateCouche2Metadata, generateCouche2Breadcrumbs
  - [ ] 8.3 Tests composant `seo-couche2-template.test.tsx` : render sections, CTA contextuel, maillage interne
  - [ ] 8.4 Tests composant `service-couche2-jsonld.test.tsx` : Schema.org Service + AggregateRating
  - [ ] 8.5 Verifier que les tests existants Couche 1 passent toujours (non-regression)

- [ ] **Task 9 : Verification finale** (AC: #2, #5)
  - [ ] 9.1 `npm run build` — OK, pages Couche 2 generees statiquement
  - [ ] 9.2 `npm run lint` — 0 erreurs
  - [ ] 9.3 `npm run test:run` — tous les tests passent (existants + nouveaux)
  - [ ] 9.4 Verifier que `generateStaticParams` genere le bon nombre de pages Couche 2

## Dev Notes

### Architecture Critique — Pages SEO Couche 2

**Dependance Story 4.1 — Referentiel tables :**
Les tables `referentiel_*` (marques, modeles, pieces) n'existent pas encore (Story 4.1 = backlog). Cette story utilise des **donnees statiques hardcodees** dans `lib/constants/seo-config.ts` (meme approche que Story 2.2). Quand Story 4.1 sera implementee, il suffira de remplacer les imports statiques par des requetes Supabase.

**Structure routes Next.js — COEXISTENCE Couche 1 + Couche 2 :**
```
app/(vitrine)/
├── [ville]/
│   ├── page.tsx                    ← Couche 1 (existe, Story 2.2)
│   │                                  [ville] = slug composite "reparation-telephone-valenciennes"
│   └── [repair]/
│       └── page.tsx                ← Couche 2 (NOUVEAU, Story 2.3)
│                                      [ville] = slug ville reel "valenciennes"
│                                      [repair] = slug composite "ecran-iphone-15"
```

**ATTENTION — Coexistence des routes :**
- Couche 1 : `/reparation-telephone-valenciennes` → `[ville]/page.tsx` (1 segment, slug composite)
- Couche 2 : `/valenciennes/ecran-iphone-15` → `[ville]/[repair]/page.tsx` (2 segments)
- Next.js gere correctement : 1 segment = `[ville]/page.tsx`, 2 segments = `[ville]/[repair]/page.tsx`
- Pas de conflit car les patterns d'URL sont differents (nombre de segments)

**URL Pattern Couche 2 :**
- Format : `/{ville}/{piece}-{marque}-{modele}` (ex: `/valenciennes/ecran-iphone-15`)
- Piece en premier dans le slug pour correspondre aux recherches Google ("ecran iPhone 15 Valenciennes")
- Le parsing extrait : ville, piece, marque, modele

**Scale estimee :**
- Environ 15-25 modeles populaires × 2-3 pieces × 15 villes = ~500-1000 pages Couche 2
- Build time estime : < 5s (acceptable, pas besoin ISR)

**ATTENTION — `export const revalidate` INTERDIT :**
Next.js 16.1.6 avec `cacheComponents` activee ne supporte pas `export const revalidate`. Les pages sont full static via `generateStaticParams`. Donnees hardcodees → pas besoin d'ISR.

### Data Structure Couche 2

```typescript
// Nouvelle interface pour les entrees Couche 2
interface SeoCouche2Entry {
  categorySlug: string;    // "telephone" — lie a SeoCategory existante
  brandSlug: string;       // "apple"
  brandLabel: string;      // "Apple"
  modelSlug: string;       // "iphone-15"
  modelLabel: string;      // "iPhone 15"
  pieceSlug: string;       // "ecran"
  pieceLabel: string;      // "Ecran"
  priceFrom: number;       // 89
  delai: string;           // "24-48h"
  faq: SeoFaq[];           // 2-3 questions specifiques
}

// Slug generation pour Couche 2
interface SeoCouche2SlugData {
  entry: SeoCouche2Entry;
  city: SeoCity;           // Reutilise SEO_CITIES existant
  citySlug: string;        // "valenciennes"
  repairSlug: string;      // "ecran-iphone-15" = piece-brand-model
}
```

**Marques et modeles a inclure (donnees statiques MVP) :**

| Categorie | Marque | Modeles | Pieces |
|-----------|--------|---------|--------|
| Telephones | Apple | iPhone 13, 14, 15 | ecran, batterie, connecteur |
| Telephones | Samsung | Galaxy S23, S24, A54 | ecran, batterie, connecteur |
| Tablettes | Apple | iPad 10, iPad Air M2 | ecran, batterie |
| Tablettes | Samsung | Galaxy Tab A9 | ecran, batterie |
| PC Portables | HP | Pavilion 15 | ecran, clavier, batterie |
| PC Portables | Lenovo | ThinkPad L14 | ecran, clavier, batterie |
| Mac | Apple | MacBook Air M2, MacBook Pro 14 | ecran, batterie, carte-mere |
| Consoles | Sony | PS5 | hdmi, lecteur, ventilateur |
| Consoles | Nintendo | Switch | joystick, ecran |
| Consoles | Microsoft | Xbox Series X | hdmi, lecteur |

### Conventions de nommage

| Element | Convention | Exemple Story 2.3 |
|---------|-----------|-------------------|
| Composants custom | PascalCase | `SEOCouche2Template` |
| Fichiers composants | kebab-case.tsx | `seo-couche2-template.tsx` |
| Dossier custom | `components/custom/` | `seo-couche2-template.tsx` |
| Dossier SEO | `components/seo/` | `service-couche2-jsonld.tsx` |
| Helpers | kebab-case.ts | `seo-helpers.ts` (etendre) |
| Constants | kebab-case.ts | `seo-config.ts` (etendre) |
| Tests | co-localises `.test.ts(x)` | `seo-couche2-template.test.tsx` |
| Routes dynamiques | `[param]` camelCase | `[ville]/[repair]` |

### Design System — Tokens a utiliser

**Couleurs :**
- Primary `#2084D7` — CTA uniquement (WhatsApp inline, liens)
- Dark `#1F2E53` / `text-dr-dark` — titres, icones, stats, prix (PAS primary)
- Soft `#F8F9FA` / `bg-dr-soft` — fond sections impaires
- Alt `#E8ECF1` / `bg-dr-alt` — fond sections paires
- Warning `#F59E0B` / `text-dr-warning` — etoiles avis

**Typographie (Inter) :**
- H1 : `text-2xl md:text-4xl font-bold` — titre page "Reparation {piece} {marque} {modele} a {ville}"
- H2 : `text-xl md:text-3xl font-semibold` — titres sections
- H3 : `text-lg md:text-xl font-semibold` — cards, FAQ (element `<h3>` semantique)
- Body : `text-base` — texte courant

**Espacement :**
- Gap sections : `py-12 md:py-16`
- Conteneur : `max-w-7xl mx-auto px-4 md:px-8`
- Gap cards : `gap-4 md:gap-6`

### Anti-Patterns (INTERDITS)

| Interdit | Correct |
|----------|---------|
| Requetes DB Supabase (referentiel pas encore cree) | Donnees statiques `seo-config.ts` |
| Primary en decoratif (icones, stats, prix) | `text-dr-dark` pour decoratif |
| `CardTitle` (rend un `div`) pour titres semantiques | `<h3>` natif avec classes |
| `export const revalidate` (incompatible cacheComponents) | Full static `generateStaticParams` |
| `new Date()` dans Server Component | Valeurs statiques hardcodees |
| Scene3D / React Three Fiber | Image placeholder (Story 2.6) |
| Creer un nouveau composant Breadcrumbs | Reutiliser le composant existant |
| Modifier le composant SEOPageTemplate Couche 1 | Creer un nouveau composant Couche 2 |

### Previous Story Intelligence (2.2)

**Learnings critiques :**
- `export const revalidate = 86400` incompatible avec `cacheComponents` → supprime, full static
- Primary color = CTA uniquement → stats/prix en `text-dr-dark`
- `CardTitle` de shadcn = `div` → utiliser `<h3>` natif
- URL hardcodee dans breadcrumbs → utiliser `BASE_URL` env var partout
- `og:image` explicite dans metadata (pas juste le default global)
- `new Date()` interdit dans Server Component → date hardcodee
- Body scroll lock pour menu mobile (deja gere dans header)
- FloatingCTA compensation padding (deja gere dans vitrine layout)
- Tests avec `@testing-library/react` + mock `next/image` et `next/navigation`
- Co-located tests (pas de `__tests__/` subdirectory)
- 89 tests existants a ne pas casser
- Vitest 4.0.18 avec jsdom, alias `@/`
- Next.js 16.1.6 avec proxy.ts (pas middleware.ts), params en Promise

**Fichiers crees en Story 2.2 a reutiliser :**
- `lib/constants/seo-config.ts` — types et donnees a ETENDRE (pas remplacer)
- `lib/utils/seo-helpers.ts` — helpers a ETENDRE (pas remplacer)
- `components/seo/breadcrumbs.tsx` — composant generique, reutiliser tel quel
- `components/ui/whatsapp-button.tsx` — variante `inline`, prop `message`
- `app/sitemap.ts` — a ETENDRE pour inclure Couche 2

**Fichiers existants a NE PAS modifier :**
- `components/custom/seo-page-template.tsx` — template Couche 1 (ne pas toucher)
- `components/seo/service-jsonld.tsx` — Schema.org Couche 1 (ne pas toucher)
- `app/(vitrine)/[ville]/page.tsx` — route Couche 1 (ne pas toucher)
- `app/(vitrine)/layout.tsx` — layout vitrine (partage)
- `components/layout/*` — Header, Footer, FloatingCTA
- `app/layout.tsx` — root layout

### Project Structure Notes

**Fichiers a creer :**
```
digirepair/
├── app/
│   └── (vitrine)/
│       └── [ville]/
│           └── [repair]/
│               └── page.tsx               ← NOUVEAU (route Couche 2)
├── components/
│   ├── custom/
│   │   └── seo-couche2-template.tsx      ← NOUVEAU (template Couche 2)
│   └── seo/
│       └── service-couche2-jsonld.tsx     ← NOUVEAU (Schema.org Couche 2)
```

**Fichiers a modifier :**
```
digirepair/
├── app/
│   └── sitemap.ts                         ← MODIFIER (ajouter URLs Couche 2)
├── lib/
│   ├── constants/
│   │   └── seo-config.ts                 ← MODIFIER (ajouter types et donnees Couche 2)
│   └── utils/
│       └── seo-helpers.ts                ← MODIFIER (ajouter fonctions parsing Couche 2)
```

### References

- [Source: architecture.md#Project Structure] — Route `(vitrine)/[ville]/[marque]-[piece]-[modele]/page.tsx`
- [Source: architecture.md#Frontend Architecture] — `generateStaticParams` + ISR (adapte full static)
- [Source: architecture.md#Data Architecture] — Cache ISR + referentiel
- [Source: ux-design-specification.md#SEOPageTemplate] — Variante couche-2 : plus specifique
- [Source: ux-design-specification.md#Breadcrumbs] — 4 niveaux pour Couche 2
- [Source: epics.md#Story 2.3] — ACs originaux, dependance Story 4.1
- [Source: prd.md#FR3] — Pages marque x piece x modele x ville
- [Source: prd.md#FR9] — Schema.org (Service, AggregateRating)
- [Source: prd.md#FR10] — Generation automatique depuis referentiel
- [Source: prd.md#NFR8] — Performance identique pages statiques
- [Source: prd.md#NFR21] — Support 5000+ pages sans degradation
- [Source: prd.md#NFR34] — Sitemap auto-genere

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List
