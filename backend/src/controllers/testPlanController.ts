import { Request, Response } from 'express';
import { TestPlan } from '../models/TestPlan';

// Lista todos os planos de teste com paginação e filtros
export const listTestPlans = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string;

    const query = status ? { status } : {};
    const skip = (page - 1) * limit;

    const [testPlans, total] = await Promise.all([
      TestPlan.find(query)
        .skip(skip)
        .limit(limit)
        .populate('createdBy', 'name email')
        .sort({ createdAt: -1 }),
      TestPlan.countDocuments(query)
    ]);

    const pages = Math.ceil(total / limit);

    res.json({
      data: testPlans,
      pagination: {
        total,
        pages,
        page,
        limit
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Erro ao listar planos de teste', error: error.message });
  }
};

// Cria um novo plano de teste
export const createTestPlan = async (req: Request, res: Response) => {
  try {
    const { title, description, status, suites } = req.body;
    const createdBy = (req as any).user.id; // ID do usuário autenticado

    const testPlan = new TestPlan({
      title,
      description,
      status,
      suites,
      createdBy
    });

    await testPlan.save();
    await testPlan.populate('createdBy', 'name email');

    res.status(201).json(testPlan);
  } catch (error: any) {
    res.status(400).json({ message: 'Erro ao criar plano de teste', error: error.message });
  }
};

// Obtém um plano de teste específico
export const getTestPlan = async (req: Request, res: Response) => {
  try {
    const testPlan = await TestPlan.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!testPlan) {
      return res.status(404).json({ message: 'Plano de teste não encontrado' });
    }

    res.json(testPlan);
  } catch (error: any) {
    res.status(500).json({ message: 'Erro ao obter plano de teste', error: error.message });
  }
};

// Atualiza um plano de teste
export const updateTestPlan = async (req: Request, res: Response) => {
  try {
    const { title, description, status, suites } = req.body;
    const userId = (req as any).user.id;

    const testPlan = await TestPlan.findById(req.params.id);

    if (!testPlan) {
      return res.status(404).json({ message: 'Plano de teste não encontrado' });
    }

    // Verifica se o usuário é o criador do plano
    if (testPlan.createdBy.toString() !== userId) {
      return res.status(403).json({ message: 'Não autorizado a atualizar este plano de teste' });
    }

    const updatedTestPlan = await TestPlan.findByIdAndUpdate(
      req.params.id,
      { title, description, status, suites },
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email');

    res.json(updatedTestPlan);
  } catch (error: any) {
    res.status(400).json({ message: 'Erro ao atualizar plano de teste', error: error.message });
  }
};

// Remove um plano de teste
export const deleteTestPlan = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const testPlan = await TestPlan.findById(req.params.id);

    if (!testPlan) {
      return res.status(404).json({ message: 'Plano de teste não encontrado' });
    }

    // Verifica se o usuário é o criador do plano
    if (testPlan.createdBy.toString() !== userId) {
      return res.status(403).json({ message: 'Não autorizado a remover este plano de teste' });
    }

    await testPlan.deleteOne();
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: 'Erro ao remover plano de teste', error: error.message });
  }
}; 