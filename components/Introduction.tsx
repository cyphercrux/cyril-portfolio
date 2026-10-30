"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Img from "@/components/Img";
import { site } from "@/data/site";

const roles = [
  "Electrical Engineering Student",
  "Embedded Systems Enthusiast",
  "IoT Developer",
  "EV Technology Explorer",
  "Hardware and Automation Enthusiast",
];

function TypingText({ text, active }: { text: string; active: boolean }) {
  const [displayed, setDisplayed] = useState("");
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    if (!active) {
      setDisplayed("");
      return;
    }
    let i = 0;
    setDisplayed("");
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 65);
    return () => clearInterval(timer);
  }, [text, active]);

  useEffect(() => {
    const blinker = setInterval(() => setCursor((c) => !c), 500);
    return () => clearInterval(blinker);
  }, []);

  return (
    <span>
      {displayed}
      <span
        style={{
          display: "inline-block",
          width: "3px",
          height: "0.85em",
          background: "var(--lime)",
          marginLeft: "4px",
          verticalAlign: "middle",
          opacity: cursor ? 1 : 0,
          transition: "opacity 0.15s",
        }}
      />
    </span>
  );
}

function RoleCycler({ active }: { active: boolean }) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pause" | "deleting">("typing");
  const [text, setText] = useState("");

  useEffect(() => {
    if (!active) {
      setText("");
      setIndex(0);
      setPhase("typing");
      return;
    }

    const currentRole = roles[index];

    if (phase === "typing") {
      if (text.length < currentRole.length) {
        const t = setTimeout(() => {
          setText(currentRole.slice(0, text.length + 1));
        }, 55);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("pause"), 2200);
        return () => clearTimeout(t);
      }
    }

    if (phase === "pause") {
      const t = setTimeout(() => setPhase("deleting"), 400);
      return () => clearTimeout(t);
    }

    if (phase === "deleting") {
      if (text.length > 0) {
        const t = setTimeout(() => {
          setText(text.slice(0, -1));
        }, 28);
        return () => clearTimeout(t);
      } else {
        setIndex((prev) => (prev + 1) % roles.length);
        setPhase("typing");
      }
    }
  }, [phase, text, index, active]);

  return (
    <span style={{ color: "var(--lime)", fontWeight: 600 }}>
      {text}
      <span
        style={{
          display: "inline-block",
          width: "2px",
          height: "0.9em",
          background: "var(--violet)",
          marginLeft: "4px",
          verticalAlign: "middle",
          animation: "pl 1.5s infinite",
        }}
      />
    </span>
  );
}

export default function Introduction() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let wasInView = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !wasInView) {
          setInView(true);
          setAnimationKey((k) => k + 1);
          wasInView = true;
        } else if (!entry.isIntersecting) {
          wasInView = false;
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="intro" ref={sectionRef}>
      <div className="wrap">
        <div className="intro-grid">
          <div>
            <p className="mut" style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <span className="pulse" />
              <span>{site.location} &middot; University of Mumbai</span>
            </p>

            <h2 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3.6rem)", margin: "0 0 12px" }}>
              <TypingText key={`name-${animationKey}`} text="CYRIL WILLIAM" active={inView} />
            </h2>

            <div style={{ minHeight: "36px", marginBottom: "24px", fontSize: "1.15rem" }}>
              <RoleCycler key={`role-${animationKey}`} active={inView} />
            </div>

            <div style={{ color: "var(--fg)", lineHeight: 1.7, fontSize: "1.05rem", display: "flex", flexDirection: "column", gap: "14px" }}>
              <p><b>Hey, I&apos;m Cyril William.</b></p>
              <p>
                I&apos;m an Electrical Engineering student interested in turning technical curiosity into practical solutions.
                From electrical panel testing and industrial systems to embedded electronics, IoT, and EV battery safety,
                I enjoy exploring the intersection of hardware, automation, and intelligent technology.
              </p>
              <p className="mut">
                I believe engineering is not just about understanding how things work. It&apos;s about building solutions that make a difference.
              </p>
            </div>

            <div className="row">
              <Link className="btn" href="/projects" data-cursor="WORK">
                Explore My Projects &rarr;
              </Link>
              <Link className="btn ghost" href="/about" data-cursor="ABOUT">
                About &amp; Resume
              </Link>
            </div>

            <div style={{ marginTop: "24px" }}>
              {["Embedded Systems", "IoT", "EV Battery Safety", "Industrial Panels", "Automation"].map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>

          <div className="portrait-wrapper">
            <div className="portrait float">
              <Img
                priority
                sizes="(max-width:900px) 80vw, 310px"
                img={{
                  src: site.images.portrait,
                  alt: site.images.portraitAlt,
                  approved: true,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

