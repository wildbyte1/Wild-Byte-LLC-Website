import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const ProtectedRoute = ({ children, allowedTiers = [] }) => {
  const { user, userProfile, loading } = useAuth();

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-950'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
      </div>
    );
  }

  if (!user || !userProfile || userProfile.accountStatus !== 'active') {
   
    return <Navigate to='/login' replace />;
  }

  
  if (
    allowedTiers.length > 0 &&
    !allowedTiers.includes(userProfile.membershipTier)
  ) {
    return <Navigate to='/' replace />;
  }

  return children;
};

export default ProtectedRoute;
