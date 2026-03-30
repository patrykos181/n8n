# Roadmap produktu

## 1. ICP (Ideal Customer Profile)

### Segmenty docelowe
- **Małe i średnie firmy usługowe (10–250 pracowników)**
  - Branże: księgowość, doradztwo, HR, kancelarie, firmy serwisowe, edukacja i szkolenia.
  - Potrzeba: automatyzacja powtarzalnych procesów operacyjnych i komunikacji z klientami.
- **E-commerce (D2C i B2B, 5–200 osób w zespole)**
  - Sklepy online o rosnącej liczbie zamówień i kanałów sprzedaży.
  - Potrzeba: automatyzacja obsługi zamówień, leadów, wsparcia klienta i raportowania.
- **Agencje (marketingowe, software house, kreatywne, rekrutacyjne)**
  - Praca projektowa z wieloma klientami i narzędziami.
  - Potrzeba: standaryzacja onboardingów klientów, automatyzacja handoverów i raportów.

### Wspólne cechy ICP
- Używają minimum 5 narzędzi SaaS i mają problem z „ręcznym” przenoszeniem danych.
- Mają ograniczone zasoby techniczne (brak dedykowanego zespołu automatyzacji).
- Decydenci: właściciel, COO, Head of Operations, Head of Growth, Account Director.
- Główne kryteria zakupu: szybki time-to-value, niski koszt wdrożenia, bezpieczeństwo danych, mierzalny ROI.

---

## 2. Trzy główne use-case’y automatyzacji

### Use-case 1: Lead routing i kwalifikacja
**Cel:** skrócenie czasu reakcji na nowe leady i zwiększenie konwersji sprzedażowej.

**Przepływ (high-level):**
1. Lead wpada z formularza / CRM / kampanii.
2. Automatyczna walidacja i enrichment (np. branża, wielkość firmy, źródło).
3. Przypisanie leada do odpowiedniego handlowca wg reguł (region, segment, obciążenie).
4. Utworzenie zadania i powiadomień (Slack/e-mail/CRM).
5. Aktualizacja statusu i logowanie SLA pierwszego kontaktu.

**Wartość biznesowa:**
- Krótszy „first response time”.
- Mniej utraconych leadów.
- Większa przewidywalność pipeline’u.

### Use-case 2: Onboarding klienta
**Cel:** przyspieszenie i ustandaryzowanie startu współpracy.

**Przepływ (high-level):**
1. Zmiana statusu „Won” w CRM uruchamia workflow.
2. Tworzy się projekt/board/taski onboardingowe.
3. Automatycznie wysyłane są dokumenty i checklisty kickoff.
4. Zakładane są konta dostępu oraz harmonogram spotkań.
5. Status onboardingowy raportowany do zespołu delivery.

**Wartość biznesowa:**
- Szybszy time-to-first-value dla klienta.
- Mniej błędów operacyjnych i pominiętych kroków.
- Lepsze doświadczenie klienta od pierwszego dnia.

### Use-case 3: Raportowanie operacyjne i zarządcze
**Cel:** ograniczenie ręcznego przygotowywania raportów i poprawa jakości decyzji.

**Przepływ (high-level):**
1. Cykliczne pobieranie danych z kluczowych systemów (CRM, e-commerce, helpdesk).
2. Agregacja i normalizacja metryk.
3. Generowanie dashboardu/raportu okresowego (dzienny/tygodniowy/miesięczny).
4. Dystrybucja do właścicieli metryk (e-mail/Slack/BI).
5. Alertowanie przy odchyleniach KPI.

**Wartość biznesowa:**
- Oszczędność czasu zespołów operacyjnych.
- Jedno źródło prawdy dla KPI.
- Szybsze wykrywanie problemów i trendów.

---

## 3. Zakres MVP + out-of-scope

## MVP (minimum funkcji do sprzedaży)
1. **Builder workflow (podstawowy)**
   - Tworzenie sekwencji trigger → akcja → warunek.
   - Minimum 20 gotowych integracji kluczowych dla ICP.
2. **Biblioteka szablonów use-case**
   - Gotowe szablony dla lead routing, onboarding, raportowanie.
3. **Podstawowe zarządzanie danymi i mapowaniem pól**
   - Mapowanie wejścia/wyjścia, transformacje bazowe, walidacje.
4. **Monitoring i logi uruchomień**
   - Historia wykonania, statusy błędów, retry manualny.
5. **Role i dostęp (RBAC-lite)**
   - Co najmniej role: admin + operator.
6. **Onboarding produktu**
   - Checklista startowa, 3 interaktywne guided flows.
7. **Plan billingowy „starter” i podstawowe limity użycia**
   - Miesięczny limit uruchomień, alert przy przekroczeniu.

## Out-of-scope (poza MVP)
- Zaawansowane orkiestracje wieloetapowe z pętlami i custom code execution.
- Enterprise SSO/SAML, SCIM, rozbudowany audyt compliance.
- Marketplace partnerów i publiczne API v2.
- Zaawansowane AI-agenty i rekomendacje workflowów w czasie rzeczywistym.
- White-label i multi-workspace billing hierarchy.

---

## 4. Mierniki sukcesu

## North-star i KPI operacyjne
- **Aktywacje (Activation Rate)**
  - Definicja: odsetek nowych kont, które w ciągu 7 dni utworzą i poprawnie uruchomią min. 1 workflow produkcyjny.
  - Cel na 2 kwartały: **≥ 45%**.
