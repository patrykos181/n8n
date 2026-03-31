# Plan strony marketingowej n8n (PL)

## Cele biznesowe

- Generować kwalifikowane leady B2B (formularz kontaktowy + demo booking).
- Skracać czas do pierwszej automatyzacji (self-qualification + edukacja).
- Domykać pętlę pomiarową w lejku: **visit → signup → activation**.

## 1) Strony do wdrożenia

### Architektura nawigacji (PL) — wersja usługowa

Menu główne:

1. Home
2. Usługi
3. Case Studies
4. Proces współpracy
5. Cennik
6. FAQ
7. O nas
8. Kontakt

Zasada IA: każda podstrona ma **jedno główne zadanie użytkownika (JTBD)** i jeden dominujący CTA w hero.

| Podstrona         | Główne zadanie użytkownika                                    | Główny CTA                           |
| ----------------- | ------------------------------------------------------------- | ------------------------------------ |
| Home              | Zrozumieć wartość i przejść do właściwej ścieżki persony      | „Umów konsultację”                   |
| Usługi            | Wybrać typ wsparcia (wdrożenie, utrzymanie, audyt, szkolenie) | „Dobierz usługę”                     |
| Case Studies      | Potwierdzić skuteczność na liczbach i podobnym kontekście     | „Zobacz podobny case”                |
| Proces współpracy | Zrozumieć etapy, czas i odpowiedzialności                     | „Sprawdź plan 30/60/90”              |
| Cennik            | Oszacować budżet i zakres                                     | „Poproś o wycenę”                    |
| FAQ               | Zdjąć obiekcje zakupowe/techniczne                            | „Nadal masz pytanie? Skontaktuj się” |
| O nas             | Ocenić wiarygodność zespołu i kompetencje                     | „Poznaj zespół na callu”             |
| Kontakt           | Wysłać kwalifikowane zapytanie                                | „Wyślij zapytanie”                   |

### Ścieżki użytkownika dla 3 person

#### 1) Właściciel firmy (decyzja biznesowa)

- Wejście: Home.
- Następnie: Case Studies → Cennik → FAQ.
- Konwersja: Kontakt (formularz z prekwalifikacją) lub szybkie demo.
- Kryterium sukcesu: jasny ROI, czas zwrotu, niski wysiłek po stronie firmy.

#### 2) Manager operacyjny (efektywność procesów)

- Wejście: Home lub Usługi.
- Następnie: Usługi → Proces współpracy → Case Studies (operacje) → FAQ.
- Konwersja: Kontakt z opisem procesu i skali.
- Kryterium sukcesu: redukcja czasu operacyjnego, SLA wdrożenia, plan rolloutu.

#### 3) CTO (ryzyko techniczne i architektura)

- Wejście: Home lub Usługi.
- Następnie: Usługi → Proces współpracy → FAQ (bezpieczeństwo, utrzymanie) → Case Studies (architektura).
- Konwersja: Kontakt z wymaganiami integracyjnymi i security.
- Kryterium sukcesu: zgodność bezpieczeństwa, observability, brak vendor lock-in.

### Strategia CTA (sticky + sekcyjne)

- Sticky CTA:
  - Desktop: stały przycisk w prawym górnym obszarze menu + pływający przycisk po scrollu.
  - Mobile: sticky bar na dole ekranu.
  - Etykieta dynamiczna wg podstrony (np. Cennik: „Poproś o wycenę”, Case Studies: „Umów konsultację”).
- Powtarzalne CTA po każdej kluczowej sekcji:
  - Po hero,
  - po sekcji wartości,
  - po social proof/case,
  - po sekcji procesu,
  - po FAQ.
- Reguła UX: CTA zawsze prowadzi do jednego następnego kroku (kontakt albo demo), bez rozpraszania.

### Flow formularza kontaktowego z prekwalifikacją

1. **Krok 1: Dane kontaktowe**
   Imię i nazwisko, e-mail firmowy, firma, rola.
2. **Krok 2: Prekwalifikacja**
   - Branża (lista + „inna”),
   - skala (np. liczba pracowników / wolumen procesów),
   - budżet (widełki),
   - termin startu (ASAP, 1–3 mies., >3 mies.).
