# Specyfikacja panelu administracyjnego (multi-tenant)

## Cel
Przygotowanie kompletnego zakresu funkcjonalnego dla 3 poziomów administracji:
- **Super-admin** (globalny operator platformy),
- **Tenant admin** (administrator organizacji),
- **Security/Compliance views** (obszary bezpieczeństwa i RODO).

---

## 1) Super-admin

### 1.1 Zarządzanie tenantami
- Lista tenantów z filtrowaniem (status, plan, region, data utworzenia, owner).
- Akcje: utworzenie, edycja, zawieszenie, reaktywacja, soft-delete.
- Podgląd metryk per tenant: aktywni użytkownicy, użycie automatyzacji, API usage, storage.
- Historia zmian konfiguracyjnych tenanta (audit trail).

### 1.2 Zarządzanie planami i limitami
- Definicje planów (np. Free, Pro, Enterprise) z przypisanymi limitami:
  - liczba użytkowników,
  - liczba workflow,
  - liczba requestów API / m-c,
  - limity storage i retencji logów,
  - dostępność wybranych funkcji premium.
- Nadpisania limitów dla pojedynczego tenanta (override z datą ważności).
- Alerty przekroczeń limitów (progi: 80%, 100%, 120%).

### 1.3 Support impersonation (audytowane)
- Impersonacja tylko dla ról z uprawnieniem `support:impersonate`.
- Wymagane uzasadnienie biznesowe (pole obowiązkowe).
- Opcjonalny approval flow (4-eyes) dla tenantów klasy Enterprise.
- Twarde ograniczenia bezpieczeństwa:
  - brak dostępu do sekretów wprost,
  - maskowanie danych wrażliwych,
  - limit czasu sesji impersonacji.
- Audyt:
  - kto, kiedy, kogo impersonował,
  - powód, zakres akcji, adres IP/UA,
  - pełna ścieżka działań podczas sesji.

---

## 2) Tenant admin

### 2.1 Użytkownicy i role
- CRUD użytkowników (zaproszenia e-mail, dezaktywacja, reset MFA).
- RBAC z rolami systemowymi + rolami niestandardowymi.
- Przypisanie ról do workspace i zasobów (uprawnienia granularne).
- Raport uprawnień efektywnych (kto ma dostęp do czego).

### 2.2 Workspace settings
- Ustawienia organizacyjne:
  - nazwa, branding, strefa czasowa,
  - polityki haseł i MFA,
  - SSO/SAML/OIDC,
  - polityki dostępu IP allowlist.
- Ustawienia workflow execution:
  - concurrency,
  - retry policy,
  - timeouty,
  - limity webhook throughput.

### 2.3 API keys
- Tworzenie kluczy API z zakresem uprawnień (scopes).
- Ograniczenia: IP, data wygaśnięcia, rate limit na klucz.
- Rotacja kluczy (manualna i wymuszana polityką).
- Jednorazowy podgląd secret + bezpieczne odwołanie (revoke).

### 2.4 Webhook endpoints
- Rejestr endpointów z przypisaniem do workflow.
- Podpisywanie webhooków (HMAC), secret rotation.
- Retry i DLQ (dead letter queue) dla niedostarczonych eventów.
- Dziennik dostarczeń: status, latency, kody błędów.

---

## 3) Feature flags, maintenance mode, announcement banners

### 3.1 Feature flags
- Flagi globalne, per tenant, per workspace, per user segment.
- Warunki rolloutu (procent, region, plan, data).
- Tryb kill-switch dla krytycznych funkcji.
- Historia zmian flag (kto/co/kiedy) + rollback jednym kliknięciem.

### 3.2 Maintenance mode
- Poziomy:
  - globalny maintenance,
  - maintenance per tenant,
  - maintenance per moduł.
- Harmonogram okien serwisowych (start/stop, timezone-aware).
- Bypass dla ról administracyjnych i monitoringu.
- Komunikat dla użytkownika z ETA przywrócenia.

