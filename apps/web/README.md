# apps/web

Minimalna strona prezentacyjna projektu z podstawowym quality gate (lint, typecheck, test).

## Uruchomienie lokalne

```bash
npm run --workspace @n8n/web dev
```

Aplikacja będzie dostępna pod adresem: `http://localhost:4173`.

## Build

```bash
npm run --workspace @n8n/web build
```

Wynik trafia do katalogu `apps/web/dist`.

## Quality gate

```bash
npm run --workspace @n8n/web lint
npm run --workspace @n8n/web typecheck
npm run --workspace @n8n/web test
```
