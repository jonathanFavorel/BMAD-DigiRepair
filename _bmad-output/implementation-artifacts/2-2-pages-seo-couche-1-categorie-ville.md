# Story 2.2: Pages SEO Couche 1 — Catégorie × Ville

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **visiteur**,
I want **trouver une page dédiée à mon type de réparation dans ma ville**,
So that **je sais que DigiRepair intervient près de chez moi pour mon besoin**.

## Acceptance Criteria

1. **Given** les données référentiel statiques (villes et catégories), **When** je navigue vers `/reparation-telephone-valenciennes`, **Then** je vois une page dédiée avec titre, description, services disponibles pour cette catégorie dans cette ville
2. **Given** les pages SEO Couche 1, **When** elles sont générées au build, **Then** elles utilisent `generateStaticParams` (full static — `revalidate: 86400` supprimé car incompatible `cacheComponents` Next.js 16) (FR10)
3. **Given** une page SEO Couche 1, **When** je vérifie le markup, **Then** Schema.org Service est présent dans le JSON-LD (FR9)
4. **Given** les pages SEO générées, **When** je vérifie le sitemap, **Then** `app/sitemap.ts` inclut toutes les URLs SEO Couche 1 (NFR34)
5. **Given** une page SEO Couche 1, **When** je mesure les performances, **Then** la page a les mêmes performances qu'une page statique (NFR8)
6. **Given** une page SEO Couche 1, **When** la page se charge, **Then** le Header, Footer et FloatingCTA du layout vitrine sont présents
7. **Given** une page SEO Couche 1, **When** je regarde la navigation, **Then** des breadcrumbs Schema.org structurés sont affichés
8. **Given** les données SEO, **When** je vérifie les meta tags, **Then** title, meta description et og:tags sont dynamiques et uniques par page

## Tasks / Subtasks

