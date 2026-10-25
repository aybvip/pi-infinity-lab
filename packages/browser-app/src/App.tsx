import React, { useState } from "react";

export function App() {
  const [status, setStatus] = useState<"unknown" | "ok" | "down">("unknown");
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: 24, maxWidth: 960, margin: "0 auto" }}>
      <h1>PI INFINITY LAB — Dashboard</h1>
      <p style={{ color: "#555" }}>
        Independent developer tooling. Not affiliated with Pi Network. Mock data labelled.
      </p>
      <section style={{ marginTop: 24, padding: 16, border: "1px solid #ddd", borderRadius: 8 }}>
        <h2>RPC Endpoint Status</h2>
        <p>Status: <strong>{status}</strong></p>
        <button onClick={() => setStatus("ok")}>Mark OK (demo)</button>
      </section>
      <section style={{ marginTop: 24, padding: 16, border: "1px solid #ddd", borderRadius: 8 }}>
        <h2>Protocol Proposals</h2>
        <p>RFC templates available in <code>packages/protocol-lab/templates</code>.</p>
      </section>
    </div>
  );
}
