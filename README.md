# TPMSP - Test Plan Management Software Platform

## 📋 Sobre o Projeto
TPMSP é uma plataforma completa de gestão de testes de software que permite o gerenciamento eficiente de planos de teste, suítes, casos de teste e execução de testes regressivos.

## 🚀 Funcionalidades Principais

### Autenticação
- Login de usuário
- Registro de usuário
- Gerenciamento de perfis

### Gestão de Testes
- CRUD completo de Planos de Teste
- CRUD completo de Suítes de Teste
- CRUD completo de Casos de Teste
- CRUD de Testes Regressivos
- Execução de Suítes de Teste
- Dashboard interativo com métricas e KPIs

## 🛠 Stack Tecnológica

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT para autenticação
- Jest para testes unitários
- Cypress para testes E2E e API

### Frontend
- React
- TypeScript
- Material-UI (para interface similar ao Azure DevOps)
- React Testing Library
- Jest para testes unitários
- Cypress para testes E2E

## 📊 Estrutura de URLs
- `/plans/:planId` - Planos de Teste
- `/suites/:suiteId` - Suítes de Teste
- `/cases/:caseId` - Casos de Teste
- `/regression/:regressionId` - Testes Regressivos
- `/dashboard` - Dashboard de métricas

## 🧪 Estratégia de Testes

### Testes Unitários (Jest + React Testing Library)
- Cobertura mínima: 85%
- Testes para todos os componentes React
- Testes para todas as funções de utilidade
- Testes para todos os serviços

### Testes de API (Cypress)
- Testes para todos os endpoints
- Validação de respostas
- Testes de casos de erro
- Testes de autenticação

### Testes E2E (Cypress)
- Fluxos completos de usuário
- Testes de integração
- Testes de UI/UX

## 📁 Estrutura do Projeto
```
project/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── tests/
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── tests/
│   └── package.json
└── README.md
```

## 🚀 Como Iniciar o Desenvolvimento

1. Clone o repositório
2. Instale as dependências do backend e frontend
3. Configure as variáveis de ambiente
4. Inicie o servidor de desenvolvimento

## 📝 Próximos Passos

1. Configuração inicial do projeto
2. Implementação da autenticação
3. Desenvolvimento dos CRUDs básicos
4. Implementação do dashboard
5. Desenvolvimento dos testes
6. Documentação da API
7. Deploy e CI/CD

## 💡 Considerações sobre Testes

O Jest é a melhor escolha para testes unitários neste projeto porque:
- Integração nativa com React
- Suporte a mocking robusto
- Snapshots testing
- Cobertura de código integrada
- Grande comunidade e recursos
- Execução rápida dos testes

O Cypress complementará perfeitamente para:
- Testes E2E
- Testes de API
- Testes de integração
- Gravação de vídeos dos testes
- Dashboard de execução 