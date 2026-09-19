"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SplashScreen from "@/components/ui/splash-screen";

interface HistoryItem {
  id: string;
  command?: string;
  output: React.ReactNode;
}

export default function FoundryPage() {
  const router = useRouter();
  const [inputVal, setInputVal] = useState("");
  const [isPlayingSplash, setIsPlayingSplash] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [shouldCrash, setShouldCrash] = useState(false);

  if (shouldCrash) {
    throw new Error("Simulated system exception from The Foundry terminal.");
  }

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
            Type <span style={{ color: "var(--green, #CBFB45)", fontWeight: 600 }}>help</span> to list available commands, or <span style={{ color: "var(--green, #CBFB45)", fontWeight: 600 }}>exit</span> to return home.
          </div>
        </div>
      ),
    },
  ]);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, []);

  // Auto focus and auto scroll on history change
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  // Global keystroke listener: typing anywhere focuses terminal input
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (isPlayingSplash) return;
      // Don't capture modifier combinations (Ctrl, Alt, Meta)
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      if (document.activeElement !== inputRef.current) {
        if (e.key.length === 1 || e.key === "Enter" || e.key === "Backspace") {
          inputRef.current?.focus();
        }
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isPlayingSplash]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const id = Date.now().toString();

    // Add to command history stack if not empty
    if (trimmed) {
      setCommandHistory((prev) => [...prev, cmd.trim()]);
      setHistoryIndex(-1);
    }

    if (!trimmed) {
      // Pressing enter on empty line creates prompt newline and scrolls down
      setHistory((prev) => [...prev, { id, command: "", output: null }]);
      return;
    }

    if (trimmed === "clear") {
      setHistory([]);
      return;
    }

    if (trimmed === "exit" || trimmed === "home") {
      router.push("/");
      return;
    }

    if (trimmed === "agartha") {
      router.push("/agartha");
      return;
    }

    if (trimmed === "crash" || trimmed === "simulate-error") {
      setShouldCrash(true);
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
            <div>• <span style={{ color: "var(--green, #CBFB45)" }}>splash</span>   - Replay master splash sequence & hammer strike</div>
            <div>• <span style={{ color: "var(--green, #CBFB45)" }}>strike</span>   - Execute anvil impact sequence</div>
            <div>• <span style={{ color: "var(--green, #CBFB45)" }}>craft</span>    - Review Northforge engineering pillars</div>
            <div>• <span style={{ color: "var(--green, #CBFB45)" }}>agartha</span>  - Access subterranean archives</div>
            <div>• <span style={{ color: "var(--green, #CBFB45)" }}>clear</span>    - Clear terminal buffer</div>
            <div>• <span style={{ color: "var(--green, #CBFB45)" }}>crash</span>    - Simulate unhandled runtime exception (test error.tsx)</div>
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

      case "splash":
        setIsPlayingSplash(true);
        output = (
          <div style={{ color: "var(--green, #CBFB45)", lineHeight: 1.6 }}>
            <div>[FORGE] Initializing master cinematic splash sequence...</div>
            <div style={{ color: "var(--grey-text)" }}>Press any key or wait for the sequence to complete.</div>
          </div>
        );
        break;

      case "strike":
        output = (
          <div style={{ color: "var(--green, #CBFB45)", lineHeight: 1.6 }}>
            <pre style={{ margin: 0, fontFamily: "inherit", fontSize: "0.875rem", overflowX: "auto" }}>
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
            Command not recognized: &quot;{cmd}&quot;. Type <span style={{ color: "var(--green, #CBFB45)" }}>help</span> for available commands.
          </div>
        );
    }

    setHistory((prev) => [...prev, { id, command: cmd, output }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
      setInputVal("");
      setTimeout(scrollToBottom, 10);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(commandHistory[nextIndex] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputVal("");
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex] || "");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={() => inputRef.current?.focus()}
      style={{
        width: "100%",
        minHeight: "100vh",
        height: "100vh",
        backgroundColor: "var(--black, #0A0A0A)",
        color: "var(--white, #FFFFFF)",
        fontFamily: "var(--font-inter), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        fontSize: "clamp(0.875rem, 1.5vw, 0.9375rem)",
        padding: "clamp(1rem, 2.5vw, 2.5rem)",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        boxSizing: "border-box",
        cursor: "text",
      }}
    >
      {isPlayingSplash && (
        <SplashScreen
          forcePlay={true}
          onComplete={() => {
            setIsPlayingSplash(false);
            inputRef.current?.focus();
            setHistory((prev) => [
              ...prev,
              {
                id: Date.now().toString(),
                output: (
                  <div style={{ color: "var(--green, #CBFB45)" }}>
                    [OK] Splash sequence complete. System tempered.
                  </div>
                ),
              },
            ]);
            setTimeout(scrollToBottom, 50);
          }}
        />
      )}

      {/* Terminal Minimal Top Status Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.75rem",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          paddingBottom: "1rem",
          marginBottom: "1.5rem",
          userSelect: "none",
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
          <span style={{ fontWeight: 600, color: "var(--white)", fontSize: "0.875rem", letterSpacing: "0.02em" }}>
            NORTHFORGE // THE FOUNDRY OS [v4.2.0]
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", fontSize: "0.8125rem" }}>
          <Link
            href="/agartha"
            style={{ color: "var(--green, #CBFB45)", textDecoration: "none", fontWeight: 500 }}
          >
            [agartha]
          </Link>
          <Link
            href="/"
            style={{ color: "var(--grey-text)", textDecoration: "none" }}
          >
            [exit]
          </Link>
        </div>
      </div>

      {/* Terminal History & Prompts */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.85rem" }}>
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

        {/* Active Command Input */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--green, #CBFB45)" }}>
          <span style={{ flexShrink: 0 }}>northforge@foundry:~$</span>
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
              caretColor: "var(--green, #CBFB45)",
              fontFamily: "inherit",
              fontSize: "inherit",
              padding: 0,
              margin: 0,
            }}
          />
        </div>
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
}
