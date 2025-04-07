import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, FileText, Settings } from 'lucide-react';
import {
  SidebarHeader,
  SidebarTitle,
  SidebarMenuButton,
} from "../components/ui/sidebar";

export const AppSidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <aside className="w-64 h-screen bg-white border-r">
      <SidebarHeader>
        <SidebarTitle>TPMSP</SidebarTitle>
      </SidebarHeader>

      <nav className="flex flex-col gap-1 p-2">
        <SidebarMenuButton 
          onClick={() => navigate('/dashboard')}
          data-testid="dashboard-link"
        >
          <LayoutDashboard className="h-4 w-4 mr-2" />
          Dashboard
        </SidebarMenuButton>

        <SidebarMenuButton 
          onClick={() => navigate('/test-plans')}
          data-testid="test-plans-link"
        >
          <FolderKanban className="h-4 w-4 mr-2" />
          Planos de Teste
        </SidebarMenuButton>

        <SidebarMenuButton 
          onClick={() => navigate('/test-suites')}
          data-testid="test-suites-link"
        >
          <FileText className="h-4 w-4 mr-2" />
          Suítes de Teste
        </SidebarMenuButton>

        <SidebarMenuButton 
          onClick={() => navigate('/test-cases')}
          data-testid="test-cases-link"
        >
          <FileText className="h-4 w-4 mr-2" />
          Casos de Teste
        </SidebarMenuButton>

        <SidebarMenuButton onClick={() => navigate('/settings')}>
          <Settings className="h-4 w-4 mr-2" />
          Configurações
        </SidebarMenuButton>
      </nav>
    </aside>
  );
};

export default AppSidebar; 