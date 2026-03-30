# Multitenancy

## Cel
Celem jest bezpieczne i skalowalne odseparowanie danych klientów (tenantów) przy zachowaniu prostoty operacyjnej i możliwości dalszej ewolucji architektury.

## Wybrana strategia tenantów
**Wybór: single database + `tenant_id` + Row-Level Security (RLS).**

### Dlaczego ten wariant
1. **Prostsze operacje i utrzymanie**
   - Jeden klaster DB, jeden pipeline migracji, jeden backup policy.
2. **Niższy koszt i krótszy time-to-market**
   - Brak konieczności zarządzania tysiącami schematów.
3. **Silna izolacja logiczna dzięki RLS**
   - Wymuszenie filtracji po `tenant_id` na poziomie bazy, a nie tylko aplikacji.
4. **Łatwa obserwowalność i analityka cross-tenant**
   - Możliwość agregacji metryk w jednym modelu danych.

### Kiedy rozważyć schema-per-tenant
Rozszerzenie do schema-per-tenant może być wprowadzone później dla tenantów enterprise z wymaganiem izolacji administracyjnej (np. dedykowane backup/restore lub per-tenant maintenance windows).

## Zasady izolacji danych
1. **Każda tabela domenowa zawiera `tenant_id`** (poza tabelami globalnymi, np. planami billingowymi).
2. **RLS włączone (`ENABLE ROW LEVEL SECURITY`) dla tabel tenantowych.**
3. **Polityki RLS oparte o kontekst sesji**:
   - `SET app.tenant_id = '<uuid>'`
   - polityki: `USING (tenant_id = current_setting('app.tenant_id')::uuid)`
4. **Brak bypassu RLS przez role aplikacyjne** (role bez `BYPASSRLS`).
5. **Wymuszony filtr tenantowy także w warstwie API/ORM** (defense in depth).

## Kontekst wykonania i propagacja tenant_id
- **Web App**: tenant wybierany z kontekstu organizacji użytkownika.
- **API**: middleware waliduje token, mapuje `organization_id -> tenant_id`, ustawia kontekst połączenia DB.
- **Worker/Scheduler**: każde zadanie zawiera `tenant_id` w payload i jest wykonywane w izolowanym kontekście sesji DB.
- **Webhooki**: endpoint mapuje webhook key → workflow/tenant i dalej propaguje `tenant_id`.

## Klucze, indeksy i partycjonowanie
1. **Primary keys**: `id` (UUID/ULID).
2. **Unikalność w obrębie tenanta**: indeksy złożone, np. `(tenant_id, project_slug)`.
3. **Indeksy operacyjne**: `(tenant_id, status, created_at)` dla `runs`.
4. **Opcjonalne partycjonowanie**:
   - Tabela `runs` partycjonowana po czasie (`created_at`) + indeksy lokalne z `tenant_id`.

## Bezpieczeństwo i sekrety
- `credentials` szyfrowane per tenant (envelope encryption, DEK per tenant, KEK w KMS).
- Audit log obejmuje dostęp do sekretów i operacje uprzywilejowane.
- Polityki least privilege dla ról serwisowych.

## Migracje i lifecycle tenantów
1. **Provisioning**
   - Utworzenie `organization` + domyślnych ról + limitów planu.
2. **Migracje schematu**
   - Jedna migracja dla wszystkich tenantów; preflight testy RLS.
3. **Offboarding**
   - Soft-delete + okres retencji + finalne hard-delete/anonymizacja.

## SLA i noisy neighbor
- Limity per tenant: concurrency, webhook TPS, job queue depth.
- W workerach: fair scheduling (weighted round-robin po tenantach).
- Billing może dynamicznie sterować quota/limitem burst.

## Ryzyka i mitigacje
1. **Ryzyko błędnej polityki RLS**
   - Mitigacja: testy integracyjne “cross-tenant leakage”, lint migracji.
2. **Ryzyko hot-tenant**
   - Mitigacja: throttling, dedykowane kolejki, priorytety.
3. **Ryzyko błędnej propagacji `tenant_id` w async**
   - Mitigacja: `tenant_id` jako wymagane pole kontraktu eventu.
