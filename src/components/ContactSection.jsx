import React, { useState } from "react";
import { siteConfig } from "../config/site";
import { Mail, MapPin, Linkedin, Instagram, Github, Send, CheckCircle2, AlertCircle, Copy, Check } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Full name is required";
    if (!formData.email.trim()) {
      errs.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!formData.subject.trim()) errs.subject = "Subject is required";
    if (!formData.message.trim()) {
      errs.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errs.message = "Message should be at least 10 characters";
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const vErrors = validate();
    if (Object.keys(vErrors).length > 0) {
      setErrors(vErrors);
      return;
    }
    setIsSubmitting(true);
    const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      `[Portfolio Inquiry] ${formData.subject}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.open(mailto, "_blank");
    }, 700);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="section-padding border-b border-[#1f1f24] bg-[#050505] relative">
      <div className="container">
        <div className="max-w-3xl mb-16">
          <div className="pill pill-lime mb-3">
            <span>04 // INITIATE TRANSMISSION</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl text-[#F5F5F5] uppercase tracking-tight mb-4">
            LET'S BUILD <span className="text-[#C6FF00]">SOMETHING MEANINGFUL.</span>
          </h2>
          <p className="text-base text-[#A1A1AA] leading-relaxed">
            Open for engineering internships, hardware project discussions, and IoT collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="editorial-card bg-[#0e0e11]">
              <span className="text-[11px] font-mono text-[#71717A] uppercase block mb-1">
                DIRECT EMAIL INBOX
              </span>
              <div className="flex items-center justify-between gap-3">
                <a href={`mailto:${siteConfig.email}`} className="font-heading font-bold text-base sm:text-lg text-[#F5F5F5] hover:text-[#C6FF00] transition-colors break-all">
                  {siteConfig.email}
                </a>
                <button onClick={copyEmail} className="p-2 rounded bg-[#16161b] border border-[#292930] text-[#A1A1AA] hover:text-[#C6FF00] transition-colors cursor-pointer">
                  {copied ? <Check className="w-4 h-4 text-[#C6FF00]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="editorial-card bg-[#0e0e11]">
              <span className="text-[11px] font-mono text-[#71717A] uppercase block mb-1">
                LOCATION
              </span>
              <div className="flex items-center gap-3 text-[#F5F5F5] font-heading font-semibold text-base">
                <MapPin className="w-4 h-4 text-[#A855F7]" />
                <span>{siteConfig.location}</span>
              </div>
            </div>

            <div className="editorial-card bg-[#0e0e11]">
              <span className="text-[11px] font-mono text-[#71717A] uppercase block mb-4">
                CONNECTED CHANNELS
              </span>
              <div className="grid grid-cols-3 gap-3">
                <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-lg bg-[#141418] border border-[#26262e] hover:border-[#A855F7] flex flex-col items-center gap-1.5 transition-all">
                  <Linkedin className="w-5 h-5 text-[#A855F7]" />
                  <span className="text-xs font-mono text-[#A1A1AA]">LinkedIn</span>
                </a>
                <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className="p-3 rounded-lg bg-[#141418] border border-[#26262e] hover:border-[#C6FF00] flex flex-col items-center gap-1.5 transition-all">
                  <Github className="w-5 h-5 text-[#C6FF00]" />
                  <span className="text-xs font-mono text-[#A1A1AA]">GitHub</span>
                </a>
                <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="p-3 rounded-lg bg-[#141418] border border-[#26262e] hover:border-[#A855F7] flex flex-col items-center gap-1.5 transition-all">
                  <Instagram className="w-5 h-5 text-[#A855F7]" />
                  <span className="text-xs font-mono text-[#A1A1AA]">Instagram</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7">
            <div className="editorial-card bg-[#0a0a0d] border-[#25252c]">
              <h3 className="font-heading font-bold text-xl text-[#F5F5F5] mb-6 flex items-center justify-between">
                <span>Send a Direct Message</span>
                <span className="text-xs font-mono font-normal text-[#71717A]">Pre-routed</span>
              </h3>

              {isSubmitted ? (
                <div className="p-6 rounded-lg bg-[#102014] border border-[#1b4322] flex flex-col items-center text-center gap-3">
                  <CheckCircle2 className="w-10 h-10 text-[#C6FF00]" />
                  <h4 className="font-heading font-bold text-lg text-[#F5F5F5]">Message Initiated</h4>
                  <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-md">
                    Your default email client has opened with the pre-filled message. You can also reach me directly at <span className="text-[#C6FF00] font-mono">{siteConfig.email}</span>.
                  </p>
                  <button onClick={() => { setIsSubmitted(false); setFormData({ name: "", email: "", subject: "", message: "" }); }} className="mt-3 btn btn-secondary text-xs">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-mono text-[#A1A1AA] uppercase">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={(e) => { setFormData({ ...formData, name: e.target.value }); if (errors.name) setErrors({ ...errors, name: null }); }}
                        placeholder="Your Name"
                        className={`w-full px-3.5 py-2.5 rounded bg-[#131316] border text-sm text-[#F5F5F5] focus:outline-none focus:border-[#C6FF00] transition-colors ${errors.name ? "border-red-500" : "border-[#25252b]"}`}
                      />
                      {errors.name && <span className="text-[11px] text-red-400 font-mono flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</span>}
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-mono text-[#A1A1AA] uppercase">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => { setFormData({ ...formData, email: e.target.value }); if (errors.email) setErrors({ ...errors, email: null }); }}
                        placeholder="your@email.com"
                        className={`w-full px-3.5 py-2.5 rounded bg-[#131316] border text-sm text-[#F5F5F5] focus:outline-none focus:border-[#C6FF00] transition-colors ${errors.email ? "border-red-500" : "border-[#25252b]"}`}
                      />
                      {errors.email && <span className="text-[11px] text-red-400 font-mono flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</span>}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-mono text-[#A1A1AA] uppercase">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={(e) => { setFormData({ ...formData, subject: e.target.value }); if (errors.subject) setErrors({ ...errors, subject: null }); }}
                      placeholder="Subject"
                      className={`w-full px-3.5 py-2.5 rounded bg-[#131316] border text-sm text-[#F5F5F5] focus:outline-none focus:border-[#C6FF00] transition-colors ${errors.subject ? "border-red-500" : "border-[#25252b]"}`}
                    />
                    {errors.subject && <span className="text-[11px] text-red-400 font-mono flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.subject}</span>}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-mono text-[#A1A1AA] uppercase">Message *</label>
                    <textarea
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={(e) => { setFormData({ ...formData, message: e.target.value }); if (errors.message) setErrors({ ...errors, message: null }); }}
                      placeholder="Share details regarding your inquiry..."
                      className={`w-full px-3.5 py-2.5 rounded bg-[#131316] border text-sm text-[#F5F5F5] focus:outline-none focus:border-[#C6FF00] transition-colors resize-none ${errors.message ? "border-red-500" : "border-[#25252b]"}`}
                    />
                    {errors.message && <span className="text-[11px] text-red-400 font-mono flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.message}</span>}
                  </div>

                  <button type="submit" disabled={isSubmitting} className="btn btn-primary mt-2 w-full justify-center">
                    {isSubmitting ? "Transmitting..." : <><span>Transmit Message</span><Send className="w-4 h-4" /></>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
