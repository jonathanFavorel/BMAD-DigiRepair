---
stepsCompleted: ['step-01', 'step-02', 'step-03', 'step-04']
inputDocuments: ['prd.md', 'architecture.md', 'ux-design-specification.md']
workflowType: 'epics-and-stories'
status: 'complete'
completedAt: '2026-02-19'
project_name: 'DigiRepair'
user_name: 'Favor'
date: '2026-02-19'
---

# DigiRepair - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for DigiRepair, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: Le visiteur peut consulter la page d'accueil présentant les services, le processus de réparation et les avis clients
FR2: Le visiteur peut naviguer vers des pages dédiées par catégorie de réparation et par ville
FR3: Le visiteur peut naviguer vers des pages spécifiques par marque, pièce, modèle et ville
FR4: Le visiteur peut consulter une FAQ avec réponses aux objections courantes
FR5: Le visiteur peut lire des articles de blog sur l'entretien et le diagnostic d'appareils
FR6: Le visiteur peut voir la page "À propos" avec le visage et l'identité du réparateur
FR7: Le visiteur peut initier un contact via WhatsApp depuis un CTA flottant avec message pré-rempli
FR8: Le visiteur peut consulter les avis Google clients directement sur le site
FR9: Les moteurs de recherche peuvent indexer toutes les pages publiques avec métadonnées Schema.org (LocalBusiness, FAQ, Service, AggregateRating)
FR10: Le système génère automatiquement les pages SEO à partir d'une base de données marques/modèles/pièces/villes
FR11: Le client peut recevoir un lien devis vivant personnalisé (via WhatsApp/SMS/email)
FR12: Le client peut consulter sur la page devis vivant : prix TTC final, décomposition prix, garantie, avis de réparations similaires et FAQ anti-objection
FR13: Le client peut signer électroniquement le devis depuis son appareil mobile
FR14: Le client peut choisir un créneau de dépôt disponible tenant compte de la disponibilité des pièces (stock → demain / commande avant 18h → J+2 / après 18h → J+3)
FR15: Le client peut ajouter le créneau confirmé à son calendrier
FR16: Le système affiche des relances aux clients n'ayant pas signé leur devis (J+1, J+3, J+7) avec messages pré-formatés dans le dashboard admin
FR17: Le client peut consulter la timeline de suivi de sa réparation en temps réel
FR18: Le client reçoit des notifications à chaque changement de statut (envoi manuel admin via pop-up message copier/coller)
FR19: Le client peut voir les photos de son appareil sur la timeline
FR20: Le client peut s'authentifier via magic link (email) pour accéder à son espace
FR21: L'admin peut créer un devis en sélectionnant l'appareil, la panne et en renseignant le prix
FR22: Le système génère automatiquement un devis légalement conforme (mentions obligatoires françaises)
FR23: L'admin peut envoyer le lien devis vivant au client via pop-up avec message pré-formaté + bouton copier
FR24: Le système crée automatiquement un dossier client complet à la signature du devis
FR25: L'admin peut consulter et gérer tous les dossiers clients depuis un dashboard centralisé
FR26: L'admin peut mettre à jour le statut de réparation en un clic
FR27: L'admin peut uploader des photos de l'appareil depuis son téléphone
FR28: L'admin peut ajouter des notes techniques et la liste des pièces utilisées au dossier
FR29: L'admin reçoit des notifications temps réel des nouvelles demandes de devis
FR30: Le système génère automatiquement une facture légalement conforme à la récupération
FR31: Le système alimente automatiquement le livre de recettes à chaque facturation
FR32: L'admin peut consulter et exporter le livre de recettes
FR33: L'admin peut associer les factures fournisseur au dossier client
FR34: L'admin peut envoyer les notifications via pop-up message pré-formaté avec infos client (nom, tél, email, lien) + bouton copier
FR35: Le dashboard affiche les rappels de relance (J+1, J+3, J+7) avec badges et messages pré-rédigés
FR36: Le système génère un message de demande d'avis Google pré-formaté après la réparation
FR37: L'admin peut s'authentifier via email et mot de passe pour accéder au back-office
FR38: L'admin peut gérer le référentiel marques, modèles et pièces
FR39: L'admin peut gérer la liste des villes couvertes dans le rayon de 40km
FR40: Le système gère les créneaux disponibles en intégrant la contrainte fournisseur (cut-off 18h, délai J+1)
FR41: Chaque client ne peut accéder qu'à ses propres données (isolation des données)

