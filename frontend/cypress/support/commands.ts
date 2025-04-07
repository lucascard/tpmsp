/// <reference types="cypress" />
import '@testing-library/cypress/add-commands';

Cypress.Commands.add('register', (name: string, email: string, password: string) => {
  cy.visit('/register');
  cy.get('[data-testid="name"]').type(name);
  cy.get('[data-testid="email"]').type(email);
  cy.get('[data-testid="password"]').type(password);
  cy.get('[data-testid="confirmPassword"]').type(password);
  cy.get('[data-testid="register-button"]').click();
});

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login');
  cy.get('[data-testid="email"]').type(email);
  cy.get('[data-testid="password"]').type(password);
  cy.get('[data-testid="login-button"]').click();
});

declare global {
  namespace Cypress {
    interface Chainable {
      register(name: string, email: string, password: string): Chainable<void>;
      login(email: string, password: string): Chainable<void>;
    }
  }
} 