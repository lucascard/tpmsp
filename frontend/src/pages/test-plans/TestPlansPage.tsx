import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { TestPlan, TestPlanFilters } from '../../types/testPlan';
import TestPlanList from './components/TestPlanList';
import TestPlanFiltersComponent from './components/TestPlanFilters';

const TestPlansPage: React.FC = () => {
  const [filters, setFilters] = useState<TestPlanFilters>({
    search: '',
    status: 'all',
    sortBy: 'updatedAt',
    sortOrder: 'desc'
  });

  // Mock data - será substituído por dados da API
  const mockPlans: TestPlan[] = [
    {
      id: 1,
      title: 'Plano de Teste 1',
      description: 'Descrição do plano de teste 1',
      status: 'active',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-02T00:00:00Z',
      createdBy: { id: 1, name: 'Usuário 1' },
      suites: 5,
      cases: 20,
      progress: 75
    },
    {
      id: 2,
      title: 'Plano de Teste 2',
      description: 'Descrição do plano de teste 2',
      status: 'draft',
      createdAt: '2024-01-03T00:00:00Z',
      updatedAt: '2024-01-04T00:00:00Z',
      createdBy: { id: 2, name: 'Usuário 2' },
      suites: 3,
      cases: 15,
      progress: 50
    }
  ];

  const handleCreateNew = () => {
    // Implementar criação de novo plano
    console.log('Criar novo plano');
  };

  const handleEdit = (plan: TestPlan) => {
    // Implementar edição do plano
    console.log('Editar plano:', plan);
  };

  const handleDelete = (plan: TestPlan) => {
    // Implementar exclusão do plano
    console.log('Excluir plano:', plan);
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Planos de Teste</h2>
          <p className="text-muted-foreground">Gerencie seus planos de teste</p>
        </div>
        <Button onClick={handleCreateNew} data-testid="create-test-plan-button">
          <Plus className="h-4 w-4 mr-2" />
          Novo Plano
        </Button>
      </div>

      {/* Barra de Ferramentas */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input
            placeholder="Buscar planos de teste..."
            value={filters.search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilters({ ...filters, search: e.target.value })}
            className="max-w-sm"
            data-testid="search-test-plans"
          />
        </div>
        <TestPlanFiltersComponent
          filters={filters}
          onFiltersChange={setFilters}
        />
      </div>

      {/* Lista de Planos */}
      <TestPlanList
        plans={mockPlans}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default TestPlansPage; 