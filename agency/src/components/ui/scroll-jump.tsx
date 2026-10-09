"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowDown, ArrowUp } from "lucide-react";

export default function ScrollJump() {
  const pathname = usePathname();
  const [direction, setDirection] = useState<"up" | "down">("down");
  const [visible, setVisible] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const target = useRef<HTMLElement | null>(null);
  const suppressUntil = useRef(0);

  useEffect(() => {
    let idle: ReturnType<typeof setTimeout>;
    const positions = new WeakMap<HTMLElement, number>();
    const doc = document.scrollingElement as HTMLElement;
    positions.set(doc, doc.scrollTop);
    suppressUntil.current = Date.now() + 200;
    setVisible(false);
    target.current = null;

    const onScroll = (event: Event) => {
      const element = event.target instanceof HTMLElement ? event.target : doc;
      const maximum = Math.max(0, element.scrollHeight - element.clientHeight);
      const position = Math.max(0, Math.min(maximum, element.scrollTop));
      const previous = positions.get(element) ?? 0;
      if (Date.now() < suppressUntil.current) { positions.set(element, position); return; }
      const delta = position - previous;
      if (Math.abs(delta) < 3) return;
      positions.set(element, position);
      clearTimeout(idle);
      if (maximum < 8 || (element === doc && document.body.style.overflow === "hidden")) { setVisible(false); return; }
      const next = delta > 0 ? "down" : "up";
      target.current = element;
      setDirection(next);
      setVisible(next === "down" ? position < maximum - 3 : position > 3);
      idle = setTimeout(() => setVisible(false), 1500);
    };
    const interruptJump = () => {
      suppressUntil.current = 0;
      const element = target.current || doc;
      positions.set(element, Math.max(0, Math.min(element.scrollHeight - element.clientHeight, element.scrollTop)));
    };
    const onKey = (event: KeyboardEvent) => { if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) interruptJump(); };

    // Listen in capture mode so the same control works in scrolling admin panels.
    document.addEventListener("scroll", onScroll, { capture: true, passive: true });
    document.addEventListener("wheel", interruptJump, { passive: true });
    document.addEventListener("touchmove", interruptJump, { passive: true });
    document.addEventListener("pointerdown", interruptJump, { passive: true });
    document.addEventListener("keydown", onKey);

    const clearance = () => {
      const notice = document.querySelector<HTMLElement>(".cookie-banner");
      button.current?.style.setProperty("--scroll-jump-clearance", notice ? `${notice.offsetHeight + 44}px` : "0px");
    };
    let notice: Element | null = null;
    const resize = new ResizeObserver(clearance);
    const observeNotice = () => {
      const current = document.querySelector(".cookie-banner");
      if (current !== notice) { resize.disconnect(); notice = current; if (notice) resize.observe(notice); }
      clearance();
    };
    const mutations = new MutationObserver(observeNotice);
    mutations.observe(document.body, { childList: true, subtree: true });
    observeNotice();
    return () => {
      clearTimeout(idle); mutations.disconnect(); resize.disconnect();
      document.removeEventListener("scroll", onScroll, true);
      document.removeEventListener("wheel", interruptJump);
      document.removeEventListener("touchmove", interruptJump);
      document.removeEventListener("pointerdown", interruptJump);
      document.removeEventListener("keydown", onKey);
    };
  }, [pathname]);

  const jump = () => {
    const element = target.current || document.scrollingElement as HTMLElement;
    setVisible(false);
    // The button's own smooth scroll should not summon another button.
    suppressUntil.current = Date.now() + 2500;
    const top = direction === "up" ? 0 : element.scrollHeight - element.clientHeight;
    const behavior = matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
    if (element === document.scrollingElement) window.scrollTo({ top, behavior });
    else element.scrollTo({ top, behavior });
  };
  const label = direction === "down" ? "Go to bottom" : "Go to top";
  return (
    <button ref={button} type="button" className="scroll-jump" data-visible={visible} aria-label={label} aria-hidden={!visible} tabIndex={visible ? 0 : -1} onClick={jump}>
      <span className="scroll-jump-icon" aria-hidden="true">{direction === "down" ? <ArrowDown size={18} /> : <ArrowUp size={18} />}</span>
      <span>{label}</span>
    </button>
  );
}
