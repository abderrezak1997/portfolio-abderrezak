import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: (pass: string) => boolean;
  logout: () => void;
  changePassword: (oldPass: string, newPass: string) => boolean;
  error: string | null;
  clearError: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const ADMIN_PASS_KEY = 'abderrezak_admin_pass_v1';
const ADMIN_SESSION_KEY = 'abderrezak_admin_session_v1';
const DEFAULT_PASS = 'sac2026'; // Default initial master password

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
  });
  const [error, setError] = useState<string | null>(null);

  const getStoredPassword = (): string => {
    return localStorage.getItem(ADMIN_PASS_KEY) || DEFAULT_PASS;
  };

  const login = (pass: string): boolean => {
    const currentPass = getStoredPassword();
    if (pass.trim() === currentPass.trim()) {
      setIsAuthenticated(true);
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
      setError(null);
      return true;
    } else {
      setError('Mot de passe incorrect / Incorrect Password / كلمة المرور غير صحيحة');
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setError(null);
  };

  const changePassword = (oldPass: string, newPass: string): boolean => {
    const currentPass = getStoredPassword();
    if (oldPass.trim() !== currentPass.trim()) {
      setError('Ancien mot de passe invalide / Invalid current password');
      return false;
    }
    if (!newPass || newPass.trim().length < 4) {
      setError('Le nouveau mot de passe doit comporter au moins 4 caractères');
      return false;
    }
    localStorage.setItem(ADMIN_PASS_KEY, newPass.trim());
    setError(null);
    return true;
  };

  const clearError = () => setError(null);

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        changePassword,
        error,
        clearError,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = (): AdminAuthContextType => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
