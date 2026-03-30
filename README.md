# Security baseline implementation

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

## Uruchomienie

```bash
npm install
npm run check
npm start
```

> To jest baseline referencyjny do dalszej integracji z produkcyjnym IdP, KMS/Vault i trwałą bazą danych.
