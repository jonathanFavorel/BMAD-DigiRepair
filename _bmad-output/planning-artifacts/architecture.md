---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
lastStep: 8
status: 'complete'
completedAt: '2026-02-19'
inputDocuments: ['prd.md', 'prd-validation-report.md', 'ux-design-specification.md', 'brainstorming-session-2026-02-18.md', 'brainstorming-session-2026-02-19.md']
workflowType: 'architecture'
project_name: 'DigiRepair'
user_name: 'Favor'
date: '2026-02-19'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements — 41 FRs en 7 domaines :**

| Domaine | FRs | Implications architecturales |
|---|---|---|
| Vitrine & SEO | FR1-FR10 | SSG/ISR pour 5000+ pages, base de données référentiel (villes × marques × modèles × pièces), Schema.org dynamique |
| Devis & Conversion | FR11-FR16 | Liens signés UUID, signature électronique canvas, logique créneau avec contrainte fournisseur J+1/18h, relances programmées |
| Suivi Réparation | FR17-FR20 | WebSocket/Realtime par dossier, timeline à états, upload photos, auth magic link |
| Back-Office Devis | FR21-FR25 | CRUD dossiers, génération PDF devis conforme FR, dashboard avec filtres/statuts |
| Back-Office Suivi | FR26-FR29 | Mise à jour statut 1-clic, upload mobile, notifications temps réel admin |
| Facturation | FR30-FR33 | Génération facture conforme FR, livre de recettes auto, association factures fournisseur |
| Notifications | FR34-FR37 | WhatsApp Business API, SMS fallback, relances programmées (J+1/J+3/J+7), demande avis auto |

**Non-Functional Requirements — 40 NFRs en 7 domaines :**

| Domaine | NFRs clés | Contraintes architecturales |
|---|---|---|
| Performance | NFR1-11 | LCP < 2s, bundle < 150KB gzip, 5000+ pages SSG même perf, Lighthouse > 90 |
| Sécurité | NFR12-20 | TLS 1.3, AES-256, RLS, tokens UUID v4, RGPD, audit trail factures |
| Scalabilité | NFR21-25 | 5000+ pages sans dégradation, 50 dossiers actifs, build < 10 min, ajout données sans code |
| Accessibilité | NFR26-30 | WCAG 2.1 AA, Lighthouse A11y > 90, focus visible, contraste 4.5:1 |
| Intégration | NFR31-35 | WhatsApp API < 30s, fallback SMS, Schema.org validé, sitemap auto, iCal |
| Fiabilité | NFR36-40 | 99.9% uptime, fallback polling si WS down, retry 3× backoff, backup quotidien |

**UX Design — Implications techniques :**

| Aspect UX | Implication architecture |
|---|---|
| 12 composants custom (DevisVivant, SignaturePad, TimelineStep, Scene3D...) | Component library structurée, code splitting par route |
| React Three Fiber (3D) | Lazy-loading, progressive enhancement, fallback images, bundle séparé |
| Direction D4×D3 (Split hero + Cards) | Layout system flexible, grille responsive |
| 7 parcours utilisateurs avec flows Mermaid | State machines ou reducers pour les tunnels complexes (J2 devis) |
| Mobile-first 80% | Responsive tokens, touch-first, performance critique mobile |

### Scale & Complexity

- **Domaine primaire :** Full-stack Web App (SSR/SSG + SPA + API + Realtime)
- **Niveau de complexité :** Moyenne-Haute
  - Multi-facettes (SEO programmatique + CRM + facturation + realtime + 3D)
  - Mais mono-tenant (1 seul admin), pas de multi-tenancy
  - Conformité légale FR (devis/factures) mais pas de régulation lourde
- **Composants architecturaux estimés :** ~15-20 modules distincts

### Technical Constraints & Dependencies

| Contrainte | Source | Impact |
|---|---|---|
| **Stack imposée** | PRD | Next.js + Vercel + Supabase + GitHub — pas de choix à faire |
| **Dev solo** | Contexte | Architecture doit maximiser l'automatisation et minimiser le code custom |
| **5000+ pages SEO** | FR10, NFR21 | Build SSG < 10 min → ISR obligatoire, pas de full rebuild |
| **Conformité devis/factures FR** | FR22, FR30 | Mentions obligatoires, numérotation séquentielle, conservation non modifiable |
| **Notifications manuelles** | FR34 | Pop-up admin avec message pré-formaté, envoi manuel par l'admin |
| **Signature électronique** | FR13 | Canvas tactile côté client, stockage image signature, valeur légale à valider |
| **Contrainte fournisseur J+1/18h** | FR14 | Logique métier créneau calculée côté serveur |
| **RGPD** | NFR19 | Consentement, effacement, export, hébergement EU |

### Cross-Cutting Concerns Identified

