# OpenAPI / generated-type notes

Stainless regenerates `src/resources/**` from `dedalus-labs/dedalus-openapi`.

## Safe contribution patterns

| Put here | Survives regen? |
|----------|-----------------|
| `src/lib/**` helpers (wait, retry wrappers) | Yes |
| `examples/**` | Yes |
| `tests/**` for lib helpers | Yes |
| Edits inside generated `machines.ts` methods | **No** — keep thin delegates only |
| Hand-edited OpenAPI YAML without Stainless pipeline access | Risky |

## Suggested upstream OpenAPI improvements

These are product/spec gaps that improve generated SDKs for everyone:

1. **Document lifecycle phases** (`accepted` → `running` → …) in the OpenAPI description for `LifecycleStatus.phase` so clients generate richer docs.
2. **Add `x-stainless-helper` / cookbook links** for create-and-wait flows (Stainless supports vendor extensions in some configs).
3. **Executions output schema** — ensure stdout/stderr fields are explicit on the execution resource so agents don’t need defensive coding.
4. **Error body `retryable: boolean`** — already used by some responses; document it so all SDKs share retry semantics.
5. **Watch stream** — document that the SSE stream closes at desired state (already in TS docstring; keep in OpenAPI `description`).

## What this PR does instead

- Non-generated wait helpers in `src/lib/machine-wait.ts`
- Thin resource delegates for DX
- Cookbook examples that teach durable agent state on the Machine filesystem

If you have access to the OpenAPI source of truth, prefer fixing schemas there and regenerating over long-lived hand patches in SDK repos.
