"use client";
import { useState, type FormEvent } from "react";
const EP = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

export default function ContactForm({ email }: { email: string }) {
  const [st, s] = useState<"idle" | "sending" | "ok" | "err">("idle");

  async function go(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    s("sending");

    if (EP) {
      try {
        const r = await fetch(EP, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(f) });
        if (r.ok) {
          s("ok");
          f.reset();
        } else {
          s("err");
        }
      } catch {
        s("err");
      }
    } else {
      // Direct mailto fallback with prefilled message
      const formData = new FormData(f);
      const name = formData.get("name") as string;
      const userEmail = formData.get("email") as string;
      const message = formData.get("message") as string;
      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${userEmail}\n\nMessage:\n${message}`);
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      s("ok");
      f.reset();
    }
  }

  return (
    <form onSubmit={go}>
      <label htmlFor="n">Your Name</label>
      <input id="n" name="name" required placeholder="e.g. Alex Sharma" autoComplete="name" />
      <label htmlFor="e">Your Email</label>
      <input id="e" name="email" type="email" required placeholder="name@example.com" autoComplete="email" />
      <label htmlFor="m">Message</label>
      <textarea id="m" name="message" rows={5} required placeholder="Tell me about your project, opportunity, or idea..." />
      <div className="row">
        <button className="btn" type="submit" disabled={st === "sending"}>
          {st === "sending" ? "Preparing message…" : "Send message &rarr;"}
        </button>
      </div>
      <p aria-live="polite" className={st === "ok" ? "lime" : "mut"} style={{ marginTop: "12px", fontSize: "0.95rem" }}>
        {st === "ok" && `Connecting to mail client for ${email}. Thank you!`}
        {st === "err" && `Something went wrong. Please email ${email} directly.`}
      </p>
    </form>
  );
}
