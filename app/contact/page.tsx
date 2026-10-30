import type { Metadata } from "next";
import { site } from "@/data/site";
import ContactForm from "@/components/ContactForm";
export const metadata: Metadata = { title: "Contact" };
export default function Contact() {
  const rows: [string, string, string][] = [
    ["Email", site.email, `mailto:${site.email}`], ["Phone", site.phone, `tel:${site.phone.replace(/\s/g, "")}`],
    ["LinkedIn", "linkedin.com/in/cyrilwilliam", site.links.linkedin], ["GitHub", "github.com/cyphercrux", site.links.github], ["Instagram", "@_cyril_william_", site.links.instagram],
  ];
  return (
    <div className="wrap"><section>
      <h1>LET&apos;S BUILD SOMETHING <span className="gradient-text-lime-purple">THAT MATTERS.</span></h1>
      <p className="lead mut" style={{ maxWidth: "640px", marginBottom: "36px" }}>
        Have an engineering opportunity, a project idea, or an interesting problem to solve? Let&apos;s connect.
      </p>
      <div className="cols">
        <div className="box">
          <h3 className="font-display" style={{ marginBottom: "16px" }}>Direct <span className="gradient-text-lime-purple">Channels</span></h3>
          <p className="mut" style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
            <span className="pulse" />
            <span>{site.location}</span>
          </p>
          {rows.map(([k, t, h]) => (
            <p key={k} style={{ marginBottom: "12px" }}>
              <span className="mut">{k}: </span>
              <a className="lime" href={h} style={{ fontWeight: 500 }}>{t}</a>
            </p>
          ))}
        </div>
        <div className="box">
          <h3 className="font-display" style={{ marginBottom: "16px" }}>Send a <span className="gradient-text-lime-purple">Direct Message</span></h3>
          <ContactForm email={site.email} />
        </div>
      </div>
    </section></div>
  );
}
