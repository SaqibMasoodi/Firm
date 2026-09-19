"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface HistoryItem {
  id: string;
  command?: string;
  output: React.ReactNode;
}

export default function FoundryPage() {
  const router = useRouter();
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: "init-1",
      output: (
        <div style={{ color: "#A1A1AA", lineHeight: 1.6 }}>
          <div style={{ color: "var(--green, #CBFB45)", fontWeight: 700, marginBottom: "8px" }}>
            FOUNDRY OS [Version 4.2.0.892] // INDUSTRIAL SYSTEM TERMINAL
          </div>
          <div>All subsystems operational. Anvil calibrated to 120fps.</div>
          <div>Type <span style={{ color: "var(--green, #CBFB45)", fontWeight: 600 }}>help</span> to list available commands, or <span style={{ color: "var(--green, #CBFB45)", fontWeight: 600 }}>agartha</span> for subterranean archives.</div>
        </div>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const id = Date.now().toString();

    if (!trimmed) {
      setHistory((prev) => [...prev, { id, command: "", output: null }]);
      return;
    }

    if (trimmed === "clear") {
      setHistory([]);
      return;
    }

    if (trimmed === "exit") {
      router.push("/");
      return;
    }

    if (trimmed === "agartha") {
      router.push("/agartha");
      return;
    }

    let output: React.ReactNode;

    switch (trimmed) {
      case "help":
        output = (
          <div style={{ color: "#D4D4D8", lineHeight: 1.7 }}>
            <div style={{ color: "var(--green, #CBFB45)", fontWeight: 600, marginBottom: "4px" }}>
              AVAILABLE SYSTEM COMMANDS:
            </div>
            <div>• <span style={{ color: "var(--green, #CBFB45)" }}>status</span>   - Run live hardware & forge diagnostics</div>
            <div>• <span style={{ color: "var(--green, #CBFB45)" }}>strike</span>   - Execute anvil impact sequence</div>
            <div>• <span style={{ color: "var(--green, #CBFB45)" }}>craft</span>    - Review Northforge engineering pillars</div>
            <div>• <span style={{ color: "var(--green, #CBFB45)" }}>agartha</span>  - Access classified subterranean directory</div>
            <div>• <span style={{ color: "var(--green, #CBFB45)" }}>clear</span>    - Clear terminal buffer</div>
            <div>• <span style={{ color: "var(--green, #CBFB45)" }}>exit</span>     - Return to surface (Home)</div>
          </div>
        );
        break;

      case "status":
        output = (
          <div style={{ color: "#D4D4D8", lineHeight: 1.7 }}>
            <div style={{ color: "var(--green, #CBFB45)", fontWeight: 600 }}>[FORGE DIAGNOSTICS: NOMINAL]</div>
            <div>Core Temperature:    <span style={{ color: "#FF5555" }}>1,450°C</span> (Molten Steel Crucible)</div>
            <div>Anvil Pressure:       <span style={{ color: "var(--green, #CBFB45)" }}>450 MPa</span></div>
            <div>Hydraulic Cycle:      <span style={{ color: "var(--green, #CBFB45)" }}>Synchronized at 120Hz</span></div>
            <div>Active Workers:       11 Turbopack static workers</div>
            <div>Subterranean Tunnel:  Secure (/agartha)</div>
          </div>
        );
        break;

      case "strike":
        output = (
          <div style={{ color: "var(--green, #CBFB45)", lineHeight: 1.6 }}>
            <pre style={{ margin: 0, fontFamily: "monospace", fontSize: "13px" }}>
{`
   * . ' *   . ' *  . ' *
       \\   |   //
     [⚒ CLANG! ⚒]
   ═════════════════════
   [ SYSTEM TEMPERED ]
`}
            </pre>
            <div style={{ color: "#FFFFFF", marginTop: "4px" }}>
              [OK] Impact recorded at 0.14s velocity. Sparks dispersed.
            </div>
          </div>
        );
        break;

      case "craft":
        output = (
          <div style={{ color: "#D4D4D8", lineHeight: 1.7 }}>
            <div style={{ color: "var(--green, #CBFB45)", fontWeight: 600 }}>NORTHFORGE LABS // CAPABILITIES:</div>
            <div>01. High-Performance Web & Mobile Architecture</div>
            <div>02. AI-Driven Automation & Intelligent Systems</div>
            <div>03. Bespoke Digital Product Design & Micro-Interactions</div>
            <div>04. Enterprise Infrastructure & Scale Engineering</div>
          </div>
        );
        break;

      default:
        output = (
          <div style={{ color: "#EF4444" }}>
            Command not recognized: "{cmd}". Type <span style={{ color: "var(--green, #CBFB45)" }}>help</span> for available commands.
          </div>
        );
    }

    setHistory((prev) => [...prev, { id, command: cmd, output }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
      setInputVal("");
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      style={{
        minHeight: "100vh",
        backgroundColor: "#171717",
        color: "#E4E4E7",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        padding: "clamp(20px, 4vw, 50px)",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          paddingBottom: "16px",
          marginBottom: "24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "var(--green, #CBFB45)",
              
            }}
          />
          <span style={{ fontWeight: 700, color: "#FFFFFF", fontSize: "14px", letterSpacing: "1px" }}>
            NORTHFORGE // THE FOUNDRY
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "12px" }}>
          <Link
            href="/agartha"
            style={{ color: "var(--green, #CBFB45)", textDecoration: "none", fontWeight: 600 }}
          >
            [Access Agartha]
          </Link>
          <Link
            href="/"
            style={{ color: "rgba(255, 255, 255, 0.6)", textDecoration: "none" }}
          >
            [← Return Home]
          </Link>
        </div>
      </div>

      {/* Terminal History */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px", overflowY: "auto" }}>
        {history.map((item) => (
          <div key={item.id} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {item.command !== undefined && (
              <div style={{ display: "flex", gap: "8px", color: "var(--green, #CBFB45)" }}>
                <span>northforge@foundry:~$</span>
                <span style={{ color: "#FFFFFF" }}>{item.command}</span>
              </div>
            )}
            {item.output && <div>{item.output}</div>}
          </div>
        ))}

        {/* Active Command Input Line */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--green, #CBFB45)" }}>
          <span>northforge@foundry:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            spellCheck={false}
            autoComplete="off"
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#FFFFFF",
              fontFamily: "inherit",
              fontSize: "inherit",
              padding: 0,
            }}
          />
        </div>
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
}
