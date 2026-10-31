"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const LiquidMetalCanvas = dynamic(
  () => import("@/components/LiquidMetalCanvas"),
  {
    ssr: false,
    loading: () => <div style={{ position: "absolute", inset: 0, background: "#050505" }} />,
  }
);

export default function Hero() {
  const [webglSupported, setWebglSupported] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const showAnimation = webglSupported && !prefersReducedMotion;

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "94vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "40px 0 60px",
      }}
    >
      {/* 1. Real-time cinematic WebGL liquid-metal canvas */}
      {showAnimation ? (
        <LiquidMetalCanvas onFallback={() => setWebglSupported(false)} />
      ) : (
        /* 2. Static artwork fallback for reduced motion or non-WebGL devices */
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <Image
            src="/images/hero/cyril-portfolio-hero.webp"
            alt="Cyril Portfolio - Liquid metal artwork in neon lime, royal purple, and deep black"
            fill
            priority
            sizes="100vw"
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>
      )}

      {/* Atmospheric lighting & contrast shields (pointer-events: none) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 50%, rgba(5,5,5,0.78) 0%, rgba(5,5,5,0.45) 45%, transparent 75%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, transparent 65%, rgba(5,5,5,0.85) 90%, var(--bg) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Central Hero Typography */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "0 20px",
          maxWidth: "960px",
        }}
      >
        <p
          className="mut font-display"
          style={{
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            fontSize: "clamp(0.8rem, 1.8vw, 1.1rem)",
            marginBottom: "16px",
            color: "var(--lime)",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span className="pulse" />
          <span>Electrical Engineering &middot; IoT &middot; EV Technology</span>
        </p>

        <h1
          className="font-display"
          style={{
            fontSize: "clamp(3rem, 9vw, 6.5rem)",
            letterSpacing: "0.08em",
            margin: "0 0 10px",
            lineHeight: 1.05,
            textShadow: "0 8px 32px rgba(0,0,0,0.8)",
          }}
        >
          <span className="gradient-text-lime-purple">CYRIL</span>{" "}
          <span style={{ color: "var(--fg)" }}>PORTFOLIO</span>
        </h1>

        <p
          className="mut"
          style={{
            fontSize: "clamp(1rem, 2.2vw, 1.25rem)",
            maxWidth: "620px",
            margin: "20px auto 36px",
            lineHeight: 1.6,
            textShadow: "0 4px 16px rgba(0,0,0,0.9)",
          }}
        >
          Turning curiosity into circuits, ideas into prototypes, and engineering
          principles into intelligent, real-world solutions.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
          <a href="#intro" className="btn" data-cursor="EXPLORE">
            Explore Portfolio &darr;
          </a>
          <Link href="/projects" className="btn ghost" data-cursor="PROJECTS">
            View Case Studies &rarr;
          </Link>
        </div>
      </div>

      {/* Scroll indicator with subtle gradient styling */}
      <a
        href="#intro"
        className="scroll-pill"
        style={{
          position: "absolute",
          bottom: "26px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 20,
        }}
        data-cursor="SCROLL"
      >
        <span>SCROLL DOWN</span>
        <span className="arrow">&darr;</span>
      </a>
    </section>
  );
}
