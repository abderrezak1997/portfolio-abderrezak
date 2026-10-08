import React from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';

interface AdminPortalProps {
  onBackToSite: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onBackToSite }) => {
  const { isAuthenticated } = useAdminAuth();

  if (!isAuthenticated) {
    return <AdminLogin onBackToSite={onBackToSite} />;
  }

  return <AdminDashboard onBackToSite={onBackToSite} />;
};
