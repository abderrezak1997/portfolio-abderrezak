import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Plus, Edit2, Trash2, Check, X, Calendar, MapPin, Sparkles } from 'lucide-react';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { Experience } from '../../types';

export const AdminExperienceManager: React.FC = () => {
  const { experiences, addExperience, updateExperience, deleteExperience } = usePortfolioData();
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState<Partial<Experience>>({
    id: '',
    role: { en: '', fr: '', ar: '' },
    organization: '',
    location: '',
    period: { en: '', fr: '', ar: '' },
    isCurrent: false,
    featured: false,
    tasks: { en: [], fr: [], ar: [] },
    technologies: [],
  });

  const [tasksFrInput, setTasksFrInput] = useState('');
  const [tasksEnInput, setTasksEnInput] = useState('');
  const [tasksArInput, setTasksArInput] = useState('');
  const [techInput, setTechInput] = useState('');

  const handleStartCreate = () => {
    setFormData({
      id: `exp-${Date.now()}`,
      role: { en: 'Full-Stack Developer', fr: 'Développeur Full-Stack', ar: 'مطور برمجيات Full-Stack' },
      organization: '',
      location: 'Alger, Algérie',
      period: { en: '2024 — Present', fr: '2024 — Présent', ar: '2024 — حتى الآن' },
      isCurrent: true,
      featured: false,
      tasks: { en: [], fr: [], ar: [] },
      technologies: ['React.js', 'Python', 'Django'],
    });
    setTasksFrInput('');
    setTasksEnInput('');
    setTasksArInput('');
    setTechInput('React.js, Python, Django');
    setIsCreating(true);
    setEditingExp(null);
  };

  const handleStartEdit = (exp: Experience) => {
    setFormData({ ...exp });
    setTasksFrInput(exp.tasks.fr.join('\n'));
    setTasksEnInput(exp.tasks.en.join('\n'));
    setTasksArInput(exp.tasks.ar.join('\n'));
    setTechInput(exp.technologies.join(', '));
    setEditingExp(exp);
    setIsCreating(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.organization || !formData.id) return;

    const parsedTech = techInput.split(',').map((t) => t.trim()).filter(Boolean);
    const parsedTasks = {
      fr: tasksFrInput.split('\n').map((t) => t.trim()).filter(Boolean),
      en: tasksEnInput.split('\n').map((t) => t.trim()).filter(Boolean),
      ar: tasksArInput.split('\n').map((t) => t.trim()).filter(Boolean),
    };

    const finalExp: Experience = {
      id: formData.id,
      role: formData.role || { en: '', fr: '', ar: '' },
      organization: formData.organization,
      location: formData.location || 'Alger, Algérie',
      period: formData.period || { en: '', fr: '', ar: '' },
      isCurrent: formData.isCurrent ?? false,
      featured: formData.featured ?? false,
      tasks: parsedTasks,
      technologies: parsedTech,
      links: formData.links,
    };

    if (isCreating) {
      addExperience(finalExp);
    } else if (editingExp) {
      updateExperience(editingExp.id, finalExp);
    }

    setIsCreating(false);
    setEditingExp(null);
  };

  const handleDelete = (id: string, org: string) => {
    if (window.confirm(`Delete experience at "${org}"?`)) {
      deleteExperience(id);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-cyan-400" />
            <span>Manage Career Milestones ({experiences.length})</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Update roles, organizations, periods, and accomplishments.
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-dark-950 font-bold text-xs shadow-lg hover:brightness-110 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Experience</span>
        </button>
      </div>

      {/* Experience List */}
      <div className="space-y-4">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="glass-card rounded-2xl p-5 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-cyan-500/40 transition-all"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base font-bold text-white">
                  {exp.role.fr || exp.role.en}
                </h3>
                {exp.featured && (
                  <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/30 text-[10px] font-mono">
                    Flagship
                  </span>
                )}
                {exp.isCurrent && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono">
                    Current
                  </span>
                )}
              </div>
              <div className="text-xs font-semibold text-slate-300 mb-2">
                {exp.organization} • <span className="text-slate-500">{exp.location}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {exp.technologies.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded bg-slate-900 text-[10px] font-mono text-slate-400">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleStartEdit(exp)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:text-cyan-300 text-slate-200 text-xs"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(exp.id, exp.organization)}
                className="p-1.5 rounded-lg bg-red-950/40 text-red-400 hover:text-white"
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      <AnimatePresence>
        {(isCreating || editingExp) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsCreating(false);
                setEditingExp(null);
              }}
              className="fixed inset-0 bg-dark-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl glass-card rounded-3xl p-6 bg-slate-950 border border-cyan-500/40 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
                <h3 className="text-base font-bold text-white">
                  {isCreating ? 'Add Experience' : `Edit "${formData.organization}"`}
                </h3>
                <button
                  onClick={() => {
                    setIsCreating(false);
                    setEditingExp(null);
                  }}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Organization / Company *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g. Observatoire National de la Société Civile"
                      className="w-full px-3 py-2 rounded-xl glass-input text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Alger, Algérie"
                      className="w-full px-3 py-2 rounded-xl glass-input text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Role Title (French)
                    </label>
                    <input
                      type="text"
                      value={formData.role?.fr || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        role: { ...formData.role!, fr: e.target.value }
                      })}
                      placeholder="e.g. Ingénieur Informatique / Développeur Full-Stack"
                      className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Period (French)
                    </label>
                    <input
                      type="text"
                      value={formData.period?.fr || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        period: { ...formData.period!, fr: e.target.value }
                      })}
                      placeholder="e.g. Depuis Octobre 2023 — Présent"
                      className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Key Tasks & Accomplishments (One per line)
                  </label>
                  <textarea
                    rows={4}
                    value={tasksFrInput}
                    onChange={(e) => setTasksFrInput(e.target.value)}
                    placeholder="Création de la plateforme Civil Society&#10;Gestion du Data Center&#10;Hébergement sur machines virtuelles"
                    className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Technologies (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    placeholder="React.js, Django, PostgreSQL, Nginx"
                    className="w-full px-3 py-2 rounded-xl glass-input text-xs font-mono"
                  />
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured ?? false}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    />
                    <span>Highlight as Key Flagship Experience</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isCurrent ?? false}
                      onChange={(e) => setFormData({ ...formData, isCurrent: e.target.checked })}
                    />
                    <span>Current Active Position</span>
                  </label>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreating(false);
                      setEditingExp(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-xs text-slate-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-dark-950 font-bold text-xs"
                  >
                    Save Experience
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
