import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Save, Mail, Phone, MapPin, Globe, Github, Linkedin, Award, Check } from 'lucide-react';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { PersonalInfo } from '../../types';

export const AdminProfileManager: React.FC = () => {
  const { personalInfo, updatePersonalInfo } = usePortfolioData();
  const [formData, setFormData] = useState<PersonalInfo>(personalInfo);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updatePersonalInfo(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-cyan-400" />
            <span>Personal Profile & Contact Dossier</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Edit your names, titles, location, direct contacts, social links, and metric counters.
          </p>
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-dark-950 font-bold text-xs shadow-lg hover:brightness-110 transition-all"
        >
          {savedSuccess ? <Check className="w-4 h-4 text-dark-950" /> : <Save className="w-4 h-4" />}
          <span>{savedSuccess ? 'Changes Saved!' : 'Save Profile Changes'}</span>
        </button>
      </div>

      {savedSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2"
        >
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Profile information updated and synchronized live across your entire portfolio!</span>
        </motion.div>
      )}

      {/* Basic Identity */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-cyan-400">
          1. Identity & Names
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">
              Full Name (Latin)
            </label>
            <input
              type="text"
              value={formData.name.latin}
              onChange={(e) => setFormData({
                ...formData,
                name: { ...formData.name, latin: e.target.value }
              })}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">
              Full Name (Arabic)
            </label>
            <input
              type="text"
              dir="rtl"
              value={formData.name.arabic}
              onChange={(e) => setFormData({
                ...formData,
                name: { ...formData.name, arabic: e.target.value }
              })}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-arabic"
            />
          </div>
        </div>

        {/* Professional Titles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">
              Title (French)
            </label>
            <input
              type="text"
              value={formData.title.fr}
              onChange={(e) => setFormData({
                ...formData,
                title: { ...formData.title, fr: e.target.value }
              })}
              className="w-full px-3.5 py-2 rounded-xl glass-input text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">
              Title (English)
            </label>
            <input
              type="text"
              value={formData.title.en}
              onChange={(e) => setFormData({
                ...formData,
                title: { ...formData.title, en: e.target.value }
              })}
              className="w-full px-3.5 py-2 rounded-xl glass-input text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">
              Title (Arabic)
            </label>
            <input
              type="text"
              dir="rtl"
              value={formData.title.ar}
              onChange={(e) => setFormData({
                ...formData,
                title: { ...formData.title, ar: e.target.value }
              })}
              className="w-full px-3.5 py-2 rounded-xl glass-input text-xs font-arabic"
            />
          </div>
        </div>
      </div>

      {/* Direct Contact & Location */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-purple-400">
          2. Direct Contacts & Location
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">
              WhatsApp (+213...)
            </label>
            <input
              type="text"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-mono"
            />
          </div>
        </div>

        {/* Location in 3 languages */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">
              Location (French)
            </label>
            <input
              type="text"
              value={formData.location.fr}
              onChange={(e) => setFormData({
                ...formData,
                location: { ...formData.location, fr: e.target.value }
              })}
              className="w-full px-3.5 py-2 rounded-xl glass-input text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">
              Location (English)
            </label>
            <input
              type="text"
              value={formData.location.en}
              onChange={(e) => setFormData({
                ...formData,
                location: { ...formData.location, en: e.target.value }
              })}
              className="w-full px-3.5 py-2 rounded-xl glass-input text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">
              Location (Arabic)
            </label>
            <input
              type="text"
              dir="rtl"
              value={formData.location.ar}
              onChange={(e) => setFormData({
                ...formData,
                location: { ...formData.location, ar: e.target.value }
              })}
              className="w-full px-3.5 py-2 rounded-xl glass-input text-xs font-arabic"
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">
              GitHub Profile URL
            </label>
            <input
              type="url"
              value={formData.socials.github}
              onChange={(e) => setFormData({
                ...formData,
                socials: { ...formData.socials, github: e.target.value }
              })}
              className="w-full px-3.5 py-2 rounded-xl glass-input text-xs font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">
              LinkedIn Profile URL
            </label>
            <input
              type="url"
              value={formData.socials.linkedin}
              onChange={(e) => setFormData({
                ...formData,
                socials: { ...formData.socials, linkedin: e.target.value }
              })}
              className="w-full px-3.5 py-2 rounded-xl glass-input text-xs font-mono"
            />
          </div>
        </div>
      </div>

      {/* Metrics & Counters */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-emerald-400">
          3. Live Counters & Statistics
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">
              Years Experience
            </label>
            <input
              type="number"
              value={formData.stats.yearsExperience}
              onChange={(e) => setFormData({
                ...formData,
                stats: { ...formData.stats, yearsExperience: parseInt(e.target.value) || 0 }
              })}
              className="w-full px-3.5 py-2 rounded-xl glass-input text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">
              Technologies Mastered
            </label>
            <input
              type="number"
              value={formData.stats.technologiesCount}
              onChange={(e) => setFormData({
                ...formData,
                stats: { ...formData.stats, technologiesCount: parseInt(e.target.value) || 0 }
              })}
              className="w-full px-3.5 py-2 rounded-xl glass-input text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">
              Projects Delivered
            </label>
            <input
              type="number"
              value={formData.stats.projectsCompleted}
              onChange={(e) => setFormData({
                ...formData,
                stats: { ...formData.stats, projectsCompleted: parseInt(e.target.value) || 0 }
              })}
              className="w-full px-3.5 py-2 rounded-xl glass-input text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">
              Satisfaction Rate (%)
            </label>
            <input
              type="number"
              value={formData.stats.satisfactionRate}
              onChange={(e) => setFormData({
                ...formData,
                stats: { ...formData.stats, satisfactionRate: parseInt(e.target.value) || 100 }
              })}
              className="w-full px-3.5 py-2 rounded-xl glass-input text-sm font-mono"
            />
          </div>
        </div>
      </div>
    </form>
  );
};
