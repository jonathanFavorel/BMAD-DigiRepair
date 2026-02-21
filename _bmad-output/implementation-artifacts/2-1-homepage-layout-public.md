# Story 2.1: Homepage & Layout public

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **visiteur**,
I want **consulter la page d'accueil DigiRepair**,
So that **je comprends les services proposés et je suis convaincu par le professionnalisme**.

## Acceptance Criteria

1. **Given** je suis un visiteur sur la homepage, **When** la page se charge, **Then** je vois le hero section Split D4 (texte + stats à gauche, visuel à droite)
2. **Given** la page chargée, **When** je scroll, **Then** je vois les services proposés en cards D3 (téléphones, tablettes, PC, Mac, consoles, microsoudure)
3. **Given** la page chargée, **When** je scroll, **Then** je vois la section "Comment ça marche" en 3 étapes
4. **Given** la page chargée, **When** je scroll, **Then** je vois les avis clients (FR8) — section placeholder avec données statiques pour le MVP
5. **Given** toutes les pages publiques, **When** la page se charge, **Then** le Header (nav sticky + logo) et Footer (dark, infos pratiques) sont présents avec navigation
6. **Given** je suis sur mobile, **When** la page se charge, **Then** le CTA flottant WhatsApp est visible en bas d'écran (FR7) — masqué sur desktop
7. **Given** la page homepage, **When** je mesure les performances, **Then** la page charge en < 2s (NFR1) et Lighthouse Performance > 90 (NFR4)
8. **Given** la page homepage, **When** je vérifie le markup, **Then** Schema.org LocalBusiness est présent dans le JSON-LD (FR9)

## Tasks / Subtasks

