import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  PersonalInfo, Project, Skill, Experience, EducationItem, ServiceItem 
} from '../types';
import { 
  personalInfo as defaultPersonalInfo, 
  projects as defaultProjects, 
  skills as defaultSkills, 
  experiences as defaultExperiences, 
  education as defaultEducation, 
  services as defaultServices 
} from '../data/portfolioData';

interface PortfolioDataContextType {
  personalInfo: PersonalInfo;
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  education: EducationItem[];
  services: ServiceItem[];
  
  // Update methods
  updatePersonalInfo: (info: PersonalInfo) => void;
  
  // Projects
  addProject: (project: Project) => void;
  updateProject: (id: string, project: Project) => void;
  deleteProject: (id: string) => void;
  
  // Skills
  addSkill: (skill: Skill) => void;
  updateSkill: (name: string, skill: Skill) => void;
  deleteSkill: (name: string) => void;
  
  // Experience
  addExperience: (exp: Experience) => void;
  updateExperience: (id: string, exp: Experience) => void;
  deleteExperience: (id: string) => void;
  
  // Education
  addEducation: (edu: EducationItem) => void;
  updateEducation: (id: string, edu: EducationItem) => void;
  deleteEducation: (id: string) => void;
  
  // Services
  addService: (service: ServiceItem) => void;
  updateService: (id: string, service: ServiceItem) => void;
  deleteService: (id: string) => void;
  
  // Admin utilities
  resetToDefault: () => void;
  exportDataJson: () => string;
  importDataJson: (jsonStr: string) => boolean;
}

const PortfolioDataContext = createContext<PortfolioDataContextType | undefined>(undefined);

const STORAGE_KEY = 'abderrezak_portfolio_live_data_v1';

