import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

describe('Sidebar', () => {
  const renderSidebar = () => {
    return render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
  };

  it('renderiza todos os itens do menu', () => {
    renderSidebar();
    
    expect(screen.getByTestId('dashboard-link')).toBeInTheDocument();
    expect(screen.getByTestId('test-plans-link')).toBeInTheDocument();
    expect(screen.getByTestId('test-suites-link')).toBeInTheDocument();
    expect(screen.getByTestId('test-cases-link')).toBeInTheDocument();
  });

  it('navega para a rota correta ao clicar em um item', () => {
    renderSidebar();
    
    const dashboardLink = screen.getByTestId('dashboard-link');
    fireEvent.click(dashboardLink);
    
    expect(window.location.pathname).toBe('/dashboard');
  });

  it('destaca o item ativo corretamente', () => {
    renderSidebar();
    
    const dashboardLink = screen.getByTestId('dashboard-link');
    expect(dashboardLink).toHaveAttribute('aria-selected', 'true');
  });
}); 