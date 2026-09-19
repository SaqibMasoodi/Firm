"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ScrollReveal from "@/components/ui/scroll-reveal";

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
        <div style={{ color: "var(--grey-text)", lineHeight: 1.6 }}>
          <div style={{ color: "var(--green, #CBFB45)", fontWeight: 600, marginBottom: "0.5rem" }}>
            FOUNDRY OS [Version 4.2.0.892] // INDUSTRIAL SYSTEM TERMINAL
          </div>
          <div>All subsystems operational. Anvil calibrated to 120fps.</div>
          <div>
            Type <span style={{ color: "var(--green, #CBFB45)", fontWeight: 600 }}>help</span> to list available commands, or <span style={{ color: "var(--green, #CBFB45)", fontWeight: 600 }}>agartha</span> for subterranean archives.
          </div>
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
          <div style={{ color: "var(--white)", lineHeight: 1.7 }}>
            <div style={{ color: "var(--green, #CBFB45)", fontWeight: 600, marginBottom: "0.25rem" }}>
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
          <div style={{ color: "var(--white)", lineHeight: 1.7 }}>
            <div style={{ color: "var(--green, #CBFB45)", fontWeight: 600 }}>[FORGE DIAGNOSTICS: NOMINAL]</div>
            <div>Core Temperature:    1,450°C (Molten Steel Crucible)</div>
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
            <pre style={{ margin: 0, fontFamily: "inherit", fontSize: "0.875rem" }}>
{`
   * . ' *   . ' *  . ' *
       \\   |   //
     [⚒ CLANG! ⚒]
   ═════════════════════
   [ SYSTEM TEMPERED ]
`}
            </pre>
            <div style={{ color: "var(--white)", marginTop: "0.25rem" }}>
              [OK] Impact recorded at 0.14s velocity. Sparks dispersed.
            </div>
          </div>
        );
        break;

      case "craft":
        output = (
          <div style={{ color: "var(--white)", lineHeight: 1.7 }}>
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
          <div style={{ color: "#FF6B6B" }}>
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
    <div className="page-wrapper">
      {/* 1. Subpage Hero Header */}
      <header className="section-subpage-hero-header">
        <div className="padding-global">
          <div className="container-large">
            <div className="section-padding-large">
              <div className="subpage-header-component">
                <div className="header-content">
                  <ScrollReveal>
                    <div className="tagline-pill">
                      <div>Terminal OS</div>
                    </div>
                  </ScrollReveal>
                  <div className="margin-bottom margin-small">
                    <ScrollReveal delay={0.1}>
                      <h1 className="heading-style-h1">The Foundry</h1>
                    </ScrollReveal>
                  </div>
                  <ScrollReveal delay={0.15}>
                    <p className="text-size-medium max-width-small">
                      Command-line interface to the Northforge engine. Run diagnostics, execute strikes,
                      and query subterranean archives.
                    </p>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Terminal Container using standard card corners & brand surface */}
      <section style={{ paddingBottom: "6rem" }}>
        <div className="padding-global">
          <div className="container-large">
            <div
              onClick={() => inputRef.current?.focus()}
              style={{
                backgroundColor: "var(--black)",
                borderRadius: "2.5rem",
                padding: "clamp(1.5rem, 4vw, 3rem)",
                color: "var(--white)",
                fontFamily: "var(--font-inter), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                fontSize: "0.9375rem",
                display: "flex",
                flexDirection: "column",
                minHeight: "520px",
                cursor: "text",
                boxSizing: "border-box",
              }}
            >
              {/* Terminal Header Bar */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                  paddingBottom: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "100rem",
                      backgroundColor: "var(--green, #CBFB45)",
                    }}
                  />
                  <span style={{ fontWeight: 600, color: "var(--white)", fontSize: "0.875rem" }}>
                    NORTHFORGE // THE FOUNDRY
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", fontSize: "0.8125rem" }}>
                  <Link
                    href="/agartha"
                    style={{ color: "var(--green, #CBFB45)", textDecoration: "none", fontWeight: 500 }}
                  >
                    [Access Agartha]
                  </Link>
                  <Link
                    href="/"
                    style={{ color: "var(--grey-text)", textDecoration: "none" }}
                  >
                    [← Return Home]
                  </Link>
                </div>
              </div>

              {/* Terminal History */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1rem", overflowY: "auto" }}>
                {history.map((item) => (
                  <div key={item.id} style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                    {item.command !== undefined && (
                      <div style={{ display: "flex", gap: "0.5rem", color: "var(--green, #CBFB45)" }}>
                        <span>northforge@foundry:~$</span>
                        <span style={{ color: "var(--white)" }}>{item.command}</span>
                      </div>
                    )}
                    {item.output && <div>{item.output}</div>}
                  </div>
                ))}

                {/* Active Prompt */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--green, #CBFB45)" }}>
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
                      color: "var(--white)",
                      fontFamily: "inherit",
                      fontSize: "inherit",
                      padding: 0,
                    }}
                  />
                </div>
                <div ref={terminalEndRef} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
