# Wizualizacja — etap aktualny (marketing site PL)

## 1) Widok desktop (wireframe low-fi)

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ LOGO | Home | Usługi | Case Studies | Proces | Cennik | FAQ | O nas | Kontakt │ [Sticky CTA]
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────── HERO ─────────────────────────────┬───────────────┐
│ H1: Automatyzacje n8n dla firm                                │ Efekty/KPI    │
│ Opis wartości + 2 CTA                                         │ -30% do -60%  │
└────────────────────────────────────────────────────────────────┴───────────────┘
                                [CTA po sekcji]

┌──────────────────────────────── USŁUGI ──────────────────────────────────────┐
│ JTBD: dobrać typ wsparcia                                                     │
│ [karta] Audyt   [karta] Wdrożenia   [karta] Utrzymanie   [karta] Integracje │
│ [karta] Szkolenia                                                             │
└───────────────────────────────────────────────────────────────────────────────┘
                                [CTA po sekcji]

┌──────────────────────────── CASE STUDIES ────────────────────────────────────┐
│ JTBD: potwierdzić skuteczność                                                 │
│ [case 1] [case 2] [case 3]                                                    │
└───────────────────────────────────────────────────────────────────────────────┘
                                [CTA po sekcji]

┌──────────────────────────── PROCES WSPÓŁPRACY ───────────────────────────────┐
│ JTBD: zrozumieć etapy                                                         │
│ 1. Discovery → 2. Plan 30/60/90 → 3. Wdrożenie → 4. Stabilizacja             │
└───────────────────────────────────────────────────────────────────────────────┘
                                [CTA po sekcji]

┌──────────────────────────────── CENNIK ──────────────────────────────────────┐
│ JTBD: oszacować budżet                                                        │
│ Starter | Growth | Enterprise                                                 │
└───────────────────────────────────────────────────────────────────────────────┘
                                [CTA po sekcji]

┌───────────────────────────────── FAQ ────────────────────────────────────────┐
│ JTBD: zdjąć obiekcje przed kontaktem                                          │
│ Q1/Q2/Q3                                                                       │
└───────────────────────────────────────────────────────────────────────────────┘
                                [CTA po sekcji]

┌──────────────────────────────── O NAS ───────────────────────────────────────┐
│ JTBD: ocenić wiarygodność                                                      │
│ doświadczenie, tempo, wsparcie                                                 │
└───────────────────────────────────────────────────────────────────────────────┘
                                [CTA po sekcji]

┌─────────────────────────────── KONTAKT (FORM) ───────────────────────────────┐
│ JTBD: wysłać kwalifikowane zapytanie                                           │
│ dane kontaktowe | branża | skala | budżet | termin | opis kontekstu          │
│ [Wyślij zapytanie] → komunikat segmentu leadu                                  │
└───────────────────────────────────────────────────────────────────────────────┘
```

## 2) Widok mobile (wireframe low-fi)

```text
┌─────────────────────────────┐
│ LOGO + menu (scroll nav)    │
└─────────────────────────────┘
│ HERO                        │
│ [CTA główny]                │
│ sekcja                      │
│ [CTA po sekcji]             │
│ sekcja                      │
│ [CTA po sekcji]             │
│ ...                         │
│ KONTAKT + formularz         │
└─────────────────────────────┘
[MOBILE STICKY CTA - dół ekranu]
```

## 3) Co jeszcze warto usprawnić w kolejnym kroku

### Priorytet wysoki (konwersja + UX)

1. Dodać walidację inline dla formularza (komunikaty przy polach, nie tylko po submit).
2. Podpiąć realny endpoint (np. webhook n8n) i zapisać leady w CRM.
3. Dodać thank-you page z wyborem kolejnego kroku: demo / checklista / case.

### Priorytet średni (SEO + wiarygodność)

1. Uzupełnić dane strukturalne `FAQPage`, `Organization`, `Service`.
2. Rozwinąć case studies o metryki przed/po i cytat klienta.
3. Dodać sekcję z personami i dedykowanym CTA wariantowym.

### Priorytet niski (jakość wdrożeniowa)

1. Dodać eventy analityczne (`cta_click`, `form_started`, `form_submitted`).
2. Przygotować prosty test E2E dla formularza i sticky CTA.
3. Spiąć monitoring CWV (LCP/INP/CLS) na środowisku preview.
