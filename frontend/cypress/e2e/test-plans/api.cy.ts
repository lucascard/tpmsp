describe('Test Plans API', () => {
  beforeEach(() => {
    // Fazer login antes de cada teste
    cy.login('massatest@email.com', 'teste123');
  });

  it('should list test plans', () => {
    // Interceptar a chamada de API
    cy.intercept('GET', '/api/test-plans*').as('getTestPlans');

    // Visitar a página de planos de teste
    cy.visit('/test-plans');

    // Esperar a chamada de API
    cy.wait('@getTestPlans').then((interception) => {
      expect(interception.response?.statusCode).to.equal(200);
      expect(interception.response?.body).to.be.an('array');
    });
  });

  it('should create a new test plan', () => {
    // Interceptar a chamada de API
    cy.intercept('POST', '/api/test-plans').as('createTestPlan');

    // Visitar a página de planos de teste
    cy.visit('/test-plans');

    // Clicar no botão de novo plano
    cy.get('[data-testid="create-test-plan-button"]').click();

    // Preencher o formulário
    cy.get('[data-testid="test-plan-title"]').type('Novo Plano de Teste');
    cy.get('[data-testid="test-plan-description"]').type('Descrição do novo plano');
    cy.get('[data-testid="test-plan-status"]').click();
    cy.get('[data-value="draft"]').click();

    // Salvar o plano
    cy.get('[data-testid="save-test-plan"]').click();

    // Esperar a chamada de API
    cy.wait('@createTestPlan').then((interception) => {
      expect(interception.response?.statusCode).to.equal(201);
      expect(interception.response?.body).to.include({
        title: 'Novo Plano de Teste',
        description: 'Descrição do novo plano',
        status: 'draft'
      });
    });

    // Verificar se o plano aparece na lista
    cy.contains('Novo Plano de Teste').should('be.visible');
  });

  it('should update a test plan', () => {
    // Interceptar a chamada de API
    cy.intercept('PUT', '/api/test-plans/*').as('updateTestPlan');

    // Visitar a página de planos de teste
    cy.visit('/test-plans');

    // Clicar no botão de editar do primeiro plano
    cy.get('[data-testid="edit-test-plan"]').first().click();

    // Atualizar o título
    cy.get('[data-testid="test-plan-title"]').clear().type('Plano Atualizado');

    // Salvar as alterações
    cy.get('[data-testid="save-test-plan"]').click();

    // Esperar a chamada de API
    cy.wait('@updateTestPlan').then((interception) => {
      expect(interception.response?.statusCode).to.equal(200);
      expect(interception.response?.body).to.include({
        title: 'Plano Atualizado'
      });
    });

    // Verificar se o título foi atualizado na lista
    cy.contains('Plano Atualizado').should('be.visible');
  });

  it('should delete a test plan', () => {
    // Interceptar a chamada de API
    cy.intercept('DELETE', '/api/test-plans/*').as('deleteTestPlan');

    // Visitar a página de planos de teste
    cy.visit('/test-plans');

    // Pegar o título do primeiro plano
    cy.get('[data-testid="test-plan-title"]')
      .first()
      .invoke('text')
      .as('planTitle');

    // Clicar no botão de excluir do primeiro plano
    cy.get('[data-testid="delete-test-plan"]').first().click();

    // Confirmar a exclusão
    cy.get('[data-testid="confirm-delete"]').click();

    // Esperar a chamada de API
    cy.wait('@deleteTestPlan').then((interception) => {
      expect(interception.response?.statusCode).to.equal(200);
    });

    // Verificar se o plano foi removido da lista
    cy.get('@planTitle').then((title) => {
      cy.contains(title as string).should('not.exist');
    });
  });

  it('should filter test plans', () => {
    // Interceptar a chamada de API
    cy.intercept('GET', '/api/test-plans*').as('getTestPlans');

    // Visitar a página de planos de teste
    cy.visit('/test-plans');

    // Filtrar por status
    cy.get('[data-testid="status-filter"]').click();
    cy.get('[data-value="active"]').click();

    // Esperar a chamada de API
    cy.wait('@getTestPlans').then((interception) => {
      expect(interception.response?.statusCode).to.equal(200);
      expect(interception.request.url).to.include('status=active');
    });

    // Buscar por texto
    cy.get('[data-testid="search-test-plans"]').type('teste');

    // Esperar a chamada de API
    cy.wait('@getTestPlans').then((interception) => {
      expect(interception.response?.statusCode).to.equal(200);
      expect(interception.request.url).to.include('search=teste');
    });
  });
}); 