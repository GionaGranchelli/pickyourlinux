export type TelemetryEvent = "flow_started" | "flow_completed";

const STORAGE_KEY = "picklinux.telemetry.enabled";

export const getTelemetryEnabled = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(STORAGE_KEY) === "true";
};

export const setTelemetryEnabled = (enabled: boolean) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, enabled ? "true" : "false");
};

export const sendTelemetry = (endpoint: string | undefined, event: TelemetryEvent) => {
  if (!endpoint) {
    return false;
  }

  const payload = {
    event,
    timestamp: new Date().toISOString(),
  };

  const body = JSON.stringify(payload);

  if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon(endpoint, blob);
    return true;
  }

  if (typeof fetch !== "undefined") {
    void fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    });
    return true;
  }

  return false;
};
