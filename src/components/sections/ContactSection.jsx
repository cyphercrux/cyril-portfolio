import React, { useState } from "react";
import { siteConfig } from "../../config/site";
import SelectionReveal from "../../animations/SelectionReveal";
import {
  Mail,
  MapPin,
  Linkedin,
  Instagram,
  Github,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";

/**
 * PAGE 4: CONTACT SECTION
 * Minimal editorial contact interface with genuine client-side validation,
 * interactive mailto fallback, and social connection cards.
 */
export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

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
      errs.message = "Message cannot be empty";
    } else if (formData.message.trim().length < 10) {
      errs.message = "Message should be at least 10 characters";
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    // Create verified mailto link with encoded parameters as instant client-side fallback
    const mailtoUrl = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      `[Portfolio Inquiry] ${formData.subject}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    // Simulate sending network request then opening client
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.open(mailtoUrl, "_blank");
    }, 800);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="section-padding border-b border-[#222226] relative">
      <div className="container">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <SelectionReveal id="contact-badge" outlineColor="lime">
            <div className="pill pill-lime mb-3">
              <span>05 // INITIATE TRANSMISSION</span>
            </div>
          </SelectionReveal>

          <SelectionReveal id="contact-title" outlineColor="purple" delay={150}>
            <h2 className="font-display text-4xl sm:text-6xl text-[#F5F5F5] uppercase tracking-tight mb-4">
              LET'S BUILD <span className="text-[#C6FF00]">SOMETHING MEANINGFUL.</span>
            </h2>
          </SelectionReveal>

          <SelectionReveal id="contact-desc" outlineColor="lime" delay={300}>
            <p className="text-base text-[#A1A1AA] leading-relaxed">
              Open to engineering internships, junior engineering roles, hardware research collaborations, and embedded IoT discussions.
            </p>
          </SelectionReveal>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Contact Info & Socials */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Email Card with One-Click Copy */}
            <SelectionReveal id="contact-email-card" outlineColor="lime" delay={200}>
              <div className="editorial-card group">
                <span className="text-[11px] font-mono text-[#71717A] uppercase tracking-wider block mb-1">
                  DIRECT EMAIL INBOX
                </span>
                <div className="flex items-center justify-between gap-3">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="font-heading font-bold text-base sm:text-lg text-[#F5F5F5] hover:text-[#C6FF00] transition-colors break-all"
                  >
                    {siteConfig.email}
                  </a>
                  <button
                    onClick={() => copyToClipboard(siteConfig.email)}
                    title="Copy Email Address"
                    className="p-2 rounded bg-[#18181c] border border-[#2d2d35] text-[#A1A1AA] hover:text-[#C6FF00] transition-colors cursor-pointer shrink-0"
                  >
                    {copiedEmail ? (
                      <Check className="w-4 h-4 text-[#C6FF00]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </SelectionReveal>

            {/* Geographic Location */}
            <SelectionReveal id="contact-location-card" outlineColor="purple" delay={300}>
              <div className="editorial-card">
                <span className="text-[11px] font-mono text-[#71717A] uppercase tracking-wider block mb-1">
                  LOCATION &amp; RESIDENCE
                </span>
                <div className="flex items-center gap-3 text-[#F5F5F5] font-heading font-semibold text-base">
                  <MapPin className="w-4 h-4 text-[#A855F7]" />
                  <span>{siteConfig.location}</span>
                </div>
              </div>
            </SelectionReveal>

            {/* Professional Profiles */}
            <SelectionReveal id="contact-socials-card" outlineColor="lime" delay={400}>
              <div className="editorial-card">
                <span className="text-[11px] font-mono text-[#71717A] uppercase tracking-wider block mb-4">
                  CONNECTED NETWORKS
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-[#141418] border border-[#26262e] hover:border-[#A855F7] flex flex-col items-center gap-2 group transition-all"
                  >
                    <Linkedin className="w-5 h-5 text-[#A855F7] group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-mono text-[#A1A1AA] group-hover:text-[#F5F5F5]">
                      LinkedIn
                    </span>
                  </a>

                  <a
                    href={siteConfig.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-[#141418] border border-[#26262e] hover:border-[#C6FF00] flex flex-col items-center gap-2 group transition-all"
                  >
                    <Github className="w-5 h-5 text-[#C6FF00] group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-mono text-[#A1A1AA] group-hover:text-[#F5F5F5]">
                      GitHub
                    </span>
                  </a>

                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-[#141418] border border-[#26262e] hover:border-[#A855F7] flex flex-col items-center gap-2 group transition-all"
                  >
                    <Instagram className="w-5 h-5 text-[#A855F7] group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-mono text-[#A1A1AA] group-hover:text-[#F5F5F5]">
                      Instagram
                    </span>
                  </a>
                </div>
              </div>
            </SelectionReveal>
          </div>

          {/* Right Column: Genuine Contact Form */}
          <div className="lg:col-span-7">
            <SelectionReveal id="contact-form-card" outlineColor="purple" delay={300}>
              <div className="editorial-card bg-[#0e0e11] border-[#292930]">
                <h3 className="font-heading font-bold text-xl text-[#F5F5F5] mb-6 flex items-center justify-between">
                  <span>Send a Direct Message</span>
                  <span className="text-xs font-mono font-normal text-[#71717A]">
                    Encrypted Transmission
                  </span>
                </h3>

                {isSubmitted ? (
                  <div className="p-6 rounded-lg bg-[#102014] border border-[#1b4322] flex flex-col items-center text-center gap-3">
                    <CheckCircle2 className="w-10 h-10 text-[#C6FF00]" />
                    <h4 className="font-heading font-bold text-lg text-[#F5F5F5]">
                      Message Initiated
                    </h4>
                    <p className="text-xs sm:text-sm text-[#A1A1AA] max-w-md">
                      Your default email application has opened with the message pre-filled. If it didn't trigger, feel free to email me directly at{" "}
                      <span className="text-[#C6FF00] font-mono">{siteConfig.email}</span>.
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ name: "", email: "", subject: "", message: "" });
                      }}
                      className="mt-4 btn btn-secondary text-xs"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wide">
                          Your Name <span className="text-[#C6FF00]">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Alex Sharma"
                          className={`w-full px-3.5 py-2.5 rounded bg-[#151518] border text-sm text-[#F5F5F5] focus:outline-none focus:border-[#C6FF00] transition-colors ${
                            errors.name ? "border-red-500" : "border-[#28282e]"
                          }`}
                        />
                        {errors.name && (
                          <span className="text-[11px] text-red-400 font-mono flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.name}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wide">
                          Your Email <span className="text-[#C6FF00]">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="alex@domain.com"
                          className={`w-full px-3.5 py-2.5 rounded bg-[#151518] border text-sm text-[#F5F5F5] focus:outline-none focus:border-[#C6FF00] transition-colors ${
                            errors.email ? "border-red-500" : "border-[#28282e]"
                          }`}
                        />
                        {errors.email && (
                          <span className="text-[11px] text-red-400 font-mono flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.email}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Subject Field */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wide">
                        Subject <span className="text-[#C6FF00]">*</span>
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="e.g. Engineering Internship Inquiry"
                        className={`w-full px-3.5 py-2.5 rounded bg-[#151518] border text-sm text-[#F5F5F5] focus:outline-none focus:border-[#C6FF00] transition-colors ${
                          errors.subject ? "border-red-500" : "border-[#28282e]"
                        }`}
                      />
                      {errors.subject && (
                        <span className="text-[11px] text-red-400 font-mono flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.subject}
                        </span>
                      )}
                    </div>

                    {/* Message Field */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wide">
                        Message <span className="text-[#C6FF00]">*</span>
                      </label>
                      <textarea
                        rows={4}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Share project details, opportunities or questions..."
                        className={`w-full px-3.5 py-2.5 rounded bg-[#151518] border text-sm text-[#F5F5F5] focus:outline-none focus:border-[#C6FF00] transition-colors resize-none ${
                          errors.message ? "border-red-500" : "border-[#28282e]"
                        }`}
                      />
                      {errors.message && (
                        <span className="text-[11px] text-red-400 font-mono flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.message}
                        </span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary mt-2 w-full justify-center"
                    >
                      {isSubmitting ? (
                        <span>Transmitting Payload...</span>
                      ) : (
                        <>
                          <span>Transmit Message</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </SelectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