### NonFunctional Requirements

NFR1: Pages publiques : chargement < 2s sur connexion 4G mobile
NFR2: Largest Contentful Paint (LCP) < 2.0s sur toutes les pages publiques
NFR3: Cumulative Layout Shift (CLS) < 0.1 sur toutes les pages
NFR4: Score Lighthouse Performance > 90 sur mobile et desktop
NFR5: Page devis vivant : chargement < 1.5s
NFR6: Mises à jour temps réel reflétées sur la timeline client en < 3s
NFR7: Back-office : réponse aux actions admin < 1s
NFR8: Pages SEO générées (milliers) : mêmes performances que les pages statiques
NFR9: Score Lighthouse "Image Optimization" > 95
NFR10: Chargement des polices ne contribue pas à un CLS > 0.02
NFR11: Bundle size pages publiques < 150KB gzip
NFR12: Communications chiffrées en transit (HTTPS/TLS 1.3)
NFR13: Données clients chiffrées au repos (AES-256 minimum)
NFR14: Auth client : magic links avec expiration
NFR15: Auth admin : email/mot de passe avec hachage sécurisé
NFR16: Row-level security : isolation vérifiable par tests automatisés
NFR17: Liens devis vivants signés avec token unique UUID v4
NFR18: Photos clients dans stockage sécurisé avec accès restreint
NFR19: Conformité RGPD : consentement, effacement, export
NFR20: Devis et factures conservés de manière non modifiable (audit trail)
NFR21: Supporte 5 000+ pages SEO sans dégradation
NFR22: Supporte 50 dossiers clients actifs simultanés
NFR23: Build SSG des pages SEO < 10 minutes (ISR)
NFR24: Ajout nouvelles marques/modèles/villes sans modification de code
NFR25: Montée en charge de 3 à 25 réparations/semaine sans changement d'infrastructure
NFR26: Conformité WCAG 2.1 AA
NFR27: Ratio de contraste minimum 4.5:1
NFR28: Navigation clavier fonctionnelle sur tous les formulaires
NFR29: Tous les éléments interactifs ont un état focus visible
NFR30: Score Lighthouse Accessibility > 90
NFR31: Messages notifications générés en < 5s après le déclencheur
NFR32: Fallback : si pop-up copier ne fonctionne pas, affichage texte sélectionnable
NFR33: Métadonnées Schema.org validées sans erreur par Google Rich Results Test
NFR34: Sitemap XML régénéré automatiquement lors de l'ajout de nouvelles pages SEO
NFR35: Ajout au calendrier : support iCal (.ics)
NFR36: Uptime site public : 99.9%
NFR37: Liens devis vivants fonctionnels pendant 30 jours minimum
NFR38: Fallback polling 30s si le canal temps réel est indisponible
NFR39: Notifications pop-up : affichage immédiat dans le dashboard admin
NFR40: Données facturation et livre de recettes : backup quotidien automatique

### Additional Requirements

