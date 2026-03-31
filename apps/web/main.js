const yearElement = document.getElementById("year");
const whyUsSection = document.getElementById("why-us");

if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}

if (whyUsSection) {
  whyUsSection.insertAdjacentHTML(
    "beforebegin",
    `
      <section id="case-studies" class="section section-alt">
        <div class="container">
          <h2>Case studies i wyniki</h2>
          <p>Przykładowe wdrożenia pokazujące konkretne metryki biznesowe i operacyjne.</p>
          <div class="feature-grid">
            <article>
              <h3>Biuro rachunkowe (35 osób)</h3>
              <p><strong>Zakres:</strong> automatyzacja obiegu dokumentów i wysyłki przypomnień do klientów.</p>
              <p><strong>Efekt:</strong> oszczędność ~62 godzin miesięcznie oraz skrócenie procesu z 3 dni do 1 dnia.</p>
              <p><strong>Jakość:</strong> redukcja błędów ręcznego przepisywania danych o 43%.</p>
            </article>
            <article>
              <h3>E-commerce B2C (50 tys. zamówień/mies.)</h3>
              <p><strong>Zakres:</strong> automatyzacja statusów zamówień, zwrotów i aktualizacji CRM.</p>
              <p><strong>Efekt:</strong> skrócenie czasu obsługi zgłoszeń z 18h do 4h (SLA -78%).</p>
              <p><strong>Jakość:</strong> spadek liczby błędów w statusach zamówień o 51%.</p>
            </article>
            <article>
              <h3>Software house (120 osób)</h3>
              <p><strong>Zakres:</strong> automatyzacja handoffu leadów i raportowania pipeline sprzedaży.</p>
              <p><strong>Efekt:</strong> skrócenie procesu kwalifikacji leadów z 2 dni do 2 godzin.</p>
              <p><strong>Jakość:</strong> 100% leadów z kompletem danych oraz -37% zduplikowanych wpisów.</p>
            </article>
          </div>
          <div class="logo-wall" aria-label="Logo klientów i partnerów (za zgodą)">
            <p class="eyebrow">Wybrane marki i partnerzy (za zgodą)</p>
            <ul>
              <li>Logo klienta A</li>
              <li>Logo klienta B</li>
              <li>Logo partnera C</li>
              <li>Logo klienta D</li>
              <li>Logo partnera E</li>
            </ul>
          </div>
          <div class="testimonials">
            <article>
              <p>„Tu wstaw krótką referencję klienta (po uzyskaniu zgody na publikację).”</p>
              <p><strong>Imię i nazwisko, stanowisko, firma</strong></p>
            </article>
            <article>
              <p>„Tu wstaw drugą referencję opisującą wynik biznesowy wdrożenia.”</p>
              <p><strong>Imię i nazwisko, stanowisko, firma</strong></p>
            </article>
          </div>
        </div>
      </section>

      <section id="process" class="section">
        <div class="container">
          <h2>Proces wdrożenia krok po kroku</h2>
          <p>Standardowy harmonogram dla pierwszego MVP obejmuje 2–4 tygodnie.</p>
          <ol class="process-list">
            <li>
              <h3>1. Discovery i priorytety (2–3 dni)</h3>
              <p>Warsztat procesowy, wybór use case’ów oraz ustalenie KPI i właścicieli procesu.</p>
            </li>
            <li>
              <h3>2. Projekt techniczny (2 dni)</h3>
              <p>Architektura workflow, dobór integracji API/webhook i plan obsługi błędów.</p>
            </li>
            <li>
              <h3>3. Implementacja MVP (5–8 dni)</h3>
              <p>Budowa automatyzacji, konfiguracja środowiska, testy funkcjonalne i bezpieczeństwa.</p>
            </li>
            <li>
              <h3>4. Go-live i szkolenie (1–2 dni)</h3>
              <p>Uruchomienie na produkcji, instruktaż dla zespołu oraz monitoring pierwszych uruchomień.</p>
            </li>
            <li>
              <h3>5. Optymalizacja 30-dniowa</h3>
              <p>Przegląd wyników, poprawki wydajności i plan kolejnych automatyzacji.</p>
            </li>
          </ol>
        </div>
      </section>

      <section id="portfolio" class="section section-alt">
        <div class="container">
          <h2>Mini-portfolio gotowych automatyzacji</h2>
          <div class="portfolio-grid">
            <article>
              <h3>CRM i sprzedaż</h3>
              <ul>
                <li>Lead routing do handlowców na podstawie segmentu i źródła.</li>
                <li>Automatyczne follow-upy po demo oraz aktualizacja statusów w CRM.</li>
                <li>Alerty o leadach wysokiej intencji w Slack/Teams.</li>
              </ul>
            </article>
            <article>
              <h3>E-commerce</h3>
              <ul>
                <li>Synchronizacja zamówień, płatności i statusów dostaw.</li>
                <li>Automatyzacja procesu zwrotów i powiadomień dla klienta.</li>
                <li>Raport marży i sprzedaży dziennej do dashboardu zarządczego.</li>
              </ul>
            </article>
            <article>
              <h3>Finanse</h3>
              <ul>
                <li>Automatyczne uzgadnianie faktur z płatnościami.</li>
                <li>Przypomnienia o płatnościach i eskalacje należności przeterminowanych.</li>
                <li>Generowanie miesięcznych raportów cashflow.</li>
              </ul>
            </article>
            <article>
              <h3>HR i operacje</h3>
              <ul>
                <li>Onboarding pracownika: konta, checklista i powiadomienia dla działów.</li>
                <li>Automatyzacja obiegu wniosków urlopowych i akceptacji.</li>
                <li>Zbieranie danych do oceny okresowej i raportów HR.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section id="faq" class="section">
        <div class="container">
          <h2>Najczęstsze obawy</h2>
          <div class="faq-list">
            <article>
              <h3>„Czy to nie będzie zbyt skomplikowane dla naszego zespołu?”</h3>
              <p>Projektujemy rozwiązania pod konkretne role i procesy, a na starcie szkolimy zespół na realnych przykładach.</p>
            </article>
            <article>
              <h3>„Co jeśli automatyzacja przestanie działać?”</h3>
              <p>Każdy workflow ma monitoring, alerty i procedury awaryjne. W pakiecie utrzymaniowym zapewniamy SLA reakcji.</p>
            </article>
            <article>
              <h3>„Czy integracja z naszymi narzędziami jest możliwa?”</h3>
              <p>Pracujemy na API i webhookach, łącząc najczęściej CRM, ERP, e-commerce, helpdesk i narzędzia finansowe.</p>
            </article>
            <article>
              <h3>„Kiedy zobaczymy pierwsze efekty?”</h3>
              <p>Pierwszy proces MVP uruchamiamy zwykle w 2–4 tygodnie, a pierwsze metryki biznesowe raportujemy po 30 dniach.</p>
            </article>
          </div>
        </div>
      </section>
    `,
  );
}
