# Monorepo skeleton

## Struktura

- `apps/web` — frontend.
- `apps/api` — REST/GraphQL.
- `apps/worker` — obsługa kolejek i zadań asynchronicznych.
- `packages/ui` — współdzielone komponenty UI.
- `packages/shared` — wspólne typy, utilsy i kontrakty domenowe.
- `infra/` — IaC, deployment i konfiguracja środowisk.

## Jakość kodu

- Lint: `npm run lint`
- Format: `npm run format` / `npm run format:check`
- Typecheck: `npm run typecheck`
- Hooki:
  - `pre-commit` → `lint-staged`
  - `commit-msg` → `commitlint`

## Konwencje i proces wydawniczy

- Engineering conventions: `docs/engineering/conventions.md`
- Branching/versioning/release notes: `docs/engineering/release-process.md`
