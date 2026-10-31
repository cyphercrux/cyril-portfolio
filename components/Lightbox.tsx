"use client";
import { useEffect, useState } from "react";
import Img from "./Img";
type I = { src: string; alt: string; caption?: string; approved: boolean };
export default function Lightbox({ images, contain = false }: { images: I[]; contain?: boolean }) {
  const [i, s] = useState<number | null>(null); const n = images.length;
  useEffect(() => {
    if (i === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") s(null);
      if (e.key === "ArrowRight") s((x) => (x === null ? x : (x + 1) % n));
      if (e.key === "ArrowLeft") s((x) => (x === null ? x : (x - 1 + n) % n));
    };
    addEventListener("keydown", k); document.body.style.overflow = "hidden";
    return () => { removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [i, n]);
  if (!n) return null;
  const cur = i === null ? null : images[i];
  return (
    <>
      <div className="thumbs">{images.map((m, j) => (
        <button key={m.src} className={"thumb" + (contain ? " contain" : "")} onClick={() => s(j)} data-cursor="VIEW" aria-label={`Open image: ${m.caption || m.alt}`}><Img img={m} contain={contain} sizes="240px" /></button>
      ))}</div>
      {cur && i !== null && (
        <div className="lb" role="dialog" aria-modal="true" aria-label="Image viewer" onClick={() => s(null)}>
          <button className="lb-x" autoFocus onClick={() => s(null)} aria-label="Close">&times;</button>
          {n > 1 && <button className="lb-n l" onClick={(e) => { e.stopPropagation(); s((i + n - 1) % n); }} aria-label="Previous image">‹</button>}
          <figure onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img key={cur.src} src={cur.src} alt={cur.alt} />
            <figcaption>{cur.caption}</figcaption>
          </figure>
          {n > 1 && <button className="lb-n r" onClick={(e) => { e.stopPropagation(); s((i + 1) % n); }} aria-label="Next image">›</button>}
        </div>
      )}
    </>
  );
}
