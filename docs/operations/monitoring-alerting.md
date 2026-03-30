# Monitoring, SLO/SLA i alerting on-call

## 1) Monitoring: metrics, logs, traces

### Stack referencyjny
- **Metrics**: Prometheus + Alertmanager
- **Logs**: Loki + Promtail
- **Traces**: OpenTelemetry Collector + Tempo/Jaeger
- **Dashboardy**: Grafana

### Kluczowe metryki (RED + USE)
- **Request Rate** (`http_requests_total`)
- **Error Rate** (`5xx`, błędy workflow)
- **Duration** (`p95`, `p99` dla endpointów i kolejek)
- Zużycie CPU, RAM, dysku, I/O
- Długość kolejek i czas przetwarzania jobów

### Logi
- Ustrukturyzowane JSON (wymagane pola):
  - `timestamp`, `level`, `service`, `env`, `request_id`, `trace_id`, `message`
- Retencja:
  - dev: 7 dni
  - stage: 14 dni
  - prod: 30-90 dni (zależnie od compliance)

### Tracing
- Instrumentacja OpenTelemetry (HTTP, DB, kolejki)
- 100% trace dla błędów, sampling adaptacyjny dla ruchu OK
- Korelacja `trace_id` z logami i metrykami

## 2) SLA / SLO

### Przykładowe cele
- **SLA (prod)**: 99.9% dostępności miesięcznie
- **SLO latency (prod)**: p95 < 500 ms
- **SLO error budget**: max 0.1% błędnych requestów/miesiąc

### Dashboardy wymagane
- Executive SLA/SLO (availability, error budget burn)
- Service health (RED)
- Infra health (CPU/RAM/dysk/network)
- Incident dashboard (timeline + top errors)

## 3) Alerting i on-call

### Zasady alertowania
- Tylko alerty **actionable** (z runbookiem)
- Priorytety:
  - **P1**: pełna niedostępność / utrata danych
  - **P2**: degradacja krytyczna
  - **P3**: degradacja niekrytyczna
- Escalation policy:
  - 0-10 min: primary on-call
  - 10-20 min: secondary
  - >20 min: incident commander + manager

### Kanały
- PagerDuty/Opsgenie (paging)
- Slack `#incidents` (koordynacja)
- Email (podsumowania postmortem)

## 4) Runbooki incydentów

Runbooki znajdują się w:
- `docs/operations/runbooks/p1-service-down.md`
- `docs/operations/runbooks/p2-high-error-rate.md`

Każdy runbook zawiera:
- Kryterium wejścia (jak rozpoznać incydent)
- Szybką diagnozę (metryki/logi/traces)
- Kroki mitigacji
- Warunki rollbacku
- Warunki zamknięcia incydentu
