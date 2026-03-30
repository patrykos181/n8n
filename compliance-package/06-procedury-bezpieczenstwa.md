# Procedury bezpieczeństwa

**Wersja:** 1.0  
**Data:** 30 marca 2026 r.

## 1. Access Reviews (przeglądy dostępów)

### 1.1 Cel
Zapewnienie, że dostęp do danych i systemów posiadają wyłącznie osoby uprawnione.

### 1.2 Częstotliwość
- systemy krytyczne: co miesiąc,
- pozostałe systemy: co kwartał,
- przegląd doraźny po zmianie stanowiska/odejściu pracownika.

### 1.3 Zakres
- konta użytkowników i role,
- dostęp uprzywilejowany,
- konta serwisowe/API,
- wyjątki i konta tymczasowe.

### 1.4 Procedura
1. Właściciel systemu generuje listę aktywnych kont.
2. Menedżer funkcjonalny zatwierdza zasadność dostępów.
3. Security/IT usuwa lub koryguje nadmiarowe uprawnienia.
4. Wyniki są archiwizowane (dowody audytowe).

## 2. Incident Response

### 2.1 Klasyfikacja incydentów
- **Sev1** – krytyczny wpływ na poufność, integralność lub dostępność,
- **Sev2** – istotny wpływ lokalny,
- **Sev3** – incydent ograniczony, niski wpływ.

### 2.2 Kroki reagowania
1. **Wykrycie i zgłoszenie** (monitoring, zgłoszenie pracownika, alert partnera).
2. **Triaging** (ocena wpływu i klasyfikacja).
3. **Ograniczenie** (containment).
4. **Usunięcie przyczyny** (eradication).
5. **Odtworzenie** (recovery).
6. **Postmortem** z planem działań naprawczych.

### 2.3 SLA i notyfikacje
- Sev1: eskalacja natychmiast, status co 60 minut,
- Sev2: eskalacja do 4 godzin,
- Sev3: obsługa w standardowym cyklu.

W przypadku naruszenia ochrony danych osobowych: ocena obowiązku zgłoszenia do UODO w ciągu 72 godzin.

## 3. Vendor Management (zarządzanie dostawcami)

### 3.1 Onboarding dostawcy
- ocena ryzyka dostawcy (krytyczność usługi, typ danych),
- due diligence bezpieczeństwa (np. SOC 2/ISO 27001),
- przegląd warunków prawnych (DPA, SCC, warunki podpowierzenia).

### 3.2 Monitoring ciągły
- roczny przegląd ryzyka dostawców krytycznych,
- monitorowanie incydentów i zmian własnościowych,
- walidacja certyfikatów i raportów audytowych.

### 3.3 Offboarding
- zwrot/usunięcie danych,
- dezaktywacja integracji i kluczy API,
- udokumentowanie zakończenia współpracy.
