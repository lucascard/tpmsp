import mongoose, { Document, Schema } from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     TestPlan:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - createdBy
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único do plano de teste gerado automaticamente
 *         title:
 *           type: string
 *           description: Título do plano de teste
 *         description:
 *           type: string
 *           description: Descrição detalhada do plano de teste
 *         status:
 *           type: string
 *           enum: [draft, active, completed, archived]
 *           default: draft
 *           description: Status atual do plano de teste
 *         createdBy:
 *           type: string
 *           description: ID do usuário que criou o plano de teste
 *         suites:
 *           type: array
 *           description: Lista de suites de teste associadas
 *           items:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título da suite de teste
 *               description:
 *                 type: string
 *                 description: Descrição da suite de teste
 *               cases:
 *                 type: array
 *                 description: Lista de casos de teste na suite
 *                 items:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       description: Título do caso de teste
 *                     description:
 *                       type: string
 *                       description: Descrição do caso de teste
 *                     steps:
 *                       type: array
 *                       description: Passos do caso de teste
 *                       items:
 *                         type: string
 *                     expectedResult:
 *                       type: string
 *                       description: Resultado esperado do caso de teste
 *                     status:
 *                       type: string
 *                       enum: [pending, passed, failed]
 *                       default: pending
 *         progress:
 *           type: object
 *           properties:
 *             total:
 *               type: number
 *               description: Total de casos de teste
 *             completed:
 *               type: number
 *               description: Casos de teste completados
 *             passed:
 *               type: number
 *               description: Casos de teste que passaram
 *             failed:
 *               type: number
 *               description: Casos de teste que falharam
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criação do plano de teste
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Data da última atualização do plano de teste
 *       example:
 *         title: "Plano de Teste - Sistema de Login"
 *         description: "Plano de teste para validar todas as funcionalidades do sistema de login"
 *         status: "active"
 *         createdBy: "507f1f77bcf86cd799439011"
 *         suites:
 *           - title: "Login de Usuário"
 *             description: "Testes de login de usuário"
 *             cases:
 *               - title: "Login com credenciais válidas"
 *                 description: "Verificar se o login funciona com credenciais corretas"
 *                 steps:
 *                   - "Acessar a página de login"
 *                   - "Inserir email válido"
 *                   - "Inserir senha válida"
 *                   - "Clicar no botão de login"
 *                 expectedResult: "Usuário é redirecionado para o dashboard"
 *                 status: "pending"
 *         progress:
 *           total: 5
 *           completed: 1
 *           passed: 1
 *           failed: 0
 */

export interface ITestCase extends Document {
  title: string;
  description: string;
  steps: string[];
  expectedResult: string;
  status: 'pending' | 'passed' | 'failed';
}

export interface ITestSuite extends Document {
  title: string;
  description: string;
  cases: ITestCase[];
}

export interface ITestPlan extends Document {
  title: string;
  description: string;
  status: 'draft' | 'active' | 'completed' | 'archived';
  createdBy: mongoose.Types.ObjectId;
  suites: ITestSuite[];
  progress: {
    total: number;
    completed: number;
    passed: number;
    failed: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const TestCaseSchema = new Schema<ITestCase>({
  title: {
    type: String,
    required: [true, 'Título do caso de teste é obrigatório'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Descrição do caso de teste é obrigatória'],
  },
  steps: [{
    type: String,
    required: [true, 'Passos do caso de teste são obrigatórios'],
  }],
  expectedResult: {
    type: String,
    required: [true, 'Resultado esperado é obrigatório'],
  },
  status: {
    type: String,
    enum: ['pending', 'passed', 'failed'],
    default: 'pending',
  },
});

const TestSuiteSchema = new Schema<ITestSuite>({
  title: {
    type: String,
    required: [true, 'Título da suite de teste é obrigatório'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Descrição da suite de teste é obrigatória'],
  },
  cases: [TestCaseSchema],
});

const TestPlanSchema = new Schema<ITestPlan>(
  {
    title: {
      type: String,
      required: [true, 'Título do plano de teste é obrigatório'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Descrição do plano de teste é obrigatória'],
    },
    status: {
      type: String,
      enum: ['draft', 'active', 'completed', 'archived'],
      default: 'draft',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Criador do plano de teste é obrigatório'],
    },
    suites: [TestSuiteSchema],
    progress: {
      total: {
        type: Number,
        default: 0,
      },
      completed: {
        type: Number,
        default: 0,
      },
      passed: {
        type: Number,
        default: 0,
      },
      failed: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Middleware para atualizar o progresso antes de salvar
TestPlanSchema.pre('save', function(next) {
  const testPlan = this;
  let total = 0;
  let completed = 0;
  let passed = 0;
  let failed = 0;

  testPlan.suites.forEach(suite => {
    suite.cases.forEach(testCase => {
      total++;
      if (testCase.status !== 'pending') {
        completed++;
        if (testCase.status === 'passed') passed++;
        if (testCase.status === 'failed') failed++;
      }
    });
  });

  testPlan.progress = { total, completed, passed, failed };
  next();
});

const TestPlan = mongoose.model<ITestPlan>('TestPlan', TestPlanSchema);
export { TestPlan }; 