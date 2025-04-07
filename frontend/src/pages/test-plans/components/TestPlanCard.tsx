import React from 'react';
import { MoreVertical, FolderKanban, CheckSquare } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { TestPlan, TestPlanStatus } from '../../../types/testPlan';

interface TestPlanCardProps {
  plan: TestPlan;
  onEdit: (plan: TestPlan) => void;
  onDelete: (plan: TestPlan) => void;
}

const statusColors: Record<TestPlanStatus, string> = {
  draft: 'bg-yellow-100 text-yellow-800',
  active: 'bg-green-100 text-green-800',
  completed: 'bg-blue-100 text-blue-800',
  archived: 'bg-gray-100 text-gray-800'
};

const statusLabels: Record<TestPlanStatus, string> = {
  draft: 'Rascunho',
  active: 'Ativo',
  completed: 'Concluído',
  archived: 'Arquivado'
};

const TestPlanCard: React.FC<TestPlanCardProps> = ({ plan, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{plan.title}</h3>
          <p className="text-gray-600 mt-1">{plan.description}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEdit(plan)}
          data-testid={`edit-test-plan-${plan.id}`}
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <FolderKanban className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">{plan.suites} suítes</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckSquare className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">{plan.cases} casos</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[plan.status]}`}>
            {statusLabels[plan.status]}
          </span>
          <span className="text-sm text-gray-500">
            Criado por {plan.createdBy.name}
          </span>
        </div>
        <div className="text-sm text-gray-500">
          Atualizado em {new Date(plan.updatedAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default TestPlanCard; 