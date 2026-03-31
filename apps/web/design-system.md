# Design System — n8n Platform

## 1) Tokeny

### Kolory

- `--color-bg`, `--color-surface`, `--color-surface-alt`
- `--color-text`, `--color-text-muted`, `--color-border`
- `--color-primary`, `--color-primary-hover`, `--color-primary-active`
- Stany semantyczne: `--color-success`, `--color-danger`, `--color-warning`, `--color-focus`

### Typografia

- Font bazowy: `--font-family-base`
- Skala: `--font-size-xs` → `--font-size-2xl`
- Grubości: `--font-weight-medium`, `--font-weight-semibold`, `--font-weight-bold`

### Spacing

- Siatka spacingu: `--space-1` do `--space-12` (4px → 48px)

### Promienie

- `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-pill`

### Cienie

- `--shadow-sm`, `--shadow-md`, `--shadow-focus`

## 2) Komponenty

- Buttony: `.button`, `.button-primary`, `.button-secondary`
- Karty usług: `.feature-grid article`
- Formularze: `.contact-form`, `.form-grid`, `.field-error`, `.form-message`
- Accordion FAQ: `.faq-accordion` + `details/summary`
- Testimonials: `.testimonials article`
- Pricing cards: `.pricing-grid article`, `.pricing-tag`, `.pricing-price`

## 3) Stany komponentów

- Hover: buttony, inputy, karty
- Active: `.button-primary:active`
- Focus: `:focus-visible`, `:focus-within`, `--shadow-focus`
- Disabled: `:disabled`, `.is-disabled`, `[aria-disabled='true']`
- Loading: `.button.is-loading`, `.form-loading`
- Error: `.form-error`, `.field-error`, `[aria-invalid='true']`

## 4) Responsywność

- **Desktop**: > 1024px, układy 3-kolumnowe
- **Tablet**: ≤ 1024px, kluczowe sekcje 2-kolumnowe
- **Mobile**: ≤ 900px, układy 1-kolumnowe + sticky CTA

## 5) Guideline użycia

1. Jedna sekcja = jeden główny CTA (`button-primary`).
2. Karta zawsze ma nagłówek, treść i decyzję (CTA lub wynik).
3. Formularze pokazują walidację przy polu i status globalny pod formularzem.
4. FAQ używa krótkich pytań i prostych odpowiedzi (1 temat = 1 panel).
5. Testimoniale muszą zawierać cytat i źródło (rola/firma).
6. Pricing ma maksymalnie 3 pakiety i jeden wyróżniony plan.
