# Runbook P1: Service Down

## Trigger
- Brak odpowiedzi healthcheck > 5 min **lub** dostępność < 99% w ciągu 15 min.

## Immediate actions (0-10 min)
1. Potwierdź incydent na dashboardzie SLA/SLO.
2. Sprawdź ostatni deployment (CD pipeline).
3. Jeśli związane z rolloutem: wykonaj rollback do ostatniej stabilnej wersji.
4. Przełącz ruch na green (blue/green fallback), jeśli blue jest uszkodzony.

## Diagnosis
- Metryki: request rate, 5xx, saturacja zasobów.
- Logi: skok błędów krytycznych.
- Traces: najwolniejsze i błędne ścieżki.

## Mitigation
- Skalowanie poziome (HPA)
- Restart wadliwych podów
- Tymczasowe wyłączenie kosztownych feature-flag

## Exit criteria
- Dostępność > 99.9% przez min. 30 min
- Brak aktywnych alertów P1

## Post-incident
- RCA do 24h
- Action items z ownerami i datą
