const yearElement = document.getElementById("year");
const contactForm = document.getElementById("contact-form");
const leadSummary = document.getElementById("lead-summary");
const thankYouPanel = document.getElementById("thank-you-panel");
const faqItems = document.querySelectorAll(".faq-accordion details");

if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}

if (faqItems.length) {
  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) {
        return;
      }

      faqItems.forEach((other) => {
        if (other !== item) {
          other.open = false;
        }
      });
    });
  });
}

const loadNonCriticalAnimations = () => {
  import("./animations.js")
    .then(({ initAnimations }) => {
      initAnimations();
    })
    .catch((error) => {
      console.warn("Nie udało się załadować modułu animacji:", error);
    });
};

if ("requestIdleCallback" in window) {
  window.requestIdleCallback(loadNonCriticalAnimations, { timeout: 1200 });
} else {
  window.setTimeout(loadNonCriticalAnimations, 600);
}

const observeWebVitals = () => {
  let cls = 0;

  const vitalsObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === "largest-contentful-paint") {
        console.info("[Web Vitals] LCP:", Math.round(entry.startTime), "ms");
      }

      if (entry.entryType === "layout-shift" && !entry.hadRecentInput) {
        cls += entry.value;
        console.info("[Web Vitals] CLS:", Number(cls.toFixed(4)));
      }

      if (entry.entryType === "event" && entry.name === "click") {
        console.info("[Web Vitals] INP(click):", Math.round(entry.duration), "ms");
      }
    }
  });

  try {
    vitalsObserver.observe({ type: "largest-contentful-paint", buffered: true });
    vitalsObserver.observe({ type: "layout-shift", buffered: true });
    vitalsObserver.observe({ type: "event", durationThreshold: 40, buffered: true });
  } catch (error) {
    console.warn("PerformanceObserver nie wspiera wszystkich metryk:", error);
  }
};

observeWebVitals();

const requiredFields = ["name", "email", "company", "industry", "scale", "budget", "timeline"];

const setFieldError = (fieldName, message) => {
  const field = contactForm?.elements.namedItem(fieldName);
  const errorElement = document.querySelector(`[data-error-for="${fieldName}"]`);

  if (field && "setAttribute" in field) {
    if (message) {
      field.setAttribute("aria-invalid", "true");
    } else {
      field.removeAttribute("aria-invalid");
    }
  }

  if (errorElement) {
    errorElement.textContent = message;
  }
};

if (contactForm && leadSummary && thankYouPanel) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    let hasErrors = false;
    requiredFields.forEach((fieldName) => {
      const field = contactForm.elements.namedItem(fieldName);
      const value = field?.value?.trim();
      const message = value ? "" : "To pole jest wymagane.";

      setFieldError(fieldName, message);
      if (message) {
        hasErrors = true;
      }
    });

    const emailField = contactForm.elements.namedItem("email");
    if (emailField?.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
      setFieldError("email", "Podaj poprawny adres e-mail.");
      hasErrors = true;
    }

    if (hasErrors) {
      leadSummary.textContent = "Formularz zawiera błędy. Uzupełnij pola oznaczone na czerwono.";
      leadSummary.className = "form-message form-error";
      thankYouPanel.classList.remove("is-visible");
      thankYouPanel.hidden = true;
      return;
    }

    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton?.classList.add("is-loading");
    submitButton?.setAttribute("aria-disabled", "true");
    if (submitButton instanceof HTMLButtonElement) {
      submitButton.disabled = true;
    }

    leadSummary.textContent = "Wysyłanie formularza...";
    leadSummary.className = "form-message form-loading";

    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    submitButton?.classList.remove("is-loading");
    submitButton?.removeAttribute("aria-disabled");
    if (submitButton instanceof HTMLButtonElement) {
      submitButton.disabled = false;
    }

    leadSummary.textContent = "Dziękujemy! Twoje zapytanie zostało wysłane.";
    leadSummary.className = "form-message form-success";
    thankYouPanel.hidden = false;
    thankYouPanel.classList.add("is-visible");
    contactForm.reset();
  });
}
