describe('Test Plan API', () => {
  let token: string;
  let testPlanId: string;
  const randomEmail = `testplan_${Date.now()}_${Math.random().toString(36).substring(2, 15)}@example.com`;

  beforeEach(() => {
    // Registrar um usuário para os testes
    cy.request({
      method: 'POST',
      url: '/auth/register',
      body: {
        name: 'Test User',
        email: randomEmail,
        password: 'password123',
        confirmPassword: 'password123'
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('token');
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
      url: '/test-plans',
      headers: { Authorization: `Bearer ${token}` },
      body: testPlan
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('_id');
      expect(response.body.title).to.eq(testPlan.title);
      expect(response.body.description).to.eq(testPlan.description);
      expect(response.body.status).to.eq(testPlan.status);
      expect(response.body.suites).to.have.length(1);
      expect(response.body.createdBy).to.have.property('email', randomEmail);
      testPlanId = response.body._id;
    });
  });

  it('deve listar planos de teste com paginação', () => {
    cy.request({
      method: 'GET',
      url: '/test-plans',
      headers: { Authorization: `Bearer ${token}` },
      qs: { page: 1, limit: 10 }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data');
      expect(response.body).to.have.property('pagination');
      expect(response.body.data).to.be.an('array');
      expect(response.body.pagination).to.deep.include({
        page: 1,
        limit: 10
      });
    });
  });

  it('deve obter um plano de teste específico', () => {
    cy.request({
      method: 'GET',
      url: `/test-plans/${testPlanId}`,
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body._id).to.eq(testPlanId);
      expect(response.body.createdBy.email).to.eq(randomEmail);
    });
  });

  it('deve atualizar um plano de teste', () => {
    // Primeiro criar um plano de teste
    const testPlan = {
      title: 'Plano de Teste para Atualização',
      description: 'Descrição inicial do plano',
      status: 'draft'
    };

    cy.request({
      method: 'POST',
      url: '/test-plans',
      headers: { Authorization: `Bearer ${token}` },
      body: testPlan
    }).then((response) => {
      expect(response.status).to.eq(201);
      const planId = response.body._id;

      // Depois atualizar o plano criado
      const update = {
        title: 'Plano de Teste E2E - Atualizado',
        description: 'Descrição atualizada do plano de teste',
        status: 'active'
      };

      cy.request({
        method: 'PUT',
        url: `/test-plans/${planId}`,
        headers: { Authorization: `Bearer ${token}` },
        body: update
      }).then((updateResponse) => {
        expect(updateResponse.status).to.eq(200);
        expect(updateResponse.body.title).to.eq(update.title);
        expect(updateResponse.body.description).to.eq(update.description);
        expect(updateResponse.body.status).to.eq(update.status);
      });
    });
  });

  it('deve falhar ao criar plano sem título', () => {
    cy.request({
      method: 'POST',
      url: '/test-plans',
      headers: { Authorization: `Bearer ${token}` },
      body: {
        description: 'Plano sem título'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('errors');
      expect(response.body.errors[0]).to.have.property('msg', 'Título é obrigatório');
    });
  });

  it('deve falhar ao criar plano com status inválido', () => {
    cy.request({
      method: 'POST',
      url: '/test-plans',
      headers: { Authorization: `Bearer ${token}` },
      body: {
        title: 'Plano de Teste',
        description: 'Descrição do plano',
        status: 'invalid_status'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('errors');
      expect(response.body.errors[0]).to.have.property('msg', 'Status inválido');
    });
  });

  it('deve falhar ao acessar sem autenticação', () => {
    cy.request({
      method: 'GET',
      url: '/test-plans',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property('message', 'Token não fornecido');
    });
  });

  it('deve falhar ao acessar com token inválido', () => {
    cy.request({
      method: 'GET',
      url: '/test-plans',
      headers: { Authorization: 'Bearer invalid_token' },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property('message', 'Token inválido');
    });
  });

  it('deve remover um plano de teste', () => {
    // Primeiro criar um plano de teste
    const testPlan = {
      title: 'Plano de Teste para Remoção',
      description: 'Descrição do plano a ser removido',
      status: 'draft'
    };

    cy.request({
      method: 'POST',
      url: '/test-plans',
      headers: { Authorization: `Bearer ${token}` },
      body: testPlan
    }).then((response) => {
      expect(response.status).to.eq(201);
      const planId = response.body._id;

      // Depois remover o plano criado
      cy.request({
        method: 'DELETE',
        url: `/test-plans/${planId}`,
        headers: { Authorization: `Bearer ${token}` }
      }).then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(204);

        // Verificar se o plano foi realmente removido
        cy.request({
          method: 'GET',
          url: `/test-plans/${planId}`,
          headers: { Authorization: `Bearer ${token}` },
          failOnStatusCode: false
        }).then((getResponse) => {
          expect(getResponse.status).to.eq(404);
        });
      });
    });
  });
}); 