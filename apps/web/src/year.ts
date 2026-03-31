export const getCurrentYear = (date: Date = new Date()): string => String(date.getFullYear());

export const renderCurrentYear = (element: HTMLElement, date?: Date): void => {
  element.textContent = getCurrentYear(date);
};
