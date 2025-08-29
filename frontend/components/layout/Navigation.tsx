'use client';

import { Button } from '@/components/ui/button';
import { Link, Zap } from 'lucide-react';
import type { Page } from '@/app/page';
import { useRouter } from 'next/navigation';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Navigation() {
  const router = useRouter();
  
  // Función para scroll suave a secciones
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => router.push('/')}
            className="flex items-center space-x-2 text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200"
          >
            <div className="p-2 bg-blue-600 rounded-lg">
              <Link className="h-6 w-6 text-white" />
            </div>
            <span>ShortLink</span>
          </button>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => router.push('/')}
              className={`font-medium transition-colors duration-200`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-200"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-200"
            >
              Pricing
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => router.push('/login')}
              className="font-medium hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
            >
              Sign In
            </Button>
            <Button
              onClick={() => router.push('/register')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}