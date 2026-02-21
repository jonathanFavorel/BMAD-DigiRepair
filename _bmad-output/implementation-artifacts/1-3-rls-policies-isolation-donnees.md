# Story 1.3: RLS Policies & Isolation données

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a **développeur**,
I want **configurer les Row Level Security policies complètes sur toutes les tables existantes**,
So that **chaque client ne peut accéder qu'à ses propres données et l'admin voit tout (FR41, NFR16)**.

## Acceptance Criteria

1. **Given** les tables `clients` et `admin_users` créées (Story 1.2), **When** je complète les RLS policies CRUD, **Then** un client authentifié ne voit/modifie que son propre row dans `clients`
2. **Given** les RLS policies en place, **When** un admin authentifié accède aux données, **Then** l'admin voit toutes les entrées de `clients` et `admin_users`
3. **Given** les RLS policies en place, **When** un utilisateur non-admin tente d'accéder à `admin_users`, **Then** l'accès est refusé (0 rows retournés)
4. **Given** les RLS policies en place, **When** un utilisateur anonyme (non authentifié) tente d'accéder aux tables, **Then** aucune donnée n'est retournée
5. **Given** les policies testables, **When** je lance les tests d'isolation, **Then** un test automatisé vérifie l'isolation des données entre deux clients distincts (NFR16)
6. **Given** les futures tables (`repair_cases`, `quotes`, `invoices`, `referentiel_*`), **When** elles seront créées dans les prochains epics, **Then** le pattern RLS documenté et les helpers de test sont réutilisables

## Tasks / Subtasks

