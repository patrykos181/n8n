# Branching, versioning and release process

## 1. Branch naming conventions

- `main` — production-ready branch.
- `develop` — integration branch for upcoming release.
- `feature/<scope>-<short-description>` — new functionality.
- `fix/<scope>-<short-description>` — bug fixes.
- `hotfix/<scope>-<short-description>` — emergency production fixes.
- `chore/<scope>-<short-description>` — maintenance and tooling changes.

Examples:

- `feature/api-order-search`
- `fix/web-login-redirect`
- `hotfix/worker-payment-retry`

## 2. Semantic commits

Use Conventional Commits:

- `feat`: new feature
- `fix`: bug fix
- `docs`: documentation
- `refactor`: code change without feature/fix
- `test`: tests
- `chore`: tooling/maintenance
- `ci`: CI/CD changes
- `perf`: performance improvement

Format:

```text
<type>(optional-scope): <subject>
```

Examples:

- `feat(api): add order search endpoint`
- `fix(worker): prevent duplicate invoice jobs`
- `docs(engineering): add API versioning rules`

## 3. Versioning

Project uses Semantic Versioning (`MAJOR.MINOR.PATCH`):

- **MAJOR** — breaking changes.
- **MINOR** — backward-compatible features.
- **PATCH** — backward-compatible bug fixes.

Rules:

- Any breaking API change requires a major bump and migration notes.
- Release tags follow `vX.Y.Z` (for example `v2.3.1`).
- Each release must reference the commit range included.

## 4. Release notes

Release notes are generated from semantic commits and grouped by type:

- Features
- Fixes
- Performance
- Refactors
- Docs
- Breaking changes (dedicated section)

Minimal release note template:

```md
## vX.Y.Z - YYYY-MM-DD

### Features
- ...

### Fixes
- ...

### Breaking changes
- ...
  - Migration: ...
```

## 5. Pull request rules

- PR title should follow Conventional Commits when possible.
- PR description must include:
  - what changed,
  - why,
  - impact/risk,
  - rollback plan (for production-impacting changes).
- At least one reviewer approval before merge to `main`.
