export interface LogEntry {
  level: "debug" | "info" | "warn" | "error";
  message: string;
  context?: Record<string, unknown>;
  timestamp: string;
}

export function createLogger(scope: string) {
  return {
    log(level: LogEntry["level"], message: string, context?: Record<string, unknown>): LogEntry {
      const entry: LogEntry = { level, message, context, timestamp: new Date().toISOString() };
      // eslint-disable-next-line no-console
      console.log(`[${scope}] ${level.toUpperCase()} ${message}`, context ?? "");
      return entry;
    },
  };
}
