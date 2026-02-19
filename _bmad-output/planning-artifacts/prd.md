---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-02b-vision', 'step-02c-executive-summary', 'step-03-success', 'step-04-journeys', 'step-05-domain', 'step-06-innovation', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional', 'step-11-polish']
classification:
  projectType: 'web_app'
  domain: 'general'
  complexity: 'medium'
  projectContext: 'greenfield'
techStack:
  hosting: 'Vercel'
  backend: 'Supabase'
  repository: 'GitHub'
inputDocuments: ['brainstorming-session-2026-02-18.md', 'brainstorming-session-2026-02-19.md']
workflowType: 'prd'
documentCounts:
  briefs: 0
  research: 0
  brainstorming: 2
  projectDocs: 0
---

# Product Requirements Document - DigiRepair

**Author:** Favor
**Date:** 2026-02-19

## Executive Summary

DigiRepair est une web application complète pour une entreprise de réparation d'appareils électroniques (téléphones, tablettes, PC, Mac, consoles) et microsoudure, basée à Haulchin (59121). Cible : jeunes connectés et familles dans un rayon de 40km (Valenciennes, Denain, Douai, Cambrai et communes environnantes).

Le produit résout trois problèmes critiques :

1. **Le client fantôme** : 100% des prospects disparaissent après réception du prix par SMS. DigiRepair remplace le SMS froid par un lien devis vivant — page personnalisée avec prix final, garantie, avis clients, signature électronique et prise de créneau en un flux unique.
2. **Le gouffre administratif** : 1-2h d'admin par client (devis Figma, 7 sous-dossiers manuels, livre de recettes). Le back-office intégré automatise la totalité du workflow : devis/facture légalement conformes, suivi de réparation, CRM, facturation.
3. **L'invisibilité locale** : Les réparateurs indépendants sont absents de Google. Une matrice SEO (ville × marque × pièce × modèle) génère des milliers de pages ciblées pour capturer chaque recherche locale possible.

### Ce qui rend DigiRepair unique

**Le prix arrive nu — DigiRepair l'habille.** Le secteur de la réparation vend un service de précision avec les outils marketing des années 90. DigiRepair comble ce fossé en offrant une expérience client digne d'Apple et Doctolib à un métier artisanal.

