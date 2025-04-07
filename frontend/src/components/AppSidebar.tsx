import React from 'react';
import { LayoutDashboard, FileText, FolderKanban, CheckSquare } from "lucide-react";
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";

export const AppSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" />, path: '/dashboard', testId: 'dashboard-link' },
    { text: 'Planos de Teste', icon: <FileText className="h-5 w-5" />, path: '/test-plans', testId: 'test-plans-link' },
    { text: 'Suítes de Teste', icon: <FolderKanban className="h-5 w-5" />, path: '/test-suites', testId: 'test-suites-link' },
    { text: 'Casos de Teste', icon: <CheckSquare className="h-5 w-5" />, path: '/test-cases', testId: 'test-cases-link' },
  ];

  return (
    <aside className="w-64 border-r bg-card">
      <div className="flex h-16 items-center border-b px-6">
        <span className="text-lg font-semibold">TPMSP</span>
      </div>
      <nav className="space-y-1 p-2">
        {menuItems.map((item) => (
          <button
            key={item.text}
            onClick={() => navigate(item.path)}
            data-testid={item.testId}
            className={`
              flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors
              ${location.pathname === item.path 
                ? 'bg-primary/10 text-primary hover:bg-primary/15' 
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }
            `}
          >
            {React.cloneElement(item.icon, {
              className: `h-5 w-5 ${location.pathname === item.path ? 'text-primary' : 'text-muted-foreground'}`
            })}
            {item.text}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default AppSidebar; 