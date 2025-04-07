# TPMSP - Test Plan Management Software Platform

## 📋 Sobre o Projeto
TPMSP é uma plataforma completa de gestão de testes de software que permite o gerenciamento eficiente de planos de teste, suítes, casos de teste e execução de testes regressivos.

## 🚀 Progresso do Projeto

### ✅ Concluído
- [x] Configuração inicial do projeto
- [x] Setup do Git e repositório
- [x] Configuração do ESLint e Prettier
- [x] Configuração do Husky para pre-commit hooks
- [x] Setup inicial do backend (Node.js + Express)
- [x] Setup inicial do frontend (React + TypeScript)

### 🚧 Em Andamento
- [ ] Sistema de autenticação
  - [ ] Backend (Modelo de Usuário, Rotas, Middleware)
  - [ ] Frontend (Páginas de Login/Registro, Contexto)

### 📅 Próximos Passos
1. Implementação da autenticação
2. CRUD de Planos de Teste
3. CRUD de Suítes de Teste
4. CRUD de Casos de Teste
5. Dashboard interativo
6. Testes Regressivos

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

1. ✅ Configuração inicial do projeto
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

## 📋 Requisitos do Sistema

### Backend
- Node.js >= 16.x
- MongoDB >= 5.x
- NPM >= 8.x

### Frontend
- Node.js >= 16.x
- NPM >= 8.x
- Navegadores modernos (Chrome, Firefox, Safari, Edge)

## 🛠 Instalação

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'feat: adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para suporte, envie um email para [seu-email@exemplo.com](mailto:seu-email@exemplo.com) ou abra uma issue no GitHub.

## Testes

### Backend

Para rodar os testes do backend:

1. Navegue até a pasta do backend:
```bash
cd backend
```

2. Instale as dependências (caso ainda não tenha feito):
```bash
npm install
```

3. Execute os testes:
```bash
npm test
```

Para rodar os testes em modo watch (desenvolvimento):
```bash
npm run test:watch
```

#### Estrutura dos Testes

- Os testes estão localizados na pasta `src/tests`
- Utilizamos Jest como framework de testes
- Cada arquivo de teste segue o padrão `*.test.ts`
- Para testes de API, utilizamos o Supertest

#### Cobertura de Testes

Para gerar um relatório de cobertura de testes:
```bash
npm run test:coverage
```

O relatório será gerado na pasta `coverage`. 