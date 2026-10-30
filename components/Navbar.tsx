"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
const L = [["/", "Home"], ["/about", "About"], ["/projects", "Projects"], ["/contact", "Contact"]];
export default function Navbar() {
  const p = usePathname(); const [o, s] = useState(false);
  useEffect(() => { s(false); }, [p]);
  useEffect(() => { const k = (e: KeyboardEvent) => { if (e.key === "Escape") s(false); }; addEventListener("keydown", k); return () => removeEventListener("keydown", k); }, []);
  return (
    <header className="nav"><div className="wrap nav-in">
      <Link href="/" className="logo" data-cursor="HOME">cyril<span className="lime">.</span>william</Link>
      <button className="burger" aria-expanded={o} aria-controls="menu" onClick={() => s(!o)}>{o ? "Close" : "Menu"}</button>
      <nav id="menu" className={o ? "open" : ""} aria-label="Main">
        {L.map(([h, t]) => <Link key={h} href={h} aria-current={(h === "/" ? p === h : p.startsWith(h)) ? "page" : undefined}>{t}</Link>)}
      </nav>
    </div></header>
  );
}
