import { renderCurrentYear } from "./year";

const yearElement = document.getElementById("year");

if (yearElement instanceof HTMLElement) {
  renderCurrentYear(yearElement);
}

const sectionCtaConfig: Record<string, string> = {
  home: "Umów konsultację",
  uslugi: "Dobierz usługę",
  "case-studies": "Zobacz podobny case",
  proces: "Sprawdź plan 30/60/90",
  cennik: "Poproś o wycenę",
  faq: "Zadaj pytanie",
  "o-nas": "Poznaj zespół",
  kontakt: "Wyślij zapytanie",
};

const stickyCta = document.getElementById("sticky-cta");
const mobileStickyCta = document.getElementById("mobile-sticky-cta");

const setStickyLabel = (sectionId: string) => {
  const label = sectionCtaConfig[sectionId] ?? "Umów konsultację";
  [stickyCta, mobileStickyCta].forEach((cta) => {
    if (cta instanceof HTMLAnchorElement) {
      cta.textContent = label;
      cta.setAttribute("aria-label", `${label} — przejdź do formularza kontaktu`);
    }
  });
};

const observedSections = Array.from(document.querySelectorAll("section[id]"));
if (observedSections.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) {
        setStickyLabel(visible.target.id);
      }
    },
    { threshold: [0.35, 0.6, 0.9] },
  );

  observedSections.forEach((section) => observer.observe(section));
}

const contactForm = document.getElementById("contact-form");
const leadSummary = document.getElementById("lead-summary");

if (contactForm instanceof HTMLFormElement && leadSummary instanceof HTMLElement) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const fields = ["industry", "scale", "budget", "timeline"];
    const complete = fields.every((field) => String(formData.get(field) ?? "").trim().length > 0);

    if (!complete) {
      leadSummary.textContent =
        "Uzupełnij proszę pola kwalifikacyjne: branża, skala, budżet i termin.";
      leadSummary.className = "form-message form-error";
      return;
    }

    const budget = String(formData.get("budget"));
    const scale = String(formData.get("scale"));
    const score = (budget.includes("50") ? 2 : 1) + (scale.includes("200+") ? 2 : 1);
    const segment = score >= 3 ? "Mid/Enterprise" : "SMB";

    leadSummary.textContent = `Dziękujemy! Lead zakwalifikowany do segmentu: ${segment}. Odpowiemy do 24h roboczych.`;
    leadSummary.className = "form-message form-success";
    contactForm.reset();
  });
}
