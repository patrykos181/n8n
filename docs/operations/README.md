# Operational Readiness

Ten katalog wdraża wymagania:
1. CI: lint, testy, security scan, dependency audit, build
2. CD: środowiska dev/stage/prod + blue/green i canary
3. Monitoring: metrics/logs/traces + dashboardy SLA/SLO
4. Alerting on-call + runbooki incydentowe
5. Backup/restore + testy DR + cele RTO/RPO

## Pliki
- `.github/workflows/ci.yml`
- `.github/workflows/cd.yml`
- `docs/operations/monitoring-alerting.md`
- `docs/operations/backup-dr.md`
- `docs/operations/runbooks/*`
- `scripts/dr-test.sh`
