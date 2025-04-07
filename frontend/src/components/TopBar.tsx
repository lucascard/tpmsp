import React from 'react';
import { LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const TopBar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="h-16 border-b flex items-center px-4 sticky top-0 bg-background z-10">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="text-xl font-semibold hidden md:block">Test Plan Management System Professional</h1>
        <h1 className="text-xl font-semibold md:hidden">TPMS Pro</h1>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback data-testid="user-name">{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium hidden sm:inline-block" data-testid="user-name">{user?.name}</span>
        </div>
        <Button variant="ghost" size="icon" title="Perfil do usuário">
          <User className="h-5 w-5" />
          <span className="sr-only">Perfil do usuário</span>
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          title="Sair" 
          onClick={handleLogout}
          data-testid="logout-button"
        >
          <LogOut className="h-5 w-5" />
          <span className="sr-only">Sair</span>
        </Button>
      </div>
    </header>
  );
};

export default TopBar;