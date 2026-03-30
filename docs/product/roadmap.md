# Roadmap produktu

## 1) ICP (Ideal Customer Profile)

### Segmenty docelowe
- **Małe i średnie firmy usługowe (10–250 pracowników)**
  - Przykłady: biura księgowe, doradztwo, HR, kancelarie, edukacja, firmy serwisowe.
  - Problem: ręczne przeklejanie danych między systemami i brak spójnych procesów.
- **E-commerce (5–200 osób, D2C/B2B)**
  - Problem: duża liczba zdarzeń (zamówienia, zwroty, leady, zgłoszenia supportowe).
- **Agencje (marketingowe, software house, kreatywne, rekrutacyjne)**
  - Problem: wiele kont klientów i powtarzalny onboarding/procesy raportowe.

### Wspólne cechy ICP
- Korzystają z min. 5 narzędzi SaaS (CRM, helpdesk, marketing, komunikacja, billing).
- Mają ograniczone zasoby techniczne (brak dedykowanego zespołu automatyzacji).
- Decydenci: właściciel, COO/Head of Ops, Head of Growth, Account Director.
- Kryteria zakupu: szybki time-to-value, niski koszt wdrożenia, bezpieczeństwo, ROI.

---

## 2) Główne use-case’y automatyzacji (Top 3)

### UC1: Lead routing i kwalifikacja
**Cel:** skrócić czas pierwszego kontaktu i zwiększyć konwersję MQL→SQL.

**Przepływ:**
1. Trigger: nowy lead (formularz/CRM/ad platforma).
2. Walidacja + enrichment (źródło, branża, kraj, rozmiar firmy).
3. Routing wg reguł (region, segment, obciążenie handlowca).
4. Utworzenie tasku i powiadomienia (CRM + Slack/e-mail).
5. Pomiar SLA i statusów lejka.

### UC2: Onboarding klienta po wygranej sprzedaży
**Cel:** skrócić czas od „Won” do pierwszej wartości dla klienta.

**Przepływ:**
1. Trigger: status „Won” w CRM.
2. Utworzenie projektu i checklisty onboardingowej.
3. Wysłanie pakietu startowego (formularze, dokumenty, harmonogram).
4. Provisioning dostępów i przypisanie ownerów.
5. Automatyczny raport statusu onboardingowego.

### UC3: Raportowanie operacyjne i zarządcze
**Cel:** usunąć ręczne raportowanie i zwiększyć szybkość decyzji.

**Przepływ:**
1. Harmonogramowe pobieranie danych z CRM/e-commerce/helpdesku.
2. Standaryzacja i agregacja metryk.
3. Generowanie raportu (dzienny/tygodniowy/miesięczny).
4. Dystrybucja i alerty anomalii KPI.

---

## 3) Zakres MVP + out-of-scope

### MVP (minimum funkcji do sprzedaży)
1. **Workflow builder (core):** trigger → action → condition.
2. **Minimum 20 integracji** kluczowych dla ICP.
3. **Szablony „one-click”** dla UC1/UC2/UC3.
4. **Mapowanie pól + walidacje** (podstawowe transformacje danych).
5. **Monitoring wykonań** (statusy, logi błędów, retry manualny).
6. **RBAC-lite** (role: Admin, Operator).
7. **Starter billing** (limity uruchomień + alert o limicie).
8. **Onboarding in-app** (checklista + guided setup).

### Out-of-scope (dla MVP)
- Zaawansowane orkiestracje (pętle, custom code sandbox, złożone dependency graph).
- Enterprise IAM (SSO/SAML/SCIM) i rozszerzony audyt compliance.
- Marketplace partnerów i public API v2.
- AI copilots działające w czasie rzeczywistym.
- White-label i wielopoziomowa hierarchia billingowa.

---

## 4) Mierniki sukcesu

### KPI główne
- **Aktywacje (Activation Rate):** % nowych kont, które uruchomią 1 produkcyjny workflow w 7 dni.  
  **Cel (2 kwartały):** ≥ 45%.
- **Retencja 30-dniowa (Logo Retention D30):** % kont aktywnych po 30 dniach od aktywacji.  
  **Cel (2 kwartały):** ≥ 70%.
- **ARPA:** średni miesięczny przychód na aktywne konto płacące.  
  **Cel (2 kwartały):** +20% vs baseline.
- **Churn (logo/revenue):** miesięczny odpływ klientów/MRR.  
  **Cel (2 kwartały):** logo churn < 4%/mies., revenue churn < 3%/mies.

