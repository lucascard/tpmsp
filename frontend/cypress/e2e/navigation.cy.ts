describe('Navegação', () => {
  beforeEach(() => {
    // Usuário de massa pré-cadastrado
    const testUser = {
      email: 'massatest@email.com',
      password: 'teste123'
    };
    
    // Faz login diretamente na API
    cy.login(testUser.email, testUser.password);
    // Aguarda o redirecionamento para o dashboard
    cy.url().should('include', '/dashboard');
  });

  it('navega para o dashboard', () => {
    cy.get('[data-testid="dashboard-link"]').click();
    cy.url().should('include', '/dashboard');
    cy.contains('Dashboard').should('be.visible');
  });

  it('navega para planos de teste', () => {
    cy.get('[data-testid="test-plans-link"]').click();
    cy.url().should('include', '/test-plans');
  });

  it('navega para suítes de teste', () => {
    cy.get('[data-testid="test-suites-link"]').click();
    cy.url().should('include', '/test-suites');
  });

  it('navega para casos de teste', () => {
    cy.get('[data-testid="test-cases-link"]').click();
    cy.url().should('include', '/test-cases');
  });

  // Novos testes para navegação pelos cards do dashboard
  describe('Navegação pelos cards do Dashboard', () => {
  
    it('navega para planos de teste pelo card do dashboard', () => {
      cy.get('[data-testid="test-plans-card"]').click();
      cy.url().should('include', '/test-plans');
    });

    it('navega para suítes de teste pelo card do dashboard', () => {
      cy.get('[data-testid="test-suites-card"]').click();
      cy.url().should('include', '/test-suites');
    });

    it('navega para casos de teste pelo card do dashboard', () => {
      cy.get('[data-testid="test-cases-card"]').click();
      cy.url().should('include', '/test-cases');
    });

    // TODO: Implementar depois que os botões forem adicionados aos cards
    /*
    it('navega para criar novo plano pelo botão do card', () => {
      cy.get('[data-testid="add-test-plan-button"]').click();
      cy.url().should('include', '/test-plans/new');
    });

    it('navega para criar nova suíte pelo botão do card', () => {
      cy.get('[data-testid="add-test-suite-button"]').click();
      cy.url().should('include', '/test-suites/new');
    });

    it('navega para criar novo caso pelo botão do card', () => {
      cy.get('[data-testid="add-test-case-button"]').click();
      cy.url().should('include', '/test-cases/new');
    });
    */
  });
}); 