export const PortfolioDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [personalInfo, setPersonalInfoState] = useState<PersonalInfo>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_info`);
    return saved ? JSON.parse(saved) : defaultPersonalInfo;
  });

  const [projects, setProjectsState] = useState<Project[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_projects`);
    return saved ? JSON.parse(saved) : defaultProjects;
  });

  const [skills, setSkillsState] = useState<Skill[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_skills`);
    return saved ? JSON.parse(saved) : defaultSkills;
  });

  const [experiences, setExperiencesState] = useState<Experience[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_experiences`);
    return saved ? JSON.parse(saved) : defaultExperiences;
  });

  const [education, setEducationState] = useState<EducationItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_education`);
    return saved ? JSON.parse(saved) : defaultEducation;
  });

  const [services, setServicesState] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_services`);
    return saved ? JSON.parse(saved) : defaultServices;
  });

  // Sync to localStorage
  const updatePersonalInfo = (info: PersonalInfo) => {
    setPersonalInfoState(info);
    localStorage.setItem(`${STORAGE_KEY}_info`, JSON.stringify(info));
  };

  const addProject = (project: Project) => {
    const updated = [project, ...projects];
    setProjectsState(updated);
    localStorage.setItem(`${STORAGE_KEY}_projects`, JSON.stringify(updated));
  };

  const updateProject = (id: string, project: Project) => {
    const updated = projects.map((p) => (p.id === id ? project : p));
    setProjectsState(updated);
    localStorage.setItem(`${STORAGE_KEY}_projects`, JSON.stringify(updated));
  };

  const deleteProject = (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjectsState(updated);
    localStorage.setItem(`${STORAGE_KEY}_projects`, JSON.stringify(updated));
  };

  const addSkill = (skill: Skill) => {
    const updated = [...skills, skill];
    setSkillsState(updated);
    localStorage.setItem(`${STORAGE_KEY}_skills`, JSON.stringify(updated));
  };

  const updateSkill = (name: string, skill: Skill) => {
    const updated = skills.map((s) => (s.name === name ? skill : s));
    setSkillsState(updated);
    localStorage.setItem(`${STORAGE_KEY}_skills`, JSON.stringify(updated));
  };

  const deleteSkill = (name: string) => {
    const updated = skills.filter((s) => s.name !== name);
    setSkillsState(updated);
    localStorage.setItem(`${STORAGE_KEY}_skills`, JSON.stringify(updated));
  };

  const addExperience = (exp: Experience) => {
    const updated = [exp, ...experiences];
    setExperiencesState(updated);
    localStorage.setItem(`${STORAGE_KEY}_experiences`, JSON.stringify(updated));
  };

  const updateExperience = (id: string, exp: Experience) => {
    const updated = experiences.map((e) => (e.id === id ? exp : e));
    setExperiencesState(updated);
    localStorage.setItem(`${STORAGE_KEY}_experiences`, JSON.stringify(updated));
  };

  const deleteExperience = (id: string) => {
    const updated = experiences.filter((e) => e.id !== id);
    setExperiencesState(updated);
    localStorage.setItem(`${STORAGE_KEY}_experiences`, JSON.stringify(updated));
  };

  const addEducation = (edu: EducationItem) => {
    const updated = [edu, ...education];
    setEducationState(updated);
    localStorage.setItem(`${STORAGE_KEY}_education`, JSON.stringify(updated));
  };

  const updateEducation = (id: string, edu: EducationItem) => {
    const updated = education.map((e) => (e.id === id ? edu : e));
    setEducationState(updated);
    localStorage.setItem(`${STORAGE_KEY}_education`, JSON.stringify(updated));
  };

  const deleteEducation = (id: string) => {
    const updated = education.filter((e) => e.id !== id);
    setEducationState(updated);
    localStorage.setItem(`${STORAGE_KEY}_education`, JSON.stringify(updated));
  };

  const addService = (service: ServiceItem) => {
    const updated = [...services, service];
    setServicesState(updated);
    localStorage.setItem(`${STORAGE_KEY}_services`, JSON.stringify(updated));
  };

  const updateService = (id: string, service: ServiceItem) => {
    const updated = services.map((s) => (s.id === id ? service : s));
    setServicesState(updated);
    localStorage.setItem(`${STORAGE_KEY}_services`, JSON.stringify(updated));
  };

  const deleteService = (id: string) => {
    const updated = services.filter((s) => s.id !== id);
    setServicesState(updated);
    localStorage.setItem(`${STORAGE_KEY}_services`, JSON.stringify(updated));
  };

  const resetToDefault = () => {
    localStorage.removeItem(`${STORAGE_KEY}_info`);
    localStorage.removeItem(`${STORAGE_KEY}_projects`);
    localStorage.removeItem(`${STORAGE_KEY}_skills`);
    localStorage.removeItem(`${STORAGE_KEY}_experiences`);
    localStorage.removeItem(`${STORAGE_KEY}_education`);
    localStorage.removeItem(`${STORAGE_KEY}_services`);

    setPersonalInfoState(defaultPersonalInfo);
    setProjectsState(defaultProjects);
    setSkillsState(defaultSkills);
    setExperiencesState(defaultExperiences);
    setEducationState(defaultEducation);
    setServicesState(defaultServices);
  };

  const exportDataJson = () => {
    const fullData = {
      personalInfo,
      projects,
      skills,
      experiences,
      education,
      services,
    };
    return JSON.stringify(fullData, null, 2);
  };

  const importDataJson = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.personalInfo) updatePersonalInfo(parsed.personalInfo);
      if (parsed.projects) {
        setProjectsState(parsed.projects);
        localStorage.setItem(`${STORAGE_KEY}_projects`, JSON.stringify(parsed.projects));
      }
      if (parsed.skills) {
        setSkillsState(parsed.skills);
        localStorage.setItem(`${STORAGE_KEY}_skills`, JSON.stringify(parsed.skills));
      }
      if (parsed.experiences) {
        setExperiencesState(parsed.experiences);
        localStorage.setItem(`${STORAGE_KEY}_experiences`, JSON.stringify(parsed.experiences));
      }
      if (parsed.education) {
        setEducationState(parsed.education);
        localStorage.setItem(`${STORAGE_KEY}_education`, JSON.stringify(parsed.education));
      }
      if (parsed.services) {
        setServicesState(parsed.services);
        localStorage.setItem(`${STORAGE_KEY}_services`, JSON.stringify(parsed.services));
      }
      return true;
    } catch (e) {
      console.error("Failed to import json data:", e);
      return false;
    }
  };

  return (
    <PortfolioDataContext.Provider
      value={{
        personalInfo,
        projects,
        skills,
        experiences,
        education,
        services,
        updatePersonalInfo,
        addProject,
        updateProject,
        deleteProject,
        addSkill,
        updateSkill,
        deleteSkill,
        addExperience,
        updateExperience,
        deleteExperience,
        addEducation,
        updateEducation,
        deleteEducation,
        addService,
        updateService,
        deleteService,
        resetToDefault,
        exportDataJson,
        importDataJson,
      }}
    >
      {children}
    </PortfolioDataContext.Provider>
  );
};

export const usePortfolioData = (): PortfolioDataContextType => {
  const context = useContext(PortfolioDataContext);
  if (!context) {
    throw new Error('usePortfolioData must be used within a PortfolioDataProvider');
  }
  return context;
};
