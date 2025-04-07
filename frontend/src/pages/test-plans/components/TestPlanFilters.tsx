import React from 'react';
import { TestPlanFilters as Filters, TestPlanStatus } from '../../../types/testPlan';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

interface TestPlanFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const TestPlanFilters: React.FC<TestPlanFiltersProps> = ({ filters, onFiltersChange }) => {
  const handleStatusChange = (value: TestPlanStatus | 'all') => {
    onFiltersChange({ ...filters, status: value });
  };

  const handleSortByChange = (value: Filters['sortBy']) => {
    onFiltersChange({ ...filters, sortBy: value });
  };

  return (
    <div className="flex gap-2">
      <Select value={filters.status} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="active">Ativo</SelectItem>
          <SelectItem value="draft">Rascunho</SelectItem>
          <SelectItem value="completed">Concluído</SelectItem>
          <SelectItem value="archived">Arquivado</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filters.sortBy} onValueChange={handleSortByChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Ordenar por" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="title">Título</SelectItem>
          <SelectItem value="status">Status</SelectItem>
          <SelectItem value="createdAt">Data de criação</SelectItem>
          <SelectItem value="updatedAt">Data de atualização</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TestPlanFilters; 