import React, { useEffect, useState } from "react";

type Smoke = { app: string; dbConnected: boolean; dbTime?: string };

export default function App() {
    const [data, setData] = useState<Smoke | null>(null);
    const [err, setErr] = useState<string | null>(null);

    useEffect(() => {
        const base = process.env.REACT_APP_API_BASE || "http://localhost:8080/api";
        fetch(`${base}/smoke`)
            .then(r => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                return r.json();
            })
            .then(setData)
            .catch(e => setErr((e as Error).message));
    }, []);

    return (
        <div style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
            <h1>Smoke Test: Frontend → Backend → MySQL</h1>
            {err && <pre style={{ color: "crimson" }}>Error: {err}</pre>}
            {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading…</p>}
        </div>
    );
}
