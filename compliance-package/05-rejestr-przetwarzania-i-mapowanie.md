# Rejestr czynności przetwarzania (ROPA) i mapowanie danych osobowych

**Wersja:** 1.0  
**Data:** 30 marca 2026 r.

## 1. Rejestr czynności przetwarzania (szablon)

| ID | Proces | Cel | Podstawa prawna | Kategorie danych | Kategorie osób | Odbiorcy | Transfer poza EOG | Retencja | Właściciel procesu |
|---|---|---|---|---|---|---|---|---|---|
| ROPA-001 | Obsługa klientów | Realizacja umowy | art. 6(1)(b) | identyfikacyjne, kontaktowe | klienci | CRM, wsparcie | nie / tak (SCC) | 6 lat | Head of Customer Ops |
| ROPA-002 | Fakturowanie | Obowiązek prawny | art. 6(1)(c) | dane firmowe, finansowe | klienci, kontrahenci | księgowość | nie | 5 lat+ | Finance Lead |
| ROPA-003 | Marketing B2B | Komunikacja handlowa | art. 6(1)(f)/zgoda | kontaktowe, preferencje | leady | narzędzie marketingowe | możliwe (SCC) | do sprzeciwu/wycofania | Marketing Lead |
| ROPA-004 | Bezpieczeństwo IT | Ochrona systemów | art. 6(1)(f) | logi, IP, identyfikatory | użytkownicy, pracownicy | SIEM/SOC | możliwe (SCC) | 12 miesięcy | Security Lead |

## 2. Mapowanie przepływu danych (data mapping)

### 2.1 Punkty zbierania danych
- formularze WWW,
- rejestracja kont,
- integracje API,
- komunikacja e-mail i support.

### 2.2 Przepływ danych
1. Zbieranie danych w aplikacji frontend.
2. Przekazanie do backendu/API.
3. Zapis w bazie produkcyjnej.
4. Replikacja do backupu.
5. Przetwarzanie w narzędziach wspierających (CRM/helpdesk/analityka).

### 2.3 Magazyny i systemy
- system produkcyjny (DB),
- magazyn logów,
- system backupowy,
- narzędzia SaaS (CRM/helpdesk/komunikacja).

### 2.4 Punkty dostępu
- pracownicy działów operacyjnych,
- administratorzy systemów,
- upoważnieni dostawcy (na zasadzie need-to-know).

### 2.5 Kontrole mapowania
- kwartalny przegląd mapy danych,
- kontrola zgodności subprocesorów,
- aktualizacja przy wdrażaniu nowych integracji.
