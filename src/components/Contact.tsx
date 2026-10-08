import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, Mail, Phone, MapPin, MessageSquare, 
  CheckCircle2, AlertCircle, Sparkles, ExternalLink, Github, Linkedin, MessageCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';
import { usePortfolioData } from '../context/PortfolioDataContext';

export const Contact: React.FC = () => {
  const { language, t, isRTL } = useLanguage();
  const { personalInfo } = usePortfolioData();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = t.contact.validationName;
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errs.email = t.contact.validationEmail;
    }
    if (!formData.subject.trim()) errs.subject = t.contact.validationSubject;
    if (!formData.message.trim() || formData.message.trim().length < 5) {
      errs.message = t.contact.validationMessage;
    }
    return errs;
  };

  const handleDirectMailto = () => {
    const recipient = personalInfo.email || "abderrezaksc@gmail.com";
    const subject = encodeURIComponent(formData.subject || `Message from ${formData.name || 'Portfolio Visitor'}`);
    const body = encodeURIComponent(
      `Nom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  };

  const handleWhatsAppSend = () => {
    const phone = personalInfo.whatsapp ? personalInfo.whatsapp.replace(/[^0-9]/g, '') : '213780412378';
    const text = encodeURIComponent(
      `Bonjour Abderrezak,\nJe m'appelle ${formData.name || 'Visiteur'}.\nSujet: ${formData.subject || 'Contact Portfolio'}\n\n${formData.message}`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSendError(null);
    setIsSubmitting(true);

    const recipientEmail = personalInfo.email || "abderrezaksc@gmail.com";

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: `[Portfolio] ${formData.subject} - De: ${formData.name}`,
          message: formData.message,
          _template: "table",
          _captcha: "false"
        })
      });

      const data = await response.json();

      if (response.ok || data.success === "true" || data.success === true) {
        setIsSubmitted(true);
        try {
          confetti({
            particleCount: 90,
            spread: 70,
            origin: { y: 0.7 },
            colors: ['#00f2fe', '#8a2be2', '#00ffcc', '#ffffff']
          });
        } catch (err) {}
      } else {
        throw new Error(data.message || "Échec de l'envoi");
      }
    } catch (err: any) {
      console.warn("Direct form submit failed, providing mailto fallback:", err);
      // Fallback: Open mailto directly
      handleDirectMailto();
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-dark-950">
      {/* Background Accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[450px] bg-gradient-to-r from-cyan-500/10 via-purple-600/10 to-transparent rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium mb-3 shadow-[0_0_15px_rgba(0,242,254,0.15)]"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{t.contact.sectionBadge}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight max-w-3xl mb-3"
          >
            {t.contact.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-sm sm:text-base max-w-2xl"
          >
            {t.contact.subtitle}
          </motion.p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Direct Contact Details & Links */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>{t.contact.availabilityBadge}</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-6">
                {t.contact.directContact}
              </h3>

              <div className="space-y-4">
                {/* Email Card */}
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-400/50 hover:bg-slate-900 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block">Direct Email</span>
                    <span className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                      {personalInfo.email}
                    </span>
                  </div>
                </a>

                {/* Phone Card */}
                <a
                  href={`tel:${personalInfo.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-emerald-400/50 hover:bg-slate-900 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block">Phone Direct</span>
                    <span className="text-sm font-bold text-slate-100 group-hover:text-emerald-300 transition-colors font-mono">
                      {personalInfo.phone}
                    </span>
                  </div>
                </a>

                {/* WhatsApp Trigger */}
                <a
                  href={personalInfo.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-950/50 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-900/60 border border-emerald-400/40 flex items-center justify-center text-emerald-300 group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-emerald-400 block font-bold">Instant Messenger</span>
                    <span className="text-sm font-bold text-emerald-200">
                      {t.contact.quickChatWhatsApp}
                    </span>
                  </div>
                </a>

                {/* Location Card */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/70 border border-slate-800">
                  <div className="w-12 h-12 rounded-xl bg-purple-950/50 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block">Location</span>
                    <span className="text-sm font-bold text-slate-100">
                      {personalInfo.location[language]}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Icons Links */}
            <div className="mt-8 pt-6 border-t border-slate-800 flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400">Profiles:</span>
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-600 transition-all"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

          </motion.div>

          {/* Right Column: Validated Interactive Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 relative"
          >
            <h3 className="text-xl font-bold text-white mb-6">
              {t.contact.formTitle}
            </h3>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-2xl bg-slate-900/90 border border-cyan-500/40 text-center space-y-4 my-8"
              >
                <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400 mx-auto flex items-center justify-center text-cyan-400 shadow-[0_0_25px_rgba(0,242,254,0.4)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white">
                  {t.contact.successTitle}
                </h4>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  {t.contact.successMessage}
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 text-xs font-semibold text-slate-200 hover:text-white"
                  >
                    Envoyer un autre message
                  </button>
                  <button
                    onClick={handleWhatsAppSend}
                    className="px-5 py-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold hover:text-white flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Discuter sur WhatsApp</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      {t.contact.nameLabel} <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      placeholder={t.contact.namePlaceholder}
                      className={`w-full px-4 py-3 rounded-xl glass-input text-sm ${
                        errors.name ? 'border-red-500/80 ring-1 ring-red-500/50' : ''
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      {t.contact.emailLabel} <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      placeholder={t.contact.emailPlaceholder}
                      className={`w-full px-4 py-3 rounded-xl glass-input text-sm ${
                        errors.email ? 'border-red-500/80 ring-1 ring-red-500/50' : ''
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    {t.contact.subjectLabel} <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => {
                      setFormData({ ...formData, subject: e.target.value });
                      if (errors.subject) setErrors({ ...errors, subject: '' });
                    }}
                    placeholder={t.contact.subjectPlaceholder}
                    className={`w-full px-4 py-3 rounded-xl glass-input text-sm ${
                      errors.subject ? 'border-red-500/80 ring-1 ring-red-500/50' : ''
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.subject}</span>
                    </p>
                  )}
                </div>

                {/* Message Input */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    {t.contact.messageLabel} <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: '' });
                    }}
                    placeholder={t.contact.messagePlaceholder}
                    className={`w-full px-4 py-3 rounded-xl glass-input text-sm resize-none ${
                      errors.message ? 'border-red-500/80 ring-1 ring-red-500/50' : ''
                    }`}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-dark-950 font-extrabold text-sm shadow-[0_0_25px_rgba(0,242,254,0.35)] hover:shadow-[0_0_35px_rgba(0,242,254,0.55)] transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>{t.contact.sending}</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{t.contact.sendButton}</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-between gap-3 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                    <button
                      type="button"
                      onClick={handleDirectMailto}
                      className="text-cyan-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Ouvrir dans l'application Mail</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppSend}
                      className="text-emerald-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Envoyer via WhatsApp</span>
                    </button>
                  </div>
                </div>
              </form>
            )}

          </motion.div>

        </div>
      </div>
    </section>
  );
};
