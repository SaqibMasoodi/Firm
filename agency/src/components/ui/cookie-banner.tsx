"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const NOTICE_KEY = "northforge_cookie_notice_v1";
const OPEN_NOTICE_EVENT = "northforge:open-cookie-notice";

export function CookieNoticeButton() {
  return (
    <button type="button" className="button-secondary" onClick={() => window.dispatchEvent(new Event(OPEN_NOTICE_EVENT))}>
      Review cookie notice
    </button>
  );
}

export default function CookieBanner() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<"hidden" | "visible" | "leaving">("hidden");

  useEffect(() => {
    const open = () => setPhase("visible");
    const frame = requestAnimationFrame(() => {
      try {
        if (localStorage.getItem(NOTICE_KEY) !== "acknowledged") open();
      } catch {
        // The notice remains usable when browser storage is unavailable.
        open();
      }
    });
    const sync = (event: StorageEvent) => {
      if (event.key === NOTICE_KEY && event.newValue === "acknowledged") {
        setPhase((current) => current === "hidden" ? "hidden" : "leaving");
      }
    };
    window.addEventListener(OPEN_NOTICE_EVENT, open);
    window.addEventListener("storage", sync);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener(OPEN_NOTICE_EVENT, open);
      window.removeEventListener("storage", sync);
    };
  }, []);

  function acknowledge() {
    try {
      localStorage.setItem(NOTICE_KEY, "acknowledged");
    } catch {
      // Dismiss for this visit even if the browser cannot remember it.
    }
    setPhase("leaving");
  }

  if (phase === "hidden" || pathname.startsWith("/admin") || pathname === "/the-foundry") return null;

  return (
    <aside
      className={`cookie-banner ${phase === "leaving" ? "is-leaving" : ""}`}
      aria-labelledby="cookie-notice-title"
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget && phase === "leaving") setPhase("hidden");
      }}
    >
      <div className="cookie-banner-content">
        <h2 id="cookie-notice-title" className="text-size-regular weight-semibold">Cookies &amp; your privacy</h2>
        <p>
          We use browser storage to remember this notice and your intro animation.
          This site does not currently use analytics or advertising cookies.{" "}
          <Link href="/policies#cookies">Read our policies</Link>.
        </p>
      </div>
      <button type="button" className="button" onClick={acknowledge} disabled={phase === "leaving"}>Got it</button>
    </aside>
  );
}
