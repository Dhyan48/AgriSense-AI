import React, { useState } from 'react';
import { Navbar } from '../components/shared/Navbar';
import { Sidebar } from '../components/shared/Sidebar';
import { Footer } from '../components/shared/Footer';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar showMenuButton onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 px-4 py-8 sm:px-8 lg:px-10 max-w-6xl">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};