3. **Krok 3: Kontekst problemu**
   Krótki opis procesu do automatyzacji + obecne narzędzia.
4. **Krok 4: Potwierdzenie i routing**
   - Segmentacja leadu (SMB/Mid/Enterprise),
   - priorytetyzacja (ICP score),
   - przypisanie do właściciela sprzedaży.
5. **Krok 5: Thank-you page**
   SLA odpowiedzi + następny krok (link do kalendarza/demo + materiały startowe).

Pola wymagane do kwalifikacji MQL: branża, skala, budżet, termin.

### `home`

**Cel:** komunikacja wartości i szybka kwalifikacja.

Sekcje:

1. Hero: "Automatyzacje n8n dla firm bez vendor lock-in" + CTA "Umów demo".
2. Social proof (logo wall + liczby + krótkie case'y).
3. Use-case cards (sprzedaż, operacje, support, finanse).
4. ROI teaser (mini kalkulator z linkiem do pełnej strony).
5. Integracje (top 20 + wyszukiwarka).
6. FAQ (4–6 pytań najczęściej blokujących zakup).
7. Sticky CTA (mobile + desktop).

### `use-cases`

**Cel:** ruch middle/bottom-funnel na intencje problemowe.

Struktura:

- Hub use-case'ów z filtrami: dział, branża, dojrzałość automatyzacji.
- Strony pionowe (np. `/use-cases/sales-automation`, `/use-cases/finance`).
- Każda strona: problem → workflow n8n → efekt KPI → CTA.

### `integracje`

**Cel:** przechwycić ruch SEO "n8n + narzędzie" i obniżyć barierę wdrożenia.

Struktura:

- Katalog integracji z wyszukiwarką.
- Szablon podstrony integracji (`/integrations/{slug}`):
  - Co integruje,
  - przykładowe workflow,
  - wymagania bezpieczeństwa,
  - FAQ,
  - CTA: "Pobierz workflow" + "Umów demo".

### `cennik`

**Cel:** transparentność i skrócenie cyklu sprzedaży.

Sekcje:

- Pakiety (Starter/Growth/Enterprise),
- Tabela porównawcza,
- Kalkulator TCO vs manual work,
- FAQ pricingowe,
- CTA do kontaktu sprzedażowego.

### `blog`

**Cel:** SEO + edukacja + lead nurturing.

Struktura:

- Hub kategorii: n8n tutoriale, architektura, bezpieczeństwo, ROI, case studies.
- Każdy artykuł: TL;DR, wersja workflow do pobrania, CTA do newslettera.

### `case studies`

**Cel:** dowód skuteczności i domknięcie sprzedaży.

Szablon:

- Kontekst klienta,
- problem,
- wdrożenie (architektura),
- wynik (metryki przed/po),
- cytat,
- CTA do demo.

### `kontakt`

**Cel:** lead capture dla high-intent.

Sekcje:

- Formularz kwalifikacyjny (firma, stack, wolumen, termin),
- SLA odpowiedzi,
- alternatywy kontaktu (mail/telefon),
- zgody + privacy.

### `demo-booking`

**Cel:** rezerwacja spotkania bez tarcia.

Sekcje:

- 30-min agenda,
- kalendarz,
- pre-qualification (3 pytania),
- po-booking: thank-you + materiały onboardingowe.

---

## 2) Sekcje konwersyjne (cross-site)

### Social proof

- Logo wall klientów (z branżami).
- Wyniki liczbowe: oszczędność godzin/miesiąc, skrócenie lead time.
- Opinie wideo/quote (minimum 3).

### ROI Calculator

- Dane wejściowe: liczba procesów, czas ręczny/proces, koszt godziny, błędy/rework.
- Wynik: oszczędność miesięczna/roczna, payback period, estymacja FTE reclaimed.
- CTA: "Wyślij raport na mail" (lead magnet + capture).

### FAQ

- 10–15 pytań zastrzeżeń zakupowych:
  - bezpieczeństwo,
  - time-to-value,
  - kompetencje zespołu,
  - lock-in,
  - utrzymanie.

### Sticky CTA

- Desktop: pasek bottom-right.
- Mobile: sticky bottom bar.
- Dynamiczny tekst CTA zależny od strony (np. pricing = "Porozmawiaj o wdrożeniu").

### Lead magnets

- "50 gotowych workflow n8n dla firm" (PDF + JSON pack).
- "Checklist wdrożenia automatyzacji w 30 dni".
- "Kalkulator ROI automatyzacji" (wersja rozszerzona).

---

## 3) SEO technical

### Metadata

- Unikalne `title` i `meta description` dla każdej strony.
- Open Graph + Twitter Cards.
- `hreflang` jeśli planowany multi-language.

### Schema.org

- `Organization`, `WebSite`, `BreadcrumbList` globalnie.
- `Article` dla bloga.
- `FAQPage` dla sekcji FAQ.
- `Product/Service` dla ofert.

### Sitemap

- Dynamicznie generowana `sitemap.xml` (strony statyczne + CMS content).
- Osobny news/blog sitemap przy dużej publikacji.

### Robots

- `Disallow` dla staging i prywatnych ścieżek.
- `Allow` dla assetów wymaganych przez rendering.
- Wskazanie `Sitemap`.

### Canonical

- Każda strona z własnym canonical URL.
- Canonical w paginacji i przy parametrach UTM.

### CWV optimization

- LCP: krytyczny CSS, optymalizacja hero image (`srcset`, `fetchpriority`).
- INP: ograniczenie JS, lazy hydration komponentów interaktywnych.
- CLS: stałe wymiary obrazów/embeds i font fallback.
- Budżet wydajności per template + monitoring Lighthouse CI.

---

## 4) CMS / content pipeline

### Model treści

- `post` (blog), `case_study`, `integration`, `use_case`, `lead_magnet`.
- Pola SEO: slug, title, description, og image, canonical.
- Pola biznesowe: funnel stage, ICP, persona, CTA variant.

### Workflow publikacyjny

1. Research keyword + intent.
2. Brief (problem, angle, CTA, internal links).
3. Draft + review merytoryczny (automation specialist).
4. SEO review (on-page + schema + linkowanie).
5. Publikacja + dystrybucja (newsletter/LinkedIn).
6. Refresh treści co 90–120 dni.

### Governance

- SLA: 2 artykuły/tydzień + 1 case/miesiąc.
- Definition of Done: treść + schema + tracking events + CTA test.

---

## 5) Tracking stack i event taxonomy

### Narzędzia

- Analytics: GA4 + product analytics (PostHog/Amplitude).
- Heatmaps/session replay: Hotjar lub Microsoft Clarity.
- CRM sync: HubSpot/Pipedrive/Salesforce.
- Consent Mode + CMP zgodna z RODO.

### Event taxonomy (lejka)

#### Visit

- `page_view`
- `cta_view`
- `cta_click`
- `scroll_depth_25/50/75/100`
- `roi_calculator_started`

#### Signup (lead)

- `form_started`
- `form_submitted`
- `demo_booked`
- `lead_magnet_downloaded`

#### Activation

- `signup_completed`
- `first_workflow_imported`
- `first_workflow_activated`
- `integration_connected`

### Wymiary zdarzeń (parametry)

- `page_type`, `content_type`, `use_case`, `industry`, `persona`, `utm_source`, `utm_medium`, `utm_campaign`.
- `cta_variant`, `experiment_id`, `session_intent_score`.

### Dashboardy

- Funnel dashboard (visit → signup → activation).
- Content ROI dashboard (artykuł → lead → demo → klient).
- Page conversion dashboard (home/pricing/integrations).

---

## Roadmap (90 dni)

### Dni 1–30

- Wdrożenie Home, Pricing, Contact, Demo booking.
- Tracking baseline + consent + dashboard v1.

### Dni 31–60

- Use-cases + Integracje + Case studies.
- ROI calculator i lead magnets.

### Dni 61–90

- Skalowanie bloga i testy A/B CTA.
- CWV tuning + schema coverage + content refresh.
