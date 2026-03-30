# Runbook P2: High Error Rate

## Trigger
- Error rate > 2% przez 10 min (prod) albo > 5% przez 10 min (stage).

## Immediate actions
1. Potwierdź skok błędów na dashboardzie RED.
2. Zidentyfikuj endpoint/workflow z największym udziałem 5xx.
3. Jeśli po wdrożeniu canary: zatrzymaj promocję i rollback canary.

## Diagnosis
- Segmentacja błędów według endpointu, regionu, wersji.
- Weryfikacja zależności zewnętrznych (DB, kolejki, API partnerów).

## Mitigation
- Rollback ostatniej zmiany aplikacyjnej.
- Ograniczenie ruchu (rate limiting) na problematyczne ścieżki.
- Włączenie degradacji kontrolowanej (feature flags).

## Exit criteria
- Error rate < 1% przez 30 min
- p95 latency wraca do SLO

## Post-incident
- Aktualizacja testów regresji
- Aktualizacja alertów, by zmniejszyć noise