- [ ] **Task 1 : Créer la configuration SEO et les données statiques** (AC: #1, #2)
  - [ ] 1.1 Créer `lib/constants/seo-config.ts` — listes de catégories (6) et villes (rayon 40km autour de Haulchin) avec slugs
  - [ ] 1.2 Chaque catégorie : slug, label, description, icône Lucide, prix de base
  - [ ] 1.3 Chaque ville : slug, nom, code postal, distance depuis Haulchin
  - [ ] 1.4 Fonction `generateSeoSlugs()` → tableau de combinaisons `reparation-{categorie}-{ville}` pour `generateStaticParams`
  - [ ] 1.5 Exporter types TypeScript pour les structures de données

- [ ] **Task 2 : Créer les helpers SEO** (AC: #3, #7, #8)
  - [ ] 2.1 Créer `lib/utils/seo-helpers.ts` avec fonctions utilitaires :
    - `parseSeoSlug(slug)` → `{ category, city }` ou `null`
    - `generateMetadata(category, city)` → `Metadata` Next.js (title, description, openGraph)
    - `generateBreadcrumbs(category, city)` → tableau de breadcrumbs
  - [ ] 2.2 Tests co-localisés `lib/utils/seo-helpers.test.ts`

- [ ] **Task 3 : Créer le composant Breadcrumbs** (AC: #7)
  - [ ] 3.1 Créer `components/seo/breadcrumbs.tsx` — composant breadcrumbs avec Schema.org BreadcrumbList
  - [ ] 3.2 Affichage : Accueil > Catégorie > Ville (avec liens)
  - [ ] 3.3 Schema.org BreadcrumbList JSON-LD intégré
  - [ ] 3.4 Responsive : tronqué si > 3 niveaux sur mobile

- [ ] **Task 4 : Créer le composant SEO Page Template** (AC: #1, #6)
  - [ ] 4.1 Créer `components/custom/seo-page-template.tsx` — template générique Couche 1
  - [ ] 4.2 Structure : Hero split (texte SEO gauche + image/placeholder droite) + Cards réparations + FAQ anti-objections + CTA
  - [ ] 4.3 Hero : titre H1 dynamique "Réparation {catégorie} à {ville}", sous-titre, stats
  - [ ] 4.4 Cards : réparations disponibles pour cette catégorie avec prix indicatifs
  - [ ] 4.5 Section FAQ : 3-4 questions anti-objections (hardcodées par catégorie)
  - [ ] 4.6 CTA WhatsApp avec message pré-rempli contextuel ("Bonjour, je cherche une réparation {catégorie} à {ville}")

- [ ] **Task 5 : Créer la route dynamique SEO Couche 1** (AC: #1, #2, #5, #8)
  - [ ] 5.1 Créer `app/(vitrine)/[ville]/page.tsx` avec `generateStaticParams` et `generateMetadata`
  - [ ] 5.2 ~~ISR avec `revalidate: 86400` (24h)~~ — SUPPRIMÉ : incompatible avec `nextConfig.cacheComponents` (Next.js 16.1.6). Pages entièrement statiques via `generateStaticParams`, régénérées au rebuild. Acceptable car données statiques hardcodées.
  - [ ] 5.3 Parser le slug avec `parseSeoSlug()`, retourner `notFound()` si slug invalide
  - [ ] 5.4 Rendre le `SEOPageTemplate` avec les données de la catégorie et ville
  - [ ] 5.5 Metadata dynamique : title, description, og:image uniques par page

- [ ] **Task 6 : Créer le Schema.org Service JSON-LD** (AC: #3)
  - [ ] 6.1 Créer `components/seo/service-jsonld.tsx` — composant Schema.org Service
  - [ ] 6.2 Données : @type Service, provider DigiRepair, areaServed ville, serviceType catégorie
  - [ ] 6.3 Inclure dans chaque page SEO Couche 1

- [ ] **Task 7 : Créer le sitemap dynamique** (AC: #4)
  - [ ] 7.1 Créer `app/sitemap.ts` — génération dynamique du sitemap XML
  - [ ] 7.2 Inclure : homepage `/`, toutes les pages SEO Couche 1 `/reparation-{cat}-{ville}`
  - [ ] 7.3 Utiliser `generateSeoSlugs()` pour la liste complète
  - [ ] 7.4 Priorité : homepage 1.0, pages SEO 0.8

- [ ] **Task 8 : Écrire les tests** (AC: all)
  - [ ] 8.1 Tests `seo-helpers.test.ts` : parseSeoSlug, generateMetadata, generateBreadcrumbs
  - [ ] 8.2 Tests `seo-config.test.ts` : generateSeoSlugs, validité des données statiques
  - [ ] 8.3 Tests composant `breadcrumbs.test.tsx` : render, Schema.org JSON-LD
  - [ ] 8.4 Tests composant `service-jsonld.test.tsx` : render, données Schema.org
  - [ ] 8.5 Tests composant `seo-page-template.test.tsx` : render sections, CTA contextuel

- [ ] **Task 9 : Vérification finale** (AC: #5)
  - [ ] 9.1 `npm run build` — OK, pages SEO générées statiquement
  - [ ] 9.2 `npm run lint` — 0 erreurs
  - [ ] 9.3 `npm run test:run` — tous les tests passent (existants + nouveaux)
  - [ ] 9.4 Vérifier que `generateStaticParams` génère le bon nombre de pages

## Dev Notes

### Architecture Critique — Pages SEO Couche 1

**Dépendance Story 4.1 — Référentiel tables :**
Les tables `referentiel_*` (villes, catégories, marques, modèles, pièces) n'existent pas encore (Story 4.1 = backlog). Cette story utilise des **données statiques hardcodées** dans `lib/constants/seo-config.ts`. Quand Story 4.1 sera implémentée, il suffira de remplacer les imports statiques par des requêtes Supabase dans `generateStaticParams`.

**Structure routes Next.js :**
- Route dynamique : `app/(vitrine)/[ville]/page.tsx`
- Le param `[ville]` est en réalité un **slug composite** : `reparation-{categorie}-{ville}` (ex: `reparation-telephone-valenciennes`)
- `generateStaticParams` retourne tous les slugs combinés
- ISR `revalidate: 86400` (24h) pour que les mises à jour du référentiel soient propagées sans rebuild

**URL Pattern Couche 1 :**
- Format : `/reparation-{categorie}-{ville}` (ex: `/reparation-telephone-valenciennes`)
- Les 6 catégories × ~15 villes = ~90 pages Couche 1
- Chaque slug est parsé pour extraire catégorie et ville

**ATTENTION — Conflit potentiel routes :**
- Le `[ville]` est un catch-all dans `(vitrine)/`. Il ne doit PAS capturer les routes existantes comme `/blog`, `/contact`, `/tarifs`, etc.
- Solution : `parseSeoSlug()` valide que le slug correspond à un pattern `reparation-{cat}-{ville}` connu. Sinon → `notFound()`.
- Alternative : utiliser un route group dédié ou un middleware de validation. Pour le MVP, la validation dans la page suffit.

**Villes à inclure (rayon 40km autour de Haulchin 59121) :**
Haulchin, Valenciennes, Denain, Douai, Cambrai, Maubeuge, Anzin, Saint-Amand-les-Eaux, Aulnoy-lez-Valenciennes, Condé-sur-l'Escaut, Bouchain, Wallers, Escaudain, Raismes, Lourches

**6 Catégories :**
Téléphones, Tablettes, PC Portables, Mac, Consoles, Microsoudure (identique aux services homepage Story 2.1)

**SEO Template Component (`seo-page-template.tsx`) :**
Le composant architecture prévoit `components/custom/seo-page-template.tsx` avec variante `couche-1` et `couche-2`. Pour cette story, implémenter uniquement `couche-1`. La variante `couche-2` viendra en Story 2.3.

**Schema.org pour pages SEO :**
- Chaque page a un Schema.org `Service` (pas `LocalBusiness` qui est sur la homepage)
- Le `Service` inclut : provider (DigiRepair), areaServed (ville), serviceType (catégorie)
- Breadcrumbs en Schema.org `BreadcrumbList`

**Sitemap dynamique :**
- `app/sitemap.ts` est le sitemap Next.js natif
- Inclut toutes les routes statiques + toutes les pages SEO Couche 1
- Doit être extensible pour Couche 2 (Story 2.3) et Blog (Story 2.4)

**WhatsApp message contextuel :**
Le `WhatsAppButton` existant (Story 2.1) accepte un `message` prop. Pour les pages SEO, passer un message contextualisé : "Bonjour, je cherche une réparation {catégorie} à {ville}."

**Design — Même direction D4×D3 que homepage :**
- Hero split : texte SEO à gauche + image/placeholder à droite
- Cards réparations en grille
- Section FAQ anti-objections
- Sections alternées soft/alt
- Primary color = CTA uniquement (fix code review Story 2.1)

### Conventions de nommage

| Élément | Convention | Exemple Story 2.2 |
|---------|-----------|-------------------|
| Composants custom | PascalCase | `SEOPageTemplate`, `Breadcrumbs` |
| Fichiers composants | kebab-case.tsx | `seo-page-template.tsx`, `breadcrumbs.tsx` |
| Dossier custom | `components/custom/` | `seo-page-template.tsx` |
| Dossier SEO | `components/seo/` | `breadcrumbs.tsx`, `service-jsonld.tsx` |
| Helpers | kebab-case.ts | `seo-helpers.ts` |
| Constants | kebab-case.ts | `seo-config.ts` |
| Tests | co-localisés `.test.ts(x)` | `seo-helpers.test.ts`, `breadcrumbs.test.tsx` |
| Routes dynamiques | `[param]` camelCase | `[ville]` |

### Design System — Tokens à utiliser

**Couleurs :**
- Primary `#2084D7` — CTA uniquement (WhatsApp inline, liens)
- Dark `#1F2E53` / `text-dr-dark` — titres, icônes, step numbers (PAS primary)
- Soft `#F8F9FA` / `bg-dr-soft` — fond sections impaires
- Alt `#E8ECF1` / `bg-dr-alt` — fond sections paires

**Typographie (Inter) :**
- H1 : `text-2xl md:text-4xl font-bold` — titre page SEO
- H2 : `text-xl md:text-3xl font-semibold` — titres sections
- H3 : `text-lg md:text-xl font-semibold` — cards, sous-titres (élément `<h3>` sémantique)
- Body : `text-base` — texte courant

**Espacement :**
- Gap sections : `py-12 md:py-16`
- Conteneur : `max-w-7xl mx-auto px-4 md:px-8`
- Gap cards : `gap-4 md:gap-6`

### Anti-Patterns (INTERDITS)

| Interdit | Correct |
|----------|---------|
| Requêtes DB Supabase (referentiel pas encore créé) | Données statiques `seo-config.ts` |
| Primary en décoratif (icônes, numéros) | `text-dr-dark` / `bg-dr-dark` pour décoratif |
| `CardTitle` (rend un `div`) pour titres sémantiques | `<h3>` natif avec classes |
| Route catch-all sans validation | `parseSeoSlug()` + `notFound()` |
| `new Date()` dans Server Component | Valeurs statiques ou `connection()` |
| Scene3D / React Three Fiber | Image placeholder (Story 2.6) |
| Carousel / slider | Grille statique |
| Full rebuild pour 90 pages | ISR `revalidate: 86400` |

### Previous Story Intelligence (2.1)

**Learnings critiques :**
- `new Date()` interdit dans Server Component Next.js 16 → année hardcodée dans footer
- Primary color = CTA uniquement, jamais décoratif → icônes en `text-dr-dark`
- `CardTitle` de shadcn = `div` → utiliser `<h3>` natif pour SEO sémantique
- Body scroll lock nécessaire pour menu mobile (`useEffect` + `overflow: hidden`)
- FloatingCTA nécessite padding compensation (`pb-20 md:pb-0`)
- Tests avec `@testing-library/react` + mock `next/image` et `next/navigation`
- Co-located tests (pas de `__tests__/` subdirectory)
- SYNC comments entre SQL et TS quand logique dupliquée
- 51 tests existants à ne pas casser
- Vitest 4.0.18 avec jsdom, alias `@/`
- Next.js 16.1.6 avec proxy.ts (pas middleware.ts)

**Fichiers créés en Story 2.1 à réutiliser :**
- `app/(vitrine)/layout.tsx` — Header + Footer + FloatingCTA (partagé)
- `components/ui/whatsapp-button.tsx` — variantes floating/inline/compact, prop `message`
- `components/seo/local-business-jsonld.tsx` — pattern JSON-LD à suivre
- `app/(vitrine)/loading.tsx` — skeleton (partagé)

### Project Structure Notes

**Fichiers à créer :**
```
digirepair/
├── app/
│   ├── (vitrine)/
│   │   └── [ville]/
│   │       └── page.tsx               ← NOUVEAU (route dynamique SEO Couche 1)
│   └── sitemap.ts                     ← NOUVEAU (sitemap XML dynamique)
├── components/
│   ├── custom/
│   │   └── seo-page-template.tsx      ← NOUVEAU (template page SEO)
│   └── seo/
│       ├── breadcrumbs.tsx            ← NOUVEAU
│       └── service-jsonld.tsx         ← NOUVEAU (Schema.org Service)
├── lib/
│   ├── constants/
│   │   └── seo-config.ts             ← NOUVEAU (données statiques catégories/villes)
│   └── utils/
│       └── seo-helpers.ts            ← NOUVEAU (parsing slugs, metadata, breadcrumbs)
```

**Fichiers existants à NE PAS modifier :**
- `app/(vitrine)/layout.tsx` — layout vitrine déjà configuré
- `app/(vitrine)/page.tsx` — homepage (Story 2.1)
- `components/layout/*` — Header, Footer, FloatingCTA
- `components/seo/local-business-jsonld.tsx` — homepage Schema.org
- `app/layout.tsx` — root layout
- `app/globals.css`, `tailwind.config.ts` — design system
- Tout le code auth et RLS

### References

- [Source: architecture.md#Project Structure] — Route `(vitrine)/[ville]/page.tsx`
- [Source: architecture.md#Frontend Architecture] — `generateStaticParams` + ISR `revalidate: 86400`
- [Source: architecture.md#Data Architecture] — Cache ISR + `unstable_cache` pour référentiel
- [Source: architecture.md#Requirements to Structure Mapping] — `seo-page-template.tsx`, `seo-helpers.ts`, `seo-config.ts`
- [Source: ux-design-specification.md#J5] — Journey visiteur SEO → confiance → contact
- [Source: ux-design-specification.md#SEOPageTemplate] — Anatomy couche-1 et couche-2
- [Source: ux-design-specification.md#Breadcrumbs] — Schema.org markup, pages SEO uniquement
- [Source: epics.md#Story 2.2] — ACs originaux, dépendance Story 4.1
- [Source: prd.md#FR2,FR9,FR10] — Pages SEO, Schema.org, génération automatique
- [Source: prd.md#NFR8,NFR34] — Performance pages SEO, sitemap auto

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List