**From Architecture:**
- Starter template : `npx create-next-app -e with-supabase digirepair` (Epic 1, Story 1)
- Types TypeScript auto-générés via `supabase gen types` — script npm `"gen:types"` requis
- Migrations SQL versionnées dans `supabase/migrations/`
- RLS policies Supabase par client/dossier
- Trigger PostgreSQL `BEFORE UPDATE` pour immuabilité des factures
- Edge Function pour génération PDF (devis + factures)
- Supabase Realtime channels par dossier (`repair_case:{id}`) + fallback polling
- Pattern `ActionResult<T>` pour toutes les Server Actions
- Zod validation partagée client/serveur
- React Hook Form + shadcn/ui pour tous les formulaires
- React Three Fiber lazy-loaded (`dynamic({ ssr: false })`) pour 3D vitrine
- ISR `revalidate: 86400` pour pages SEO programmatiques
- Code splitting par route, bundle < 150KB gzip
- Middleware auth exception pour routes devis par token UUID (pas d'auth requise)
- Persistance `quote_step` en DB pour reprise tunnel devis après refresh
- Dossier `supabase/functions/_shared/` pour types partagés Edge Functions
- Notifications manuelles : pop-up admin avec message pré-formaté + copier (pas d'API tiers)
- Relances visuelles dashboard : badges J+1/J+3/J+7 + messages pré-rédigés avec infos client
- CI/CD : GitHub Actions → Vercel auto-deploy
- Tests : Vitest (unit, co-localisés) + Playwright (E2E dans `/e2e/`)
- Assets logos/favicons disponibles dans `docs/` à copier vers `public/`

**From UX Design:**
- 12 composants custom à créer (DevisVivant, SignaturePad, TimelineStep, FloatingCTA, WhatsAppButton, SEOPageTemplate, AdminDossierCard, PhotoUploader, InvoicePreview, StatsCounter, Scene3D, BlogArticle)
- Direction design D4×D3 (Split Hero + Cards) pour vitrine, D6 (Dashboard) pour back-office
- Design system : Inter font, palette #2084D7 / #1F2E53 / #F8F9FA / #E8ECF1
- 7 parcours utilisateurs (J1-J7) avec flows Mermaid
- Mobile-first radical (80% mobile)
- Progressive enhancement 3D (desktop full → mobile simplifié → fallback static)
- WCAG 2.1 AA, Lighthouse Accessibility > 90
- Responsive : 375px → 768px → 1024px → 1440px (Tailwind standard breakpoints)
- Feedback via `sonner` (toast), pas d'alert()
- Loading states : `loading.tsx` par route + Skeleton UI shadcn/ui

### FR Coverage Map

| FR | Epic | Description |
|----|------|------------|
| FR1 | Epic 2 | Page d'accueil vitrine |
| FR2 | Epic 2 | Pages catégorie × ville |
| FR3 | Epic 2 | Pages marque × pièce × modèle × ville |
| FR4 | Epic 2 | FAQ anti-objections |
| FR5 | Epic 2 | Blog articles |
| FR6 | Epic 2 | Page À propos |
| FR7 | Epic 2 | CTA flottant WhatsApp |
| FR8 | Epic 2 | Avis Google sur le site |
| FR9 | Epic 2 | Schema.org métadonnées |
| FR10 | Epic 2 | Génération auto pages SEO |
| FR11 | Epic 3 | Lien devis vivant |
| FR12 | Epic 3 | Contenu page devis vivant |
| FR13 | Epic 3 | Signature électronique |
| FR14 | Epic 3 | Choix créneau fournisseur |
| FR15 | Epic 3 | Ajout calendrier iCal |
| FR16 | Epic 7 | Relances J+1/J+3/J+7 |
| FR17 | Epic 5 | Timeline suivi temps réel |
| FR18 | Epic 5 | Notifications statut (pop-up copier) |
| FR19 | Epic 5 | Photos appareil sur timeline |
| FR20 | Epic 1 | Auth client magic link |
| FR21 | Epic 4 | Création devis 3 clics |
| FR22 | Epic 4 | Devis légalement conforme |
| FR23 | Epic 4 | Envoi lien devis (pop-up copier) |
| FR24 | Epic 4 | Dossier client auto-créé |
| FR25 | Epic 4 | Dashboard dossiers |
| FR26 | Epic 5 | Mise à jour statut 1 clic |
| FR27 | Epic 5 | Upload photos mobile |
| FR28 | Epic 5 | Notes techniques + pièces |
| FR29 | Epic 5 | Notifications nouvelles demandes |
| FR30 | Epic 6 | Génération facture conforme |
| FR31 | Epic 6 | Livre de recettes auto |
| FR32 | Epic 6 | Consultation/export livre recettes |
| FR33 | Epic 6 | Association factures fournisseur |
| FR34 | Epic 7 | Pop-up messages pré-formatés |
| FR35 | Epic 7 | Badges relances dashboard |
| FR36 | Epic 7 | Message demande avis Google |
| FR37 | Epic 1 | Auth admin email/pwd |
| FR38 | Epic 4 | Gestion référentiel marques/modèles/pièces |
| FR39 | Epic 4 | Gestion villes couvertes |
| FR40 | Epic 4 | Gestion créneaux + contrainte fournisseur |
| FR41 | Epic 1 | Isolation données RLS |

## Epic List

### Epic 1: Fondation Projet & Infrastructure
L'équipe de dev peut initialiser le projet, configurer la DB, l'auth et le déploiement — base fonctionnelle pour tous les epics suivants.
**FRs covered:** FR20, FR37, FR41

### Epic 2: Vitrine Publique & SEO
Le visiteur peut découvrir DigiRepair, consulter les services, lire le blog/FAQ, et contacter via WhatsApp — le site capte du trafic Google et génère des prospects.
**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6, FR7, FR8, FR9, FR10

### Epic 3: Devis Vivant & Conversion
Le client peut recevoir un lien devis vivant, consulter le prix détaillé, signer électroniquement et choisir un créneau — le tunnel de conversion qui tue le client fantôme.
**FRs covered:** FR11, FR12, FR13, FR14, FR15

### Epic 4: Back-Office Devis & Dossiers
L'admin peut créer un devis en 3 clics, envoyer le lien au client via pop-up copier, et gérer les dossiers depuis un dashboard — le centre de commande DigiRepair.
**FRs covered:** FR21, FR22, FR23, FR24, FR25, FR38, FR39, FR40

### Epic 5: Suivi Réparation Temps Réel
Le client suit sa réparation en direct (timeline Uber-like) et l'admin met à jour le statut en 1 clic avec photos — transparence totale.
**FRs covered:** FR17, FR18, FR19, FR26, FR27, FR28, FR29

### Epic 6: Facturation & Comptabilité
L'admin génère des factures conformes, le livre de recettes s'alimente automatiquement — conformité légale FR sans effort.
**FRs covered:** FR30, FR31, FR32, FR33

### Epic 7: Notifications & Relances
L'admin dispose de messages pré-formatés avec infos client pour chaque notification et relance — copier/coller vers WhatsApp, SMS ou email.
**FRs covered:** FR16, FR34, FR35, FR36

## Epic 1: Fondation Projet & Infrastructure

L'équipe de dev peut initialiser le projet, configurer la DB, l'auth et le déploiement — base fonctionnelle pour tous les epics suivants.

### Story 1.1: Initialisation du projet Next.js + Supabase

As a **développeur**,
I want **initialiser le projet DigiRepair avec le starter officiel Supabase**,
So that **j'ai une base fonctionnelle avec TypeScript, Tailwind, shadcn/ui et auth configurés**.

**Acceptance Criteria:**

**Given** le starter template `create-next-app -e with-supabase`
**When** je lance `npx create-next-app -e with-supabase digirepair`
**Then** le projet est créé avec App Router, TypeScript strict, Tailwind CSS, shadcn/ui initialisé
**And** les variables d'environnement Supabase sont configurées dans `.env.local`
**And** les logos/favicons sont copiés depuis `docs/` vers `public/`
**And** la font Inter est configurée dans le layout racine
**And** la palette couleurs (#2084D7, #1F2E53, #F8F9FA, #E8ECF1) est définie dans les globals CSS
**And** le script npm `"gen:types"` est ajouté au `package.json`
**And** `vitest.config.ts` et `playwright.config.ts` sont configurés
**And** le deploy Vercel fonctionne sur push GitHub

### Story 1.2: Schema DB fondation + Auth duale

As a **développeur**,
I want **créer les tables fondamentales et configurer l'authentification duale**,
So that **les clients peuvent s'authentifier par magic link et l'admin par email/mot de passe**.

**Acceptance Criteria:**

**Given** le projet initialisé (Story 1.1)
**When** je crée les migrations SQL pour les tables `clients` et `admin_users`
**Then** la table `clients` existe avec : id, email, phone, first_name, last_name, created_at
**And** l'auth magic link est fonctionnelle pour les clients (FR20)
**And** l'auth email/mot de passe est fonctionnelle pour l'admin (FR37)
**And** le middleware protège les routes `(admin)` (auth admin requise)
**And** le middleware protège les routes `(client)` (auth magic link requise)
**And** le middleware laisse passer les routes `(client)/devis/[quoteToken]` sans auth (token UUID)
**And** les types TypeScript sont générés via `supabase gen types`

### Story 1.3: RLS Policies & Isolation données

As a **développeur**,
I want **configurer les Row Level Security policies**,
So that **chaque client ne peut accéder qu'à ses propres données (FR41)**.

**Acceptance Criteria:**

**Given** les tables et l'auth configurés (Story 1.2)
**When** je crée les RLS policies sur toutes les tables
**Then** un client authentifié ne voit que ses propres dossiers/devis/factures
**And** l'admin voit toutes les données
**And** les données référentiel (marques, modèles, villes) sont en lecture publique
**And** un test automatisé vérifie l'isolation des données entre clients

## Epic 2: Vitrine Publique & SEO

Le visiteur peut découvrir DigiRepair, consulter les services, lire le blog/FAQ, et contacter via WhatsApp — le site capte du trafic Google et génère des prospects.

### Story 2.1: Homepage & Layout public

As a **visiteur**,
I want **consulter la page d'accueil DigiRepair**,
So that **je comprends les services proposés et je suis convaincu par le professionnalisme**.

**Acceptance Criteria:**

**Given** je suis un visiteur sur la homepage
**When** la page se charge
**Then** je vois le hero section Split D4 (texte + visuel)
**And** je vois les services proposés en cards D3 (téléphones, tablettes, PC, Mac, consoles, microsoudure)
**And** je vois la section "Comment ça marche" en 3 étapes
**And** je vois les avis clients (FR8)
**And** le Header et Footer sont présents avec navigation
**And** le CTA flottant WhatsApp est visible sur mobile (FR7)
**And** la page charge en < 2s (NFR1)
**And** Lighthouse Performance > 90 (NFR4)
**And** Schema.org LocalBusiness est présent (FR9)

### Story 2.2: Pages SEO Couche 1 — Catégorie × Ville

As a **visiteur**,
I want **trouver une page dédiée à mon type de réparation dans ma ville**,
So that **je sais que DigiRepair intervient près de chez moi pour mon besoin**.

**Acceptance Criteria:**

**Given** la base de données référentiel avec villes et catégories
**When** je navigue vers `/valenciennes` ou `/reparation-telephone-douai`
**Then** je vois une page dédiée avec titre, description, services disponibles pour cette ville
**And** les pages sont générées via `generateStaticParams` + ISR (FR10)
**And** chaque page a son Schema.org Service (FR9)
**And** le sitemap XML inclut toutes les pages générées (NFR34)
**And** les mêmes performances que les pages statiques (NFR8)

### Story 2.3: Pages SEO Couche 2 — Marque × Pièce × Modèle × Ville

As a **visiteur**,
I want **trouver une page spécifique pour ma réparation exacte (ex: écran iPhone 15 Valenciennes)**,
So that **je vois le prix estimé, les avis et je suis convaincu de contacter DigiRepair**.

**Acceptance Criteria:**

**Given** la base de données référentiel complète (marques, modèles, pièces, villes)
**When** je navigue vers `/valenciennes/ecran-iphone-15` (FR3)
**Then** je vois le titre spécifique, fourchette prix, délai estimé, FAQ filtrée, avis filtrés
**And** les pages sont générées programmatiquement (5000+ pages) (FR10)
**And** ISR `revalidate: 86400` pour mise à jour sans rebuild (NFR23)
**And** Schema.org Service + AggregateRating par page (FR9)
**And** maillage interne vers la page chapeau ville

### Story 2.4: Blog & FAQ

As a **visiteur**,
I want **lire des articles et une FAQ sur la réparation d'appareils**,
So that **je comprends mon problème et je fais confiance à DigiRepair**.

**Acceptance Criteria:**

**Given** des articles blog et questions FAQ en base de données
**When** je navigue vers `/blog` ou `/faq` (FR4, FR5)
**Then** je vois la liste des articles / questions
**And** chaque article blog a sa page dédiée `/blog/[slug]`
**And** la FAQ a le Schema.org FAQPage pour Position 0 Google (FR9)
**And** maillage interne blog → pages SEO (FR5)

### Story 2.5: Page À propos & Mentions légales

As a **visiteur**,
I want **voir qui est derrière DigiRepair**,
So that **je fais confiance au réparateur avant de le contacter**.

**Acceptance Criteria:**

**Given** la page À propos
**When** je navigue vers la page (FR6)
**Then** je vois le visage de Favor, son histoire, ses compétences
**And** la page mentions légales est accessible avec CGV complètes
**And** le bandeau cookie RGPD est fonctionnel (NFR19)

### Story 2.6: Scene 3D vitrine (Progressive Enhancement)

As a **visiteur desktop**,
I want **voir une scène 3D immersive sur la homepage**,
So that **l'expérience visuelle renforce l'image premium de DigiRepair**.

**Acceptance Criteria:**

**Given** je suis sur desktop avec GPU suffisant
**When** la homepage se charge
**Then** la Scene3D React Three Fiber s'affiche en lazy-load
**And** sur mobile high-end : version simplifiée
**And** sur mobile low-end : fallback image statique
**And** le bundle 3D est séparé (`dynamic({ ssr: false })`)
**And** la 3D n'impacte pas le LCP < 2s (NFR2)

## Epic 3: Devis Vivant & Conversion

Le client peut recevoir un lien devis vivant, consulter le prix détaillé, signer électroniquement et choisir un créneau — le tunnel de conversion qui tue le client fantôme.

### Story 3.1: Page Devis Vivant — Consultation

As a **client**,
I want **consulter mon devis vivant via le lien reçu**,
So that **je vois le prix final détaillé avec garantie et avis avant de me décider**.

**Acceptance Criteria:**

**Given** un lien devis vivant avec token UUID valide (FR11)
**When** j'ouvre le lien
**Then** je vois : "Bonjour [prénom]", l'appareil identifié, le prix TTC final avec badge "Prix FINAL"
**And** je vois la décomposition prix (pièce + main d'oeuvre), la garantie 6 mois (FR12)
**And** je vois des avis de réparations similaires
**And** je vois une FAQ anti-objection
**And** la page charge en < 1.5s (NFR5)
**And** le `quote_step` est persisté en DB (reprise après refresh)
**And** pas d'authentification requise (token UUID suffit) (NFR17)

### Story 3.2: Signature Électronique

As a **client**,
I want **signer mon devis électroniquement depuis mon téléphone**,
So that **j'accepte formellement le devis sans paperasse**.

**Acceptance Criteria:**

**Given** je consulte mon devis vivant
**When** je clique "J'accepte le devis" et signe au doigt sur le canvas (FR13)
**Then** la signature est capturée et stockée dans Supabase Storage
**And** le devis passe au statut "signé" avec timestamp
**And** le `quote_step` avance à l'étape suivante
**And** la signature fonctionne sur écran tactile mobile (touch events)

### Story 3.3: Choix de Créneau & Calendrier

As a **client**,
I want **choisir un créneau de dépôt qui tient compte de la dispo des pièces**,
So that **je sais exactement quand venir et la pièce sera prête**.

**Acceptance Criteria:**

**Given** le devis est signé
**When** je choisis un créneau (FR14)
**Then** les créneaux affichés respectent la logique fournisseur : stock → demain / commande avant 18h → J+2 / après 18h → J+3
**And** les créneaux indisponibles sont grisés avec explication
**And** après confirmation, j'ai un checkmark animé "C'est confirmé !"
**And** je peux ajouter le créneau à mon calendrier iCal (FR15)
**And** la logique créneau est calculée côté serveur uniquement (`calculate-slot.ts`)
**And** un dossier client est auto-créé à la confirmation (FR24)

## Epic 4: Back-Office Devis & Dossiers

L'admin peut créer un devis en 3 clics, envoyer le lien au client via pop-up copier, et gérer les dossiers depuis un dashboard — le centre de commande DigiRepair.

### Story 4.1: Référentiel Marques/Modèles/Pièces/Villes

As a **admin**,
I want **gérer le référentiel de données (marques, modèles, pièces, villes)**,
So that **les devis et pages SEO utilisent des données à jour**.

**Acceptance Criteria:**

**Given** je suis connecté au back-office
**When** je navigue vers la page référentiel (FR38, FR39)
**Then** je peux ajouter/modifier des marques, modèles, pièces et villes
**And** les modifications ne nécessitent pas de changement de code (NFR24)
**And** les tables DB `referentiel_brands`, `referentiel_models`, `referentiel_parts`, `referentiel_cities` existent avec migrations
**And** les données seed initiales sont chargées via `seed.sql`

### Story 4.2: Création Devis Rapide (3 clics)

As a **admin**,
I want **créer un devis en sélectionnant l'appareil, la panne et le prix**,
So that **je passe 2 minutes au lieu de 45 minutes sur Figma**.

**Acceptance Criteria:**

**Given** je suis sur le dashboard admin
**When** je crée un nouveau devis (FR21)
**Then** je sélectionne l'appareil (marque + modèle) depuis le référentiel
**And** je sélectionne/décris la panne
**And** je renseigne le prix TTC
**And** le système génère un devis légalement conforme FR (mentions obligatoires) (FR22)
**And** un PDF devis est généré via Edge Function
**And** le devis a un token UUID unique pour le lien vivant (NFR17)
**And** la table `quotes` est créée avec migrations + RLS

### Story 4.3: Envoi Lien Devis (Pop-up Copier)

As a **admin**,
I want **envoyer le lien devis vivant au client via un message pré-formaté**,
So that **je copie le message et l'envoie par WhatsApp, SMS ou email en 10 secondes**.

**Acceptance Criteria:**

**Given** un devis est créé
**When** je clique "Envoyer le lien devis" (FR23)
**Then** une pop-up s'affiche avec le message pré-formaté incluant : nom client, lien devis vivant
**And** les infos client sont affichées (téléphone, email) pour copie facile
**And** un bouton "Copier le message" copie dans le presse-papier
**And** un bouton "Copier le numéro" copie le téléphone
**And** le statut du devis passe à "envoyé"

### Story 4.4: Dashboard Dossiers & Gestion Créneaux

As a **admin**,
I want **voir tous les dossiers clients sur un dashboard centralisé**,
So that **je gère mon activité en un coup d'oeil**.

**Acceptance Criteria:**

**Given** je suis connecté au back-office
**When** je navigue vers le dashboard (FR25)
**Then** je vois les cards dossiers avec statut, client, appareil, date
**And** je peux filtrer par statut (en attente, signé, en réparation, prêt, terminé)
**And** je vois les stats compteurs (dossiers actifs, en attente, terminés aujourd'hui)
**And** les créneaux gèrent la contrainte fournisseur J+1/18h (FR40)
**And** le composant AdminDossierCard est utilisé

## Epic 5: Suivi Réparation Temps Réel

Le client suit sa réparation en direct (timeline Uber-like) et l'admin met à jour le statut en 1 clic avec photos — transparence totale.

### Story 5.1: Timeline Suivi Client

As a **client**,
I want **voir la timeline de suivi de ma réparation en temps réel**,
So that **je sais exactement où en est mon appareil sans appeler**.

**Acceptance Criteria:**

**Given** je suis authentifié (magic link) et j'ai un dossier en cours
**When** je navigue vers `/suivi/[repairCaseId]` (FR17)
**Then** je vois la timeline à étapes : Dépôt → Diagnostic → Réparation → Tests → Prêt
**And** les mises à jour apparaissent en temps réel via Supabase Realtime (NFR6 < 3s)
**And** fallback polling 30s si WebSocket down (NFR38)
**And** je vois les photos de mon appareil sur la timeline (FR19)
**And** le composant TimelineStep est utilisé

### Story 5.2: Mise à Jour Statut Admin (1 clic)

As a **admin**,
I want **mettre à jour le statut de réparation en un seul clic**,
So that **le client est informé instantanément et je ne perds pas de temps**.

**Acceptance Criteria:**

**Given** je suis sur un dossier dans le back-office
**When** je clique sur le prochain statut (FR26)
**Then** le statut change immédiatement
**And** le client voit la mise à jour en temps réel sur sa timeline
**And** une pop-up message pré-formaté s'affiche pour notifier le client (FR18) avec nom, tél, email, nouveau statut
**And** je peux ajouter des notes techniques (FR28)

### Story 5.3: Upload Photos Réparation

As a **admin**,
I want **uploader des photos de l'appareil depuis mon téléphone**,
So that **le client voit l'état de son appareil (avant/après) sur la timeline**.

**Acceptance Criteria:**

**Given** je suis sur un dossier dans le back-office
**When** j'uploade une photo (FR27)
**Then** la photo est stockée dans Supabase Storage (bucket sécurisé par dossier)
**And** la photo apparaît sur la timeline client en temps réel (FR19)
**And** le composant PhotoUploader fonctionne sur mobile (camera access)
**And** les photos sont isolées par client (RLS Storage) (NFR18)

### Story 5.4: Notifications Admin Temps Réel

As a **admin**,
I want **recevoir des notifications en temps réel des nouvelles demandes**,
So that **je ne rate aucune demande de devis**.

**Acceptance Criteria:**

**Given** je suis connecté au back-office
**When** un nouveau dossier arrive ou un devis est signé (FR29)
**Then** une notification apparaît dans la topbar admin
**And** le badge compteur se met à jour en temps réel
**And** via Supabase Realtime channel `admin:dashboard`

## Epic 6: Facturation & Comptabilité

L'admin génère des factures conformes, le livre de recettes s'alimente automatiquement — conformité légale FR sans effort.

### Story 6.1: Génération Facture Conforme

As a **admin**,
I want **générer automatiquement une facture légalement conforme à la récupération**,
So that **je suis en conformité légale sans effort manuel**.

**Acceptance Criteria:**

**Given** un dossier avec statut "Prêt" et un devis signé
**When** je confirme la récupération (FR30)
**Then** une facture est générée avec toutes les mentions obligatoires FR
**And** numérotation séquentielle automatique
**And** le PDF est généré via Edge Function (`generate-pdf`)
**And** la facture est stockée dans Supabase Storage
**And** un trigger PostgreSQL empêche toute modification après génération (NFR20)
**And** la table `invoices` est créée avec migrations

### Story 6.2: Livre de Recettes & Export

As a **admin**,
I want **consulter et exporter mon livre de recettes**,
So that **ma comptabilité est toujours à jour automatiquement**.

**Acceptance Criteria:**

**Given** des factures ont été générées
**When** je navigue vers la page facturation (FR31, FR32)
**Then** le livre de recettes s'affiche avec toutes les factures chronologiquement
**And** je peux filtrer par période
**And** je peux exporter en CSV/PDF
**And** chaque facturation alimente automatiquement le livre (FR31)
**And** le composant InvoicePreview est utilisé

### Story 6.3: Association Factures Fournisseur

As a **admin**,
I want **associer les factures fournisseur (pièces) au dossier client**,
So that **j'ai une traçabilité complète des coûts par réparation**.

**Acceptance Criteria:**

**Given** un dossier client avec des pièces commandées
**When** j'uploade ou associe une facture fournisseur (FR33)
**Then** la facture fournisseur est liée au dossier
**And** je peux voir le coût pièces vs prix facturé sur le dossier

## Epic 7: Notifications & Relances

L'admin dispose de messages pré-formatés avec infos client pour chaque notification et relance — copier/coller vers WhatsApp, SMS ou email.

### Story 7.1: Système de Messages Pré-formatés

As a **admin**,
I want **avoir des messages pré-formatés avec les infos client pour chaque situation**,
So that **j'envoie des notifications professionnelles en 10 secondes**.

**Acceptance Criteria:**

**Given** un dossier client avec des données complètes
**When** je clique sur "Notifier le client" (FR34)
**Then** une pop-up affiche le message adapté au contexte (devis envoyé, créneau confirmé, statut changé, prêt à récupérer)
**And** le message inclut : nom client, détail appareil, lien pertinent
**And** les infos contact (téléphone, email) sont affichées
**And** bouton "Copier le message" + "Copier le numéro"
**And** les templates sont dans `lib/utils/message-templates.ts`

### Story 7.2: Badges Relances Dashboard (J+1/J+3/J+7)

As a **admin**,
I want **voir les relances à effectuer sur le dashboard avec messages prêts**,
So that **je ne laisse aucun client fantôme s'échapper**.

**Acceptance Criteria:**

**Given** des devis envoyés non signés
**When** le délai J+1, J+3 ou J+7 est atteint (FR16, FR35)
**Then** un badge s'affiche sur le dashboard avec le nombre de relances à faire
**And** en cliquant, je vois la liste des clients à relancer
**And** pour chaque client : pop-up avec message de relance adapté au délai (doux J+1, relance J+3, dernière J+7)
**And** le message inclut nom, tél, email, lien devis
**And** je peux marquer "Relance effectuée" pour masquer le badge

### Story 7.3: Demande d'Avis Google

As a **admin**,
I want **envoyer une demande d'avis Google après la réparation**,
So that **je collecte des avis positifs automatiquement**.

**Acceptance Criteria:**

**Given** un dossier avec statut "Terminé"
**When** le dossier est clôturé (FR36)
**Then** un message de demande d'avis est généré avec lien Google My Business
**And** pop-up avec message pré-formaté + infos client
**And** bouton copier pour envoi manuel
