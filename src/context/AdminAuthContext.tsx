import React, { createContext, useContext, useState } from 'react';

interface AdminAuthContextType {
  isAuthenticated: boolean;
  loginWithPassword: (pass: string) => boolean;
  logout: () => void;
  changePassword: (oldPass: string, newPass: string) => boolean;
  error: string | null;
  clearError: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const ADMIN_PASS_KEY = 'abderrezak_admin_pass_v1';
const ADMIN_SESSION_KEY = 'abderrezak_admin_session_v1';
const DEFAULT_PASS = 'sac2026';

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
  });
  const [error, setError] = useState<string | null>(null);

  const getStoredPassword = (): string => {
    return localStorage.getItem(ADMIN_PASS_KEY) || DEFAULT_PASS;
  };

  const loginWithPassword = (pass: string): boolean => {
    const currentPass = getStoredPassword();
    if (pass.trim() === currentPass.trim()) {
      setIsAuthenticated(true);
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
      setError(null);
      return true;
    } else {
      setError('كلمة المرور غير صحيحة / Mot de passe incorrect');
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
      setError('Ancien mot de passe invalide / كلمة المرور القديمة غير صحيحة');
      return false;
    }
    if (!newPass || newPass.trim().length < 4) {
      setError('كلمة المرور الجديدة يجب أن تكون 4 أحرف على الأقل');
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
        loginWithPassword,
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
