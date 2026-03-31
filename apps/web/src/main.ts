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
const thankYouPanel = document.getElementById("thank-you-panel");

type TrackingPayload = Record<string, string>;
type TrackingEvent = { event: string } & TrackingPayload;
declare global {
  interface Window {
    dataLayer?: TrackingEvent[];
  }
}

const track = (event: string, payload: TrackingPayload = {}) => {
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...payload });
};

const requiredFields = [
  "name",
  "email",
  "company",
  "industry",
  "scale",
  "budget",
  "timeline",
] as const;

const setFieldError = (form: HTMLFormElement, fieldName: string, message: string) => {
  const errorElement = form.querySelector(`[data-error-for="${fieldName}"]`);
  if (errorElement instanceof HTMLElement) {
    errorElement.textContent = message;
  }
};

const clearFieldErrors = (form: HTMLFormElement) => {
  requiredFields.forEach((fieldName) => setFieldError(form, fieldName, ""));
};

const validateForm = (formData: FormData, form: HTMLFormElement) => {
  clearFieldErrors(form);
  let valid = true;

  requiredFields.forEach((fieldName) => {
    const value = String(formData.get(fieldName) ?? "").trim();
    if (!value) {
      setFieldError(form, fieldName, "To pole jest wymagane.");
      valid = false;
    }
  });

  const emailValue = String(formData.get("email") ?? "").trim();
  if (emailValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
    setFieldError(form, "email", "Podaj poprawny adres e-mail.");
    valid = false;
  }

  return valid;
};

if (contactForm instanceof HTMLFormElement && leadSummary instanceof HTMLElement) {
  contactForm.addEventListener("focusin", () => {
    track("form_started", { form: "contact_prequal" });
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const valid = validateForm(formData, contactForm);
    if (!valid) {
      leadSummary.textContent = "Formularz zawiera błędy. Uzupełnij wymagane pola.";
      leadSummary.className = "form-message form-error";
      track("form_submit_error", { form: "contact_prequal" });
      return;
    }

    const budget = String(formData.get("budget"));
    const scale = String(formData.get("scale"));
    const score = (budget.includes("50") ? 2 : 1) + (scale.includes("200+") ? 2 : 1);
    const segment = score >= 3 ? "Mid/Enterprise" : "SMB";

    leadSummary.textContent = `Dziękujemy! Lead zakwalifikowany do segmentu: ${segment}. Odpowiemy do 24h roboczych.`;
    leadSummary.className = "form-message form-success";
    if (thankYouPanel instanceof HTMLElement) {
      thankYouPanel.hidden = false;
    }
    track("form_submitted", { form: "contact_prequal", segment });
    contactForm.reset();
  });
}
