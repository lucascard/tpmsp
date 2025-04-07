import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

// Validação de registro de usuário
export const validateRegister = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Nome é obrigatório')
    .isLength({ min: 2 })
    .withMessage('Nome deve ter no mínimo 2 caracteres'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email é obrigatório')
    .isEmail()
    .withMessage('Email inválido')
    .normalizeEmail(),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Senha é obrigatória')
    .isLength({ min: 6 })
    .withMessage('Senha deve ter no mínimo 6 caracteres'),
  body('confirmPassword')
    .trim()
    .notEmpty()
    .withMessage('Confirmação de senha é obrigatória')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Senhas não conferem');
      }
      return true;
    }),
  handleValidationErrors
];

// Validação de login
export const validateLogin = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email é obrigatório')
    .isEmail()
    .withMessage('Email inválido')
    .normalizeEmail(),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Senha é obrigatória'),
  handleValidationErrors
];

// Validação de plano de teste
export const validateTestPlan = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Título é obrigatório')
    .isLength({ min: 3 })
    .withMessage('Título deve ter no mínimo 3 caracteres'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Descrição é obrigatória')
    .isLength({ min: 10 })
    .withMessage('Descrição deve ter no mínimo 10 caracteres'),
  body('status')
    .optional()
    .isIn(['draft', 'active', 'completed', 'archived'])
    .withMessage('Status inválido'),
  body('suites')
    .optional()
    .isArray()
    .withMessage('Suites deve ser um array'),
  body('suites.*.title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Título da suite é obrigatório')
    .isLength({ min: 3 })
    .withMessage('Título da suite deve ter no mínimo 3 caracteres'),
  body('suites.*.description')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Descrição da suite é obrigatória')
    .isLength({ min: 10 })
    .withMessage('Descrição da suite deve ter no mínimo 10 caracteres'),
  body('suites.*.cases')
    .optional()
    .isArray()
    .withMessage('Casos de teste devem ser um array'),
  body('suites.*.cases.*.title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Título do caso de teste é obrigatório')
    .isLength({ min: 3 })
    .withMessage('Título do caso de teste deve ter no mínimo 3 caracteres'),
  body('suites.*.cases.*.description')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Descrição do caso de teste é obrigatória')
    .isLength({ min: 10 })
    .withMessage('Descrição do caso de teste deve ter no mínimo 10 caracteres'),
  body('suites.*.cases.*.steps')
    .optional()
    .isArray()
    .withMessage('Passos devem ser um array'),
  body('suites.*.cases.*.steps.*')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Passo não pode estar vazio'),
  body('suites.*.cases.*.expectedResult')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Resultado esperado é obrigatório'),
  body('suites.*.cases.*.status')
    .optional()
    .isIn(['pending', 'passed', 'failed'])
    .withMessage('Status do caso de teste inválido'),
  handleValidationErrors
];

// Função auxiliar para tratar erros de validação
function handleValidationErrors(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
} 