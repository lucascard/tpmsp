import React from 'react';
import { mount } from '@cypress/react';
import Login from '../../../src/components/Login';
import TestWrapper from '../../../src/test/TestWrapper';

describe('Login de Usuário', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('deve fazer login com sucesso', () => {
    cy.get('[data-testid="email"]').type('test@test.com', { force: true });
    cy.get('[data-testid="password"]').type('password123', { force: true });
    cy.get('[data-testid="login-button"]').click();
    // TODO: Descomentar quando a rota /dashboard estiver implementada
    // cy.url().should('include', '/dashboard');
  });

  it('deve mostrar erro quando as credenciais são inválidas', () => {
    cy.get('[data-testid="email"]').type('wrong@test.com', { force: true });
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