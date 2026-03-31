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
    contactForm.reset();
  });
}
