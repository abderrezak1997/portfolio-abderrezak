import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderGit2, Plus, Edit2, Trash2, ExternalLink, Github, 
  Sparkles, Check, X, Eye, Image as ImageIcon, Layers
} from 'lucide-react';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { Project } from '../../types';

export const AdminProjectsManager: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject } = usePortfolioData();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Partial<Project>>({
    id: '',
    title: '',
    category: 'web',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    demoUrl: '',
    githubUrl: '',
    technologies: ['React.js', 'Python', 'Django', 'PostgreSQL'],
    description: { en: '', fr: '', ar: '' },
    longDescription: { en: '', fr: '', ar: '' },
    highlights: { en: [], fr: [], ar: [] },
    featured: false,
  });

  const [techInput, setTechInput] = useState('');
  const [highlightEnInput, setHighlightEnInput] = useState('');
  const [highlightFrInput, setHighlightFrInput] = useState('');
  const [highlightArInput, setHighlightArInput] = useState('');

  const handleStartCreate = () => {
    setFormData({
      id: `proj-${Date.now()}`,
      title: '',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      demoUrl: '',
      githubUrl: '',
      technologies: ['React.js', 'TypeScript', 'Tailwind CSS'],
      description: { en: '', fr: '', ar: '' },
      longDescription: { en: '', fr: '', ar: '' },
      highlights: { en: [], fr: [], ar: [] },
      featured: true,
    });
    setTechInput('React.js, TypeScript, Tailwind CSS');
    setHighlightEnInput('');
    setHighlightFrInput('');
    setHighlightArInput('');
    setIsCreating(true);
    setEditingProject(null);
  };

  const handleStartEdit = (project: Project) => {
    setFormData({ ...project });
    setTechInput(project.technologies.join(', '));
    setHighlightEnInput(project.highlights?.en.join('\n') || '');
    setHighlightFrInput(project.highlights?.fr.join('\n') || '');
    setHighlightArInput(project.highlights?.ar.join('\n') || '');
    setEditingProject(project);
    setIsCreating(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.id) return;

    const parsedTech = techInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const parsedHighlights = {
      en: highlightEnInput.split('\n').map((h) => h.trim()).filter(Boolean),
      fr: highlightFrInput.split('\n').map((h) => h.trim()).filter(Boolean),
      ar: highlightArInput.split('\n').map((h) => h.trim()).filter(Boolean),
    };

    const finalProject: Project = {
      id: formData.id,
      title: formData.title,
      category: formData.category as any || 'web',
      image: formData.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      demoUrl: formData.demoUrl || undefined,
      githubUrl: formData.githubUrl || undefined,
      technologies: parsedTech.length > 0 ? parsedTech : ['React.js'],
      description: {
        en: formData.description?.en || formData.title,
        fr: formData.description?.fr || formData.title,
        ar: formData.description?.ar || formData.title,
      },
      longDescription: {
        en: formData.longDescription?.en || formData.description?.en || '',
        fr: formData.longDescription?.fr || formData.description?.fr || '',
        ar: formData.longDescription?.ar || formData.description?.ar || '',
      },
      highlights: parsedHighlights,
      featured: formData.featured ?? false,
    };

    if (isCreating) {
      addProject(finalProject);
    } else if (editingProject) {
      updateProject(editingProject.id, finalProject);
    }

    setIsCreating(false);
    setEditingProject(null);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteProject(id);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top action header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-cyan-400" />
            <span>Manage Projects ({projects.length})</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Add new platforms, update live URLs, edit descriptions, or remove old entries.
          </p>
        </div>

        <button
          onClick={handleStartCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-dark-950 font-bold text-xs shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects Grid Table / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="glass-card rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-between group hover:border-cyan-500/40 transition-all"
          >
            {/* Image Preview */}
            <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-dark-950/80 border border-cyan-400/40 text-cyan-300 text-[10px] font-mono uppercase font-bold">
                {project.category}
              </span>
              {project.featured && (
                <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-purple-950/80 border border-purple-400/40 text-purple-300 text-[10px] font-mono font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Featured</span>
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                  {project.description.fr || project.description.en || project.description.ar}
                </p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-cyan-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-1.5 py-0.5 rounded bg-slate-900 text-[10px] font-mono text-slate-500">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-300"
                      title="Open Live URL"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white"
                      title="Open GitHub"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStartEdit(project)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-cyan-950/60 hover:text-cyan-300 border border-slate-700 hover:border-cyan-500/40 text-xs text-slate-200 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(project.id, project.title)}
                    className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 border border-red-500/40 text-red-400 hover:text-white transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Project Modal Form */}
      <AnimatePresence>
        {(isCreating || editingProject) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsCreating(false);
                setEditingProject(null);
              }}
              className="fixed inset-0 bg-dark-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl glass-card rounded-3xl overflow-hidden border border-cyan-500/30 bg-slate-950 shadow-2xl z-10 max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <FolderGit2 className="w-5 h-5 text-cyan-400" />
                  <span>{isCreating ? 'Add New Project' : `Edit "${formData.title}"`}</span>
                </h3>
                <button
                  onClick={() => {
                    setIsCreating(false);
                    setEditingProject(null);
                  }}
                  className="p-1 rounded-full text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Title */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Civil Society Digital Platform"
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm bg-slate-900"
                    >
                      <option value="web">Web Application</option>
                      <option value="government">Government & Public</option>
                      <option value="desktop">Desktop Application</option>
                      <option value="ml">Machine Learning / NLP</option>
                    </select>
                  </div>
                </div>

                {/* URLs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Live Demo URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={formData.demoUrl || ''}
                      onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                      placeholder="https://example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      GitHub URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={formData.githubUrl || ''}
                      onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                      placeholder="https://github.com/..."
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm"
                    />
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Technologies (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    placeholder="React.js, Python, Django, PostgreSQL, Nginx"
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-mono"
                  />
                </div>

                {/* Descriptions Multilingual */}
                <div className="space-y-3 pt-3 border-t border-slate-800">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                    Project Descriptions (3 Languages)
                  </h4>
                  
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      French Description (Français)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.description?.fr || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        description: { ...formData.description!, fr: e.target.value }
                      })}
                      placeholder="Description du projet en Français..."
                      className="w-full px-3.5 py-2 rounded-xl glass-input text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      English Description
                    </label>
                    <textarea
                      rows={2}
                      value={formData.description?.en || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        description: { ...formData.description!, en: e.target.value }
                      })}
                      placeholder="Project description in English..."
                      className="w-full px-3.5 py-2 rounded-xl glass-input text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      Arabic Description (العربية)
                    </label>
                    <textarea
                      rows={2}
                      dir="rtl"
                      value={formData.description?.ar || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        description: { ...formData.description!, ar: e.target.value }
                      })}
                      placeholder="وصف المشروع باللغة العربية..."
                      className="w-full px-3.5 py-2 rounded-xl glass-input text-xs font-arabic"
                    />
                  </div>
                </div>

                {/* Featured Checkbox */}
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="featured-check"
                    checked={formData.featured ?? false}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded border-slate-700 text-cyan-500 focus:ring-cyan-400"
                  />
                  <label htmlFor="featured-check" className="text-xs text-slate-300 font-semibold cursor-pointer">
                    Highlight as Featured Project on Home Page
                  </label>
                </div>

                {/* Submit & Cancel */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreating(false);
                      setEditingProject(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-dark-950 font-bold text-xs shadow-lg hover:brightness-110 transition-all flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save Project</span>
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
