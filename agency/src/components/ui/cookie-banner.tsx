"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const NOTICE_KEY = "northforge_cookie_notice_v1";
const OPEN_NOTICE_EVENT = "northforge:open-cookie-notice";
const TITLE = "Cookies & your privacy";
const BODY = "We use browser storage to remember this notice and your intro animation. This site does not currently use analytics or advertising cookies.";

export function CookieNoticeButton() {
  return <button type="button" className="button-secondary" onClick={() => window.dispatchEvent(new Event(OPEN_NOTICE_EVENT))}>Review cookie notice</button>;
}

export default function CookieBanner({ delaySeconds = 3, animate = true }: { delaySeconds?: number; animate?: boolean }) {
  const pathname = usePathname();
  const excluded = pathname.startsWith("/admin") || pathname === "/the-foundry";
  const bannerRef = useRef<HTMLElement>(null);
  const controlsRef = useRef<HTMLButtonElement>(null);
  const policyRef = useRef<HTMLAnchorElement>(null);
  const [phase, setPhase] = useState<"hidden" | "visible" | "leaving">("hidden");
  const [letters, setLetters] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let frame = 0;
    let scheduled = false;
    const unread = () => {
      try { return localStorage.getItem(NOTICE_KEY) !== "acknowledged"; }
      catch { return true; }
    };
    const cancel = () => { scheduled = true; clearTimeout(timer); cancelAnimationFrame(frame); };
    const open = () => { cancel(); setPhase("visible"); };
    const trySchedule = () => {
      if (excluded || scheduled || !unread() || document.readyState !== "complete" || document.querySelector(".splash-overlay:not(.force-play)")) return;
      scheduled = true;
      // Start after the page can paint without the splash, rather than guessing its duration.
      frame = requestAnimationFrame(() => {
        timer = setTimeout(() => { if (unread()) setPhase("visible"); }, delaySeconds * 1000);
      });
    };
    const observer = new MutationObserver(trySchedule);
    if (!excluded && unread()) observer.observe(document.body, { childList: true, subtree: true });
    const sync = (event: StorageEvent) => {
      if (event.key === NOTICE_KEY && event.newValue === "acknowledged") {
        cancel(); setPhase(current => current === "hidden" ? "hidden" : "leaving");
      }
    };
    window.addEventListener("load", trySchedule);
    window.addEventListener(OPEN_NOTICE_EVENT, open);
    window.addEventListener("storage", sync);
    trySchedule();
    return () => {
      cancel(); observer.disconnect();
      window.removeEventListener("load", trySchedule);
      window.removeEventListener(OPEN_NOTICE_EVENT, open);
      window.removeEventListener("storage", sync);
    };
  }, [pathname, excluded, delaySeconds]);

  useLayoutEffect(() => {
    const banner = bannerRef.current;
    if (!banner || phase === "hidden" || excluded) return;
    const reduced = !animate || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (phase === "leaving") {
        gsap.set(banner, { opacity: 1, scaleX: 1, scaleY: 1, y: 0 });
        gsap.to(banner, { opacity: 0, scale: reduced ? 1 : 0.97, y: reduced ? 0 : 8, duration: reduced ? 0 : 0.22, ease: "power2.inOut", onComplete: () => setPhase("hidden") });
        return;
      }
      setReady(false); setLetters(0);
      if (reduced) {
        gsap.set([banner, controlsRef.current, policyRef.current], { opacity: 1, scale: 1, y: 0 });
        setLetters(TITLE.length + BODY.length); setReady(true);
        return;
      }
      const typed = { count: 0 };
      gsap.set(banner, { opacity: 0, scaleX: 0.08, scaleY: 0.48, y: 14, transformOrigin: "center bottom" });
      gsap.set([controlsRef.current, policyRef.current], { opacity: 0, y: 6 });
      const tl = gsap.timeline({ onComplete: () => setReady(true) });
      tl.to(banner, { opacity: 1, duration: 0.12 }, 0);
      tl.to(banner, { scaleX: 1, scaleY: 1, y: 0, duration: 0.52, ease: "power2.inOut" }, 0);
      // The hammer's brief overshoot and damped rebound, scaled down for the banner.
      tl.to(banner, { keyframes: [
        { scaleX: 1.012, scaleY: 1.018, duration: 0.08, ease: "power2.out" },
        { scaleX: 0.997, scaleY: 0.994, duration: 0.1, ease: "sine.inOut" },
        { scaleX: 1, scaleY: 1, duration: 0.2, ease: "elastic.out(1, 0.45)" },
      ] });
      tl.to(typed, { count: TITLE.length + BODY.length, duration: 1.25, ease: "none", onUpdate: () => setLetters(Math.floor(typed.count)) });
      tl.to([controlsRef.current, policyRef.current], { opacity: 1, y: 0, duration: 0.2, ease: "power2.inOut" });
    }, banner);
    return () => ctx.revert();
  }, [phase, excluded, animate]);

  function acknowledge() {
    try { localStorage.setItem(NOTICE_KEY, "acknowledged"); } catch {}
    setPhase("leaving");
  }

  if (phase === "hidden" || excluded) return null;
  return (
    <aside ref={bannerRef} className={`cookie-banner cookie-banner-expanding ${phase === "leaving" ? "is-leaving" : ""}`} aria-labelledby="cookie-notice-title">
      <div className="cookie-banner-content">
        <h2 id="cookie-notice-title" className="text-size-regular weight-semibold cookie-type-line">
          <span className="cookie-type-reserve">{TITLE}</span><span className="cookie-type-visual" aria-hidden="true">{TITLE.slice(0, letters)}</span>
        </h2>
        <p className="cookie-type-line"><span className="cookie-type-reserve">{BODY}</span><span className="cookie-type-visual" aria-hidden="true">{BODY.slice(0, Math.max(0, letters - TITLE.length))}</span></p>
        <Link ref={policyRef} className="cookie-policy-link" href="/policies#cookies" tabIndex={ready ? 0 : -1} aria-hidden={!ready}>Read our policies</Link>
      </div>
      <button ref={controlsRef} type="button" className="button" onClick={acknowledge} disabled={!ready || phase === "leaving"}>Got it</button>
    </aside>
  );
}
