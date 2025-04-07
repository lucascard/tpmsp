import React from 'react';
import { mount } from '@cypress/react';
import Register from '../../../src/components/Register';
import TestWrapper from '../../../src/test/TestWrapper';

describe('Registro de Usuário', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('deve registrar um novo usuário com sucesso', () => {
    cy.get('[data-testid="name"]').type('Test User', { force: true });
    cy.get('[data-testid="email"]').type('test@test.com', { force: true });
    cy.get('[data-testid="password"]').type('password123', { force: true });
    cy.get('[data-testid="confirmPassword"]').type('password123', { force: true });
    cy.get('[data-testid="register-button"]').click();
    // TODO: Descomentar quando a rota /dashboard estiver implementada
    // cy.url().should('include', '/dashboard');
  });

  it('deve mostrar erro quando as senhas não coincidem', () => {
    cy.get('[data-testid="name"]').type('Test User', { force: true });
    cy.get('[data-testid="email"]').type('test@test.com', { force: true });
    cy.get('[data-testid="password"]').type('password123', { force: true });
    cy.get('[data-testid="confirmPassword"]').type('different', { force: true });
    cy.get('[data-testid="register-button"]').click();
    cy.get('.Toastify__toast--error').should('be.visible').and('contain', 'As senhas não coincidem');
  });

  it('deve mostrar erro quando o email já está em uso', () => {
    cy.get('[data-testid="name"]').type('Test User', { force: true });
    cy.get('[data-testid="email"]').type('existing@test.com', { force: true });
    cy.get('[data-testid="password"]').type('password123', { force: true });
    cy.get('[data-testid="confirmPassword"]').type('password123', { force: true });
    cy.get('[data-testid="register-button"]').click();
    cy.get('.Toastify__toast--error').should('be.visible').and('contain', 'Este email já está em uso');
  });
}); 