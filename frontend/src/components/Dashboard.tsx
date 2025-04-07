import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Planos de teste',
      count: 12,
      testId: 'test-plans-card',
      path: '/test-plans'
    },
    {
      title: 'Suítes de teste',
      count: 36,
      testId: 'test-suites-card',
      path: '/test-suites'
    },
    {
      title: 'Casos de teste',
      count: 148,
      testId: 'test-cases-card',
      path: '/test-cases'
    },
    {
      title: 'Taxa de sucesso',
      count: '85%',
      testId: 'success-rate-card',
      path: '/test-cases'
    }
  ];

  const recentActivity = [1, 2, 3, 4, 5].map((i) => ({
    id: i,
    title: 'Plano de teste atualizado',
    description: `Atualização no plano de teste "Sistema de Pagamentos v2.${i}"`,
    time: `${i} hora${i > 1 ? 's' : ''}`
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Bem-vindo ao Test Plan Management System Professional</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div 
            key={card.title}
            className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate(card.path)}
            data-testid={card.testId}
          >
            <div className="flex flex-col space-y-1.5">
              <h3 className="text-2xl font-semibold whitespace-nowrap">{card.count}</h3>
              <p className="text-sm text-muted-foreground">{card.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="p-6">
          <h3 className="text-lg font-medium">Atividade recente</h3>
          <p className="text-sm text-muted-foreground">Últimas atualizações nos planos de teste</p>
        </div>
        <div className="p-6 pt-0">
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">Há {activity.time}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 