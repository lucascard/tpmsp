import api from './api';
import { TestPlan, CreateTestPlanData, UpdateTestPlanData, TestPlanFilters } from '../types/testPlan';

export const testPlanService = {
  // Listar planos de teste com filtros
  list: async (filters: TestPlanFilters) => {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.status !== 'all') params.append('status', filters.status);
    params.append('sortBy', filters.sortBy);
    params.append('sortOrder', filters.sortOrder);

    const response = await api.get<TestPlan[]>(`/test-plans?${params.toString()}`);
    return response.data;
  },

  // Obter um plano de teste específico
  get: async (id: number) => {
    const response = await api.get<TestPlan>(`/test-plans/${id}`);
    return response.data;
  },

  // Criar um novo plano de teste
  create: async (data: CreateTestPlanData) => {
    const response = await api.post<TestPlan>('/test-plans', data);
    return response.data;
  },

  // Atualizar um plano de teste existente
  update: async (data: UpdateTestPlanData) => {
    const response = await api.put<TestPlan>(`/test-plans/${data.id}`, data);
    return response.data;
  },

  // Excluir um plano de teste
  delete: async (id: number) => {
    await api.delete(`/test-plans/${id}`);
  }
}; 