- [x] **Task 1 : Compléter les RLS policies sur `clients`** (AC: #1, #2, #4)
  - [x]1.1 Créer migration `supabase/migrations/20260220100003_rls_policies_complete.sql`
  - [x]1.2 Remplacer les policies temporaires de Story 1.2 par des policies CRUD complètes :
    - `select_clients_own` : client voit son propre row (`auth.uid() = id`) — EXISTE DÉJÀ
    - `update_clients_own` : client modifie son propre row (`auth.uid() = id`) — EXISTE DÉJÀ
    - `select_clients_admin` : admin voit tous les clients — EXISTE DÉJÀ (déplacé en migration 001)
    - `update_clients_admin` : admin peut modifier tout client — NOUVEAU
    - `delete_clients_admin` : admin peut supprimer un client — NOUVEAU
  - [x]1.3 Vérifier qu'aucune policy INSERT n'est nécessaire sur `clients` (le trigger `handle_new_user` utilise `SECURITY DEFINER`)
  - [x]1.4 Bloquer tout accès anonyme (pas de policy sans `auth.uid()`)

- [x] **Task 2 : Compléter les RLS policies sur `admin_users`** (AC: #2, #3, #4)
  - [x]2.1 Dans la même migration, ajouter les policies complètes :
    - `select_admin_users_admin` : admin voit les admin_users — EXISTE DÉJÀ
    - `insert_admin_users_admin` : admin peut ajouter un admin — NOUVEAU
    - `update_admin_users_admin` : admin peut modifier un admin — NOUVEAU
    - `delete_admin_users_admin` : admin peut supprimer un admin — NOUVEAU
  - [x]2.2 Vérifier que les non-admins ne voient rien dans `admin_users` (0 rows)

- [x] **Task 3 : Créer les helpers de test RLS** (AC: #5, #6)
  - [x]3.1 Créer `lib/supabase/__tests__/rls-test-helpers.ts` avec fonctions utilitaires :
    - `createTestSupabaseClient(userId)` : simule un client Supabase avec un JWT pour un userId donné
    - Pattern pour vérifier SELECT/INSERT/UPDATE/DELETE par rôle
  - [x]3.2 Documenter le pattern pour que les futures stories puissent réutiliser les helpers

- [x] **Task 4 : Écrire les tests d'isolation RLS** (AC: #1, #2, #3, #4, #5)
  - [x]4.1 Créer `lib/supabase/__tests__/rls-isolation.test.ts` avec les tests :
    - Test 1 : Un client ne peut SELECT que son propre row dans `clients`
    - Test 2 : Un client ne peut UPDATE que son propre row
    - Test 3 : Un client ne peut pas voir les données d'un autre client
    - Test 4 : Un non-admin ne peut pas voir `admin_users`
    - Test 5 : Un admin peut voir tous les `clients`
    - Test 6 : Un utilisateur anonyme ne voit rien
  - [x]4.2 Les tests peuvent être des tests unitaires avec mock OU des tests d'intégration si Supabase est lié
  - [x]4.3 Pour le MVP sans connexion Supabase active, créer des tests qui vérifient la LOGIQUE des policies (pattern SQL assertions)

- [x] **Task 5 : Documenter le pattern RLS pour les futures tables** (AC: #6)
  - [x]5.1 Ajouter dans les Dev Notes de cette story le pattern RLS standard à suivre pour chaque nouvelle table
  - [x]5.2 Documenter les Data Boundaries de l'architecture :
    - `referentiel_*` → SELECT public (anon + auth), CRUD admin
    - `repair_cases` → SELECT/UPDATE par `client_id` pour client, CRUD admin
    - `quotes` → SELECT par token UUID (anon), CRUD admin
    - `invoices` → SELECT/INSERT admin, pas de UPDATE/DELETE (immuable)
    - `blog_articles` → SELECT si `published = true` (anon), CRUD admin

- [x] **Task 6 : Vérification finale** (AC: all)
  - [x]6.1 `npm run build` — vérifier que le build passe
  - [x]6.2 `npm run lint` — 0 erreurs
  - [x]6.3 `npm run test:run` — tous les tests passent (anciens + nouveaux)
  - [x]6.4 Vérifier que la migration SQL est syntaxiquement correcte

## Dev Notes

### Architecture Critique — RLS Pattern DigiRepair

**Conventions RLS (architecture.md) :**
- Naming : `{action}_{table}_{role}` — ex: `select_repair_cases_client`, `update_repair_cases_admin`
- Actions SQL : SELECT, INSERT, UPDATE, DELETE
- Rôles : `own` (client voit son row), `client` (client voit via foreign key), `admin` (admin voit tout), `public` (tout le monde), `anon` (anonyme)
- RLS activé sur TOUTES les tables sans exception
- Pattern admin : `auth.uid() IN (SELECT id FROM public.admin_users)`

**Data Boundaries (architecture.md#Data Boundaries) :**

| Table | Accès client | Accès admin | Accès anon | Cache |
|-------|-------------|-------------|------------|-------|
| `clients` | Son propre row (id = auth.uid()) | Tous | Aucun | — |
| `admin_users` | Aucun | Tous | Aucun | — |
| `referentiel_*` | Lecture | CRUD | Lecture | ISR 24h |
| `repair_cases` | Par `client_id` | Tous | Aucun | Temps réel |
| `quotes` | Via token UUID (anon) | Tous | Via token | — |
| `invoices` | Aucun (admin envoie PDF) | SELECT + INSERT (immuable) | Aucun | — |
| `blog_articles` | `published = true` | Tous | `published = true` | ISR 1h |

**IMPORTANT — Tables actuellement existantes :**
Seules `clients` et `admin_users` existent (Story 1.2). Les autres tables seront créées dans les Epics 2-7. Cette story établit :
1. Les RLS policies complètes sur les 2 tables existantes
2. Le pattern et les helpers de test réutilisables pour les futures tables

**Pattern SQL pour vérifier si l'utilisateur est admin :**
```sql
auth.uid() IN (SELECT id FROM public.admin_users)
```
Ce pattern est utilisé dans toutes les policies admin. Il repose sur le fait que `admin_users` a lui-même une RLS qui ne laisse les admins voir que leur propre table — mais `SECURITY DEFINER` n'est PAS nécessaire ici car la sous-requête s'exécute dans le contexte RLS.

**ATTENTION — Le subquery admin dans les policies :**
Le subquery `SELECT id FROM admin_users` fonctionne car la policy `select_admin_users_admin` autorise un admin à lire sa propre table. Pour un non-admin, le subquery retourne 0 rows → la condition est `false` → accès refusé. C'est le comportement souhaité.

**Trigger `handle_new_user` — SECURITY DEFINER :**
Le trigger utilise `SECURITY DEFINER` et peut INSERT dans `clients` même avec RLS activé. Aucune policy INSERT n'est nécessaire pour l'auto-création du profil client.

### Tech Intelligence

**Supabase RLS — Points critiques :**
- RLS s'applique à TOUTES les opérations (SELECT, INSERT, UPDATE, DELETE)
- Sans policy, la table est INACCESSIBLE (c'est le comportement par défaut quand RLS est activé)
- `SECURITY DEFINER` sur les fonctions/triggers bypasse le RLS — c'est intentionnel pour `handle_new_user`
- Les policies sont évaluées avec OR : si UNE policy autorise, l'accès est accordé
- Pour les tests : on peut utiliser `supabase.auth.admin.createUser()` côté serveur pour créer des utilisateurs de test
- En absence de connexion Supabase réelle, les tests doivent vérifier la logique SQL statiquement

**Pattern de test RLS recommandé :**
1. Tests SQL statiques : vérifier que chaque table a les bonnes policies
2. Tests mock : simuler les appels Supabase avec mock pour vérifier la logique
3. Tests intégration (si Supabase lié) : créer 2 users, vérifier l'isolation

### Anti-Patterns (INTERDITS)

| Interdit | Correct |
|----------|---------|
| `USING (true)` sur une table sensible | `USING (auth.uid() = id)` ou condition spécifique |
| Policy sans `auth.uid()` sauf referentiel | Toujours vérifier l'authentification |
| Désactiver RLS pour "tester" | Garder RLS activé, utiliser `SECURITY DEFINER` si besoin |
| Vérifier le rôle admin via JWT custom claims uniquement | Toujours cross-check avec la table `admin_users` |
| Policy INSERT sur `clients` (trigger fait le job) | Laisser le trigger `handle_new_user` gérer |

### Conventions de nommage RLS

| Action | Table | Rôle | Exemple policy name |
|--------|-------|------|-------------------|
| SELECT | clients | own | `select_clients_own` |
| UPDATE | clients | own | `update_clients_own` |
| SELECT | clients | admin | `select_clients_admin` |
| UPDATE | clients | admin | `update_clients_admin` |
| DELETE | clients | admin | `delete_clients_admin` |
| SELECT | admin_users | admin | `select_admin_users_admin` |
| INSERT | admin_users | admin | `insert_admin_users_admin` |
| UPDATE | admin_users | admin | `update_admin_users_admin` |
| DELETE | admin_users | admin | `delete_admin_users_admin` |

### Project Structure Notes

**Fichiers à créer/modifier dans cette story :**
```
digirepair/
├── supabase/
│   └── migrations/
│       └── 20260220100003_rls_policies_complete.sql   ← NOUVEAU
├── lib/
│   └── supabase/
│       └── __tests__/
│           ├── rls-test-helpers.ts                     ← NOUVEAU
│           └── rls-isolation.test.ts                   ← NOUVEAU
```

**Fichiers existants à NE PAS modifier :**
- `supabase/migrations/20260220100000_create_clients.sql` — policies existantes restent (sauf si DROP+RECREATE dans nouvelle migration)
- `supabase/migrations/20260220100001_create_admin_users.sql` — idem
- `supabase/migrations/20260220100002_create_client_trigger.sql` — trigger intact
- Tout le code applicatif (proxy.ts, actions, composants) — pas de changement

### Previous Story Intelligence (1.2)

**Learnings critiques :**
- Les policies RLS de Story 1.2 étaient "temporaires" — cette story les complète
- Le code review de Story 1.2 a identifié H1 : migration ordering. La policy `select_clients_admin` a été déplacée de migration 000 vers 001 (après que `admin_users` existe). Toute nouvelle policy référençant `admin_users` doit être dans une migration APRÈS la 001.
- Pattern `isAdmin` helper dans `lib/supabase/helpers.ts` utilise le même subquery que les policies RLS
- Zod `.issues` (pas `.errors`) — pas pertinent pour cette story SQL-focused
- Next.js 16 avec proxy.ts — pas de changement nécessaire pour RLS
- Tests Vitest 4.0.18 avec jsdom — les nouveaux tests RLS suivent le même pattern

**Fichiers créés en Story 1.2 à ne pas casser :**
- 3 migrations SQL (000, 001, 002)
- auth.actions.ts, login-form.tsx, magic-link page
- proxy.ts avec logique de routage
- helpers.ts avec isAdmin
- 12 tests existants (7 Zod + 2 isAdmin + 3 ActionResult)

### References

- [Source: architecture.md#Authentication & Security] — RLS par dossier/client
- [Source: architecture.md#Data Boundaries] — Matrice accès par table/rôle
- [Source: architecture.md#Naming Patterns] — Convention `{action}_{table}_{role}`
- [Source: architecture.md#Project Structure] — `007_rls_policies.sql` (adaptable au naming Supabase CLI)
- [Source: epics.md#Story 1.3] — ACs originaux
- [Source: prd.md#FR41] — Chaque client ne peut accéder qu'à ses propres données
- [Source: prd.md#NFR16] — Row-level security : isolation vérifiable par tests automatisés

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

- Build OK: Next.js 16.1.6 (Turbopack), 16 pages
- Lint OK: 0 erreurs
- Tests OK: Vitest 4.0.18, 28/28 tests passés (16 RLS isolation + 7 Zod + 2 isAdmin + 3 ActionResult)

### Completion Notes List

- Migration `20260220100003_rls_policies_complete.sql` créée avec 5 nouvelles policies (update_clients_admin, delete_clients_admin, insert_admin_users_admin, update_admin_users_admin, delete_admin_users_admin)
- Helpers de test RLS réutilisables créés dans `__tests__/rls-test-helpers.ts` avec pattern `createMockTable<T>()` + policy sets pré-définis pour clients et admin_users
- 16 tests d'isolation RLS couvrant : SELECT own, isolation entre clients, UPDATE/DELETE restrictions, admin full access, anonymous blocked — pour les deux tables
- Pattern RLS documenté dans les Dev Notes avec Data Boundaries pour 7 tables futures
- HALTED sur : `supabase db push` (nécessite `supabase link` par l'utilisateur)

### Change Log

- 2026-02-21: Story implementation — 6/6 tasks completed. Build/Lint/Tests OK. Pending: supabase db push.

### File List

**Nouveaux fichiers :**
- `digirepair/supabase/migrations/20260220100003_rls_policies_complete.sql` — Policies CRUD complètes clients + admin_users
- `digirepair/lib/supabase/rls-test-helpers.ts` — Helpers de test RLS réutilisables (co-localisé)
- `digirepair/lib/supabase/rls-isolation.test.ts` — 16 tests d'isolation RLS (co-localisé)