- **Retencja 30-dniowa (Logo Retention D30)**
  - Definicja: odsetek kont aktywnych po 30 dniach od aktywacji.
  - Cel na 2 kwartały: **≥ 70%**.
- **ARPA (Average Revenue Per Account)**
  - Definicja: średni miesięczny przychód na aktywne konto płacące.
  - Cel na 2 kwartały: **wzrost o 20%** względem baseline.
- **Churn (logo / revenue)**
  - Definicja: miesięczny odpływ klientów i MRR.
  - Cel na 2 kwartały: **logo churn < 4% / miesiąc**, **revenue churn < 3% / miesiąc**.

## Mierniki pomocnicze
- Median time-to-first-workflow.
- Odsetek workflowów zakończonych sukcesem (success run rate).
- Średnia liczba aktywnych workflowów na konto po 30 dniach.
- Udział kont korzystających z min. 2 use-case’ów.

---

## 5. Backlog V1/V2 z priorytetyzacją RICE

> Skala RICE: Reach (miesięcznie), Impact (0.25–3), Confidence (0–100%), Effort (osobo-miesiące)  
> **Score = (Reach × Impact × Confidence) / Effort**

## V1 (0–6 miesięcy)

| Inicjatywa | Reach | Impact | Confidence | Effort | RICE Score | Priorytet |
|---|---:|---:|---:|---:|---:|---|
| Szablony: Lead Routing (CRM + formularze) | 400 | 3.0 | 0.85 | 2 | 510 | P0 |
| Onboarding klienta: paczka gotowych workflowów | 300 | 2.5 | 0.80 | 2 | 300 | P0 |
| Dashboard logów + retry | 500 | 2.0 | 0.90 | 3 | 300 | P0 |
| Guided onboarding in-app | 450 | 1.5 | 0.85 | 2 | 286.9 | P1 |
| Integracje e-commerce (zamówienia + fulfillment) | 250 | 2.0 | 0.75 | 2 | 187.5 | P1 |
| Alerty KPI (Slack/e-mail) | 350 | 1.5 | 0.70 | 2 | 183.8 | P1 |
| RBAC-lite + audit log basic | 220 | 1.5 | 0.80 | 2 | 132 | P2 |

## V2 (6–12 miesięcy)

| Inicjatywa | Reach | Impact | Confidence | Effort | RICE Score | Priorytet |
|---|---:|---:|---:|---:|---:|---|
| Rozszerzone warunki i gałęzie workflowów | 280 | 2.5 | 0.70 | 3 | 163.3 | P1 |
| AI assistant do mapowania pól i wykrywania błędów | 320 | 2.0 | 0.60 | 4 | 96 | P2 |
| Public API v2 + webhooks management | 200 | 2.0 | 0.65 | 3 | 86.7 | P2 |
| SSO/SAML dla planu enterprise | 120 | 2.5 | 0.75 | 3 | 75 | P2 |
| Marketplace szablonów partnerów | 180 | 1.5 | 0.55 | 4 | 37.1 | P3 |

---

## 6. Kryteria gotowości do produkcji i go-live checklist

## Kryteria gotowości do produkcji (Definition of Production Ready)
1. **Stabilność i jakość**
   - 0 blockerów i 0 krytycznych bugów otwartych na release branch.
   - Testy E2E dla 3 kluczowych use-case’ów przechodzą ≥ 95%.
   - Error rate workflow runtime poniżej ustalonego progu (np. < 1.5%).
2. **Bezpieczeństwo i zgodność**
   - Przegląd uprawnień i sekretów zakończony.
   - Skan podatności bez krytycznych findings.
   - Aktualna polityka retencji i backup danych.
3. **Operacyjność (SRE/Support)**
   - Alerting i dashboardy produkcyjne aktywne.
   - Runbooki incydentowe dla awarii integracji i kolejek.
   - On-call i eskalacja z przypisaniem odpowiedzialności.
4. **Gotowość biznesowa**
   - Cennik, limity i reguły billingowe przetestowane end-to-end.
   - Sales enablement: demo, one-pager, FAQ i playbook objection handling.
   - Support enablement: makra odpowiedzi, procedury triage.

## Go-live checklist

### T-14 do T-7 dni
- [ ] Zamrożenie zakresu (scope freeze) i potwierdzenie release candidate.
- [ ] Finalny przegląd ryzyk + plan rollback.
- [ ] Ukończenie testów regresji i smoke testów.
- [ ] Walidacja telemetry/analytics events dla KPI.

### T-6 do T-1 dni
- [ ] Przegląd konfiguracji środowiska produkcyjnego.
- [ ] Migracje danych przetestowane na środowisku staging.
- [ ] Komunikacja do klientów (release notes, status page, support brief).
- [ ] Szkolenie zespołu support/sales z nowego zakresu MVP.

### Dzień 0 (Go-live)
- [ ] Wdrożenie produkcyjne w zaplanowanym oknie.
- [ ] Monitoring metryk health-check przez min. 2 godziny.
- [ ] Weryfikacja krytycznych ścieżek: lead routing, onboarding, raportowanie.
- [ ] Potwierdzenie braku degradacji KPI i błędów krytycznych.

### Dzień 1–7 (Hypercare)
- [ ] Codzienny przegląd incydentów i ticketów.
- [ ] Raport KPI: aktywacje, D30 proxy, ARPA proxy, churn proxy.
- [ ] Priorytetyzacja hotfixów wg wpływu na klientów.
- [ ] Decyzja o zakończeniu hypercare i wejściu w standardowy cykl release.
