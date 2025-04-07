/// <reference types="cypress" />

describe('Test Plan API', () => {
  let token: string;
  let testPlanId: string;
  let testUserEmail: string;
  const API_BASE_URL = 'http://localhost:5000';

  beforeEach(() => {
    // Gerar email aleatório para evitar conflitos
    const randomString = Math.random().toString(36).substring(2, 8);
    testUserEmail = `testplan_${randomString}@example.com`;

    // Registrar um usuário para os testes
    cy.request({
      method: 'POST',
      url: `${API_BASE_URL}/auth/register`,
      body: {
        name: 'Test User',
        email: testUserEmail,
        password: 'password123',
        confirmPassword: 'password123'
      }
    }).then((response) => {
      token = response.body.token;
    });
  });

  it('deve criar um novo plano de teste', () => {
    const testPlan = {
      title: 'Plano de Teste E2E',
      description: 'Testes end-to-end do sistema',
      status: 'draft',
      suites: [
        {
          title: 'Suite de Login',
          description: 'Testes de funcionalidades de login',
          cases: [
            {
              title: 'Login bem-sucedido',
              description: 'Teste de login com credenciais válidas',
              steps: [
                'Acessar a página de login',
                'Preencher email válido',
                'Preencher senha válida',
                'Clicar em Login'
              ],
              expectedResult: 'Usuário é redirecionado para o dashboard',
              status: 'pending'
            }
          ]
        }
      ]
    };

    cy.request({
      method: 'POST',
      url: `${API_BASE_URL}/test-plans`,
      headers: { Authorization: `Bearer ${token}` },
      body: testPlan
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('_id');
      expect(response.body.title).to.eq(testPlan.title);
      expect(response.body.description).to.eq(testPlan.description);
      expect(response.body.status).to.eq(testPlan.status);
      testPlanId = response.body._id;
    });
  });

  it('deve listar planos de teste com paginação', () => {
    cy.request({
      method: 'GET',
      url: `${API_BASE_URL}/test-plans`,
      headers: { Authorization: `Bearer ${token}` },
      qs: { page: 1, limit: 10 }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data');
      expect(response.body).to.have.property('pagination');
      expect(response.body.data).to.be.an('array');
      expect(response.body.pagination).to.have.all.keys(['total', 'pages', 'page', 'limit']);
    });
  });

  it('deve filtrar planos de teste por status', () => {
    cy.request({
      method: 'GET',
      url: `${API_BASE_URL}/test-plans`,
      headers: { Authorization: `Bearer ${token}` },
      qs: { status: 'draft' }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.be.an('array');
      response.body.data.forEach((plan: any) => {
        expect(plan.status).to.eq('draft');
      });
    });
  });

  it('deve obter um plano de teste específico', () => {
    cy.request({
      method: 'GET',
      url: `${API_BASE_URL}/test-plans/${testPlanId}`,
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body._id).to.eq(testPlanId);
      expect(response.body.title).to.eq('Plano de Teste E2E');
    });
  });

  it('deve atualizar um plano de teste', () => {
    const update = {
      title: 'Plano de Teste E2E - Atualizado',
      description: 'Descrição atualizada do plano de teste'
    };

    cy.request({
      method: 'PUT',
      url: `${API_BASE_URL}/test-plans/${testPlanId}`,
      headers: { Authorization: `Bearer ${token}` },
      body: update
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.title).to.eq(update.title);
      expect(response.body.description).to.eq(update.description);
    });
  });

  it('deve falhar ao criar plano sem título', () => {
    cy.request({
      method: 'POST',
      url: `${API_BASE_URL}/test-plans`,
      headers: { Authorization: `Bearer ${token}` },
      body: {
        description: 'Plano sem título'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('errors');
    });
  });

  it('deve falhar ao acessar sem autenticação', () => {
    cy.request({
      method: 'GET',
      url: `${API_BASE_URL}/test-plans`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

  it('deve remover um plano de teste', () => {
    cy.request({
      method: 'DELETE',
      url: `${API_BASE_URL}/test-plans/${testPlanId}`,
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      expect(response.status).to.eq(204);
    });

    // Verificar se o plano foi realmente removido
    cy.request({
      method: 'GET',
      url: `${API_BASE_URL}/test-plans/${testPlanId}`,
      headers: { Authorization: `Bearer ${token}` },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
}); 