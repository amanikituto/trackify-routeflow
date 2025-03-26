
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { SidebarProvider } from '@/components/ui/sidebar';
import Sidebar from './Sidebar';

const Layout = () => {
  const [mounted, setMounted] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Add a small delay to trigger the page loaded animation
    const timer = setTimeout(() => {
      setPageLoaded(true);
    }, 100);
    
    return () => {
      setMounted(false);
      clearTimeout(timer);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className={`flex min-h-screen w-full flex-col antialiased ${pageLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
        <Navbar />
        <div className="flex flex-1 w-full">
          <Sidebar />
          <main className="flex-1 overflow-x-hidden px-4 py-6 md:px-6 lg:px-8 animate-fade-in">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