- [ ] **Task 1 : Restructurer le layout vitrine** (AC: #5)
  - [ ] 1.1 Supprimer le contenu starter de `app/page.tsx` — le remplacer par un redirect ou le supprimer (la homepage sera dans `(vitrine)`)
  - [ ] 1.2 Créer `app/(vitrine)/layout.tsx` avec Header + Footer + FloatingCTA (remplacer le layout wrapper vide existant)
  - [ ] 1.3 Créer `app/(vitrine)/page.tsx` comme nouvelle homepage
  - [ ] 1.4 Créer `app/(vitrine)/loading.tsx` avec skeleton page publique

- [ ] **Task 2 : Créer le composant Header** (AC: #5)
  - [ ] 2.1 Créer `components/layout/header.tsx` — nav sticky transparent avec blur
  - [ ] 2.2 Desktop : logo gauche, liens centre (Services, Tarifs, Blog, Contact), CTA "Nous contacter" droite
  - [ ] 2.3 Mobile : logo gauche, hamburger droite, Sheet overlay avec navigation
  - [ ] 2.4 Active state : underline primary 2px sur l'item actif
  - [ ] 2.5 Utiliser le `logo.svg` existant dans `public/`

- [ ] **Task 3 : Créer le composant Footer** (AC: #5)
  - [ ] 3.1 Créer `components/layout/footer.tsx` — fond dark (#1F2E53), texte clair
  - [ ] 3.2 Desktop : 3 colonnes (Services, Infos pratiques, Mentions légales)
  - [ ] 3.3 Mobile : 1 colonne empilée
  - [ ] 3.4 Infos : adresse Haulchin 59121, horaires, téléphone, email
  - [ ] 3.5 Liens : mentions légales, politique de confidentialité, CGV

- [ ] **Task 4 : Créer le composant FloatingCTA + WhatsAppButton** (AC: #6)
  - [ ] 4.1 Créer `components/layout/floating-cta.tsx` — bouton fixe bottom mobile, z-50, safe-area-inset-bottom
  - [ ] 4.2 Créer `components/ui/whatsapp-button.tsx` — lien wa.me avec message pré-rempli encodé
  - [ ] 4.3 FloatingCTA visible uniquement sur mobile (hidden md:hidden, block md:hidden — visible < md)
  - [ ] 4.4 Variantes WhatsAppButton : `floating` (dans FloatingCTA), `inline` (dans sections), `compact` (icône seule)
  - [ ] 4.5 Le numéro WhatsApp sera configurable via variable d'env `NEXT_PUBLIC_WHATSAPP_NUMBER`

- [ ] **Task 5 : Créer la section Hero** (AC: #1)
  - [ ] 5.1 Section hero dans `app/(vitrine)/page.tsx` — layout split 50/50 desktop, empilé mobile
  - [ ] 5.2 Gauche : titre display "Réparation d'appareils électroniques à Haulchin", sous-titre, stats (ex: "347+ appareils réparés")
  - [ ] 5.3 Double CTA : primaire "Nous contacter" (WhatsApp inline) + secondaire "Voir les tarifs" (outline)
  - [ ] 5.4 Droite : image placeholder (la Scene3D viendra en Story 2.6) — utiliser une image statique optimisée
  - [ ] 5.5 Mobile : texte au-dessus, image en dessous

- [ ] **Task 6 : Créer la section Services** (AC: #2)
  - [ ] 6.1 Section fond `alt` (#E8ECF1) — titre h2 "Nos services de réparation"
  - [ ] 6.2 Grille de 6 cards shadcn/ui Card : Téléphones, Tablettes, PC Portables, Mac, Consoles, Microsoudure
  - [ ] 6.3 Chaque card : icône Lucide, titre h3, description courte, badge prix "Dès XX€"
  - [ ] 6.4 Grid responsive : 1 col mobile, 2 cols tablette, 3 cols desktop
  - [ ] 6.5 Hover : shadow-md + translateY(-2px) transition

- [ ] **Task 7 : Créer la section "Comment ça marche"** (AC: #3)
  - [ ] 7.1 Section fond `soft` (#F8F9FA) — titre h2 "Comment ça marche ?"
  - [ ] 7.2 3 étapes horizontales (desktop) / verticales (mobile) : 1. Contactez-nous → 2. Déposez votre appareil → 3. Récupérez-le réparé
  - [ ] 7.3 Chaque étape : numéro cerclé primary, titre, description, icône Lucide

- [ ] **Task 8 : Créer la section Avis clients** (AC: #4)
  - [ ] 8.1 Section fond `soft` — titre h2 "Ce que disent nos clients"
  - [ ] 8.2 Header : note globale "4.9/5" + "XX avis Google" — données statiques MVP
  - [ ] 8.3 Grille de 3 cards avis : nom, note étoiles, texte, date — données hardcodées pour le MVP
  - [ ] 8.4 Grid responsive : 1 col mobile, 3 cols desktop

- [ ] **Task 9 : Ajouter Schema.org LocalBusiness** (AC: #8)
  - [ ] 9.1 Créer `components/seo/local-business-jsonld.tsx` — composant JSON-LD
  - [ ] 9.2 Données : name "DigiRepair", address Haulchin 59121, telephone, openingHours, areaServed (rayon 40km)
  - [ ] 9.3 Inclure dans le layout vitrine ou la homepage

- [ ] **Task 10 : Écrire les tests** (AC: all)
  - [ ] 10.1 Tests unitaires : composants Header, Footer, FloatingCTA, WhatsAppButton (render + responsive behavior)
  - [ ] 10.2 Test E2E : homepage accessible, sections visibles, Schema.org présent
  - [ ] 10.3 Mettre à jour `e2e/auth-flow.spec.ts` si la homepage change d'URL

- [ ] **Task 11 : Vérification finale** (AC: #7)
  - [ ] 11.1 `npm run build` — OK
  - [ ] 11.2 `npm run lint` — 0 erreurs
  - [ ] 11.3 `npm run test:run` — tous les tests passent
  - [ ] 11.4 Vérifier LCP < 2s et Lighthouse > 90 — recommandation pour tests manuels

## Dev Notes

### Architecture Critique — Homepage DigiRepair

**Structure routes Next.js :**
- La homepage DOIT être dans `app/(vitrine)/page.tsx` — PAS dans `app/page.tsx`
- Le route group `(vitrine)` ne crée pas de segment URL : `app/(vitrine)/page.tsx` → `/`
- Le `app/page.tsx` actuel est le template starter Supabase — il faut le supprimer ou le transformer en redirect
- **ATTENTION** : Next.js ne permet pas `app/page.tsx` ET `app/(vitrine)/page.tsx` simultanément — il y a conflit sur `/`. Supprimer `app/page.tsx`.

**Layout vitrine (Header + Footer + FloatingCTA) :**
- `app/(vitrine)/layout.tsx` wrappera TOUTES les pages publiques (homepage, blog, FAQ, contact, SEO pages)
- Le layout actuel `(vitrine)/layout.tsx` est un wrapper vide `<>{children}</>` — le remplacer
- Le Header est partagé par toutes les pages vitrine
- Le Footer est partagé par toutes les pages vitrine
- Le FloatingCTA (WhatsApp mobile) est partagé par toutes les pages vitrine

**Design Direction D4×D3 :**
- Hero split 50/50 : texte+stats gauche, visuel droite (D4)
- Cards compactes en grille pour les services (D3)
- Sections alternées soft/alt en scroll storytelling
- Double CTA : primaire "WhatsApp" + secondaire "Voir tarifs"
- 60-70% d'espace blanc (principe Apple)
- Pas de sections dark sauf footer

**Scene3D — Story 2.6 :**
- NE PAS implémenter React Three Fiber dans cette story
- Utiliser une image placeholder dans le hero
- La Scene3D viendra en Story 2.6 avec progressive enhancement

**Mobile-First Radical (80% trafic mobile) :**
- Styles de base = mobile, media queries = enrichissement
- Hero : texte au-dessus, visuel en dessous sur mobile
- Cards : 1 colonne mobile, 2 tablette, 3 desktop
- Navigation : hamburger mobile, nav sticky desktop
- FloatingCTA : visible uniquement mobile (< md)

### Fichiers existants à connaître

**Déjà configurés (Story 1.1) :**
- `app/layout.tsx` : Inter font, metadata FR, ThemeProvider, lang="fr"
- `app/globals.css` : palette DigiRepair HSL + tokens CSS custom (--color-primary, etc.)
- `tailwind.config.ts` : couleurs dr-primary/dark/soft/alt/success/warning/error, Inter font
- `public/` : logo.svg, logo-color.svg, logo-icon.svg, favicons, og-image.png, site.webmanifest
- shadcn/ui : Button (variants), Card, Badge, Input, Label, Checkbox, Dropdown

**Composants starter à NE PAS réutiliser :**
- `components/hero.tsx` — affiche logos Supabase/Next.js — supprimer ou ignorer
- `components/deploy-button.tsx` — starter spécifique — ignorer
- `components/env-var-warning.tsx` — starter spécifique — ignorer
- `components/tutorial/` — tout le dossier est starter — ignorer

**Composants starter potentiellement réutilisables :**
- `components/theme-switcher.tsx` — peut être intégré dans le footer
- `components/auth-button.tsx` — peut être réutilisé dans le header pour lien admin

### Conventions de nommage

| Élément | Convention | Exemple Story 2.1 |
|---------|-----------|-------------------|
| Composants layout | PascalCase | `Header`, `Footer`, `FloatingCTA` |
| Fichiers composants | kebab-case.tsx | `header.tsx`, `floating-cta.tsx` |
| Dossier layout | `components/layout/` | Header, Footer, FloatingCTA |
| Dossier SEO | `components/seo/` | `local-business-jsonld.tsx` |
| Pages | `page.tsx` dans route group | `app/(vitrine)/page.tsx` |
| Sections homepage | composants inline dans page.tsx OU extraits si > 50 lignes | Sections directement dans page.tsx |

### Design System — Tokens à utiliser

**Couleurs :**
- Primary `#2084D7` / `text-primary` / `bg-primary` — CTA uniquement, jamais décoratif
- Dark `#1F2E53` / `text-dr-dark` / `bg-dr-dark` — titres, footer
- Soft `#F8F9FA` / `bg-dr-soft` — fond principal, sections impaires
- Alt `#E8ECF1` / `bg-dr-alt` — sections paires

**Typographie (Inter) :**
- Display : `text-3xl md:text-5xl font-bold` — hero titre
- H1 : `text-2xl md:text-4xl font-bold` — pas utilisé sur homepage (display suffit)
- H2 : `text-xl md:text-3xl font-semibold` — titres de section
- H3 : `text-lg md:text-xl font-semibold` — cards, sous-titres
- Body : `text-base` — texte courant
- Caption : `text-xs font-medium` — badges, metadata

**Espacement sections :**
- Gap entre sections : `py-12 md:py-16` (48px mobile / 64px desktop)
- Conteneur : `max-w-7xl mx-auto px-4 md:px-8`
- Gap cards : `gap-4 md:gap-6`

**Cards :**
- `rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all`

### Anti-Patterns (INTERDITS)

| Interdit | Correct |
|----------|---------|
| Garder le contenu starter Supabase | Supprimer/remplacer complètement |
| `app/page.tsx` + `app/(vitrine)/page.tsx` | Supprimer `app/page.tsx` |
| Scene3D / React Three Fiber | Image placeholder (R3F = Story 2.6) |
| Couleur primary en décoratif | Primary UNIQUEMENT pour CTA/liens |
| `alert()` ou pop-up | Toast sonner ou inline |
| Sections dark dans le body | Seulement le footer est dark |
| Carousel / slider | Grille statique de cards |
| Données dynamiques (DB) pour avis | Données statiques hardcodées (MVP) |

### Previous Story Intelligence (1.3)

**Learnings critiques :**
- Convention tests co-localisés : `lib/supabase/helpers.test.ts` — PAS de sous-dossier `__tests__/`
- SYNC comments entre SQL et TS quand la logique est dupliquée
- UUIDs valides dans les tests
- Next.js 16 : proxy.ts (pas middleware), getClaims(), Suspense au lieu de `export const dynamic`
- Vitest 4.0.18 avec jsdom, alias `@/`
- Zod `.issues` (pas `.errors`)
- 28 tests existants à ne pas casser

### Project Structure Notes

**Fichiers à créer :**
```
digirepair/
├── app/
│   └── (vitrine)/
│       ├── layout.tsx               ← MODIFIER (ajouter Header + Footer + FloatingCTA)
│       ├── page.tsx                 ← MODIFIER/CRÉER (homepage DigiRepair)
│       └── loading.tsx              ← NOUVEAU (skeleton)
├── components/
│   ├── layout/
│   │   ├── header.tsx               ← NOUVEAU
│   │   ├── footer.tsx               ← NOUVEAU
│   │   └── floating-cta.tsx         ← NOUVEAU
│   ├── ui/
│   │   └── whatsapp-button.tsx      ← NOUVEAU
│   └── seo/
│       └── local-business-jsonld.tsx ← NOUVEAU
```

**Fichiers à supprimer/modifier :**
- `app/page.tsx` — supprimer (conflit route avec `(vitrine)/page.tsx`)
- `app/(vitrine)/layout.tsx` — remplacer le wrapper vide

**Fichiers existants à NE PAS modifier :**
- `app/layout.tsx` — root layout avec Inter + ThemeProvider
- `app/globals.css` — palette déjà configurée
- `tailwind.config.ts` — couleurs déjà configurées
- Tout le code auth (proxy.ts, actions, migrations, tests)

### References

- [Source: architecture.md#Frontend Architecture] — RSC, App Router, composants
- [Source: architecture.md#Project Structure] — app/(vitrine)/ routes
- [Source: architecture.md#Naming Patterns] — Conventions nommage
- [Source: ux-design-specification.md#Design Direction D4×D3] — Hero split + cards grille
- [Source: ux-design-specification.md#Design System Foundation] — Couleurs, typo, espacement
- [Source: ux-design-specification.md#Component Strategy] — FloatingCTA, WhatsAppButton, Scene3D
- [Source: ux-design-specification.md#Navigation Patterns] — Header sticky, footer dark
- [Source: ux-design-specification.md#Mobile-First] — Breakpoints, responsive strategy
- [Source: epics.md#Story 2.1] — ACs originaux
- [Source: prd.md#FR1,FR7,FR8,FR9] — Homepage, WhatsApp CTA, avis, Schema.org

## Dev Agent Record

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List