1. **Authentification duale** — Magic link (clients) vs email/pwd (admin) → 2 stratégies auth dans le même système, Supabase Auth gère nativement
2. **Génération PDF** — Devis + Factures conformes FR → Edge Functions ou service dédié, templates PDF
3. **Notifications manuelles** — Pop-up admin avec message pré-formaté (infos client + lien devis) + bouton copier → envoi manuel WhatsApp/SMS/email par l'admin
4. **Données référentiel** — Marques/modèles/pièces/villes alimentent SEO + devis + recherche → source unique, cache agressif
5. **Sécurité des données** — RLS par client, photos isolées, factures immuables → policies Supabase, audit trail
6. **Performance 3D** — React Three Fiber sur pages publiques → lazy-load, code split, progressive enhancement, impact Lighthouse
7. **SEO programmatique** — 5000+ pages SSG/ISR → build strategy, sitemap dynamique, Schema.org par page

## Starter Template Evaluation

### Primary Technology Domain

**Full-stack Web App** (SSR/SSG + SPA + API + Realtime) basé sur l'analyse des exigences projet.

### Starter Options Considered

| # | Starter | Source | Inclus | Verdict |
|---|---------|--------|--------|---------|
| **A** | `create-next-app -e with-supabase` | **Officiel Supabase × Vercel** | Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui initialisé, Supabase Auth (cookies via `supabase-ssr`), middleware auth | ✅ **Sélectionné** |
| **B** | `supa-next-starter` (michaeltroya) | GitHub communautaire | Next.js + Supabase + Tailwind + shadcn | ⚠️ Communautaire, maintenance non garantie |
| **C** | `supabase-nextjs-template` (Razikus) | GitHub communautaire | Next.js 15, Supabase, Tailwind, RLS, i18n, Stripe, React Native | ❌ Trop de bloat SaaS |
| **D** | `next-supa-starter` (mguzman20) | GitHub communautaire | Next.js 15, shadcn/ui, Supabase, Auth, Landing | ⚠️ Moins maintenu |

### Selected Starter: `create-next-app -e with-supabase`

**Rationale for Selection:**

1. **Maintenu par Supabase + Vercel** — les deux équipes du stack DigiRepair
2. **Minimal et propre** — pas de bloat SaaS, on ajoute seulement ce qu'on a besoin
3. **shadcn/ui pré-initialisé** — composants prêts dès le départ
4. **Auth cookies configuré** — `supabase-ssr` avec middleware, exactement ce qu'il faut pour l'auth duale (magic link clients + email/pwd admin)
5. **App Router natif** — structure `/app` moderne pour SSG/ISR (5000+ pages SEO)
6. **Dev solo** — base légère = moins de code à comprendre et maintenir

**Initialization Command:**

```bash
npx create-next-app -e with-supabase digirepair
```

**Architectural Decisions Provided by Starter:**

| Aspect | Décision du starter |
|--------|-------------------|
| **Language & Runtime** | TypeScript strict, Node.js |
| **Styling Solution** | Tailwind CSS v4 + shadcn/ui initialisé |
| **Routing** | App Router (`/app` directory) |
| **Auth** | Supabase Auth avec cookies, middleware de protection de routes |
| **SSR/SSG** | Support natif Next.js (ISR pour les 5000+ pages SEO) |
| **Build Tooling** | Turbopack (dev), Webpack (prod) |
| **Code Organization** | `/app`, `/components`, `/utils/supabase` (client + server) |
| **Development Experience** | Hot reload, TypeScript, ESLint |

**Remaining to Add (Implementation Stories):**

- React Three Fiber (3D) — package séparé, lazy-loaded
- Génération PDF (Edge Functions Supabase)
- WhatsApp Business API (provider tiers)
- Schema.org / SEO programmatique
- Realtime subscriptions Supabase
- Tests (Vitest / Playwright)

**Note:** L'initialisation du projet avec cette commande sera la première story d'implémentation.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Data modeling + type generation Supabase → TypeScript
- Auth duale (magic link clients + email/pwd admin)
- RLS policies par dossier/client
- Factures immuables (trigger PostgreSQL)
- SEO programmatique ISR (5000+ pages)

