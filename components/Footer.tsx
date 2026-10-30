import { site } from "@/data/site";
import { Egg } from "./Fx";
export default function Footer() {
  return (
    <footer className="foot"><div className="wrap">
      <span>© {new Date().getFullYear()} {site.name} · {site.location}</span>
      <span><a href={site.links.github}>GitHub</a> · <a href={site.links.linkedin}>LinkedIn</a> · <a href={site.links.instagram}>Instagram</a></span>
      <Egg />
    </div></footer>
  );
}
