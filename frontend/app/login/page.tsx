'use client';

import LoginPage from '@/components/pages/LoginPage';

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <main className="transition-all duration-500 ease-in-out">
        <LoginPage />
      </main>
    </div>
  );
}