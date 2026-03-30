# Engineering conventions

## 1. Naming conventions

### 1.1 Files and folders

- **Folders**: kebab-case (`user-profile`, `order-service`).
- **TypeScript files**: kebab-case (`create-order.command.ts`, `orders.controller.ts`).
- **React components**: PascalCase filename for component entry (`UserProfileCard.tsx`), helper files in kebab-case.
- **Tests**:
  - unit: `*.spec.ts` / `*.spec.tsx`
  - integration: `*.int.spec.ts`
  - e2e: `*.e2e.spec.ts`

### 1.2 Code symbols

- **Classes / interfaces / types / enums**: PascalCase.
- **Functions and variables**: camelCase.
- **Constants**:
  - global/env constants: UPPER_SNAKE_CASE,
  - local constants: camelCase.
- **Booleans**: prefiksy `is`, `has`, `can`, `should`.
- **Async functions**: include verb indicating operation (`fetchOrders`, `enqueueInvoiceJob`).

## 2. Error handling guidelines

### 2.1 General

- Never swallow errors (`catch {}` without rethrow/log is forbidden).
- Keep one canonical error format per transport (HTTP, GraphQL, queue).
- Preserve causal chain (`cause`) when wrapping lower-level errors.
- Return machine-readable `code` and human-readable `message`.

### 2.2 API layer

- Map domain errors to transport-level status deterministically.
- Avoid leaking internal details (SQL, stack traces, secrets).
- Minimal error shape for REST:

```json
{
  "code": "RESOURCE_NOT_FOUND",
  "message": "Order 123 not found",
  "requestId": "req_abc123"
}
```

### 2.3 Worker / queue

- Retry only transient errors (network timeout, temporary dependency outages).
- Mark poison messages explicitly and route to DLQ.
- Emit structured logs with `jobId`, `attempt`, `queueName` and `traceId`.

## 3. API guidelines (REST + GraphQL)

## 3.1 Contract-first

- Define schemas/contracts before implementation.
- Every contract change must include changelog entry and migration note when breaking.
- Keep API examples in docs synchronized with actual response shapes.

### 3.2 REST

- Use plural nouns for collections (`/orders`, `/users`).
- Use idempotent semantics correctly:
  - `GET` read-only,
  - `POST` create,
  - `PUT` replace,
  - `PATCH` partial update,
  - `DELETE` remove.
- Return consistent pagination envelope (`items`, `nextCursor`, `totalCount?`).

### 3.3 GraphQL

- Use explicit input/object types (`CreateOrderInput`, `OrderConnection`).
- Prefer cursor pagination for lists.
- Expose stable error codes through extensions.
- Deprecate fields first; remove only in major version.

### 3.4 Versioning and compatibility

- REST versions via path prefix (`/v1`, `/v2`) when breaking changes are unavoidable.
- GraphQL breaking changes only in major releases; use `@deprecated` for transition.
- Additive changes are preferred over in-place mutation.
