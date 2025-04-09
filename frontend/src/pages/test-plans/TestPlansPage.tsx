import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { TestPlan, TestPlanFilters, CreateTestPlanData } from '../../types/testPlan';
import TestPlanList from './components/TestPlanList';
import TestPlanFiltersComponent from './components/TestPlanFilters';
import { testPlanService } from '../../services/testPlanService';
import { toast } from 'react-hot-toast';

// Definir o tipo para os dados do formulário
type TestPlanFormData = Pick<CreateTestPlanData, 'title' | 'description'>;

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

  // Estado para controlar visibilidade do formulário
  const [isCreating, setIsCreating] = useState(false);
  // Estado para loading da criação
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  // Estado para armazenar planos (inicialmente mock)
  const [plans, setPlans] = useState<TestPlan[]>(mockPlans);

  // Configuração do React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<TestPlanFormData>();

  // TODO: Substituir mock data por chamada à API para buscar planos
  // useEffect(() => {
  //   const fetchPlans = async () => {
  //     try {
  //       const fetchedPlans = await testPlanService.list(filters);
  //       setPlans(fetchedPlans);
  //     } catch (error) {
  //       console.error("Erro ao buscar planos:", error);
  //       toast.error('Falha ao carregar planos de teste.');
  //     }
  //   };
  //   fetchPlans();
  // }, [filters]); // Adicionar dependência dos filtros

  const handleCreateNew = () => {
    // Abre o formulário e reseta os campos
    reset({ title: '', description: '' });
    setIsCreating(true);
  };

  const handleCancelCreate = () => {
    setIsCreating(false);
    reset(); // Limpa o formulário ao cancelar
  };

  // Função para submeter o formulário de criação
  const onSubmitCreate: SubmitHandler<TestPlanFormData> = async (data) => {
    setIsLoadingCreate(true);
    try {
      // Adiciona status 'draft' como padrão ou permite seleção no futuro
      const newPlanData: CreateTestPlanData = { ...data, status: 'draft' };
      const createdPlan = await testPlanService.create(newPlanData);
      // TODO: Atualizar a lista de planos realisticamente (refetch ou adicionar localmente)
      setPlans(prevPlans => [createdPlan, ...prevPlans]); // Exemplo: Adiciona no início
      toast.success('Plano de teste criado com sucesso!');
      setIsCreating(false); // Fecha o formulário
      reset(); // Limpa o formulário
    } catch (error) {
      console.error("Erro ao criar plano:", error);
      toast.error('Falha ao criar plano de teste. Verifique os campos ou tente novamente.');
    } finally {
      setIsLoadingCreate(false);
    }
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
        <Button onClick={handleCreateNew} data-testid="create-test-plan-button" disabled={isCreating}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Plano
        </Button>
      </div>

      {/* Formulário de Criação (Condicional) */}
      {isCreating && (
        <div className="border p-4 rounded-md space-y-4 bg-card shadow-sm">
           <h3 className="text-lg font-semibold">Criar Novo Plano de Teste</h3>
           <form onSubmit={handleSubmit(onSubmitCreate)} className="space-y-4">
             <div>
               <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Título</label>
               <Input
                 id="title"
                 data-testid="test-plan-title-input"
                 {...register('title', { required: 'Título é obrigatório' })}
                 placeholder="Título do plano de teste"
                 aria-invalid={errors.title ? "true" : "false"}
                 className={errors.title ? 'border-red-500' : ''}
                 disabled={isLoadingCreate}
               />
               {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>}
             </div>
             <div>
               <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
               <Textarea
                 id="description"
                 data-testid="test-plan-description-input"
                 {...register('description')}
                 placeholder="Descrição detalhada do plano de teste (opcional)"
                 rows={4}
                 disabled={isLoadingCreate}
               />
             </div>
             <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={handleCancelCreate} disabled={isLoadingCreate}>
                  Cancelar
                </Button>
               <Button type="submit" disabled={isLoadingCreate} data-testid="create-test-plan-submit">
                 {isLoadingCreate ? 'Criando...' : 'Criar Plano'}
               </Button>
             </div>
           </form>
         </div>
      )}

      {/* Barra de Ferramentas */}
      <div className={`flex items-center gap-4 ${isCreating ? 'mt-6' : ''}`}>
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
        plans={plans}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default TestPlansPage; 