import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, LayoutDashboard, UserCheck, FolderGit2, Cpu, 
  Briefcase, Wrench, GraduationCap, Settings, LogOut, ExternalLink, 
  Download, Upload, RotateCcw, Key, Check, AlertTriangle, Eye, Database
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { AdminProfileManager } from './AdminProfileManager';
import { AdminProjectsManager } from './AdminProjectsManager';
import { AdminSkillsManager } from './AdminSkillsManager';
import { AdminExperienceManager } from './AdminExperienceManager';

interface AdminDashboardProps {
  onBackToSite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToSite }) => {
  const { logout, changePassword, error: authError, clearError } = useAdminAuth();
  const { 
    personalInfo, projects, skills, experiences, education, services, 
    resetToDefault, exportDataJson, importDataJson 
  } = usePortfolioData();

  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'projects' | 'skills' | 'experiences' | 'settings'>('overview');

  // Password change state
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passChangedMsg, setPassChangedMsg] = useState<string | null>(null);

  // Import JSON state
  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    const success = changePassword(oldPass, newPass);
    if (success) {
      setPassChangedMsg('Mot de passe administrateur mis à jour avec succès !');
      setOldPass('');
      setNewPass('');
      setTimeout(() => setPassChangedMsg(null), 3000);
    }
  };

  const handleDownloadBackup = () => {
    const dataStr = exportDataJson();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = () => {
    if (!importJsonText.trim()) return;
    const ok = importDataJson(importJsonText);
    if (ok) {
      setImportStatus('Backup data successfully imported and applied!');
      setImportJsonText('');
      setTimeout(() => setImportStatus(null), 3000);
    } else {
      setImportStatus('Error: Invalid JSON format.');
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data back to original defaults?')) {
      resetToDefault();
      alert('Portfolio data reset to default successfully.');
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 glass-nav border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-400/50 flex items-center justify-center font-mono font-bold text-cyan-400 shadow-[0_0_15px_rgba(0,242,254,0.2)]">
            SA
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-extrabold text-white">
                Admin Control Center
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono">
                Live Sync
              </span>
            </div>
            <p className="text-[11px] font-mono text-slate-400">
              Logged in as: <span className="text-cyan-300 font-semibold">{personalInfo.email}</span>
            </p>
          </div>
        </div>

        {/* Top actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onBackToSite}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400/50 text-xs font-semibold text-slate-200 transition-all"
          >
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span>View Live Portfolio</span>
          </button>

          <button
            onClick={handleDownloadBackup}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 text-purple-300 text-xs font-semibold transition-all"
            title="Download JSON Data Backup"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Backup Data</span>
          </button>

          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-500/40 text-red-400 hover:text-white text-xs font-semibold transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Admin Area */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        
        {/* Left Sidebar Tabs */}
        <aside className="w-full md:w-64 shrink-0 space-y-1.5">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 px-3 py-1">
            Navigation Menu
          </div>

          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'overview'
                ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 text-cyan-300 shadow-sm'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-cyan-400" />
            <span>Overview & Stats</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'profile'
                ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 text-cyan-300 shadow-sm'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <UserCheck className="w-4 h-4 text-purple-400" />
            <span>Profile & Contacts</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'projects'
                ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 text-cyan-300 shadow-sm'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-3">
              <FolderGit2 className="w-4 h-4 text-sky-400" />
              <span>Projects Manager</span>
            </span>
            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-cyan-400">
              {projects.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('skills')}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'skills'
                ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 text-cyan-300 shadow-sm'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-3">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>Skills & Stack</span>
            </span>
            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-emerald-400">
              {skills.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('experiences')}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'experiences'
                ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 text-cyan-300 shadow-sm'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-3">
              <Briefcase className="w-4 h-4 text-yellow-400" />
              <span>Experiences</span>
            </span>
            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-yellow-400">
              {experiences.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'settings'
                ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 text-cyan-300 shadow-sm'
                : 'text-slate-300 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4 text-pink-400" />
            <span>Security & Backups</span>
          </button>

          <div className="pt-6 border-t border-slate-800/80">
            <button
              onClick={handleReset}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-900/60 hover:bg-red-950/30 text-slate-400 hover:text-red-400 border border-slate-800 hover:border-red-500/30 text-[11px] font-mono transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
            </button>
          </div>
        </aside>

        {/* Right Content Area */}
        <main className="flex-1 glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 min-h-[500px]">
          
          {/* 1. Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">
                  Portfolio Control Overview
                </h2>
                <p className="text-xs text-slate-400">
                  Welcome to your central portfolio management dashboard. Any change you save here takes effect immediately on your website.
                </p>
              </div>

              {/* Quick Stat Tiles */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div 
                  onClick={() => setActiveTab('projects')}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all group"
                >
                  <FolderGit2 className="w-6 h-6 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-2xl font-black text-white">{projects.length}</div>
                  <div className="text-xs text-slate-400">Total Projects</div>
                </div>

                <div 
                  onClick={() => setActiveTab('skills')}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 cursor-pointer transition-all group"
                >
                  <Cpu className="w-6 h-6 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-2xl font-black text-white">{skills.length}</div>
                  <div className="text-xs text-slate-400">Technologies Listed</div>
                </div>

                <div 
                  onClick={() => setActiveTab('experiences')}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-sky-500/40 cursor-pointer transition-all group"
                >
                  <Briefcase className="w-6 h-6 text-sky-400 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-2xl font-black text-white">{experiences.length}</div>
                  <div className="text-xs text-slate-400">Career Milestones</div>
                </div>

                <div 
                  onClick={() => setActiveTab('profile')}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 cursor-pointer transition-all group"
                >
                  <UserCheck className="w-6 h-6 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-2xl font-black text-white">{personalInfo.stats.yearsExperience}+</div>
                  <div className="text-xs text-slate-400">Years Experience</div>
                </div>
              </div>

              {/* Current Flagship Status */}
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
                  Active Configuration Summary
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block mb-1">Developer Name:</span>
                    <span className="text-slate-100 font-bold">{personalInfo.name.latin}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-1">Current Base:</span>
                    <span className="text-slate-100 font-bold">{personalInfo.location.fr}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-1">Primary Email:</span>
                    <span className="text-cyan-300 font-mono">{personalInfo.email}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-1">Direct Phone:</span>
                    <span className="text-emerald-300 font-mono">{personalInfo.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. Profile Tab */}
          {activeTab === 'profile' && <AdminProfileManager />}

          {/* 3. Projects Tab */}
          {activeTab === 'projects' && <AdminProjectsManager />}

          {/* 4. Skills Tab */}
          {activeTab === 'skills' && <AdminSkillsManager />}

          {/* 5. Experiences Tab */}
          {activeTab === 'experiences' && <AdminExperienceManager />}

          {/* 6. Settings & Security Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">
                  Security & Data Management
                </h2>
                <p className="text-xs text-slate-400">
                  Manage your admin master password, export full JSON backups, or restore past state.
                </p>
              </div>

              {/* Change Password Form */}
              <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-cyan-400 flex items-center gap-2">
                  <Key className="w-4 h-4" />
                  <span>Change Admin Master Password</span>
                </h3>

                {passChangedMsg && (
                  <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>{passChangedMsg}</span>
                  </div>
                )}

                {authError && (
                  <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/50 text-red-300 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{authError}</span>
                  </div>
                )}

                <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      required
                      value={oldPass}
                      onChange={(e) => setOldPass(e.target.value)}
                      placeholder="Enter existing password (default: sac2026)..."
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      New Password (min. 4 characters)
                    </label>
                    <input
                      type="password"
                      required
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      placeholder="Enter new master password..."
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-dark-950 font-bold text-xs shadow-lg hover:brightness-110 transition-all"
                  >
                    Update Password
                  </button>
                </form>
              </div>

              {/* JSON Backup & Restore */}
              <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-purple-400 flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  <span>Backup & Restore Full Data</span>
                </h3>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleDownloadBackup}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/40 text-purple-300 text-xs font-bold"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download JSON Backup</span>
                  </button>
                </div>

                {importStatus && (
                  <div className="p-3 rounded-xl bg-cyan-950/50 border border-cyan-500/50 text-cyan-300 text-xs">
                    {importStatus}
                  </div>
                )}

                <div className="pt-2">
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Paste JSON Data to Restore:
                  </label>
                  <textarea
                    rows={4}
                    value={importJsonText}
                    onChange={(e) => setImportJsonText(e.target.value)}
                    placeholder='{"personalInfo": {...}, "projects": [...]}'
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-mono"
                  />
                  <button
                    onClick={handleImportJson}
                    className="mt-2 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Import JSON Backup</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>

      </div>
    </div>
  );
};
