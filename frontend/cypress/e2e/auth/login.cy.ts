import React from 'react';
import { mount } from '@cypress/react';
import Login from '../../../src/components/Login';
import TestWrapper from '../../../src/test/TestWrapper';

describe('Login de Usuário', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('deve fazer login com sucesso', () => {
    // Usuário de massa pré-cadastrado
    const testUser = {
      email: 'massatest@email.com',
      password: 'teste123',
      name: 'massa teste login'
    };
    
    cy.get('[data-testid="email"]').type(testUser.email, { force: true });
    cy.get('[data-testid="password"]').type(testUser.password, { force: true });
    cy.get('[data-testid="login-button"]').click();
    
    // Verifica redirecionamento para o dashboard
    cy.url().should('include', '/dashboard');
    
    // Verifica se o nome do usuário correto aparece na TopBar
    cy.get('[data-testid="user-name"]', { force: true }).should('be.visible').and('contain', testUser.name);
  });

  it('deve mostrar erro quando as credenciais são inválidas', () => {
    cy.get('[data-testid="email"]').type('invalid@test.com', { force: true });
    cy.get('[data-testid="password"]').type('wrongpassword', { force: true });
    cy.get('[data-testid="login-button"]').click();
    cy.get('.Toastify__toast--error').should('be.visible').and('contain', 'Email ou senha inválidos');
  });

  it('deve redirecionar para a página de registro ao clicar no link', () => {
    cy.get('[data-testid="register-link"]').click();
    cy.url().should('include', '/register');
  });

  it('deve mostrar erro quando o email está vazio', () => {
    cy.get('[data-testid="password"]').type('password123', { force: true });
    cy.get('[data-testid="login-button"]').click();
    cy.get('[data-testid="email"]').then(($input) => {
      expect($input[0].validationMessage).to.eq('Preencha este campo.');
    });
  });

  it('deve mostrar erro quando a senha está vazia', () => {
    cy.get('[data-testid="email"]').type('test@test.com', { force: true });
    cy.get('[data-testid="login-button"]').click();
    cy.get('[data-testid="password"]').then(($input) => {
      expect($input[0].validationMessage).to.eq('Preencha este campo.');
    });
  });
}); 