---
stepsCompleted: [1, 2]
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
| **WhatsApp Business API** | FR34 | Provider tiers (Twilio/MessageBird), webhooks, templates approuvés |
| **Signature électronique** | FR13 | Canvas tactile côté client, stockage image signature, valeur légale à valider |
| **Contrainte fournisseur J+1/18h** | FR14 | Logique métier créneau calculée côté serveur |
| **RGPD** | NFR19 | Consentement, effacement, export, hébergement EU |

### Cross-Cutting Concerns Identified

1. **Authentification duale** — Magic link (clients) vs email/pwd (admin) → 2 stratégies auth dans le même système, Supabase Auth gère nativement
2. **Génération PDF** — Devis + Factures conformes FR → Edge Functions ou service dédié, templates PDF
3. **Notifications multi-canal** — WhatsApp (primaire) + SMS (fallback) + Push (optionnel) → abstraction notification service
4. **Données référentiel** — Marques/modèles/pièces/villes alimentent SEO + devis + recherche → source unique, cache agressif
5. **Sécurité des données** — RLS par client, photos isolées, factures immuables → policies Supabase, audit trail
6. **Performance 3D** — React Three Fiber sur pages publiques → lazy-load, code split, progressive enhancement, impact Lighthouse
7. **SEO programmatique** — 5000+ pages SSG/ISR → build strategy, sitemap dynamique, Schema.org par page
