describe('Navegação', () => {
  beforeEach(() => {
    // Faz login com usuário existente
    cy.login('test@test.com', 'password123');
    // Aguarda o redirecionamento para o dashboard
    cy.url().should('include', '/dashboard');
  });

  it('navega para o dashboard', () => {
    cy.get('[data-testid="dashboard-link"]').click();
    cy.url().should('include', '/dashboard');
    // TODO: Descomentar quando a página for desenvolvida
    // cy.contains('Dashboard').should('be.visible');
  });

  it('navega para planos de teste', () => {
    cy.get('[data-testid="test-plans-link"]').click();
    cy.url().should('include', '/test-plans');
    // TODO: Descomentar quando a página for desenvolvida
    // cy.contains('Planos de Teste').should('be.visible');
  });

  it('navega para suítes de teste', () => {
    cy.get('[data-testid="test-suites-link"]').click();
    cy.url().should('include', '/test-suites');
    // TODO: Descomentar quando a página for desenvolvida
    // cy.contains('Suítes de Teste').should('be.visible');
  });

  it('navega para casos de teste', () => {
    cy.get('[data-testid="test-cases-link"]').click();
    cy.url().should('include', '/test-cases');
    // TODO: Descomentar quando a página for desenvolvida
    // cy.contains('Casos de Teste').should('be.visible');
  });
}); 