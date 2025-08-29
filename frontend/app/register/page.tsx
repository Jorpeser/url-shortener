'use client';

import RegisterPage from '@/components/pages/RegisterPage';

export default function Register() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <main className="transition-all duration-500 ease-in-out">
        <RegisterPage />
      </main>
    </div>
  );
}