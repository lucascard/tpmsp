import React from 'react';
import { LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { SidebarTrigger } from "../components/ui/sidebar";
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const TopBar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-16 border-b bg-background px-6 flex items-center justify-between">
      <SidebarTrigger />
      
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarFallback>
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
        <span data-testid="user-name" className="text-sm font-medium">{user?.name}</span>
        <Button variant="ghost" size="icon" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          <span className="sr-only">Sair</span>
        </Button>
      </div>
    </header>
  );
};