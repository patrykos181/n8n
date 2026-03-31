# Web performance checklist (pre-publish)

## 1) Obrazy: kompresja + WebP/AVIF

- Każdy nowy obraz publikuj przez `<picture>` z wariantami `AVIF`, `WebP` i fallback (`jpg/png`).
- Hero/LCP image: zawsze `fetchpriority="high"`, ustalone `width` i `height`.
- Pozostałe obrazy: `loading="lazy"` i `decoding="async"`.
- Przed commitem uruchom kompresję (np. Squoosh/Sharp) i trzymaj docelowo:
  - miniatury: do 50 KB,
  - obrazy sekcyjne: do 150 KB,
  - hero: do 250 KB.

## 2) Animacje: ogranicz ciężkie biblioteki + lazy loading

- Nie dodawaj globalnie ciężkich bibliotek animacyjnych, jeśli efekt da się uzyskać CSS/IntersectionObserver.
- Animacje niekrytyczne ładuj dopiero po idle (`requestIdleCallback`) lub po interakcji.
- Respektuj `prefers-reduced-motion`.

## 3) Font loading: preload + fallback

- W `<head>` utrzymuj:
  - `preconnect` do `fonts.googleapis.com` i `fonts.gstatic.com`,
  - `preload` dla arkusza fontów,
  - `display=swap` dla uniknięcia blokady renderu.
- W CSS zawsze trzymaj fallback stack (`Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif`).

## 4) Monitoring LCP / CLS / INP + krytyczne zasoby

- W przeglądarce loguj metryki przez `PerformanceObserver` (LCP, CLS, INP).
- Zasoby krytyczne (font CSS, krytyczny CSS, hero image) muszą mieć priorytet ładowania.
- Po wdrożeniu monitoruj raporty field data (CrUX/GA4/real user monitoring).

## 5) Budżet wydajności i bramka release

- Budżet w repo: `apps/web/performance-budget.json`.
- Automatyczny check: `npm run --workspace @n8n/web perf:budget`.
- Minimalna bramka jakości przed publikacją:
  - [ ] build przechodzi,
  - [ ] budżet rozmiarów zasobów przechodzi,
  - [ ] brak regresji Web Vitals (LCP <= 2.5 s, CLS <= 0.1, INP <= 200 ms),
  - [ ] obrazy dodane jako WebP/AVIF + lazy dla niekrytycznych,
  - [ ] fonty preloadowane i z fallbackiem.
