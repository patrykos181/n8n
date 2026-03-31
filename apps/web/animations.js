const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

export const initAnimations = () => {
  const revealItems = document.querySelectorAll("main > section, .section-cta");
  const statNumbers = document.querySelectorAll(".stat-number");

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

  if (!statNumbers.length) {
    return;
  }

  if (prefersReducedMotion) {
    statNumbers.forEach(animateCount);
    return;
  }

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
};
