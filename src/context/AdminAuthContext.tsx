import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminAuthContextType {
  isAuthenticated: boolean;
  loginWithPassword: (pass: string) => boolean;
  verifyPhoneNumber: (phone: string) => { success: boolean; code?: string; error?: string };
  verifyOtpCode: (code: string) => boolean;
  logout: () => void;
  changePassword: (oldPass: string, newPass: string) => boolean;
  error: string | null;
  clearError: () => void;
  activeOtp: string | null;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const ADMIN_PASS_KEY = 'abderrezak_admin_pass_v1';
const ADMIN_SESSION_KEY = 'abderrezak_admin_session_v1';
const DEFAULT_PASS = 'sac2026';
const PERMANENT_MASTER_PIN = '784123'; // Permanent quick master PIN based on phone (07 80 41 23 78)

// Authorized owner phone formats
const AUTHORIZED_PHONES = ['0780412378', '213780412378', '+213780412378'];

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
  });
  const [error, setError] = useState<string | null>(null);
  const [activeOtp, setActiveOtp] = useState<string | null>(null);

  const getStoredPassword = (): string => {
    return localStorage.getItem(ADMIN_PASS_KEY) || DEFAULT_PASS;
  };

  const loginWithPassword = (pass: string): boolean => {
    const currentPass = getStoredPassword();
    if (pass.trim() === currentPass.trim() || pass.trim() === PERMANENT_MASTER_PIN) {
      setIsAuthenticated(true);
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
      setError(null);
      return true;
    } else {
      setError('Mot de passe ou code incorrect / Incorrect password or code');
      return false;
    }
  };

  const normalizePhone = (p: string) => {
    return p.replace(/[\s\-\(\)\.]/g, '');
  };

  const verifyPhoneNumber = (phone: string) => {
    const cleaned = normalizePhone(phone);
    const isAuthorized = AUTHORIZED_PHONES.some((auth) => normalizePhone(auth) === cleaned);

    if (!isAuthorized) {
      const err = 'Numéro de téléphone non autorisé. Seul le numéro 07 80 41 23 78 (+213780412378) est autorisé à accéder.';
      setError(err);
      return { success: false, error: err };
    }

    // Generate dynamic 6-digit security code
    const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
    setActiveOtp(generatedCode);
    setError(null);
    return { success: true, code: generatedCode };
  };

  const verifyOtpCode = (enteredCode: string): boolean => {
    const trimmed = enteredCode.trim();
    // Accept either the generated dynamic OTP, the permanent master PIN 784123, or master password
    if (trimmed === activeOtp || trimmed === PERMANENT_MASTER_PIN || trimmed === getStoredPassword()) {
      setIsAuthenticated(true);
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
      setError(null);
      setActiveOtp(null);
      return true;
    } else {
      setError('Code de vérification invalide. Veuillez réessayer.');
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setError(null);
    setActiveOtp(null);
  };

  const changePassword = (oldPass: string, newPass: string): boolean => {
    const currentPass = getStoredPassword();
    if (oldPass.trim() !== currentPass.trim() && oldPass.trim() !== PERMANENT_MASTER_PIN) {
      setError('Ancien mot de passe invalide');
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
        loginWithPassword,
        verifyPhoneNumber,
        verifyOtpCode,
        logout,
        changePassword,
        error,
        clearError,
        activeOtp,
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