Différenciateurs clés :
- **Lien devis vivant** : Transforme une réponse prix en tunnel de conversion (prix final → preuve sociale → signature → créneau). Élimine le fantôme.
- **Double ROI** : Le site libère 20-30h/semaine d'admin. Le back-office remplace Figma + dossiers manuels par un système automatisé calqué sur le workflow existant (7 sous-dossiers → 7 modules digitaux).
- **Tracking type Uber** : Le client suit sa réparation en temps réel (timeline à étapes avec photos de SON appareil). Aucun concurrent local ne propose ça.
- **DA Apple-like** : Design minimaliste (#2084D7 / #1F2E53 / #F8F9FA) qui crée le parallèle implicite "site soigné = microsoudure soignée".
- **Toile SEO imbattable** : Matrice ville × marque × pièce × modèle + blog + FAQ Schema.org = domination des résultats locaux sur 40km.

Contrainte fournisseur intégrée nativement : livraison J+1 avec cut-off 18h, répercutée dans le système de créneau (stock → demain / commande avant 18h → J+2 / après 18h → J+3).

## Project Classification

- **Type :** Web App hybride (SSR/SSG public + SPA back-office) — site vitrine + back-office admin + espace client
- **Domaine :** Services locaux / réparation électronique
- **Complexité :** Moyenne — conformité légale devis/facture FR, multi-facettes (SEO, CRM, facturation, suivi temps réel) mais pas de régulation lourde
- **Contexte :** Greenfield — construction complète from scratch
- **Cible :** Jeunes connectés + familles, rayon 40km autour de Haulchin (59121)
- **Priorité mobile :** 80%+ du trafic attendu sur mobile
- **Stack technique :** GitHub (repository) + Vercel/Next.js (hosting/SSR/SSG) + Supabase (backend, base de données, auth, storage, realtime)

## Success Criteria

### User Success

- Le client obtient une réponse prix contextualisée (lien devis vivant) dans les minutes suivant sa demande
- Le client signe son devis et réserve un créneau en **moins de 2 minutes** depuis le lien reçu
- Le client suit sa réparation en temps réel (timeline à étapes) — zéro appel "c'est bientôt fini ?"
- Le dépôt prend **moins de 3 minutes** grâce au pré-traitement en ligne (devis signé, photos uploadées, créneau réservé)
- Satisfaction cible : **4.8+/5** sur les avis Google collectés automatiquement

### Business Success

| Métrique | Aujourd'hui | 3 mois | 6 mois | 12 mois |
|---|---|---|---|---|
| Réparations/semaine | 3 | 7-14 (1-2/jour) | 25 (5/jour) | Boutique physique |
| Taux conversion devis | 0% | 50% | 60% | 70% |
| Temps admin/client | 1-2h | 15 min | 10 min | 10 min |
| Heures admin libérées/sem | 0 | ~15h | ~25h | 30h+ |
| Positionnement SEO | Inexistant | Top 3 toutes pages | Top 1-2 requêtes clés | Domination locale |

### Technical Success

- **Performance :** Chargement < 2s sur mobile (Lighthouse 90+)
- **SEO :** Toutes les pages indexées en 2-4 semaines, top 3 Google en 1 mois max
- **Disponibilité :** 99.9% uptime (Vercel + Supabase)
- **Mobile :** Score mobile Lighthouse > 90, responsive parfait, gestes natifs
- **Légal :** Devis et factures conformes à la législation française (mentions obligatoires, signature électronique valide)
- **Sécurité :** Auth Supabase, données clients protégées (RGPD), stockage photos sécurisé

### Measurable Outcomes

- **Métrique nord star :** Taux de conversion devis envoyé → devis signé (cible 50% à M+3, 70% à M+12)
- **Indicateur avancé :** Liens devis ouverts / liens envoyés (engagement)
- **Indicateur retard :** Réparations/semaine (croissance business)
- **Efficacité :** Temps moyen admin par dossier client (cible < 10 min)
- **SEO :** Positions moyennes par page, trafic organique mensuel, requêtes en top 3

## User Journeys

### Parcours 1 : Mehdi, 24 ans — Le Jeune Connecté (Success Path)

**Situation :** Mehdi est développeur web à Valenciennes. Son iPhone 15 Pro lui a glissé des mains ce matin. L'écran est fissuré en étoile. Il ne peut plus utiliser Face ID. Il est stressé — cet iPhone c'est sa vie : travail, Spotify, banque, photos. Il a besoin d'une réparation VITE et BIEN.

**Opening Scene :** Pause déjeuner. Mehdi tape "changer écran iPhone 15 Valenciennes" sur le téléphone de sa copine. DigiRepair apparaît en 2ème position. Le titre l'accroche : "Remplacement écran iPhone 15 à Valenciennes — Garanti 6 mois". Il clique.

**Rising Action :** La page s'ouvre en moins de 2 secondes. Propre. Minimaliste. Pas le chaos habituel des réparateurs. Il voit "À 12 minutes de Valenciennes centre", une fourchette de prix, des photos avant/après, un avis d'un autre client iPhone 15 ("35 min, impeccable"). Il clique sur le CTA flottant "Obtenir mon devis gratuit" → WhatsApp s'ouvre avec un message pré-rempli. Il envoie "Bonjour, écran fissuré iPhone 15 Pro, Face ID ne marche plus".

**Climax :** 10 minutes plus tard, Mehdi reçoit un lien devis vivant — pas un SMS "120€". Il ouvre : "Bonjour Mehdi !", son appareil identifié, le prix TTC final (120€) avec le badge "✓ Prix FINAL — Zéro surprise", la décomposition (pièce + main d'oeuvre), garanti 6 mois, 3 avis de réparations iPhone identiques. Il scrolle, clique "J'accepte le devis", signe au doigt sur l'écran, et choisit un créneau demain 14h. Checkmark animé : "C'est confirmé !" Il ajoute au calendrier.

**Resolution :** Le lendemain, dépôt en 3 minutes (tout est déjà fait en ligne). 45 minutes plus tard, notification : "DigiRepair 🔵 Votre iPhone 15 Pro : réparation terminée !" Il récupère son iPhone, nettoyé, fonctionnel. Le soir, il reçoit "Heureux de retrouver votre iPhone ? ⭐" — il laisse 5 étoiles sur Google. Quand son pote casse son Samsung, Mehdi dit : "Va sur DigiRepair, c'est pas comme les autres".

**Capabilities révélées :** Pages SEO ville×marque×pièce, WhatsApp intégré, lien devis vivant, signature électronique, prise de créneau, notifications push, demande d'avis automatique.

---

### Parcours 2 : Nathalie, 42 ans — La Mère de Famille (Edge Case : Hésitation + Pièce à Commander)

**Situation :** Nathalie vit à Douai avec ses 3 enfants (8, 12, 16 ans). La tablette Samsung Galaxy Tab A8 du petit ne charge plus. Elle a déjà été arnaquée par un réparateur qui avait facturé des "frais supplémentaires". Elle est méfiante.

**Opening Scene :** Nathalie cherche "réparation tablette Samsung Douai" sur Google. DigiRepair apparaît — le site est élégant, ça ne ressemble pas aux sites habituels de réparateurs. Elle voit le visage de Favor, "Fondateur de DigiRepair, spécialiste microsoudure". Elle clique sur "Comment ça marche" — 3 étapes simples. Elle lit la FAQ : "Y a-t-il des frais supplémentaires ?" → "Jamais. Le prix sur votre devis est le prix FINAL."

**Rising Action :** Elle contacte via WhatsApp. Favor évalue et envoie le lien devis vivant. Nathalie ouvre : 65€ TTC, "✓ Prix FINAL", garanti 6 mois. Mais elle hésite. Elle ferme le lien. Le lendemain, elle reçoit : "Des questions sur la réparation de votre Galaxy Tab ? On est là pour vous aider." Elle reclique. Relit les avis. Se décide. Signe le devis.

**Climax :** Le créneau proposé est dans 3 jours — la pièce n'est pas en stock (commande avant 18h → livraison J+1 → créneau J+2). Le calendrier affiche clairement les créneaux disponibles en vert, les grisés sont expliqués. Nathalie comprend sans explication technique. Elle réserve vendredi 10h. Rappel la veille par SMS.

**Resolution :** Dépôt express vendredi. Elle suit la réparation sur la timeline : "Diagnostic ✓ → Pièce reçue ✓ → Réparation en cours...". Notification 2h plus tard : "Prêt !" Elle récupère la tablette, nettoyée. 1 mois plus tard, le téléphone de son ado tombe. Elle ne cherche même pas sur Google — elle va directement sur DigiRepair. Elle devient cliente récurrente pour toute la famille.

**Capabilities révélées :** Page "À propos" avec visage humain, FAQ anti-objections, relance automatique J+1, logique créneau fournisseur J+1/18h, rappel automatique, timeline suivi, fidélisation famille.

---

### Parcours 3 : Favor — L'Admin/Technicien (Back-Office)

**Situation :** Favor gère seul son activité de réparation. Aujourd'hui il passe 1-2h d'admin par client entre Figma, les dossiers manuels et les échanges. Il veut réparer, pas faire de la paperasse.

**Opening Scene :** 9h du matin. Favor ouvre le dashboard DigiRepair. Vue d'ensemble : 3 demandes de devis en attente, 2 réparations en cours, 1 prête à récupérer. Tout est visible en un coup d'oeil sur des cards épurées.

**Rising Action :** Il traite la première demande : "Mehdi, iPhone 15 Pro, écran fissuré". En 3 clics : sélection de l'appareil → sélection de la panne → prix renseigné → le devis légalement conforme se génère automatiquement. Il clique "Envoyer le lien devis". Mehdi reçoit le lien. Temps total : 2 minutes au lieu de 45 minutes.

**Climax :** Mehdi signe. Favor reçoit une notification. Le dossier client se crée automatiquement dans le back-office avec toutes les sections : infos client, devis signé, créneau réservé, section photos (vide en attente du dépôt), notes techniques (vide en attente), section pièces fournisseur. Le livre de recettes s'alimente automatiquement à la facturation. Favor n'a TOUCHÉ À RIEN — le système a tout fait.

**Resolution :** Pendant la réparation, Favor met à jour le statut en 1 clic ("Réparation en cours" → "Tests qualité" → "Prêt"). Prend une photo avant et après, les uploade depuis son téléphone. Le client est notifié automatiquement. Facture générée au moment de la récupération. En fin de journée : 5 clients traités, 30 minutes d'admin total au lieu de 7 heures. Favor répare au lieu d'administrer.

**Capabilities révélées :** Dashboard admin, générateur de devis en 3 clics, dossier client auto-créé (7 modules), mise à jour statut 1 clic, upload photos, facturation auto, livre de recettes auto, notifications automatiques.

---

### Parcours 4 : Thomas, 35 ans — Le Visiteur SEO (Parcours Long-Terme)

**Situation :** Thomas, Cambrai. Son MacBook surchauffe depuis 2 semaines. Il ne cherche pas (encore) un réparateur — il cherche à comprendre le problème.

**Opening Scene :** Il tape "MacBook qui surchauffe que faire" sur Google. Un article blog DigiRepair apparaît en Position 0 grâce au FAQ Schema.org : "Les 5 causes de surchauffe MacBook et comment les résoudre." Il clique.

**Rising Action :** L'article est utile, bien écrit, pas commercial. Il apprend que la poussière dans les ventilateurs est la cause n°1. À la fin de l'article : "Besoin d'un nettoyage professionnel ? DigiRepair nettoie et entretient votre MacBook à Cambrai — à 20 minutes de chez vous." CTA discret mais présent.

**Climax :** Thomas ne clique pas tout de suite. Mais 3 semaines plus tard, son MacBook s'éteint tout seul. Il se souvient de DigiRepair. Il tape directement "DigiRepair Cambrai" — la page dédiée apparaît en premier. Il connaît déjà la marque, fait confiance grâce à l'article. Il contacte via WhatsApp.

**Resolution :** Thomas entre dans le tunnel de conversion classique (lien devis → signature → créneau). L'article blog a créé la confiance AVANT le besoin. Le SEO a fait le travail de vente sur 3 semaines sans aucun effort de Favor.

**Capabilities révélées :** Blog SEO avec articles de fond, Schema.org FAQ, pages ville dédiées, maillage interne blog → pages services, contenu qui pré-vend avant le besoin.

---

### Journey Requirements Summary

| Capability | Mehdi | Nathalie | Favor | Thomas |
|---|---|---|---|---|
| Pages SEO ville×marque×pièce | ✅ | ✅ | | ✅ |
| WhatsApp intégré | ✅ | ✅ | | ✅ |
| Lien devis vivant | ✅ | ✅ | ✅ (crée) | |
| Signature électronique | ✅ | ✅ | | |
| Prise de créneau (logique fournisseur) | ✅ | ✅ | | |
| Timeline suivi réparation | ✅ | ✅ | ✅ (met à jour) | |
| Notifications automatiques | ✅ | ✅ | ✅ (reçoit) | |
| Dashboard admin | | | ✅ | |
| Générateur devis 3 clics | | | ✅ | |
| Dossier client auto-créé | | | ✅ | |
| Facturation + livre de recettes | | | ✅ | |
| Relance anti-fantôme | | ✅ | | |
| Demande d'avis auto | ✅ | | | |
| Blog + FAQ Schema.org | | ✅ (FAQ) | | ✅ |
| Page "À propos" + visage | | ✅ | | |
| Upload photos | | | ✅ | |

## Innovation & Novel Patterns

### Detected Innovation Areas

**1. Conversion par contextualisation (Lien Devis Vivant)**
- Remplace le SMS/email froid ("80€") par une page personnalisée interactive qui habille le prix de contexte (garantie, avis, FAQ, signature, créneau)
- Dans le secteur réparation, 100% des indépendants envoient un prix nu. DigiRepair applique un tunnel de conversion e-commerce à un devis artisanal
- **Hypothèse :** L'ajout de contexte autour du prix augmente la conversion (cible : 0% → 50%)

**2. Transparence opérationnelle en temps réel (Tracking Uber)**
- Timeline à étapes avec photos de l'appareil du client (dépôt → diagnostic → réparation → tests → prêt)
- Transplantation du pattern Uber/Domino's vers un métier artisanal où le client attend dans le noir
- **Hypothèse :** La transparence réduit les appels "c'est bientôt fini ?" (> 80%) et augmente les avis positifs

**3. SEO programmatique combinatoire**
- Génération automatique de pages ville × marque × pièce × modèle + FAQ Schema.org
- Couverture SEO que même les chaînes (WeFix, Save) n'ont pas
- **Hypothèse :** Google indexe et positionne top 3 des milliers de pages en < 1 mois

**4. Digital Twin du workflow physique**
- Les 7 sous-dossiers client (00_admin → 06_achats) deviennent 7 modules digitaux identiques
- Zéro courbe d'apprentissage pour l'admin
- **Hypothèse :** Le mapping 1:1 physique→digital accélère l'adoption (cible : 10 min admin/client vs 1-2h)

### Market Context & Competitive Landscape

- Les chaînes (iSmash, WeFix, Save) ont des sites pros mais **aucune** n'offre de suivi temps réel ni de lien devis interactif
- Les indépendants ont des sites vitrine basiques (templates Wix/WordPress) sans back-office intégré
- Doctolib a prouvé le modèle "prise de RDV en ligne pour métier local" — DigiRepair applique le même pattern à la réparation
- Aucun produit SaaS vertical pour réparateurs indépendants ne combine vitrine SEO + devis interactif + CRM + suivi client

### Innovation Validation

| Innovation | Méthode de validation | Métrique clé | Seuil de succès |
|---|---|---|---|
| Lien Devis Vivant | A/B test SMS nu vs lien vivant (20 premiers clients) | Taux conversion devis | > 30% (vs 0% actuel) |
| Tracking Uber | Comptage appels "c'est fini ?" avant/après | Appels status / client | Réduction > 80% |
| SEO programmatique | Google Search Console, positions par page | Pages en top 3 | > 50% des pages en 1 mois |
| Digital Twin workflow | Chrono temps admin par dossier | Minutes/client | < 15 min dès le lancement |

## Web App Specific Requirements

### Architecture Technique

DigiRepair est une Web App hybride construite sur **Next.js + Vercel + Supabase** :
- **Partie publique (SSR/SSG)** : Site vitrine, pages SEO, blog, FAQ, page devis vivant — rendu serveur pour indexation Google optimale
- **Partie privée SPA** : Back-office admin (Favor) + espace client (suivi réparation) — rendu client pour fluidité maximale
- **PWA-ready** : Installation possible sur écran d'accueil mobile, notifications push

### Stratégie SEO Multi-Couches

**Couche 1 — Pages chapeau par catégorie × ville :**
- `réparation téléphone [ville]`, `réparation console [ville]`, `réparation Mac [ville]`, `réparation tablette [ville]`, `réparation PC [ville]`, `microsoudure [ville]`
- Couvre toutes les villes dans un rayon de 40km autour de Haulchin (59121)
- Chaque page chapeau agrège les sous-pages spécifiques et sert de hub SEO

**Couche 2 — Pages spécifiques marque × pièce × modèle × ville :**
- `changer écran iPhone 15 Valenciennes`, `réparation port charge Samsung S23 Douai`...
- Génération programmatique à partir d'une base de données marques/modèles/pièces/villes
- Contenu enrichi : FAQ locale, fourchette prix, délai estimé, avis filtrés par modèle

**Couche 3 — Contenu éditorial :**
- Blog articles de fond ("Les 5 causes de surchauffe MacBook")
- FAQ Schema.org pour Position 0
- Maillage interne : blog → pages chapeau → pages spécifiques

**Architecture SEO technique :**
- SSG pour toutes les pages SEO → build-time, performances maximales
- ISR (Incremental Static Regeneration) pour mise à jour sans rebuild complet
- Sitemap XML dynamique, robots.txt optimisé
- Schema.org : LocalBusiness, FAQ, Service, AggregateRating
- Open Graph + Twitter Cards pour partage social

### Responsive Design & Mobile-First

- Design pensé d'abord pour écran 375px, puis adapté desktop
- Breakpoints : 375px (mobile) → 768px (tablette) → 1024px (desktop) → 1440px (large)
- Gestes natifs : signature au doigt, swipe sur timeline, scroll naturel
- CTA flottant mobile toujours accessible
- Touch targets minimum 44×44px

### Browser Support

| Navigateur | Version minimum | Priorité |
|---|---|---|
| Chrome (mobile + desktop) | 2 dernières versions | Haute |
| Safari (iOS + macOS) | 2 dernières versions | Haute |
| Firefox | 2 dernières versions | Moyenne |
| Edge | 2 dernières versions | Moyenne |
| Samsung Internet | 2 dernières versions | Moyenne |

Pas de support IE11 ni navigateurs obsolètes.

### Real-Time Features

- **Supabase Realtime** pour le suivi de réparation : le client voit la timeline se mettre à jour en direct sans rafraîchir
- Channels par dossier client : seul le client concerné reçoit les mises à jour
- Événements temps réel : changement de statut, ajout photo, notification prêt
- Fallback : polling 30s si WebSocket indisponible
- Back-office : notifications temps réel des nouvelles demandes de devis

### Implementation Considerations

- **Supabase Auth** : authentification client (magic link email/SMS) + admin (email/password)
- **Supabase Storage** : photos client, devis PDF, factures — buckets séparés par dossier client
- **Supabase Database (PostgreSQL)** : schéma relationnel — clients, dossiers, devis, factures, réparations, pièces, villes, marques, modèles
- **Row Level Security (RLS)** : chaque client ne voit que ses propres données
- **Edge Functions Supabase** : génération PDF devis/facture, envoi SMS/WhatsApp, webhooks
- **Vercel** : déploiement auto depuis GitHub, preview branches, Edge Network global
- **RGPD** : consentement cookies, droit à l'effacement, données hébergées en EU (Supabase EU region)

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**Approche : MVP "Expérience Complète"**

Le tunnel entier est livré dès le jour 1 : site vitrine SEO → contact WhatsApp → lien devis vivant → signature → créneau → tracking → facturation. L'expérience client est irréprochable dès le lancement.

**Justification :** Le problème n°1 (client fantôme) ne se résout qu'avec un tunnel complet. Un MVP partiel laisserait le client décrocher à un autre point du parcours. L'innovation de DigiRepair EST l'expérience de bout en bout.

**Ressources :** Développeur solo (Favor) + stack moderne (Next.js/Vercel/Supabase) = viable grâce à l'automatisation Supabase (auth, storage, realtime, edge functions).

### MVP Feature Set (Phase 1)

**Parcours utilisateurs supportés :**
- ✅ Mehdi (jeune connecté) — tunnel complet
- ✅ Nathalie (famille hésitante) — tunnel + relance + logique fournisseur
- ✅ Favor (admin) — back-office complet
- ✅ Thomas (SEO) — pages SEO + blog + FAQ

**Must-Have :**

| Capability | Justification | Parcours |
|---|---|---|
| Site vitrine Apple-like (hero, services, comment ça marche, avis, footer) | Première impression = conversion | Tous |
| Pages SEO Couche 1 : catégorie × ville | Trafic large générique | Thomas, Mehdi |
| Pages SEO Couche 2 : marque × pièce × modèle × ville | Trafic spécifique longue traîne | Thomas, Mehdi |
| Blog + FAQ Schema.org (5-10 articles au lancement) | Position 0 + contenu de confiance | Thomas, Nathalie |
| CTA flottant mobile → WhatsApp | Point de contact principal | Mehdi, Nathalie |
| WhatsApp Business API automatisé | Notifications auto (devis, créneau, statut, prêt) | Tous clients |
| Lien devis vivant (prix, garantie, avis, FAQ anti-objection) | Tuer le client fantôme | Mehdi, Nathalie |
| Signature électronique sur devis | Conformité légale + engagement | Mehdi, Nathalie |
| Prise de créneau (logique fournisseur J+1/18h) | Fluidifier le dépôt | Mehdi, Nathalie |
| Timeline suivi réparation temps réel | Tracking Uber — différenciateur | Mehdi, Nathalie |
| Back-office : création devis rapide | Réduction admin | Favor |
| Back-office : dossier client auto-créé (7 modules) | Digital twin workflow | Favor |
| Facturation légale + livre de recettes auto | Conformité + gain de temps | Favor |
| Upload photos (dépôt + après réparation) | Preuve + transparence | Favor |
| Notifications push/SMS changement statut | Client informé en temps réel | Tous clients |
| Demande d'avis Google auto post-réparation | Croissance réputation | Mehdi |
| Relance anti-fantôme automatique J+1, J+3, J+7 | Rattraper les hésitants | Nathalie |
| Responsive mobile-first | 80%+ trafic mobile | Tous |
| Auth client (magic link) + admin (email/pwd) | Sécurité + accès | Tous |

### Phase 2 — Growth (M+3 à M+6)

- Upload photos client avant dépôt (diagnostic visuel à distance)
- Photos progression réparation (avant/pendant/après)
- Galerie avant/après interactive (slider)
- Programme parrainage client
- Upsell intelligent ("73% ajoutent aussi un verre trempé")
- Compteur social temps réel ("347 appareils réparés")
- Programme fidélité familles multi-appareils
- Carte interactive zone 40km
- Vidéos microsoudure intégrées
- A/B test lien devis vivant (optimisation conversion)

### Phase 3 — Vision (M+6 à M+12)

- Carnet d'entretien digital par appareil
- Suivi post-réparation automatique J+30
- Rapport d'intervention complet style médical
- Avis vérifiés par type de réparation
- PWA → App mobile native
- Multi-techniciens (préparation boutique physique)
- Gestion stocks pièces intégrée
- Intégration fournisseurs commande automatique
- Dashboard analytics avancé (revenus, conversion, SEO)

### Risk Mitigation Strategy

**Risques techniques :**

| Risque | Probabilité | Impact | Mitigation |
|---|---|---|---|
| Pages SEO thin content pénalisées par Google | Moyenne | Haute | Enrichir chaque page : FAQ unique, avis filtrés, contenu spécifique par modèle. ISR pour mise à jour |
| WhatsApp Business API complexe à intégrer | Faible | Moyenne | Provider tiers (Twilio/MessageBird) comme abstraction. Fallback : SMS classique |
| Signature électronique non conforme légalement | Faible | Haute | Valider avec un juriste. Fallback : envoi PDF par email avec acceptation par réponse |
| Performance dégradée avec milliers de pages SEO | Faible | Moyenne | SSG build-time + ISR. Edge caching Vercel. Pagination des builds si nécessaire |
| Favor n'adopte pas le back-office | Moyenne | Haute | Digital twin fidèle au workflow existant + onboarding progressif |

**Risques marché :**

| Risque | Probabilité | Impact | Mitigation |
|---|---|---|---|
| Le lien devis vivant ne convertit pas mieux que le SMS | Faible | Haute | A/B test dès les 20 premiers clients. Itérer sur le contenu du lien |
| SEO trop lent (> 1 mois pour top 3) | Moyenne | Moyenne | Google Search Console monitoring. Accélérer indexation via API. Google My Business optimisé |
| Clients pas à l'aise avec la signature digitale | Moyenne | Faible | Option simplifiée "J'accepte" en 1 clic. Message rassurant sur la page |
| Développeur solo = goulot d'étranglement | Moyenne | Haute | Stack maximisant l'automatisation (Supabase). Priorisation stricte MVP. Pas de feature creep |

## Functional Requirements

### Vitrine Publique & SEO

- **FR1:** Le visiteur peut consulter la page d'accueil présentant les services, le processus de réparation et les avis clients
- **FR2:** Le visiteur peut naviguer vers des pages dédiées par catégorie de réparation et par ville
- **FR3:** Le visiteur peut naviguer vers des pages spécifiques par marque, pièce, modèle et ville
- **FR4:** Le visiteur peut consulter une FAQ avec réponses aux objections courantes (frais supplémentaires, garantie, délais)
- **FR5:** Le visiteur peut lire des articles de blog sur l'entretien et le diagnostic d'appareils
- **FR6:** Le visiteur peut voir la page "À propos" avec le visage et l'identité du réparateur
- **FR7:** Le visiteur peut initier un contact via WhatsApp depuis un CTA flottant avec message pré-rempli
- **FR8:** Le visiteur peut consulter les avis Google clients directement sur le site
- **FR9:** Les moteurs de recherche peuvent indexer toutes les pages publiques avec métadonnées Schema.org (LocalBusiness, FAQ, Service, AggregateRating)
- **FR10:** Le système génère automatiquement les pages SEO à partir d'une base de données marques/modèles/pièces/villes

### Devis & Conversion

- **FR11:** Le client peut recevoir un lien devis vivant personnalisé (via WhatsApp/SMS/email)
- **FR12:** Le client peut consulter sur la page devis vivant : prix TTC final, décomposition prix, garantie, avis de réparations similaires et FAQ anti-objection
- **FR13:** Le client peut signer électroniquement le devis depuis son appareil mobile
- **FR14:** Le client peut choisir un créneau de dépôt disponible tenant compte de la disponibilité des pièces (stock → demain / commande avant 18h → J+2 / après 18h → J+3)
- **FR15:** Le client peut ajouter le créneau confirmé à son calendrier
- **FR16:** Le système envoie des relances automatiques aux clients n'ayant pas signé leur devis (J+1, J+3, J+7)

### Suivi de Réparation

- **FR17:** Le client peut consulter la timeline de suivi de sa réparation en temps réel (dépôt → diagnostic → réparation → tests → prêt)
- **FR18:** Le client reçoit des notifications automatiques (WhatsApp/SMS) à chaque changement de statut
- **FR19:** Le client peut voir les photos de son appareil (dépôt et après réparation) sur la timeline
- **FR20:** Le client peut s'authentifier via magic link (email ou SMS) pour accéder à son espace

### Back-Office — Gestion des Devis & Dossiers

- **FR21:** L'admin peut créer un devis en sélectionnant l'appareil, la panne et en renseignant le prix
- **FR22:** Le système génère automatiquement un devis légalement conforme (mentions obligatoires françaises)
- **FR23:** L'admin peut envoyer le lien devis vivant au client en un clic
- **FR24:** Le système crée automatiquement un dossier client complet à la signature du devis (infos client, devis signé, créneau, sections photos, notes techniques, pièces fournisseur)
- **FR25:** L'admin peut consulter et gérer tous les dossiers clients depuis un dashboard centralisé

### Back-Office — Suivi de Réparation

- **FR26:** L'admin peut mettre à jour le statut de réparation en un clic
- **FR27:** L'admin peut uploader des photos de l'appareil (avant et après réparation) depuis son téléphone
- **FR28:** L'admin peut ajouter des notes techniques et la liste des pièces utilisées au dossier
- **FR29:** L'admin reçoit des notifications temps réel des nouvelles demandes de devis

### Back-Office — Facturation & Comptabilité

- **FR30:** Le système génère automatiquement une facture légalement conforme à la récupération de l'appareil
- **FR31:** Le système alimente automatiquement le livre de recettes à chaque facturation
- **FR32:** L'admin peut consulter et exporter le livre de recettes
- **FR33:** L'admin peut associer les factures fournisseur (pièces commandées) au dossier client

### Notifications & Communication

- **FR34:** Le système envoie automatiquement les notifications via WhatsApp Business API (devis envoyé, créneau confirmé, changement statut, réparation prête)
- **FR35:** Le système envoie un rappel automatique la veille du créneau de dépôt
- **FR36:** Le système envoie une demande d'avis Google automatique après la réparation
- **FR37:** L'admin peut s'authentifier via email et mot de passe pour accéder au back-office

### Gestion des Données & Référentiel

- **FR38:** L'admin peut gérer le référentiel marques, modèles et pièces (ajout, modification)
- **FR39:** L'admin peut gérer la liste des villes couvertes dans le rayon de 40km
- **FR40:** Le système gère les créneaux disponibles en intégrant la contrainte fournisseur (cut-off 18h, délai livraison J+1)
- **FR41:** Chaque client ne peut accéder qu'à ses propres données (isolation des données)

## Non-Functional Requirements

### Performance

- **NFR1:** Pages publiques : chargement < 2s sur connexion 4G mobile
- **NFR2:** Largest Contentful Paint (LCP) < 2.0s sur toutes les pages publiques
- **NFR3:** Cumulative Layout Shift (CLS) < 0.1 sur toutes les pages
- **NFR4:** Score Lighthouse Performance > 90 sur mobile et desktop
- **NFR5:** Page devis vivant : chargement < 1.5s (critique pour la conversion)
- **NFR6:** Mises à jour temps réel reflétées sur la timeline client en < 3s
- **NFR7:** Back-office : réponse aux actions admin < 1s
- **NFR8:** Pages SEO générées (milliers) : mêmes performances que les pages statiques
- **NFR9:** Score Lighthouse "Image Optimization" > 95 sur toutes les pages publiques
- **NFR10:** Chargement des polices ne contribue pas à un CLS > 0.02 et ne bloque pas le rendu initial
- **NFR11:** Bundle size pages publiques < 150KB gzip

### Sécurité

- **NFR12:** Communications chiffrées en transit (HTTPS/TLS 1.3)
- **NFR13:** Données clients chiffrées au repos dans le backend (AES-256 minimum)
- **NFR14:** Auth client : magic links avec expiration (pas de mots de passe stockés côté client)
- **NFR15:** Auth admin : email/mot de passe avec hachage sécurisé conforme aux standards actuels (coût computationnel >= 10ms)
- **NFR16:** Row-level security : aucun client ne peut accéder aux données d'un autre client (isolation vérifiable par tests automatisés)
- **NFR17:** Liens devis vivants signés avec token unique non devinable (UUID v4 minimum)
- **NFR18:** Photos clients dans un stockage sécurisé avec accès restreint par politique d'autorisation (chaque client n'accède qu'à ses propres fichiers)
- **NFR19:** Conformité RGPD : consentement explicite, droit à l'effacement, export des données sur demande
- **NFR20:** Devis et factures signés conservés de manière non modifiable (audit trail)

### Scalabilité

- **NFR21:** Supporte 5 000+ pages SEO sans dégradation de performance
- **NFR22:** Supporte 50 dossiers clients actifs simultanés
- **NFR23:** Build SSG des pages SEO < 10 minutes (ISR pour mises à jour incrémentales)
- **NFR24:** Ajout de nouvelles marques/modèles/villes sans modification de code
- **NFR25:** Montée en charge de 3 réparations/semaine à 25/semaine sans changement d'infrastructure

### Accessibilité

- **NFR26:** Conformité RGAA niveau minimum (équivalent WCAG 2.1 A)
- **NFR27:** Ratio de contraste minimum 4.5:1 pour tout le texte sur les couleurs de marque
- **NFR28:** Navigation clavier fonctionnelle sur tous les formulaires
- **NFR29:** Tous les éléments interactifs ont un état focus visible
- **NFR30:** Score Lighthouse Accessibility > 90 et 0 erreur critique dans l'audit automatisé

### Intégration

- **NFR31:** WhatsApp Business API : messages envoyés en < 30s après le déclencheur
- **NFR32:** Fallback automatique SMS en cas d'échec WhatsApp
- **NFR33:** Métadonnées Schema.org validées sans erreur par Google Rich Results Test
- **NFR34:** Sitemap XML régénéré automatiquement lors de l'ajout de nouvelles pages SEO
- **NFR35:** Ajout au calendrier : support iCal (.ics) pour Google Calendar, Apple Calendar et Outlook

### Fiabilité

- **NFR36:** Uptime site public : 99.9% (< 8.7h d'indisponibilité/an)
- **NFR37:** Liens devis vivants fonctionnels pendant 30 jours minimum après génération
- **NFR38:** Fallback polling 30s si le canal temps réel est indisponible
- **NFR39:** Notifications (WhatsApp/SMS) : retry en cas d'échec (3 tentatives, backoff exponentiel)
- **NFR40:** Données facturation et livre de recettes : backup quotidien automatique
