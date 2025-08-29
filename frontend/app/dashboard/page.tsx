'use client';

import DashboardPage from '@/components/pages/DashboardPage';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <main className="transition-all duration-500 ease-in-out">
        <DashboardPage />
      </main>
    </div>
  );
}