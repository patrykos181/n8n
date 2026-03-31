# SEO technical checklist + wdrożenie (PL)

## Status wdrożenia (pakiet referencyjny)

- [x] Zdefiniowane frazy główne: `automatyzacja procesów`, `wdrożenia n8n`, `integracje systemów`.
- [x] Uzupełnione opisy usług z KPI i CTA.
- [x] Dodane FAQ zakupowe i techniczne.
- [x] Przygotowane 5 artykułów use-case.
- [x] Uzupełnione szablony `sitemap.xml`, `robots.txt`, `schema.org`.

## Global

- [x] `title` 50–60 znaków i unikalny per URL.
- [x] `meta description` 140–160 znaków.
- [x] `canonical` ustawiony dla każdego URL.
- [x] Open Graph (`og:title`, `og:description`, `og:image`, `og:url`).
- [x] Twitter Card (`summary_large_image`).

## Indexation

- [x] `robots.txt` dostępny pod `/robots.txt`.
- [x] `sitemap.xml` dostępny pod `/sitemap.xml`.
- [x] Strony stagingowe zablokowane (`Disallow: /staging/`, `Disallow: /preview/`).
- [x] Brak indexacji stron thin/duplicate (wymaga wdrożenia reguł `noindex` per CMS).

## Schema.org

- [x] `Organization` na stronie głównej.
- [x] `WebSite` z `SearchAction`.
- [x] `Service` dla strony usług.
- [x] `BreadcrumbList` na stronach zagłębień.
- [x] `Article` na blogu.
- [x] `FAQPage` tam gdzie widoczny FAQ.

## Content hygiene

- [x] 1x H1 per page.
- [x] Sensowna hierarchia H2/H3.
- [x] Linkowanie wewnętrzne do money pages.
- [x] FAQ zawiera pytania z intencji zakupowej.

## Meta title + description (wzorce)

- Home
  - `title`: Automatyzacja procesów i wdrożenia n8n dla firm | [Nazwa firmy]
  - `description`: Projektujemy i wdrażamy automatyzacje n8n oraz integracje systemów. Skracaj czas procesów, obniżaj koszty i skaluj operacje bez chaosu.
- Usługi
  - `title`: Wdrożenia n8n i integracje systemów — oferta B2B | [Nazwa firmy]
  - `description`: Od audytu po utrzymanie SLA: wdrożenia n8n, automatyzacja procesów i integracje ERP/CRM. Poznaj zakres i umów konsultację.
- Case studies
  - `title`: Case studies automatyzacji procesów i wdrożeń n8n | [Nazwa firmy]
  - `description`: Zobacz wdrożenia n8n z konkretnymi wynikami: krótszy lead time, mniej błędów i oszczędność godzin pracy zespołu.

## H1–H3 (szablon strony usług)

- H1: Automatyzacja procesów, wdrożenia n8n i integracje systemów dla firm B2B.
- H2:
  - Wdrożenia n8n end-to-end
  - Integracje systemów ERP/CRM/e-commerce
  - Audyt procesów i roadmapa automatyzacji
  - Utrzymanie i rozwój automatyzacji
  - FAQ zakupowe i techniczne
- H3:
  - Jak wygląda wdrożenie w 30/60/90 dni?
  - Jakie KPI raportujemy po uruchomieniu?
  - Jak zabezpieczamy workflowy i dane?

## Linkowanie wewnętrzne (minimum)

- Home → Usługi, Case studies, FAQ, Kontakt.
- Usługi → Proces współpracy, Cennik, FAQ, Kontakt.
- Artykuły branżowe → odpowiednia usługa + 1 case study + Kontakt.
- Case studies → Usługi powiązane + Cennik + Kontakt.
- FAQ → Usługi + Kontakt.

## CWV (do monitorowania po deployu)

- [ ] LCP mobile < 2.5s (P75).
- [ ] INP < 200ms (P75).
- [ ] CLS < 0.1 (P75).
- [ ] Hero media z rozmiarem i priorytetem ładowania.
- [ ] Third-party scripts załadowane asynchronicznie/po interakcji.
