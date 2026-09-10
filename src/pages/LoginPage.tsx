import React from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { SEO } from '../components/common/SEO';

export const LoginPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Sign In — Eternal Lives Sanctuary"
        description="Access your saved historical figures, grave records, and personal memorial favorites."
      />
      <div className="min-h-screen bg-forest-950 flex items-center justify-center pt-28 pb-20 px-4">
        <LoginForm />
      </div>
    </>
  );
};
