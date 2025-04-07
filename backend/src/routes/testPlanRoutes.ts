import { Router } from 'express';
import { verifyToken } from '../middleware/auth';
import { validateTestPlan } from '../middleware/validation';
import {
  listTestPlans,
  createTestPlan,
  getTestPlan,
  updateTestPlan,
  deleteTestPlan
} from '../controllers/testPlanController';

const router = Router();

// Middleware de autenticação para todas as rotas
router.use(verifyToken);

/**
 * @swagger
 * /test-plans:
 *   get:
 *     tags:
 *       - Planos de Teste
 *     summary: Lista todos os planos de teste
 *     description: Retorna uma lista paginada de planos de teste
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Quantidade de itens por página
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [draft, active, completed, archived]
 *         description: Filtrar por status
 *     responses:
 *       200:
 *         description: Lista de planos de teste
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TestPlan'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     pages:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *   post:
 *     tags:
 *       - Planos de Teste
 *     summary: Cria um novo plano de teste
 *     description: Cria um novo plano de teste com os dados fornecidos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TestPlanInput'
 *     responses:
 *       201:
 *         description: Plano de teste criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TestPlan'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
router.get('/', listTestPlans);
router.post('/', validateTestPlan, createTestPlan);

/**
 * @swagger
 * /test-plans/{id}:
 *   get:
 *     tags:
 *       - Planos de Teste
 *     summary: Obtém um plano de teste específico
 *     description: Retorna os detalhes de um plano de teste pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do plano de teste
 *     responses:
 *       200:
 *         description: Detalhes do plano de teste
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TestPlan'
 *       404:
 *         description: Plano de teste não encontrado
 *   put:
 *     tags:
 *       - Planos de Teste
 *     summary: Atualiza um plano de teste
 *     description: Atualiza os dados de um plano de teste existente
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do plano de teste
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TestPlanInput'
 *     responses:
 *       200:
 *         description: Plano de teste atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TestPlan'
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Plano de teste não encontrado
 *   delete:
 *     tags:
 *       - Planos de Teste
 *     summary: Remove um plano de teste
 *     description: Remove um plano de teste pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do plano de teste
 *     responses:
 *       204:
 *         description: Plano de teste removido com sucesso
 *       404:
 *         description: Plano de teste não encontrado
 */
router.get('/:id', getTestPlan);
router.put('/:id', validateTestPlan, updateTestPlan);
router.delete('/:id', deleteTestPlan);

export default router; 