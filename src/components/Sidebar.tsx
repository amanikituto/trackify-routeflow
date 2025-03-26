
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  BarChart3,
  Map,
  PackageOpen,
  LayoutGrid,
  ShieldCheck,
  Users,
  Settings,
  Menu,
  Truck,
} from 'lucide-react';
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarHeader
} from '@/components/ui/sidebar';

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
  { name: 'Route Optimization', href: '/route-optimization', icon: Map },
  { name: 'Order Management', href: '/order-management', icon: PackageOpen },
  { name: 'Fleet Management', href: '/fleet-management', icon: Truck },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Integrations', href: '/integrations', icon: LayoutGrid },
  { name: 'Security', href: '/security', icon: ShieldCheck },
];

const Sidebar = () => {
  return (
    <SidebarComponent>
      <SidebarHeader className="px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="relative text-white font-bold text-lg">T</span>
          </div>
          <div className="font-bold text-lg">Trackify</div>
        </div>
        <SidebarTrigger className="ml-auto">
          <Menu size={20} />
        </SidebarTrigger>
      </SidebarHeader>
      
      <SidebarContent className="py-2">
        <SidebarMenu>
          {navigationItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild>
                <NavLink 
                  to={item.href}
                  className={({ isActive }) => isActive ? 'text-primary font-medium' : 'text-foreground hover:text-primary transition-colors'}
                >
                  <item.icon size={20} />
                  <span>{item.name}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
              <Users size={16} className="text-primary" />
            </div>
            <div className="text-sm font-medium">Admin User</div>
          </div>
          <Settings size={18} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
        </div>
      </SidebarFooter>
    </SidebarComponent>
  );
};

export default Sidebar;
