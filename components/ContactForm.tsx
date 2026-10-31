"use client";
import { useState, type FormEvent } from "react";

export default function ContactForm({ email }: { email: string }) {
  const [st, s] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function go(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    s("sending");
    setErrorMessage("");

    const formData = new FormData(f);
    const name = formData.get("name") as string;
    const userEmail = formData.get("email") as string;
    const message = formData.get("message") as string;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email: userEmail, message }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        s("ok");
        f.reset();
      } else {
        const errText = data.error || "Failed to send message.";
        setErrorMessage(errText);
        s("err");
      }
    } catch {
      setErrorMessage("Network error occurred. Please send via direct email.");
      s("err");
    }
  }

  function handleMailtoFallback() {
    const form = document.querySelector("form") as HTMLFormElement | null;
    if (form) {
      const formData = new FormData(form);
      const name = formData.get("name") as string;
      const userEmail = formData.get("email") as string;
      const message = formData.get("message") as string;
      const subject = encodeURIComponent(`Portfolio Inquiry from ${name || "Visitor"}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${userEmail}\n\nMessage:\n${message}`);
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    } else {
      window.location.href = `mailto:${email}`;
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
          {st === "sending" ? "Sending message…" : "Send message"}
        </button>
      </div>
      <div aria-live="polite" style={{ marginTop: "12px", fontSize: "0.95rem" }}>
        {st === "ok" && (
          <p className="lime" style={{ margin: 0, fontWeight: 500 }}>
            Message sent successfully to {email}. I&apos;ll get back to you shortly!
          </p>
        )}
        {st === "err" && (
          <div>
            <p className="mut" style={{ color: "#ef4444", marginBottom: "8px" }}>
              {errorMessage}
            </p>
            <button
              type="button"
              className="btn ghost"
              onClick={handleMailtoFallback}
              style={{ fontSize: "0.85rem", padding: "8px 14px" }}
            >
              Send directly via email ({email})
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
