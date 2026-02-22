# Story 2.4: Blog & FAQ

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **visiteur**,
I want **lire des articles de blog et consulter une FAQ sur la reparation d'appareils**,
So that **je comprends mon probleme, je fais confiance a DigiRepair et je suis convaincu de le contacter**.

## Acceptance Criteria

1. **Given** des articles blog en donnees statiques, **When** je navigue vers `/blog`, **Then** je vois la liste des articles avec titre, date, temps de lecture et extrait (FR5)
2. **Given** un article blog, **When** je navigue vers `/blog/[slug]`, **Then** je vois le contenu complet avec Schema.org Article JSON-LD, CTA contextuels et liens internes vers pages SEO (FR5, FR9)
3. **Given** des questions FAQ en donnees statiques, **When** je navigue vers `/faq`, **Then** je vois toutes les questions/reponses organisees par categorie avec Schema.org FAQPage JSON-LD (FR4, FR9)
4. **Given** la page FAQ, **When** je clique sur une question, **Then** la reponse s'affiche/se masque en accordeon
5. **Given** les pages blog et FAQ, **When** je verifie le sitemap, **Then** `app/sitemap.ts` inclut `/blog`, `/blog/[slug]` et `/faq` (NFR34)
6. **Given** un article blog, **When** je regarde le maillage interne, **Then** des liens vers les pages SEO Couche 1 et/ou Couche 2 pertinentes sont presents (FR5)
7. **Given** les pages blog et FAQ, **When** la page se charge, **Then** le Header, Footer et FloatingCTA du layout vitrine sont presents
8. **Given** les pages blog et FAQ, **When** je verifie les meta tags, **Then** title, meta description et og:tags sont dynamiques et uniques par page
9. **Given** un article blog, **When** je regarde le bas de page, **Then** des articles lies sont suggeres

## Tasks / Subtasks

