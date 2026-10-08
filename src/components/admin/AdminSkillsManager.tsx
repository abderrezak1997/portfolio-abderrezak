import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Plus, Edit2, Trash2, Check, X, Atom, Code2, Server, Database, Globe } from 'lucide-react';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { Skill } from '../../types';

export const AdminSkillsManager: React.FC = () => {
  const { skills, addSkill, updateSkill, deleteSkill } = usePortfolioData();
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState<Skill>({
    name: '',
    category: 'frontend',
    level: 90,
    levelLabel: { en: 'Advanced', fr: 'Avancé', ar: 'متقدم' },
    description: { en: '', fr: '', ar: '' },
    iconName: 'Cpu',
    color: '#00f2fe',
  });

  const handleStartCreate = () => {
    setFormData({
      name: '',
      category: 'frontend',
      level: 85,
      levelLabel: { en: 'Advanced', fr: 'Avancé', ar: 'متقدم' },
      description: {
        en: 'Components, State Management, Responsive Layouts',
        fr: 'Composants, Gestion d\'état, Architecture',
        ar: 'مكونات، إدارة الحالة، هيكلة وتصميم متجاوب'
      },
      iconName: 'Code2',
      color: '#00f2fe',
    });
    setIsCreating(true);
    setEditingSkill(null);
  };

  const handleStartEdit = (skill: Skill) => {
    setFormData({ ...skill });
    setEditingSkill(skill);
    setIsCreating(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    if (isCreating) {
      addSkill(formData);
    } else if (editingSkill) {
      updateSkill(editingSkill.name, formData);
    }

    setIsCreating(false);
    setEditingSkill(null);
  };

  const handleDelete = (name: string) => {
    if (window.confirm(`Delete skill "${name}"?`)) {
      deleteSkill(name);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <span>Manage Skills & Tech Stack ({skills.length})</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Adjust proficiency percentages, add new frameworks, or modify descriptions.
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-dark-950 font-bold text-xs shadow-lg hover:brightness-110 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Technology</span>
        </button>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="glass-card rounded-2xl p-4 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-cyan-400">
                  <Cpu className="w-4 h-4" />
                </div>
                <span className="font-mono text-xs font-bold text-cyan-400">
                  {skill.level}%
                </span>
              </div>

              <h3 className="text-sm font-bold text-white mb-1">
                {skill.name}
              </h3>
              <p className="text-[11px] font-mono text-purple-400 mb-2">
                {skill.category}
              </p>
              <p className="text-xs text-slate-400 line-clamp-2">
                {skill.description.fr || skill.description.en}
              </p>
            </div>

            <div className="pt-3 mt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-500">
                {skill.levelLabel.en}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleStartEdit(skill)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:text-cyan-300 text-slate-400"
                  title="Edit"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
                <button
                  onClick={() => handleDelete(skill.name)}
                  className="p-1.5 rounded-lg bg-red-950/40 hover:text-white text-red-400"
                  title="Delete"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Edit / Add */}
      <AnimatePresence>
        {(isCreating || editingSkill) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsCreating(false);
                setEditingSkill(null);
              }}
              className="fixed inset-0 bg-dark-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl glass-card rounded-3xl p-6 bg-slate-950 border border-cyan-500/40 shadow-2xl z-10"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
                <h3 className="text-base font-bold text-white">
                  {isCreating ? 'Add New Skill' : `Edit "${formData.name}"`}
                </h3>
                <button
                  onClick={() => {
                    setIsCreating(false);
                    setEditingSkill(null);
                  }}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Tech / Skill Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Next.js"
                      className="w-full px-3 py-2 rounded-xl glass-input text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl glass-input text-sm bg-slate-900"
                    >
                      <option value="frontend">Frontend</option>
                      <option value="backend">Backend</option>
                      <option value="database">Database</option>
                      <option value="infrastructure">Infrastructure & DevOps</option>
                      <option value="tools">Tools & Environment</option>
                    </select>
                  </div>
                </div>

                {/* Level Slider */}
                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                    <span className="text-slate-300">Proficiency Level:</span>
                    <span className="text-cyan-400 font-bold">{formData.level}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                {/* Descriptions */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Description (Français)
                  </label>
                  <input
                    type="text"
                    value={formData.description.fr}
                    onChange={(e) => setFormData({
                      ...formData,
                      description: { ...formData.description, fr: e.target.value }
                    })}
                    placeholder="Utilisation pratique et points clés..."
                    className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Description (English)
                  </label>
                  <input
                    type="text"
                    value={formData.description.en}
                    onChange={(e) => setFormData({
                      ...formData,
                      description: { ...formData.description, en: e.target.value }
                    })}
                    placeholder="Key usage and mastery..."
                    className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreating(false);
                      setEditingSkill(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-xs text-slate-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-dark-950 font-bold text-xs"
                  >
                    Save Technology
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
