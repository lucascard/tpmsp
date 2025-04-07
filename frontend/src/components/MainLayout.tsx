import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import { AppSidebar } from './AppSidebar';

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen">
      <TopBar />
      <div className="flex">
        <AppSidebar />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout; 