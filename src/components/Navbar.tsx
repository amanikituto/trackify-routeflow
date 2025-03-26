
import React, { useState, useEffect } from 'react';
import { Bell, Search, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="hidden md:flex gap-1">
          <span className="font-bold text-lg tracking-tight">Trackify</span>
          <span className="text-lg text-muted-foreground">RouteFlow</span>
        </div>
        
        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="relative w-full max-w-sm lg:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full rounded-full bg-muted/30 border-border py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="ml-1 animate-fade-in">
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
            <span className="sr-only">Notifications</span>
          </Button>
          
          <Button variant="ghost" size="icon" className="rounded-full overflow-hidden">
            <img 
              src="https://randomuser.me/api/portraits/men/42.jpg" 
              alt="User" 
              className="h-8 w-8 rounded-full object-cover"
            />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
