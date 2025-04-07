import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../app';
import { TestPlan } from '../models/TestPlan';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';

describe('Test Plan API', () => {
  let token: string;
  let userId: string;

  beforeAll(async () => {
    // Conectar ao banco de dados de teste
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/tpmsp_test');

    // Criar um usuário para os testes
    const user = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });

    userId = user._id.toString();
    token = jwt.sign({ id: userId }, process.env.JWT_SECRET || 'your-secret-key');
  });

  afterAll(async () => {
    // Limpar o banco de dados e desconectar
    await TestPlan.deleteMany({});
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Limpar a coleção de planos de teste antes de cada teste
    await TestPlan.deleteMany({});
  });

  describe('POST /test-plans', () => {
    it('deve criar um novo plano de teste', async () => {
      const testPlan = {
        title: 'Plano de Teste - Login',
        description: 'Testes para o sistema de login',
        status: 'draft',
        suites: [
          {
            title: 'Login de Usuário',
            description: 'Testes de login de usuário',
            cases: [
              {
                title: 'Login com credenciais válidas',
                description: 'Verificar se o login funciona com credenciais corretas',
                steps: [
                  'Acessar a página de login',
                  'Inserir email válido',
                  'Inserir senha válida',
                  'Clicar no botão de login'
                ],
                expectedResult: 'Usuário é redirecionado para o dashboard',
                status: 'pending'
              }
            ]
          }
        ]
      };

      const response = await request(app)
        .post('/test-plans')
        .set('Authorization', `Bearer ${token}`)
        .send(testPlan);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('_id');
      expect(response.body.title).toBe(testPlan.title);
      expect(response.body.createdBy).toBe(userId);
    });

    it('deve retornar erro ao criar plano sem título', async () => {
      const testPlan = {
        description: 'Testes para o sistema de login'
      };

      const response = await request(app)
        .post('/test-plans')
        .set('Authorization', `Bearer ${token}`)
        .send(testPlan);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
    });
  });

  describe('GET /test-plans', () => {
    it('deve listar planos de teste com paginação', async () => {
      // Criar alguns planos de teste
      await TestPlan.create([
        {
          title: 'Plano 1',
          description: 'Descrição do plano 1',
          createdBy: userId
        },
        {
          title: 'Plano 2',
          description: 'Descrição do plano 2',
          createdBy: userId
        }
      ]);

      const response = await request(app)
        .get('/test-plans')
        .set('Authorization', `Bearer ${token}`)
        .query({ page: 1, limit: 10 });

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.pagination).toHaveProperty('total', 2);
    });

    it('deve filtrar planos por status', async () => {
      await TestPlan.create([
        {
          title: 'Plano Ativo',
          description: 'Descrição do plano',
          status: 'active',
          createdBy: userId
        },
        {
          title: 'Plano Rascunho',
          description: 'Descrição do plano',
          status: 'draft',
          createdBy: userId
        }
      ]);

      const response = await request(app)
        .get('/test-plans')
        .set('Authorization', `Bearer ${token}`)
        .query({ status: 'active' });

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].status).toBe('active');
    });
  });

  describe('GET /test-plans/:id', () => {
    it('deve retornar um plano de teste específico', async () => {
      const testPlan = await TestPlan.create({
        title: 'Plano de Teste',
        description: 'Descrição do plano',
        createdBy: userId
      });

      const response = await request(app)
        .get(`/test-plans/${testPlan._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body._id).toBe(testPlan._id.toString());
    });

    it('deve retornar 404 para ID inválido', async () => {
      const response = await request(app)
        .get('/test-plans/invalid-id')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /test-plans/:id', () => {
    it('deve atualizar um plano de teste', async () => {
      const testPlan = await TestPlan.create({
        title: 'Plano Original',
        description: 'Descrição original',
        createdBy: userId
      });

      const update = {
        title: 'Plano Atualizado',
        description: 'Descrição atualizada'
      };

      const response = await request(app)
        .put(`/test-plans/${testPlan._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(update);

      expect(response.status).toBe(200);
      expect(response.body.title).toBe(update.title);
      expect(response.body.description).toBe(update.description);
    });

    it('deve impedir atualização por usuário não autorizado', async () => {
      const testPlan = await TestPlan.create({
        title: 'Plano de Teste',
        description: 'Descrição do plano',
        createdBy: new mongoose.Types.ObjectId() // Outro usuário
      });

      const response = await request(app)
        .put(`/test-plans/${testPlan._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Novo Título' });

      expect(response.status).toBe(403);
    });
  });

  describe('DELETE /test-plans/:id', () => {
    it('deve remover um plano de teste', async () => {
      const testPlan = await TestPlan.create({
        title: 'Plano para Remover',
        description: 'Descrição do plano',
        createdBy: userId
      });

      const response = await request(app)
        .delete(`/test-plans/${testPlan._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(204);

      const deletedPlan = await TestPlan.findById(testPlan._id);
      expect(deletedPlan).toBeNull();
    });

    it('deve impedir remoção por usuário não autorizado', async () => {
      const testPlan = await TestPlan.create({
        title: 'Plano de Teste',
        description: 'Descrição do plano',
        createdBy: new mongoose.Types.ObjectId() // Outro usuário
      });

      const response = await request(app)
        .delete(`/test-plans/${testPlan._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(403);
    });
  });
}); 