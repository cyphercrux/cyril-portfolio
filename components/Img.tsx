import Image from "next/image";
type I = { src: string; alt: string; approved: boolean };
export default function Img({ img, sizes = "(max-width:700px) 100vw, 50vw", priority = false, contain = false }: { img?: I; sizes?: string; priority?: boolean; contain?: boolean }) {
  if (!img || !img.approved) return <div className="ph" role="img" aria-label="Image coming soon"><span>Image coming soon</span></div>;
  return <Image src={img.src} alt={img.alt} fill sizes={sizes} priority={priority} style={{ objectFit: contain ? "contain" : "cover" }} />;
}