**Important Decisions (Shape Architecture):**
- Server Actions + Supabase client direct (pas d'API REST séparée)
- React Hook Form + Zod (validation partagée)
- Supabase Realtime + fallback polling
- Edge Functions pour PDF et notifications
- Code splitting 3D (React Three Fiber lazy-loaded)

**Deferred Decisions (Post-MVP):**
- Monitoring avancé (Sentry, DataDog) — Vercel Analytics suffit pour le MVP
- CDN images avancé (Cloudinary) — Supabase Storage + Vercel Image Optimization suffit
- PWA / Service Workers — pas critique pour le MVP
- Analytics avancé (Plausible, PostHog) — post-lancement

### Data Architecture

| Décision | Choix | Version | Rationale | Affecte |
|----------|-------|---------|-----------|---------|
| **Base de données** | Supabase PostgreSQL | Dernière stable | Imposé par PRD, hébergement EU disponible | Tout le projet |
| **Modélisation** | Tables relationnelles + `supabase gen types` | — | Types TypeScript auto-générés, zéro drift | Tous les modules |
| **Validation** | Zod | Dernière stable | Schémas partagés client/serveur, intégré React Hook Form + shadcn/ui | Formulaires, API |
| **Migrations** | Supabase CLI (`supabase db diff` + `supabase migration`) | — | Versionnées dans Git, reproductibles, appliquées via CI | DB |
| **Cache** | ISR Next.js (`revalidate: 86400`) + `unstable_cache` pour référentiel | — | 5000+ pages sans rebuild, données fraîches back-office | SEO, référentiel |
| **Stockage fichiers** | Supabase Storage | — | Photos réparation, signatures, PDFs — RLS natif, CDN via Vercel | Upload, devis, factures |

### Authentication & Security

| Décision | Choix | Rationale | Affecte |
|----------|-------|-----------|---------|
| **Auth clients** | Magic link Supabase (email) | Zéro friction, pas de mot de passe | Espace client, suivi réparation |
| **Auth admin** | Email + mot de passe Supabase | Sécurité renforcée back-office | Back-office devis, suivi, facturation |
| **Autorisation** | RLS Supabase par dossier/client | Isolation données native au niveau DB | Tous les accès données |
| **Factures immuables** | Trigger PostgreSQL `BEFORE UPDATE` → blocage | Conformité légale FR, audit trail | Facturation |
| **Tokens devis** | UUID v4 signés, expiration configurable | Liens devis vivants sécurisés, non devinables | Devis & conversion |
| **RGPD** | Consentement cookie, export/effacement via Edge Function | Conformité RGPD, hébergement EU | Cross-cutting |

### API & Communication Patterns

| Décision | Choix | Rationale | Affecte |
|----------|-------|-----------|---------|
| **Pattern API** | Server Actions Next.js (mutations) + Supabase client direct (lectures) | Type-safe, pas d'API REST séparée à maintenir | Toutes les mutations |
| **Realtime** | Supabase Realtime (PostgreSQL Changes) + fallback polling | Suivi réparation temps réel, intégré nativement | Suivi, back-office |
| **Notifications** | Pop-up admin avec message pré-formaté + bouton copier → envoi manuel (WhatsApp, SMS, email) | Zéro intégration tiers, zéro coût, contrôle total admin | Back-office |
| **PDF** | Edge Function + `pdf-lib` ou `@react-pdf/renderer` | Génération serveur, templates réutilisables devis/factures | Devis, factures |
| **Gestion erreurs** | Pattern Result `{data, error}` style Supabase | Cohérent avec l'écosystème, pas d'exceptions | Cross-cutting |
| **Relances** | Rappels visuels dashboard (badge J+1/J+3/J+7) + pop-up message pré-rédigé avec infos client (nom, tél, email, lien devis) | Pas de cron, pas d'API tiers, admin décide quand envoyer | Back-office |

### Frontend Architecture

| Décision | Choix | Rationale | Affecte |
|----------|-------|-----------|---------|
| **State management** | React Server Components + `useActionState` + Context léger | Pas de Redux nécessaire, mono-admin, RSC natif | Toute l'app |
| **Formulaires** | React Hook Form + Zod resolver | Validation robuste, performance, intégré shadcn/ui | Devis, back-office |
| **3D** | `@react-three/fiber` + `@react-three/drei` en `dynamic(import, { ssr: false })` | Bundle séparé, pas d'impact SSR, progressive enhancement | Vitrine |
| **SEO programmatique** | `generateStaticParams` + ISR `revalidate: 86400` | 5000+ pages, rebuild incrémental, Schema.org dynamique | Vitrine SEO |
| **Bundle** | Code splitting par route + lazy-load 3D + tree shaking | Target < 150KB gzip initial | Performance |

### Infrastructure & Deployment

| Décision | Choix | Rationale | Affecte |
|----------|-------|-----------|---------|
| **CI/CD** | GitHub Actions → Vercel auto-deploy | Natif, zero config, preview par PR | DevOps |
| **Environments** | `preview` (PR) + `production` (main) | Preview automatique par PR, prod sur merge | Workflow |
| **Monitoring** | Vercel Analytics (Web Vitals) + Supabase Dashboard | Intégré, pas de service tiers à configurer | Ops |
| **Backup** | Supabase automatic daily backups | Backup quotidien natif | Données |
| **Tests** | Vitest (unit) + Playwright (E2E) | Rapide, compatible Next.js, couverture complète | Qualité |

### Decision Impact Analysis

**Implementation Sequence:**
1. Init projet (starter + Supabase project)
2. Schema DB + types générés + RLS policies
3. Auth duale (magic link + email/pwd)
4. Pages SEO ISR (référentiel + generateStaticParams)
5. Devis vivant (formulaire + signature + Server Actions)
6. Back-office (CRUD + dashboard)
7. Realtime (suivi réparation)
8. Notifications (WhatsApp + SMS)
9. Facturation (PDF + immuabilité)
10. 3D (React Three Fiber, progressive enhancement)

**Cross-Component Dependencies:**
- Auth → RLS → toutes les données (dépendance critique)
- Référentiel DB → SEO pages + Devis (source unique)
- Edge Functions → PDF + Notifications (infrastructure partagée)
- Zod schemas → Formulaires + Server Actions (validation unifiée)
- Types Supabase générés → tous les composants (type-safety)

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:** 25+ zones où des agents AI pourraient faire des choix différents, regroupées en 5 catégories.

### Naming Patterns

**Database (PostgreSQL / Supabase) :**

| Élément | Convention | Exemple |
|---------|-----------|---------|
| Tables | `snake_case` pluriel | `repair_cases`, `quote_items`, `invoice_lines` |
| Colonnes | `snake_case` | `created_at`, `client_id`, `total_ttc` |
| Foreign keys | `{table_singulier}_id` | `client_id`, `repair_case_id` |
| Index | `idx_{table}_{colonnes}` | `idx_repair_cases_status` |
| Enums | `snake_case` | `quote_status`, `repair_step` |
| RLS Policies | `{action}_{table}_{role}` | `select_repair_cases_client`, `update_repair_cases_admin` |

**Code (TypeScript / React) :**

| Élément | Convention | Exemple |
|---------|-----------|---------|
| Composants | `PascalCase` | `DevisVivant`, `TimelineStep`, `AdminDossierCard` |
| Fichiers composants | `kebab-case.tsx` | `devis-vivant.tsx`, `timeline-step.tsx` |
| Fonctions | `camelCase` | `getRepairCase()`, `calculateSlot()` |
| Variables | `camelCase` | `repairCaseId`, `totalTtc` |
| Constantes | `UPPER_SNAKE_CASE` | `MAX_UPLOAD_SIZE`, `REVALIDATE_INTERVAL` |
| Types/Interfaces | `PascalCase` | `RepairCase`, `QuoteItem`, `InvoiceLine` |
| Hooks | `use` + `PascalCase` | `useRepairCase()`, `useQuoteForm()` |
| Server Actions | `camelCase` + verbe | `createQuote()`, `updateRepairStatus()` |
| Zod schemas | `camelCase` + `Schema` | `quoteFormSchema`, `repairCaseSchema` |

**Routes Next.js :**

| Élément | Convention | Exemple |
|---------|-----------|---------|
| Pages publiques | `kebab-case` français | `/reparation-iphone-haulchin` |
| Pages app | `kebab-case` | `/admin/dossiers`, `/suivi/[token]` |
| Route params | `camelCase` entre `[]` | `[repairCaseId]`, `[quoteToken]` |
| Route groups | `(groupName)` | `(vitrine)`, `(admin)`, `(client)` |

### Structure Patterns

**Project Organization:**

```
/app
  /(vitrine)/          → Pages SEO publiques
  /(admin)/            → Back-office (protégé auth admin)
  /(client)/           → Espace client (protégé auth magic link)
  /api/                → Route handlers si nécessaire
/components
  /ui/                 → shadcn/ui (généré)
  /custom/             → 12 composants custom DigiRepair
  /layout/             → Header, Footer, Navigation
/lib
  /supabase/           → Client, server, middleware helpers
  /validations/        → Schémas Zod partagés
  /utils/              → Fonctions utilitaires pures
  /constants/          → Constantes applicatives
/types/                → Types TypeScript globaux (+ générés Supabase)
/public/               → Assets statiques
/supabase
  /migrations/         → Migrations SQL versionnées
  /functions/          → Edge Functions (PDF, notifications)
  /seed.sql            → Données référentiel initiales
```

**File Structure — Tests co-localisés :**

```
/components/custom/devis-vivant.tsx
/components/custom/devis-vivant.test.tsx    ← à côté du fichier
/lib/utils/calculate-slot.ts
/lib/utils/calculate-slot.test.ts           ← à côté du fichier
/e2e/                                       ← Playwright séparé
  quote-flow.spec.ts
  admin-dashboard.spec.ts
```

### Format Patterns

**API Response Format — Pattern Result :**

```typescript
type ActionResult<T> = {
  data: T | null
  error: string | null
}

// Exemple Server Action
async function createQuote(formData: FormData): Promise<ActionResult<Quote>> {
  return { data: quote, error: null }
  // ou
  return { data: null, error: "Créneau indisponible" }
}
```

**Data Exchange Formats :**

| Donnée | Stockage DB | Format API/Code | Affichage UI |
|--------|-------------|----------------|--------------|
| Dates | `timestamptz` ISO 8601 | `string` ISO 8601 | `Intl.DateTimeFormat('fr-FR')` |
| Montants | `integer` (centimes) | `number` (centimes) | `Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })` |
| JSON fields | `snake_case` | mapping auto via types générés → `camelCase` TS | — |
| Booléens | `boolean` | `boolean` | — |
| Null | `NULL` SQL | `null` TS | État vide / placeholder |

### Communication Patterns

**Supabase Realtime Channels :**

```
repair_case:{repairCaseId}    → Suivi client temps réel
admin:dashboard               → Notifications admin
```

**State Management :**

- État serveur : React Server Components (RSC) — pas de fetch client
- Mutations : `useTransition` + Server Actions — pas de `useState` + `useEffect` pour fetch
- UI state local : `useState` léger (modals, toggles)
- Formulaires : React Hook Form `isPending` — pas de state `isLoading` manuel
- Feedback : `sonner` (intégré shadcn/ui) — `toast.success()`, `toast.error()`, jamais `alert()`

### Process Patterns

**Error Handling :**

```typescript
// ✅ Server Action — toujours try/catch, toujours ActionResult
async function updateStatus(id: string, status: string): Promise<ActionResult<RepairCase>> {
  try {
    const { data, error } = await supabase.from('repair_cases').update({ status }).eq('id', id).select().single()
    if (error) return { data: null, error: error.message }
    return { data, error: null }
  } catch {
    return { data: null, error: "Erreur inattendue" }
  }
}
```

- Error Boundaries : un `error.tsx` par route group `(vitrine)`, `(admin)`, `(client)`
- Retry : 3× backoff exponentiel (1s, 2s, 4s) uniquement pour appels externes (WhatsApp API, SMS)
- Logging : `console.error` serveur uniquement, jamais côté client en production

**Loading States :**

- Server Components : `loading.tsx` par route (Suspense automatique Next.js)
- Client mutations : `useTransition` `isPending`
- Formulaires : React Hook Form `formState.isSubmitting`
- Skeleton UI : composants shadcn/ui Skeleton pour les états de chargement

### Enforcement Guidelines

**Tous les agents AI DOIVENT :**

1. Utiliser les types générés par `supabase gen types` — jamais de types manuels pour les tables DB
2. Valider avec Zod avant toute mutation (client ET serveur)
3. Retourner `ActionResult<T>` depuis chaque Server Action
4. Stocker les montants en centimes, les dates en ISO 8601
5. Nommer les fichiers en `kebab-case`, les composants en `PascalCase`
6. Co-localiser les tests unitaires avec les fichiers source
7. Utiliser `sonner` pour le feedback utilisateur, jamais `alert()`/`console.log`

### Anti-Patterns (Interdits)

| Anti-pattern | Alternative correcte |
|-------------|---------------------|
| `any` en TypeScript | `unknown` + type guard |
| `fetch('/api/...')` pour mutations | Server Actions |
| `useState` + `useEffect` pour fetch data | RSC ou Server Actions |
| CSS inline ou CSS modules | Tailwind classes |
| `moment.js` ou `dayjs` | `Intl` natif |
| Types manuels pour tables DB | `supabase gen types` |
| `alert()` / `window.confirm()` | `sonner` toast / Dialog shadcn/ui |
| `isLoading` state manuel | `useTransition` / `isPending` |

## Project Structure & Boundaries

### Complete Project Directory Structure

```
digirepair/
├── .env.local                          → Variables Supabase + Twilio (local)
├── .env.example                        → Template variables d'environnement
├── .gitignore
├── .github/
│   └── workflows/
│       └── ci.yml                      → Lint + Types + Tests → Vercel deploy
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── components.json                     → Config shadcn/ui
├── package.json
├── vitest.config.ts
├── playwright.config.ts
│
├── app/
│   ├── globals.css                     → Tailwind directives + tokens design
│   ├── layout.tsx                      → Root layout (metadata SEO globale)
│   ├── not-found.tsx                   → 404 custom
│   │
│   ├── (vitrine)/                      → Pages publiques SEO
│   │   ├── layout.tsx                  → Header public + Footer + FloatingCTA
│   │   ├── page.tsx                    → Homepage (Split hero D4 + Cards D3 + Scene3D)
│   │   ├── error.tsx                   → Error boundary vitrine
│   │   ├── loading.tsx                 → Skeleton vitrine
│   │   ├── [ville]/
│   │   │   ├── page.tsx               → Couche 1 SEO : catégorie × ville
│   │   │   └── [marque]-[piece]-[modele]/
│   │   │       └── page.tsx           → Couche 2 SEO : marque × pièce × modèle × ville
│   │   ├── blog/
│   │   │   ├── page.tsx               → Liste articles (Couche 3 SEO)
│   │   │   └── [slug]/
│   │   │       └── page.tsx           → Article blog
│   │   ├── faq/
│   │   │   └── page.tsx               → FAQ (Schema.org FAQPage)
│   │   ├── contact/
│   │   │   └── page.tsx               → Formulaire contact → WhatsApp
│   │   └── mentions-legales/
│   │       └── page.tsx               → Mentions légales + CGV
│   │
│   ├── (client)/                       → Espace client (auth magic link)
│   │   ├── layout.tsx                  → Layout minimal client
│   │   ├── error.tsx                   → Error boundary client
│   │   ├── devis/
│   │   │   └── [quoteToken]/
│   │   │       └── page.tsx           → Devis Vivant (tunnel J2)
│   │   └── suivi/
│   │       └── [repairCaseId]/
│   │           └── page.tsx           → Suivi réparation temps réel (J3)
│   │
│   ├── (admin)/                        → Back-office (auth email/pwd)
│   │   ├── layout.tsx                  → Sidebar admin + topbar
│   │   ├── error.tsx                   → Error boundary admin
│   │   ├── loading.tsx                 → Skeleton admin
│   │   ├── dashboard/
│   │   │   └── page.tsx               → Dashboard principal (stats + dossiers actifs)
│   │   ├── dossiers/
│   │   │   ├── page.tsx               → Liste dossiers (filtres/statuts)
│   │   │   └── [repairCaseId]/
│   │   │       └── page.tsx           → Détail dossier (devis + suivi + photos)
│   │   ├── facturation/
│   │   │   ├── page.tsx               → Liste factures + livre de recettes
│   │   │   └── [invoiceId]/
│   │   │       └── page.tsx           → Détail facture
│   │   ├── referentiel/
│   │   │   └── page.tsx               → Gestion marques/modèles/pièces/villes
│   │   └── blog/
│   │       ├── page.tsx               → Gestion articles
│   │       └── [articleId]/
│   │           └── page.tsx           → Éditeur article
│   │
│   └── auth/
│       ├── login/
│       │   └── page.tsx               → Login admin (email/pwd)
│       ├── callback/
│       │   └── route.ts              → Auth callback Supabase
│       └── confirm/
│           └── route.ts              → Confirmation magic link
│
├── components/
│   ├── ui/                             → shadcn/ui (généré via CLI)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── skeleton.tsx
│   │   ├── sonner.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── badge.tsx
│   │   ├── dropdown-menu.tsx
│   │   └── sheet.tsx
│   ├── custom/                         → 12 composants custom DigiRepair
│   │   ├── devis-vivant.tsx
│   │   ├── devis-vivant.test.tsx
│   │   ├── signature-pad.tsx
│   │   ├── signature-pad.test.tsx
│   │   ├── timeline-step.tsx
│   │   ├── timeline-step.test.tsx
│   │   ├── floating-cta.tsx
│   │   ├── whatsapp-button.tsx
│   │   ├── seo-page-template.tsx
│   │   ├── admin-dossier-card.tsx
│   │   ├── photo-uploader.tsx
│   │   ├── photo-uploader.test.tsx
│   │   ├── invoice-preview.tsx
│   │   ├── stats-counter.tsx
│   │   ├── scene-3d.tsx
│   │   └── blog-article.tsx
│   └── layout/
│       ├── header.tsx
│       ├── footer.tsx
│       ├── admin-sidebar.tsx
│       └── admin-topbar.tsx
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts                   → Client Supabase browser
│   │   ├── server.ts                   → Client Supabase server (cookies)
│   │   └── middleware.ts               → Helper middleware auth
│   ├── validations/
│   │   ├── quote.schema.ts
│   │   ├── repair-case.schema.ts
│   │   ├── invoice.schema.ts
│   │   └── contact.schema.ts
│   ├── actions/
│   │   ├── quote.actions.ts
│   │   ├── repair-case.actions.ts
│   │   ├── invoice.actions.ts
│   │   └── reminder.actions.ts          → Calcul relances dues + marquage envoyé
│   ├── utils/
│   │   ├── format-currency.ts
│   │   ├── format-date.ts
│   │   ├── calculate-slot.ts
│   │   ├── calculate-slot.test.ts
│   │   ├── seo-helpers.ts
│   │   ├── seo-helpers.test.ts
│   │   └── message-templates.ts         → Templates messages relances (J+1/J+3/J+7)
│   └── constants/
│       ├── repair-statuses.ts
│       ├── invoice-mentions.ts
│       └── seo-config.ts
│
├── types/
│   ├── database.types.ts               → Généré par `supabase gen types`
│   └── app.types.ts                    → Types applicatifs custom
│
├── public/
│   ├── logo.svg
│   ├── og-image.png
│   ├── robots.txt
│   └── sitemap.xml                     → Généré dynamiquement via Next.js
│
├── supabase/
│   ├── config.toml
│   ├── seed.sql                        → Données référentiel initiales
│   ├── migrations/
│   │   ├── 001_create_clients.sql
│   │   ├── 002_create_repair_cases.sql
│   │   ├── 003_create_quotes.sql
│   │   ├── 004_create_invoices.sql
│   │   ├── 005_create_referentiel.sql
│   │   ├── 006_create_blog.sql
│   │   └── 007_rls_policies.sql
│   └── functions/
│       ├── _shared/
│       │   └── types.ts                → Types partagés Edge Functions
│       └── generate-pdf/
│           └── index.ts
│
├── middleware.ts                        → Auth middleware (protège /admin, exception token devis)
│
└── e2e/
    ├── quote-flow.spec.ts
    ├── admin-dashboard.spec.ts
    ├── seo-pages.spec.ts
    ├── repair-tracking.spec.ts
    └── invoice-flow.spec.ts
```

### Architectural Boundaries

**API Boundaries :**

| Boundary | Entrée | Sortie | Protection |
|----------|--------|--------|------------|
| Server Actions (`lib/actions/`) | FormData / params typés | `ActionResult<T>` | Zod validation + auth check |
| Edge Function PDF (`supabase/functions/generate-pdf/`) | Server Action trigger | PDF blob | Service role key |
| Supabase Realtime | Channel subscribe | PostgreSQL Changes events | RLS policies |
| Auth callback (`app/auth/`) | Supabase redirect | Session cookie | Middleware |

**Component Boundaries :**

| Zone | Composants | Communication | State |
|------|-----------|---------------|-------|
| `(vitrine)` | RSC + Scene3D lazy | Props uniquement | Aucun (RSC pur) |
| `(client)` | DevisVivant, TimelineStep, SignaturePad | Props + Server Actions + Realtime | React Hook Form + useTransition |
| `(admin)` | AdminDossierCard, PhotoUploader, InvoicePreview | Props + Server Actions + Realtime | React Hook Form + useTransition |

**Data Boundaries :**

| Table | Accès | RLS | Cache |
|-------|-------|-----|-------|
| `referentiel_*` | Public (lecture) | SELECT all | ISR 24h |
| `repair_cases` | Client (son dossier) / Admin (tous) | RLS par `client_id` | Aucun (temps réel) |
| `quotes` | Client (via token) / Admin (tous) | RLS par token UUID | Aucun |
| `invoices` | Admin uniquement | RLS admin + trigger immuabilité | Aucun |
| `blog_articles` | Public (publiés) / Admin (tous) | RLS `published = true` pour public | ISR 1h |

### Requirements to Structure Mapping

| Domaine FR | Répertoires principaux |
|-----------|----------------------|
| Vitrine & SEO (FR1-10) | `app/(vitrine)/`, `components/custom/seo-page-template.tsx`, `lib/utils/seo-helpers.ts`, `lib/constants/seo-config.ts` |
| Devis & Conversion (FR11-16) | `app/(client)/devis/`, `components/custom/devis-vivant.tsx`, `components/custom/signature-pad.tsx`, `lib/actions/quote.actions.ts` |
| Suivi Réparation (FR17-20) | `app/(client)/suivi/`, `components/custom/timeline-step.tsx`, `components/custom/photo-uploader.tsx` |
| Back-Office Devis (FR21-25) | `app/(admin)/dossiers/`, `components/custom/admin-dossier-card.tsx`, `lib/actions/repair-case.actions.ts` |
| Back-Office Suivi (FR26-29) | `app/(admin)/dossiers/[id]/`, `components/custom/photo-uploader.tsx` |
| Facturation (FR30-33) | `app/(admin)/facturation/`, `components/custom/invoice-preview.tsx`, `lib/actions/invoice.actions.ts`, `supabase/functions/generate-pdf/` |
| Notifications (FR34-37) | `app/(admin)/dossiers/` (pop-up message), `lib/utils/message-templates.ts`, `lib/actions/reminder.actions.ts` |

### External Integrations

| Service | Point d'intégration | Fichier |
|---------|-------------------|---------|
| Supabase Realtime | Client subscribe channels | `app/(client)/suivi/`, `app/(admin)/` |
| Vercel Analytics | Script auto Next.js | `app/layout.tsx` |
| Google Search Console | Sitemap + robots.txt | `public/`, `app/sitemap.ts` |

## Architecture Validation Results

### Party Mode Review — Ajustements intégrés

| # | Ajustement | Source | Résolution |
|---|-----------|--------|-----------|
| 1 | **Notifications manuelles** (suppression Twilio/WhatsApp API/SMS) | Favor | Pop-up admin avec message pré-formaté + copier. Envoi manuel. Suppression Edge Functions notifications |
| 2 | **Relances avec message copier/coller** incluant infos client (nom, tél, email, lien devis) | Favor | `lib/utils/message-templates.ts` + badges dashboard J+1/J+3/J+7 + pop-up message pré-rédigé |
| 3 | **Middleware exception** routes devis par token UUID (pas d'auth requise) | Amelia (Dev) | Middleware configuré pour laisser passer `(client)/devis/[quoteToken]` sans magic link |
| 4 | **Script npm `gen:types`** dans package.json | Amelia (Dev) | `"gen:types": "supabase gen types typescript --linked > types/database.types.ts"` |
| 5 | **Dossier `supabase/functions/_shared/`** types partagés | Amelia (Dev) | Ajouté à la structure projet |
| 6 | **E2E `invoice-flow.spec.ts`** manquant | Quinn (QA) | Ajouté dans `/e2e/` |
| 7 | **Persistance `quote_step`** en DB pour reprise tunnel devis | Sally (UX) | Champ `quote_step` sur table `quotes` pour reprise après refresh/retour lien |

### Coherence Validation ✅

**Decision Compatibility:**
- Next.js App Router + Supabase + Tailwind + shadcn/ui → stack officiel, aucun conflit
- Server Actions + Supabase client direct → cohérent, pas de couche REST redondante
- ISR + Supabase PostgreSQL → compatible nativement avec Vercel
- Notifications manuelles (pop-up + copier) → zéro dépendance externe, simplifie l'architecture
- React Three Fiber en `dynamic({ ssr: false })` → isolé du SSG/ISR

**Pattern Consistency:**
- `snake_case` DB ↔ types auto-générés ↔ `camelCase` TS → pipeline cohérent
- `ActionResult<T>` partout → gestion erreurs unifiée
- Tests co-localisés + E2E séparés → convention claire

**Structure Alignment:**
- Route groups `(vitrine)/(admin)/(client)` → isolation complète
- Middleware exception pour tokens devis → documenté
- Edge Functions réduites à PDF uniquement → simplification

### Requirements Coverage ✅

**41 FRs couverts :**

| Domaine | FRs | Support | Status |
|---------|-----|---------|--------|
| Vitrine & SEO | FR1-10 | ISR + generateStaticParams + Schema.org | ✅ |
| Devis & Conversion | FR11-16 | Server Actions + SignaturePad + calculateSlot + UUID + `quote_step` persisté | ✅ |
| Suivi Réparation | FR17-20 | Realtime + TimelineStep + PhotoUploader + magic link | ✅ |
| Back-Office Devis | FR21-25 | CRUD Server Actions + AdminDossierCard + PDF Edge Function | ✅ |
| Back-Office Suivi | FR26-29 | Server Actions 1-clic + PhotoUploader mobile + Realtime | ✅ |
| Facturation | FR30-33 | PDF Edge Function + trigger immuabilité + livre de recettes | ✅ |
| Notifications | FR34-37 | Pop-up message pré-formaté + copier + badges relances J+1/J+3/J+7 | ✅ |

**40 NFRs couverts :** Performance, Sécurité, Scalabilité, Accessibilité, Intégration, Fiabilité — tous adressés.

### Implementation Readiness ✅

| Critère | Status |
|---------|--------|
| Décisions complètes (30+) | ✅ |
| Patterns exhaustifs (naming, structure, format, process) | ✅ |
| Structure complète (~80 fichiers) | ✅ |
| Boundaries définies (API, composant, données) | ✅ |
| Anti-patterns listés (8 interdits) | ✅ |
| Exemples code concrets | ✅ |

### Architecture Completeness Checklist

- [x] Contexte projet analysé (41 FRs, 40 NFRs, 7 concerns transversaux)
- [x] Starter template évalué et sélectionné (`create-next-app -e with-supabase`)
- [x] Décisions critiques documentées (data, auth, API, frontend, infra)
- [x] Conventions de nommage établies (DB, code, routes)
- [x] Patterns de process documentés (erreurs, loading, retry)
- [x] Structure répertoires complète avec mapping FR → fichiers
- [x] Boundaries architecturales définies
- [x] Intégrations externes mappées
- [x] Party Mode review complété (7 ajustements intégrés)
- [x] Simplification notifications validée (manual > API)

### Architecture Readiness Assessment

**Overall Status: ✅ READY FOR IMPLEMENTATION**

**Confidence Level:** Haute

**Forces clés :**
- Stack officiel Supabase × Vercel → documentation abondante, support garanti
- Architecture simplifiée → notifications manuelles, 1 seule Edge Function (PDF)
- Mono-tenant → pas de complexité multi-tenancy
- Patterns clairs → tout agent AI peut implémenter sans ambiguïté
- Zéro dépendance externe payante (pas de Twilio)

**Améliorations futures (post-MVP) :**
- Automatisation notifications (WhatsApp Business API) si volume le justifie
- Monitoring avancé (Sentry)
- Analytics (Plausible/PostHog)
- PWA / Service Workers
- CDN images (Cloudinary)

### Implementation Handoff

**Première priorité :**
```bash
npx create-next-app -e with-supabase digirepair
```

**Séquence recommandée :** Init → Schema DB + RLS → Auth → SEO pages → Devis vivant → Back-office (+ pop-up messages + relances) → Realtime → Facturation → 3D

**AI Agent Guidelines :**
- Suivre toutes les décisions architecturales exactement comme documentées
- Utiliser les patterns d'implémentation de façon cohérente
- Respecter la structure projet et les boundaries
- Consulter ce document pour toute question architecturale
