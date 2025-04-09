/// <reference types="cypress" />


const numeroAleatorio = Math.floor(Math.random() * 900) + 100;

describe('Test Plans E2E', () => {
  beforeEach(() => {
    const testUser = {
      email: 'massatest@email.com',
      password: 'teste123'
    };
  
    cy.login(testUser.email, testUser.password);
    // Aguarda o redirecionamento para o dashboard
    cy.url().should('include', '/dashboard');
    
  });

  it('deve criar um novo plano de teste através da interface', () => {

    cy.get('[data-testid="test-plans-link"]').click()
    // Clicar no botão de criar novo plano
    cy.get('[data-testid="create-test-plan-button"]').click();

    // Preencher o formulário
    cy.get('[data-testid="test-plan-title-input"]').type('Plano de Teste via Interface ' + numeroAleatorio);
    cy.get('[data-testid="test-plan-description-input"]').type('Teste criado através do frontend');
    cy.get('[data-testid="create-test-plan-submit"]').click();

    // Verificar se o plano foi criado
    cy.get('h3').contains('Plano de Teste via Interface ' + numeroAleatorio).should('be.visible')
    cy.get('p').contains('Teste criado através do frontend')
  });

  it.skip('deve exibir a lista de planos com paginação', () => {
    // Verificar elementos da paginação
    cy.get('[data-testid="pagination"]').should('exist');
    cy.get('[data-testid="test-plan-list"]').should('exist');
    cy.get('[data-testid="test-plan-card"]').should('have.length.at.least', 1);
  });

  it.skip('deve filtrar planos por status', () => {
    // Selecionar filtro de status
    cy.get('[data-testid="status-filter"]').click();
    cy.get('[data-testid="status-option-draft"]').click();

    // Verificar se os planos exibidos têm o status correto
    cy.get('[data-testid="test-plan-status"]').each(($status) => {
      expect($status.text()).to.equal('Rascunho');
    });
  });

  it.skip('deve editar um plano existente', () => {
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
    cy.get('[data-testid="test-plans-link"]').click()
    // Clicar no botão de criar novo plano
    cy.get('[data-testid="create-test-plan-button"]').click();

    // Tentar submeter o formulário sem título
    cy.get('[data-testid="create-test-plan-submit"]').click();

    // Verificar mensagem de erro
    cy.get('p').contains('Título é obrigatório').should('be.visible')
  });

  it.skip('deve remover um plano de teste', () => {
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
}); 