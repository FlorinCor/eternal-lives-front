import React from 'react';
import { RegisterForm } from '../components/auth/RegisterForm';
import { SEO } from '../components/common/SEO';

export const RegisterPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Join the Archival Custodians — Eternal Lives"
        description="Register an account to preserve memorials, save resting place favorites, and propose corrections."
      />
      <div className="min-h-screen bg-forest-950 flex items-center justify-center pt-28 pb-20 px-4">
        <RegisterForm />
      </div>
    </>
  );
};