### KPI wspierające
- Median time-to-first-workflow.
- Success run rate workflowów.
- Średnia liczba aktywnych workflowów po 30 dniach.
- % kont korzystających z min. 2 use-case’ów.

---

## 5) Backlog V1/V2 z priorytetyzacją RICE

**Wzór RICE:** `Score = (Reach × Impact × Confidence) / Effort`  
Skale: Reach (miesięcznie), Impact (0.25–3), Confidence (0–1), Effort (osobo-miesiące).

### V1 (0–6 miesięcy)

| Inicjatywa | Reach | Impact | Confidence | Effort | Score | Priorytet |
|---|---:|---:|---:|---:|---:|---|
| Szablony Lead Routing (CRM + formularze) | 400 | 3.0 | 0.85 | 2 | 510.0 | P0 |
| Paczka onboardingowa „Won→Kickoff” | 300 | 2.5 | 0.80 | 2 | 300.0 | P0 |
| Monitoring + retry + dashboard logów | 500 | 2.0 | 0.90 | 3 | 300.0 | P0 |
| Guided onboarding in-app | 450 | 1.5 | 0.85 | 2 | 286.9 | P1 |
| Integracje e-commerce (order + fulfillment) | 250 | 2.0 | 0.75 | 2 | 187.5 | P1 |
| Alerty KPI (Slack/e-mail) | 350 | 1.5 | 0.70 | 2 | 183.8 | P1 |
| RBAC-lite + basic audit log | 220 | 1.5 | 0.80 | 2 | 132.0 | P2 |

### V2 (6–12 miesięcy)

| Inicjatywa | Reach | Impact | Confidence | Effort | Score | Priorytet |
|---|---:|---:|---:|---:|---:|---|
| Rozszerzone warunki i gałęzie workflow | 280 | 2.5 | 0.70 | 3 | 163.3 | P1 |
| AI assistant (mapowanie pól + diagnostyka) | 320 | 2.0 | 0.60 | 4 | 96.0 | P2 |
| Public API v2 + webhook management | 200 | 2.0 | 0.65 | 3 | 86.7 | P2 |
| SSO/SAML (enterprise plan) | 120 | 2.5 | 0.75 | 3 | 75.0 | P2 |
| Marketplace szablonów partnerów | 180 | 1.5 | 0.55 | 4 | 37.1 | P3 |

---

## 6) Kryteria gotowości produkcyjnej + go-live checklist

### Definition of Production Ready
1. **Jakość i stabilność**
   - 0 blockerów i 0 krytycznych bugów na release branch.
   - E2E dla UC1/UC2/UC3 przechodzą na poziomie ≥ 95%.
   - Runtime error rate < 1.5%.
2. **Bezpieczeństwo i zgodność**
   - Przegląd uprawnień/secrets zakończony.
   - Brak krytycznych podatności.
   - Retencja i backup danych potwierdzone.
3. **Operacyjność (SRE/Support)**
   - Alerting + dashboardy produkcyjne aktywne.
   - Runbooki incydentowe i model eskalacji gotowe.
   - On-call oraz ownership dla awarii zdefiniowane.
4. **Gotowość biznesowa**
   - Billing i limity przetestowane end-to-end.
   - Materiały sales enablement (demo, one-pager, FAQ) gotowe.
   - Support playbook + makra triage gotowe.

### Go-live checklist

#### T-14 do T-7
- [ ] Scope freeze i potwierdzenie release candidate.
- [ ] Przegląd ryzyk + plan rollback.
- [ ] Regresja + smoke testy zakończone.
- [ ] Walidacja eventów telemetry/analytics dla KPI.

#### T-6 do T-1
- [ ] Finalny review konfiguracji produkcyjnej.
- [ ] Migracje danych sprawdzone na staging.
- [ ] Komunikacja do klientów (release notes/status page/support brief).
- [ ] Szkolenie support/sales z zakresu MVP.

#### Dzień 0 (Go-live)
- [ ] Wdrożenie w zaplanowanym oknie.
- [ ] Monitoring health-check min. 2h po deployu.
- [ ] Weryfikacja ścieżek krytycznych (UC1/UC2/UC3).
- [ ] Potwierdzenie braku regresji krytycznych KPI.

#### Dzień 1–7 (Hypercare)
- [ ] Codzienny przegląd incydentów/ticketów.
- [ ] Raport KPI (aktywacje, D30 proxy, ARPA proxy, churn proxy).
- [ ] Priorytetyzacja hotfixów wg wpływu na klienta.
- [ ] Decyzja o zakończeniu hypercare.
