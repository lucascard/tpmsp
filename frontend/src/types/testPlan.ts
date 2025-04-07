export type TestPlanStatus = 'active' | 'draft' | 'completed' | 'archived';

export interface User {
  id: number;
  name: string;
}

export interface TestPlan {
  id: number;
  title: string;
  description: string;
  status: TestPlanStatus;
  createdAt: string;
  updatedAt: string;
  createdBy: User;
  suites: number;
  cases: number;
  progress: number;
}

export interface TestPlanFilters {
  search: string;
  status: TestPlanStatus | 'all';
  sortBy: 'title' | 'status' | 'createdAt' | 'updatedAt';
  sortOrder: 'asc' | 'desc';
}

export interface CreateTestPlanData {
  title: string;
  description: string;
  status: TestPlanStatus;
}

export interface UpdateTestPlanData extends Partial<CreateTestPlanData> {
  id: number;
} 