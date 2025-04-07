import { testPlanService } from '../../services/testPlanService';
import api from '../../services/api';
import { TestPlan, TestPlanStatus } from '../../types/testPlan';

jest.mock('../../services/api');
const mockedApi = api as jest.Mocked<typeof api>;

describe('Test Plan Service', () => {
  const mockTestPlan: TestPlan = {
    id: 1,
    title: 'Test Plan 1',
    description: 'Description 1',
    status: 'active' as TestPlanStatus,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: { id: 1, name: 'User 1' },
    suites: 2,
    cases: 10,
    progress: 50
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('list', () => {
    it('should list test plans with filters', async () => {
      const filters = {
        search: 'test',
        status: 'active' as TestPlanStatus,
        sortBy: 'title' as const,
        sortOrder: 'asc' as const
      };

      mockedApi.get.mockResolvedValueOnce({ data: [mockTestPlan] });

      const result = await testPlanService.list(filters);

      expect(mockedApi.get).toHaveBeenCalledWith(
        '/test-plans?search=test&status=active&sortBy=title&sortOrder=asc'
      );
      expect(result).toEqual([mockTestPlan]);
    });
  });

  describe('get', () => {
    it('should get a specific test plan', async () => {
      mockedApi.get.mockResolvedValueOnce({ data: mockTestPlan });

      const result = await testPlanService.get(1);

      expect(mockedApi.get).toHaveBeenCalledWith('/test-plans/1');
      expect(result).toEqual(mockTestPlan);
    });
  });

  describe('create', () => {
    it('should create a new test plan', async () => {
      const newPlan = {
        title: 'New Plan',
        description: 'New Description',
        status: 'draft' as TestPlanStatus
      };

      mockedApi.post.mockResolvedValueOnce({ data: { ...mockTestPlan, ...newPlan } });

      const result = await testPlanService.create(newPlan);

      expect(mockedApi.post).toHaveBeenCalledWith('/test-plans', newPlan);
      expect(result).toEqual({ ...mockTestPlan, ...newPlan });
    });
  });

  describe('update', () => {
    it('should update an existing test plan', async () => {
      const updateData = {
        id: 1,
        title: 'Updated Plan'
      };

      mockedApi.put.mockResolvedValueOnce({ data: { ...mockTestPlan, ...updateData } });

      const result = await testPlanService.update(updateData);

      expect(mockedApi.put).toHaveBeenCalledWith('/test-plans/1', updateData);
      expect(result).toEqual({ ...mockTestPlan, ...updateData });
    });
  });

  describe('delete', () => {
    it('should delete a test plan', async () => {
      mockedApi.delete.mockResolvedValueOnce({});

      await testPlanService.delete(1);

      expect(mockedApi.delete).toHaveBeenCalledWith('/test-plans/1');
    });
  });
}); 