"use client";
import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";

export function Reveal({
  children,
  delay = 0,
  as: T = "div",
  style,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  style?: React.CSSProperties;
  className?: string;
}) {
  const r = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = r.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return <T ref={r} className={`rv ${className}`.trim()} style={{ ...style, transitionDelay: `${delay}ms` }}>{children}</T>;
}

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null), ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!matchMedia("(pointer:fine)").matches || matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    document.body.classList.add("has-cursor");
    const d = dot.current!, g = ring.current!;
    let x = -100, y = -100, rx = -100, ry = -100, raf = 0;
    const mv = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY; d.style.transform = `translate(${x}px,${y}px)`;
      const t = e.target as HTMLElement;
      const c = t.closest?.("[data-cursor]") as HTMLElement | null;
      const txt = !!t.closest?.("input,textarea");
      g.dataset.label = c?.dataset.cursor || "";
      g.classList.toggle("hot", !!t.closest?.("a,button,[data-cursor]"));
      g.classList.toggle("txt", txt); d.classList.toggle("txt", txt);
    };
    const dn = () => g.classList.add("press"), up = () => g.classList.remove("press");
    const loop = () => { rx += (x - rx) * 0.16; ry += (y - ry) * 0.16; g.style.transform = `translate(${rx}px,${ry}px)`; raf = requestAnimationFrame(loop); };
    addEventListener("mousemove", mv); addEventListener("mousedown", dn); addEventListener("mouseup", up); raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); removeEventListener("mousemove", mv); removeEventListener("mousedown", dn); removeEventListener("mouseup", up); document.body.classList.remove("has-cursor"); };
  }, []);
  return <><div ref={ring} className="c-ring" data-label="" aria-hidden="true"><span /></div><div ref={dot} className="c-dot" aria-hidden="true" /></>;
}

export function ScrollProgress() {
  const r = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const f = () => { const h = document.documentElement; r.current!.style.transform = `scaleX(${h.scrollTop / (h.scrollHeight - h.clientHeight || 1)})`; };
    f(); addEventListener("scroll", f, { passive: true }); addEventListener("resize", f);
    return () => { removeEventListener("scroll", f); removeEventListener("resize", f); };
  }, []);
  return <div className="prog" ref={r} aria-hidden="true" />;
}

export function Egg() {
  const [o, s] = useState(false);
  return <button className="egg" onClick={() => s(!o)} aria-pressed={o}>{o ? "⚡ Circuit closed. Hello there." : "○ open circuit"}</button>;
}
