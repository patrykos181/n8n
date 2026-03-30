# Plan strony marketingowej n8n (PL)

## Cele biznesowe
- Generować kwalifikowane leady B2B (formularz kontaktowy + demo booking).
- Skracać czas do pierwszej automatyzacji (self-qualification + edukacja).
- Domykać pętlę pomiarową w lejku: **visit → signup → activation**.

## 1) Strony do wdrożenia

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
