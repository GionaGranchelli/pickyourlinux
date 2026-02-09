import { useDecisionEngine as createDecisionEngine, type DecisionEngine } from "~/engine/state";

let clientEngine: DecisionEngine | null = null;
const fallbackTranslate = (key: string) => key;

export function useDecisionEngine(t: (key: string) => string = fallbackTranslate): DecisionEngine {
  if (import.meta.client) {
    if (!clientEngine) {
      clientEngine = createDecisionEngine(t);
    }
    return clientEngine;
  }

  // On server, never share state across requests.
  return createDecisionEngine(t);
}
