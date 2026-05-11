# ADR-003: Hook Provider Semantics — First Non-Undefined Return Wins

| Field | Value |
|---|---|
| ADR ID | ADR-003 |
| Title | Hook Provider Semantics — First Non-Undefined Return Wins |
| Status | Accepted |
| Date | 2026-04-28 |
| Authors | Shreyas Agarwal |
| Stakeholders | Core Backend, Platform Team |
| Decision Type | Component Architecture |
| Supersedes | None |
| Superseded By | None |

---

# 1. Context

The `createBaseApp` framework allows capabilities to register hook functions for named extension points (`domain.hookName`). This enables a modular architecture where different capabilities can extend the core platform's behavior.

In a complex system, multiple capabilities may register handlers for the same hook. For example, `workflowSharedCapability` might provide a default implementation for `reminder.enrichContext`, while an enterprise-specific capability might need to provide specialized context enrichment.

The framework must define a clear and predictable contract for how these multiple handlers are executed and how their results are returned to the caller.

---

# 2. Problem Statement

The hook runner requires a deterministic execution model that addresses the following challenges:
- **Multiple Registrations:** How should the system behave when more than one capability provides a handler for the same hook?
- **No-op Handlers:** What should the runner return if no registered handler provides a useful value?
- **Execution Order:** How is the priority of handlers determined?
- **Error Handling:** How should failures in individual hook handlers affect the overall request flow?

Without a standardized protocol, capability developers cannot reliably predict if their code will execute or how it will interact with other modules.

---

# 3. Architectural Considerations

The following principles influenced the selection of the hook semantics:
- **Simplicity:** The model should be easy for developers to understand—capabilities should ideally act as "providers" rather than complex "reducers."
- **Override Capability:** It must be possible for "higher-level" or "later-loaded" capabilities to override the behavior of "core" or "earlier-loaded" ones.
- **Predictability:** Registration order should consistently determine precedence.
- **Performance:** Avoid executing unnecessary hooks if a result has already been found.
- **Robustness:** Errors in hooks should not silently corrupt the system state unless explicitly configured.

---

# 4. Options Evaluated

## Option 1: First Non-Undefined Return Wins (Selected)

Execute hooks sequentially in registration order and return the first result that is not `undefined`.

### Advantages
- **Simple Mental Model:** The first provider with a "real" answer ends the search.
- **Natural Overrides:** An enterprise capability can shadow a core capability simply by being registered earlier in the array.
- **Efficiency:** Stops execution as soon as a result is obtained.

### Disadvantages
- **Order Dependency:** Requires discipline in managing the capability registration array.
- **Ambiguity:** `undefined` is used both for "no result" and "not handled."

---

## Option 2: Merge / Reduce Semantics

Run all registered hooks and shallow-merge their results into a single object.

### Advantages
- **Collaborative:** Multiple capabilities can contribute different parts of a result.

### Disadvantages
- **Complexity:** Requires strict coordination on the shape of the returned objects to avoid key collisions.
- **Overhead:** Executes all hooks even if a complete result is available early.

---

## Option 3: Throw on Multiple Registrations

Strictly enforce that only one capability can register for any given hook.

### Advantages
- **Zero Ambiguity:** Eliminates any conflict or ordering issues.

### Disadvantages
- **Inflexible:** Prevents layered composition where multiple modules might legitimately want to participate in an extension point (e.g., logging + enrichment).

---

# 5. Decision

The platform will adopt the **"First Non-Undefined Return Wins"** semantics for hook execution.

### Implementation Details

- **Sequential Execution:** Hooks are executed one-by-one in the order they were registered.
- **Short-Circuiting:** The first hook that returns a value other than `undefined` terminates execution and returns that value.
- **Fallback:** If all hooks return `undefined`, or if no hooks are registered, the runner returns `undefined`.
- **Async Support:** The runner supports `await` for each hook execution.

```js
// Reference Implementation (core/backend/bootstrap/hooks.js)
for (const hook of hooks) {
  const result = await hook(context);
  if (result !== undefined) return result; // First provider wins
}
return undefined;
```

---

# 6. Canonical Architectural Direction

The framework treats capabilities as **authoritative providers**. The system is designed such that the most specific capability (determined by registration order) takes precedence.

Any code calling `runHook` is responsible for handling a potential `undefined` result by providing a sensible default or fallback.

---

# 7. Principles Adopted

- **Provider-Centricity:** Capabilities provide answers; they do not modify other's answers.
- **Registration Order Precedence:** Precedence is explicitly tied to the order of the capability array in `server.js`.
- **Fail-Fast Safety:** Errors in hooks propagate and abort the request by default (`failFast: true`).
- **Explicit Fallbacks:** Callers must treat `undefined` as "not handled."

---

# 8. Consequences

## Positive Consequences
- **Clear Override Path:** Enterprise or site-specific logic can easily override core defaults.
- **Reduced Complexity:** Developers don't need to worry about how their results will be merged or reduced with others.
- **Performance:** Minimal execution overhead for multi-registered hooks.

## Negative Consequences
- **Silent Shadowing:** A hook registered later in the array might never run if an earlier one always returns a value.
- **Contract Strictness:** Callers must be disciplined about providing fallbacks for `undefined` returns.

---

# 9. Future Considerations

- **Typed Registration:** Moving toward a system where hook priorities can be explicitly defined rather than relying solely on array order.
- **Startup Validation:** Implementing a check at system startup to warn about potential hook conflicts or unintended shadowing.
- **Telemetry:** Adding logging to track which hook provider actually "won" for a given request to aid in debugging.

---

# 10. Final Rationale

The "First Non-Undefined Return Wins" strategy was selected because it provides the most robust support for a **layered capability architecture**. It allows the system to be highly extensible while maintaining a simple and predictable execution flow that is easy to reason about during development and debugging.