- [ ] **Task 1 : Creer les donnees statiques blog et FAQ dans seo-config.ts** (AC: #1, #2, #3)
  - [ ] 1.1 Ajouter interfaces `BlogArticle` (slug, title, excerpt, content sections, date, readingTime, category, relatedSlugs, linkedSeoPages) et `FaqItem` (question, answer, category)
  - [ ] 1.2 Ajouter `BLOG_ARTICLES`: 5 articles couvrant les 3 variantes UX (diagnostic, prix, guide) — ex: "ecran-iphone-noir-mais-vibre", "combien-coute-reparation-ecran-samsung", "5-causes-surchauffe-macbook", "batterie-gonflee-que-faire", "comment-proteger-ecran-telephone"
  - [ ] 1.3 Ajouter `FAQ_ITEMS`: 10-12 questions anti-objections organisees en 3 categories (prix, garantie, processus) — ex: "Y a-t-il des frais supplementaires ?", "Quelle garantie sur les reparations ?", "Combien de temps dure une reparation ?"
  - [ ] 1.4 Fonction utilitaire `getBlogArticleBySlug(slug)` et `getBlogArticles()`
  - [ ] 1.5 Exporter tous les types et constantes

- [ ] **Task 2 : Creer les helpers blog/FAQ dans seo-helpers.ts** (AC: #8)
  - [ ] 2.1 Ajouter `generateBlogListMetadata()` → `Metadata` pour `/blog`
  - [ ] 2.2 Ajouter `generateBlogArticleMetadata(article)` → `Metadata` pour `/blog/[slug]`
  - [ ] 2.3 Ajouter `generateFaqMetadata()` → `Metadata` pour `/faq`

- [ ] **Task 3 : Creer la page liste blog `/blog`** (AC: #1, #7, #8)
  - [ ] 3.1 Creer `app/(vitrine)/blog/page.tsx` avec `generateMetadata`
  - [ ] 3.2 Afficher les articles en cards : titre, date, temps de lecture, extrait, lien "Lire la suite"
  - [ ] 3.3 Hero section avec titre H1 "Blog DigiRepair" et sous-titre

- [ ] **Task 4 : Creer la page article blog `/blog/[slug]`** (AC: #2, #6, #8, #9)
  - [ ] 4.1 Creer `app/(vitrine)/blog/[slug]/page.tsx` avec `generateStaticParams` et `generateMetadata`
  - [ ] 4.2 Afficher le contenu article avec H1, date, temps de lecture
  - [ ] 4.3 Encarts CTA contextuels dans le corps de l'article (lien WhatsApp avec message pre-rempli contextuel)
  - [ ] 4.4 Section "Articles lies" en bas (max 3 articles)
  - [ ] 4.5 Liens internes vers pages SEO Couche 1/2 pertinentes (maillage interne)
  - [ ] 4.6 Retourner `notFound()` si slug invalide

- [ ] **Task 5 : Creer le composant blog-article-template.tsx** (AC: #2, #6, #9)
  - [ ] 5.1 Creer `components/custom/blog-article-template.tsx`
  - [ ] 5.2 Structure : Header (H1, date, lecture) + Corps (sections avec CTA inline) + Articles lies + Maillage interne
  - [ ] 5.3 Design : bg-white, max-w-3xl centree, typographie prose Tailwind

- [ ] **Task 6 : Creer le composant Schema.org Article JSON-LD** (AC: #2)
  - [ ] 6.1 Creer `components/seo/article-jsonld.tsx`
  - [ ] 6.2 Schema.org Article avec name, datePublished, author (DigiRepair), publisher

- [ ] **Task 7 : Creer la page FAQ `/faq`** (AC: #3, #4, #7, #8)
  - [ ] 7.1 Creer `app/(vitrine)/faq/page.tsx` avec `generateMetadata`
  - [ ] 7.2 Hero section avec titre H1 et sous-titre
  - [ ] 7.3 Questions groupees par categorie avec accordeon (details/summary natif HTML)
  - [ ] 7.4 Schema.org FAQPage JSON-LD inline (toutes les questions)
  - [ ] 7.5 CTA WhatsApp en bas "Vous avez une autre question ?"

- [ ] **Task 8 : Etendre le sitemap avec blog et FAQ** (AC: #5)
  - [ ] 8.1 Ajouter `/blog` (priority 0.7, weekly)
  - [ ] 8.2 Ajouter `/blog/[slug]` pour chaque article (priority 0.5, monthly)
  - [ ] 8.3 Ajouter `/faq` (priority 0.7, monthly)

- [ ] **Task 9 : Tests unitaires** (AC: tous)
  - [ ] 9.1 Tests seo-config.ts : articles count, getBlogArticleBySlug, slugs uniques, FAQ items count, categories FAQ
  - [ ] 9.2 Tests seo-helpers.ts : metadata blog list, metadata blog article, metadata FAQ
  - [ ] 9.3 Tests blog-article-template.tsx : hero, contenu, CTA contextuel, articles lies, maillage interne
  - [ ] 9.4 Tests faq page : accordeon rendu, categories, Schema.org FAQPage present
  - [ ] 9.5 Tests article-jsonld.tsx : Schema.org Article present avec champs requis
  - [ ] 9.6 Tests sitemap : URLs blog et FAQ presentes

## Dev Notes

- Les donnees blog et FAQ sont 100% statiques dans `seo-config.ts` (meme pattern que Couche 1/2). Pas de Supabase DB a ce stade — la table `blog_articles` (architecture `006_create_blog.sql`) sera pour l'Epic 4 (gestion admin)
- Les articles blog sont de la "Couche 3 SEO" : contenu educatif longue traine qui renvoie vers les pages services (Couche 1/2)
- 3 variantes d'articles (UX spec) : `diagnostic` ("Mon appareil fait X"), `prix` ("Combien coute X"), `guide` ("Comment X")
- CTA contextuels DANS le corps de l'article (pas seulement en fin) — pattern UX J7
- FAQ = anti-objections (Nathalie persona) : prix, garantie, delais, transparence
- Accordeon FAQ avec `<details>/<summary>` natif HTML (pas de JS, bonne accessibilite, SSR friendly)
- Schema.org FAQPage sur `/faq` pour Position 0 Google (featured snippets)
- Schema.org Article sur `/blog/[slug]` pour rich results Google
- Maillage interne : chaque article doit pointer vers 1-2 pages SEO pertinentes (Couche 1 ou 2)
- Design : utiliser les tokens DigiRepair (dr-primary pour CTA, dr-dark pour titres, dr-soft/dr-alt pour sections alternees)
- `text-dr-dark` pour elements decoratifs, `bg-dr-primary` pour CTA uniquement
- shadcn/ui : Card, Badge pour les articles list, `<h3>` natif (pas CardTitle)
- Le composant `blog-article.tsx` de l'architecture correspond a notre `blog-article-template.tsx`
- Tests co-localises `.test.tsx` a cote des fichiers source
- Vitest 4.0.18 + @testing-library/react + jsdom

### Project Structure Notes

- Routes: `app/(vitrine)/blog/page.tsx`, `app/(vitrine)/blog/[slug]/page.tsx`, `app/(vitrine)/faq/page.tsx` — alignement architecture
- Composant: `components/custom/blog-article-template.tsx` — nomme `blog-article.tsx` dans l'architecture, on utilise le pattern `-template` coherent avec `seo-page-template.tsx` et `seo-couche2-template.tsx`
- Schema.org: `components/seo/article-jsonld.tsx` — meme dossier que `service-jsonld.tsx` et `service-couche2-jsonld.tsx`
- Donnees: `lib/constants/seo-config.ts` — meme fichier que Couche 1/2, section Blog & FAQ separee
- Helpers: `lib/utils/seo-helpers.ts` — meme fichier que Couche 1/2, section Blog & FAQ separee
- Sitemap: `app/sitemap.ts` — extension du fichier existant
- Pas de conflit de routes : `/blog` et `/faq` sont des routes statiques distinctes des routes dynamiques `[ville]` et `[ville]/[repair]`

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 2.4: Blog & FAQ] — AC et scope
- [Source: _bmad-output/planning-artifacts/architecture.md#Source Tree] — Routes blog/faq, composant blog-article.tsx, migration 006_create_blog.sql
- [Source: _bmad-output/planning-artifacts/architecture.md#Data Boundaries] — blog_articles ISR 1h, RLS published=true
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#J7] — Parcours Blog/FAQ → SEO → Contact, strategie contenu
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#BlogArticle] — Anatomy composant, variantes diagnostic/prix/guide
- [Source: _bmad-output/planning-artifacts/prd.md#FR4] — FAQ anti-objections
- [Source: _bmad-output/planning-artifacts/prd.md#FR5] — Blog articles entretien/diagnostic
- [Source: _bmad-output/planning-artifacts/prd.md#FR9] — Schema.org FAQ, Article
- [Source: _bmad-output/implementation-artifacts/2-3-pages-seo-couche-2-marque-piece-modele-ville.md] — Patterns Couche 2 (reference pour coherence)

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
