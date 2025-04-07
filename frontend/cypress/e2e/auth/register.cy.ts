import React from 'react';
import { mount } from '@cypress/react';
import Register from '../../../src/components/Register';
import TestWrapper from '../../../src/test/TestWrapper';

describe('Registro de Usuário', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('deve registrar um novo usuário com sucesso', () => {
    const randomEmail = `test${Cypress._.random(1000, 9999)}@test.com`;
    const randomName = `Test User ${Cypress._.random(1000, 9999)}`;
    
    cy.get('[data-testid="name"]').type(randomName, { force: true });
    cy.get('[data-testid="email"]').type(randomEmail, { force: true });
    cy.get('[data-testid="password"]').type('password123', { force: true });
    cy.get('[data-testid="confirmPassword"]').type('password123', { force: true });
    cy.get('[data-testid="register-button"]').click();
    
    // Espera o toast de sucesso aparecer
    cy.get('.Toastify__toast--success')
      .should('be.visible')
      .and('contain', 'Registro realizado com sucesso!');
    
    // Espera o toast desaparecer com um timeout maior
    cy.get('.Toastify__toast--success', { timeout: 10000 })
      .should('not.exist');
    
    // Verifica redirecionamento para o dashboard
    cy.url().should('include', '/dashboard');
    
    // Verifica se o nome do usuário aparece na TopBar
    cy.get('[data-testid="user-name"]').should('be.visible').and('contain', randomName);
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