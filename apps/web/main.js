const yearElement = document.getElementById("year");
const contactForm = document.getElementById("contact-form");
const leadSummary = document.getElementById("lead-summary");
const thankYouPanel = document.getElementById("thank-you-panel");
const faqItems = document.querySelectorAll(".faq-accordion details");
const revealItems = document.querySelectorAll("main > section, .section-cta");
const statNumbers = document.querySelectorAll(".stat-number");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

const animateCount = (element) => {
  const targetValue = Number(element.dataset.value ?? "0");
  const prefix = element.dataset.prefix ?? "";
  const suffix = element.dataset.suffix ?? "";
  const decimalPlaces = Number(element.dataset.decimals ?? "0");

  if (prefersReducedMotion) {
    element.textContent = `${prefix}${targetValue.toFixed(decimalPlaces)}${suffix}`;
    return;
  }

  const durationMs = 300;
  const startTime = performance.now();

  const tick = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / durationMs, 1);
    const easedProgress = 1 - (1 - progress) ** 3;
    const currentValue = targetValue * easedProgress;
    element.textContent = `${prefix}${currentValue.toFixed(decimalPlaces)}${suffix}`;

    if (progress < 1) {
      window.requestAnimationFrame(tick);
      return;
    }

    element.textContent = `${prefix}${targetValue.toFixed(decimalPlaces)}${suffix}`;
  };

  window.requestAnimationFrame(tick);
};

if (revealItems.length) {
  revealItems.forEach((item, index) => {
    item.classList.add("reveal-on-scroll");
    item.style.setProperty("--reveal-delay", `${Math.min(index * 35, 210)}ms`);
  });

  if (prefersReducedMotion) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  }
}

if (statNumbers.length) {
  if (prefersReducedMotion) {
    statNumbers.forEach(animateCount);
  } else {
    const statsObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          animateCount(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.5 },
    );

    statNumbers.forEach((stat) => statsObserver.observe(stat));
  }
}

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
