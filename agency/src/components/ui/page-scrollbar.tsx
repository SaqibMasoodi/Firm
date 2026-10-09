"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { usePathname } from "next/navigation";

type Metrics = { max: number; top: number; thumb: number; height: number; visible: boolean };
const initial: Metrics = { max: 0, top: 0, thumb: 32, height: 0, visible: false };

export default function PageScrollbar({ enabled = true }: { enabled?: boolean }) {
  const pathname = usePathname();
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ id: number; offset: number } | null>(null);
  const [metrics, setMetrics] = useState(initial);
  const [dragging, setDragging] = useState(false);
  const active = enabled && !pathname.startsWith("/admin");

  const measure = useCallback(() => {
    const doc = document.scrollingElement || document.documentElement;
    const height = trackRef.current?.getBoundingClientRect().height || 0;
    const max = Math.max(0, doc.scrollHeight - doc.clientHeight);
    const visible = active && max > 0 && document.body.style.overflow !== "hidden";
    const thumb = Math.min(height, Math.max(32, height * doc.clientHeight / doc.scrollHeight));
    document.documentElement.classList.toggle("has-drag-scrollbar", visible);
    setMetrics({ max, top: Math.min(max, Math.max(0, doc.scrollTop)), thumb, height, visible });
  }, [active]);

  useEffect(() => {
    if (!active) { document.documentElement.classList.remove("has-drag-scrollbar"); return; }
    let frame = 0;
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(measure); };
    const resize = new ResizeObserver(schedule);
    resize.observe(document.body); resize.observe(document.documentElement);
    const lock = new MutationObserver(schedule);
    lock.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    schedule();
    return () => {
      cancelAnimationFrame(frame); resize.disconnect(); lock.disconnect();
      window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule);
      document.documentElement.classList.remove("has-drag-scrollbar");
      dragRef.current = null;
    };
  }, [active, pathname, measure]);

  const scrollToPointer = (clientY: number, offset: number) => {
    const track = trackRef.current;
    if (!track) return;
    const travel = metrics.height - metrics.thumb;
    if (travel <= 0) return;
    const y = clientY - track.getBoundingClientRect().top - offset;
    window.scrollTo({ top: Math.max(0, Math.min(1, y / travel)) * metrics.max, behavior: "instant" });
  };
  const startDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0 || !metrics.visible) return;
    event.preventDefault();
    const isThumb = thumbRef.current?.contains(event.target as Node);
    const offset = isThumb ? event.clientY - thumbRef.current!.getBoundingClientRect().top : metrics.thumb / 2;
    dragRef.current = { id: event.pointerId, offset };
    event.currentTarget.setPointerCapture(event.pointerId);
    // Touch dragging should not focus the full-height track.
    if (event.pointerType === "mouse") event.currentTarget.focus({ preventScroll: true });
    setDragging(true);
    scrollToPointer(event.clientY, offset);
  };
  const stopDrag = () => { dragRef.current = null; setDragging(false); };
  const keyScroll = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = window.innerHeight * 0.8;
    const values: Record<string, number> = { ArrowDown: metrics.top + 48, ArrowUp: metrics.top - 48, PageDown: metrics.top + step, PageUp: metrics.top - step, Home: 0, End: metrics.max };
    if (!(event.key in values)) return;
    event.preventDefault();
    window.scrollTo({ top: Math.max(0, Math.min(metrics.max, values[event.key])), behavior: "instant" });
  };

  if (!active) return null;
  const position = metrics.max ? metrics.top / metrics.max * (metrics.height - metrics.thumb) : 0;
  return <div ref={trackRef} className={`page-scrollbar${dragging ? " is-dragging" : ""}`} data-visible={metrics.visible} role="scrollbar" aria-label="Page scroll" aria-orientation="vertical" aria-controls="main-content" aria-valuemin={0} aria-valuemax={Math.round(metrics.max)} aria-valuenow={Math.round(metrics.top)} tabIndex={metrics.visible ? 0 : -1}
    onPointerDown={startDrag}
    onPointerMove={event => { if (dragRef.current?.id === event.pointerId) scrollToPointer(event.clientY, dragRef.current.offset); }}
    onPointerUp={stopDrag} onPointerCancel={stopDrag} onLostPointerCapture={stopDrag} onKeyDown={keyScroll}>
    <div ref={thumbRef} className="page-scrollbar-thumb" style={{ height: metrics.thumb, transform: `translateY(${position}px)` }} />
  </div>;
}
