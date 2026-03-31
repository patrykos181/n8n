import { renderCurrentYear } from "./year";

const yearElement = document.getElementById("year");

if (yearElement instanceof HTMLElement) {
  renderCurrentYear(yearElement);
}
