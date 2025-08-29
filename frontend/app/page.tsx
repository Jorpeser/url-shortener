'use client';

import { useState } from 'react';
import LandingPage from '@/components/pages/LandingPage';
import Navigation from '@/components/layout/Navigation';

export type Page = 'landing' | 'register' | 'login';

export default function Home() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      <main className="transition-all duration-500 ease-in-out">
      <LandingPage onNavigate={setCurrentPage} />
      </main>
    </div>
  );
}