### 3.3 Announcement banners
- Bannery globalne/tenantowe (informacyjne, ostrzeżenia, krytyczne).
- Targetowanie po roli, locale, planie, segmencie użytkownika.
- Czas publikacji i automatyczne wygaszenie.
- A/B treści komunikatu + metryki CTR.

---

## 4) Widoki bezpieczeństwa

### 4.1 Aktywne sesje
- Lista aktywnych sesji użytkownika i administracyjnych.
- Metadane: IP, lokalizacja przybliżona, device fingerprint, ostatnia aktywność.
- Możliwość unieważnienia pojedynczej sesji lub wszystkich naraz.

### 4.2 Logi logowań
- Historia logowań (sukces/porażka, metoda auth, MFA status).
- Filtrowanie i eksport (CSV/JSON) dla zespołu bezpieczeństwa.
- Korelacja zdarzeń (np. wzrost błędów logowania + resety haseł).

### 4.3 Anomalie
- Detekcja anomalii behawioralnych:
  - niestandardowe godziny logowania,
  - niemożliwe podróże (impossible travel),
  - nietypowe wolumeny API,
  - eskalacje uprawnień.
- Risk scoring sesji/użytkownika/tenanta.
- Playbook reakcji: blokada sesji, wymuszenie MFA, alert SOC.

---

## 5) Eksport danych i polityki retencji (RODO)

### 5.1 Eksport danych
- Eksport danych tenantowych i użytkownika końcowego w formacie:
  - JSON (pełny eksport systemowy),
  - CSV (raportowy),
  - opcjonalnie ZIP z checksum.
- Zakres eksportu konfigurowalny (users, workflows, executions, audit logs).
- Async export jobs + powiadomienia o gotowości.

### 5.2 Retencja
- Konfigurowalne polityki retencji per typ danych:
  - logi bezpieczeństwa,
  - logi wykonania,
  - backupy,
  - artefakty workflow.
- Polityki domyślne zgodne z RODO i planem taryfowym.
- Mechanizm legal hold (wstrzymanie usuwania danych na czas postępowania).

### 5.3 RODO / GDPR ops
- Obsługa żądań podmiotu danych (DSAR):
  - dostęp do danych,
  - sprostowanie,
  - usunięcie,
  - ograniczenie przetwarzania.
- Rejestrowanie podstawy prawnej i celu przetwarzania.
- Pseudonimizacja/anonymizacja danych po upływie retencji.
- Evidencja operacji na danych (audyt zgodności).

---

## Model uprawnień (propozycja)

- **Super-admin**: pełny dostęp globalny + zarządzanie tenant lifecycle.
- **Support-agent**: ograniczony dostęp operacyjny + impersonacja tylko z audytem.
- **Tenant-admin**: zarządzanie zasobami i bezpieczeństwem w obrębie tenanta.
- **Security-analyst**: tylko odczyt widoków bezpieczeństwa + akcje reakcyjne.
- **Compliance-officer**: dostęp do eksportów, retencji i DSAR.

---

## KPI / metryki sukcesu

- Skrócenie czasu obsługi incydentów supportowych (MTTR).
- Spadek liczby naruszeń polityk bezpieczeństwa.
- Skrócenie czasu realizacji DSAR.
- Wzrost adopcji funkcji premium przez kontrolowany rollout flag.

---

## Minimalne API (przykładowe zasoby)

- `/admin/tenants`
- `/admin/plans`
- `/admin/feature-flags`
- `/admin/maintenance`
- `/admin/announcements`
- `/tenant/users`
- `/tenant/roles`
- `/tenant/api-keys`
- `/tenant/webhooks`
- `/security/sessions`
- `/security/logins`
- `/security/anomalies`
- `/compliance/exports`
- `/compliance/retention-policies`
- `/compliance/dsar-requests`

Dokument stanowi bazę do przygotowania backlogu (epiki → user stories → kryteria akceptacji).
