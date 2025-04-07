import React from 'react';
import { TestPlan } from '../../../types/testPlan';
import TestPlanCard from './TestPlanCard';

interface TestPlanListProps {
  plans: TestPlan[];
  onEdit: (plan: TestPlan) => void;
  onDelete: (plan: TestPlan) => void;
}

const TestPlanList: React.FC<TestPlanListProps> = ({ plans, onEdit, onDelete }) => {
  if (plans.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          Nenhum plano de teste encontrado.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {plans.map((plan) => (
        <TestPlanCard
          key={plan.id}
          plan={plan}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TestPlanList; 