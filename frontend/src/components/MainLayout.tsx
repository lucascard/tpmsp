import React from 'react';
import { Outlet } from 'react-router-dom';
import { TopBar } from './TopBar';
import { AppSidebar } from './AppSidebar';

export const MainLayout: React.FC = () => {
  return (
    <div className="flex h-screen">
      <AppSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}; 