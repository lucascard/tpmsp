/// <reference types="cypress" />

describe('Test Plans E2E', () => {
  let testUserEmail: string;

  beforeEach(() => {
    // Gerar email aleatório para evitar conflitos
    const randomString = Math.random().toString(36).substring(2, 8);
    testUserEmail = `testplan_${randomString}@example.com`;

    // Registrar e fazer login com um usuário
    cy.request({
      method: 'POST',
      url: 'http://localhost:5000/auth/register',
      body: {
        name: 'Test User',
        email: testUserEmail,
        password: 'password123',
        confirmPassword: 'password123'
      }
    }).then((response) => {
      localStorage.setItem('token', response.body.token);
    });

    // Navegar para a página inicial
    cy.visit('/');
    cy.get('[data-testid="test-plans-link"]').click();
  });

  it('deve criar um novo plano de teste através da interface', () => {
    // Clicar no botão de criar novo plano
    cy.get('[data-testid="create-test-plan-button"]').click();

    // Preencher o formulário
    cy.get('[data-testid="test-plan-title"]').type('Plano de Teste via Interface');
    cy.get('[data-testid="test-plan-description"]').type('Teste criado através do frontend');
    cy.get('[data-testid="test-plan-submit"]').click();

    // Verificar se o plano foi criado
    cy.get('[data-testid="test-plan-card"]')
      .should('contain', 'Plano de Teste via Interface')
      .should('contain', 'Teste criado através do frontend');
  });

  it('deve exibir a lista de planos com paginação', () => {
    // Verificar elementos da paginação
    cy.get('[data-testid="pagination"]').should('exist');
    cy.get('[data-testid="test-plan-list"]').should('exist');
    cy.get('[data-testid="test-plan-card"]').should('have.length.at.least', 1);
  });

  it('deve filtrar planos por status', () => {
    // Selecionar filtro de status
    cy.get('[data-testid="status-filter"]').click();
    cy.get('[data-testid="status-option-draft"]').click();

    // Verificar se os planos exibidos têm o status correto
    cy.get('[data-testid="test-plan-status"]').each(($status) => {
      expect($status.text()).to.equal('Rascunho');
    });
  });

  it('deve editar um plano existente', () => {
    // Clicar no primeiro plano da lista
    cy.get('[data-testid="test-plan-card"]').first().click();

    // Clicar no botão de editar
    cy.get('[data-testid="edit-test-plan-button"]').click();

    // Atualizar os campos
    cy.get('[data-testid="test-plan-title"]')
      .clear()
      .type('Plano Atualizado via Interface');
    cy.get('[data-testid="test-plan-description"]')
      .clear()
      .type('Descrição atualizada via frontend');

    // Salvar as alterações
    cy.get('[data-testid="test-plan-submit"]').click();

    // Verificar se as alterações foram salvas
    cy.get('[data-testid="test-plan-details"]')
      .should('contain', 'Plano Atualizado via Interface')
      .should('contain', 'Descrição atualizada via frontend');
  });

  it('deve exibir mensagem de erro ao tentar criar plano sem título', () => {
    // Clicar no botão de criar novo plano
    cy.get('[data-testid="create-test-plan-button"]').click();

    // Tentar submeter o formulário sem título
    cy.get('[data-testid="test-plan-description"]').type('Plano sem título');
    cy.get('[data-testid="test-plan-submit"]').click();

    // Verificar mensagem de erro
    cy.get('[data-testid="error-message"]')
      .should('be.visible')
      .should('contain', 'Título é obrigatório');
  });

  it('deve remover um plano de teste', () => {
    // Clicar no primeiro plano da lista
    cy.get('[data-testid="test-plan-card"]').first().click();

    // Pegar o título do plano para verificação posterior
    let planTitle: string;
    cy.get('[data-testid="test-plan-title"]')
      .invoke('text')
      .then((text) => {
        planTitle = text;
      });

    // Clicar no botão de remover
    cy.get('[data-testid="delete-test-plan-button"]').click();

    // Confirmar a remoção
    cy.get('[data-testid="confirm-delete-button"]').click();

    // Verificar se o plano foi removido
    cy.get('[data-testid="test-plan-card"]').contains(planTitle).should('not.exist');
  });

  afterEach(() => {
    // Limpar o token do localStorage
    localStorage.removeItem('token');
  });
}); 