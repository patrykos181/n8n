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

## Security baseline (dodane w gałęzi feature)

Implementacja obejmuje wymagane obszary:

1. **Logowanie + OAuth + reset hasła + email verification**
   - Endpointy: `/auth/register`, `/auth/login/password`, `/auth/login/oauth`, `/auth/password/reset/*`, `/auth/email/verify`.
2. **2FA (TOTP) + sesje + wykrywanie nietypowych logowań**
   - Endpoint `/auth/2fa/enable`; logowanie oznaczane flagą `unusualLogin` na bazie nowych IP.
3. **RBAC i uprawnienia granularne**
   - Role: Owner/Admin/Member/Viewer.
   - Uprawnienia workflow/secrets/billing/admin.
4. **Sekrety + rotacja kluczy**
   - `SecretStore` z szyfrowaniem AES-256-GCM i wersjonowaniem kluczy.
   - Rotacja przez `/admin/config/secret/rotate-key`.
5. **Rate limiting + WAF/security headers + CSRF + CORS + CSP**
   - Middleware: `express-rate-limit`, `helmet`, `csurf`, `cors`.
   - WAF: dopełniany przez reverse proxy (np. Cloudflare/AWS WAF) przed aplikacją.
6. **Audit logi operacji administracyjnych i zmian konfiguracji**
   - Zapisywane liniowo JSON do `audit.log`.

## Uruchomienie baseline

```bash
npm install
npm run check
npm run start:security-baseline
```

> To jest baseline referencyjny do dalszej integracji z produkcyjnym IdP, KMS/Vault i trwałą bazą danych.
