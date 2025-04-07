# Roadmap de Desenvolvimento - TPMSP

## 📋 Visão Geral
Este roadmap detalha o processo de desenvolvimento do MVP da plataforma TPMSP, seguindo uma abordagem de desenvolvimento guiado por IA (AI-Driven Development) com foco em qualidade, testes e versionamento.

## 🎯 Objetivos do Roadmap
- Desenvolvimento incremental e controlado
- Manutenção da qualidade do código
- Versionamento consistente
- Cobertura de testes abrangente
- Documentação clara

## 🚀 Fases de Desenvolvimento

## 📅 Cronograma Estimado

### Fase 1: Configuração Inicial e Setup (1 semana)
- [x] Setup do Ambiente de Desenvolvimento
- [x] Setup do Backend
- [x] Setup do Frontend

### Fase 2: Autenticação e Usuários (2 semanas)
- [x] Backend - Autenticação
  - [x] Modelo de Usuário
  - [x] Rotas de Autenticação
  - [x] Middleware de Autenticação
  - [x] Validações de dados
  - [x] Testes unitários
  - [x] Testes de integração
- [x] Frontend - Autenticação
  - [x] Contexto de Autenticação
  - [x] Páginas de Login/Registro
  - [x] Validações de formulários
  - [x] Notificações toast
  - [x] Testes de componentes
  - [x] Testes E2E
  - [x] Melhorias de acessibilidade

### Fase 3: CRUDs Básicos (3 semanas)
- [ ] Planos de Teste
  - [ ] Backend (Modelo, Rotas, Controller)
  - [ ] Frontend (Componentes, Contexto)
  - [ ] Testes Unitários e E2E
- [ ] Suítes de Teste
  - [ ] Backend (Modelo, Rotas, Controller)
  - [ ] Frontend (Componentes, Contexto)
  - [ ] Testes Unitários e E2E

### Fase 4: Casos de Teste e Execução (2 semanas)
- [ ] Casos de Teste
- [ ] Execução de Testes

### Fase 5: Dashboard e Métricas (2 semanas)
- [ ] Dashboard
- [ ] Métricas e KPIs

### Fase 6: Testes Regressivos (2 semanas)
- [ ] Regressivos

## 🔄 Dependências entre Fases
1. Fase 1 (Setup) → Todas as outras fases
2. Fase 2 (Autenticação) → Fases 3, 4, 5, 6
3. Fase 3 (CRUDs) → Fase 4 (Execução)
4. Fase 4 (Execução) → Fase 5 (Dashboard)
5. Fase 5 (Dashboard) → Fase 6 (Regressivos)

## ⚠️ Riscos e Mitigações

### Riscos Técnicos
1. **Integração com MongoDB**
   - Risco: Problemas de performance
   - Mitigação: Indexação adequada e monitoramento

2. **Autenticação e Segurança**
   - Risco: Vulnerabilidades de segurança
   - Mitigação: Revisão de código e testes de segurança

3. **Testes Automatizados**
   - Risco: Cobertura insuficiente
   - Mitigação: Metas claras de cobertura e revisão

### Riscos de Projeto
1. **Escopo**
   - Risco: Aumento do escopo
   - Mitigação: Revisões regulares e priorização

2. **Tempo**
   - Risco: Atrasos no cronograma
   - Mitigação: Sprints curtos e revisões frequentes

3. **Qualidade**
   - Risco: Bugs em produção
   - Mitigação: Testes rigorosos e code review

## 🎯 Critérios de Aceitação Detalhados

### Autenticação
- [ ] Login com email/senha
- [ ] Registro de novos usuários
- [ ] Recuperação de senha
- [ ] Validação de campos
- [ ] Mensagens de erro claras
- [ ] Testes de segurança

### Planos de Teste
- [ ] CRUD completo
- [ ] Validação de dados
- [ ] Relacionamento com Suítes
- [ ] Histórico de alterações
- [ ] Exportação em PDF

### Suítes de Teste
- [ ] CRUD completo
- [ ] Organização hierárquica
- [ ] Relacionamento com Casos
- [ ] Execução em lote
- [ ] Relatórios de execução

### Casos de Teste
- [ ] CRUD completo
- [ ] Templates reutilizáveis
- [ ] Anexos e screenshots
- [ ] Histórico de execuções
- [ ] Métricas de sucesso

### Dashboard
- [ ] Visualização em tempo real
- [ ] Filtros e busca
- [ ] Exportação de dados
- [ ] Gráficos interativos
- [ ] KPIs personalizáveis

## 🌳 Estratégia de Branching
1. **Branch Principal**
   - `main`: Código estável e testado
   - Sempre deve estar em estado deployável

2. **Branches de Feature**
   - Nomenclatura: `feature/nome-da-feature`
   - Exemplo: `feature/authentication`
   - Criada a partir da `main`
   - Mergeada de volta para `main` quando completa

3. **Processo de Desenvolvimento**
   - Criar branch para cada feature
   - Commits frequentes na branch
   - Testes completos antes do merge
   - Merge para `main` apenas quando aprovado

4. **Convenções de Nomeação**
   - Branches: `feature/nome-da-feature`
   - Commits: `feat: descrição da feature`
   - Fixes: `fix: descrição do fix`
   - Tests: `test: descrição do teste`

## 📊 Métricas de Qualidade
- Cobertura de testes > 85%
- Zero regressões em funcionalidades existentes
- Todos os commits com testes associados
- Documentação atualizada

## 🔄 Processo de Desenvolvimento por Feature

### 1. Autenticação
1. **Setup Inicial**
   - [ ] Criar branch `feature/authentication`
   - [ ] Configurar ambiente de desenvolvimento
   - [ ] Definir estrutura de arquivos

2. **Backend**
   - [ ] Criar modelo de Usuário
   - [ ] Implementar rotas de autenticação
   - [ ] Criar middleware de autenticação
   - [ ] Implementar validações
   - [ ] Criar testes unitários
   - [ ] Criar testes de API
   - [ ] Rodar testes
   - [ ] Commitar mudanças
   - [ ] Fazer push da branch

3. **Frontend**
   - [ ] Criar páginas de Login/Registro
   - [ ] Implementar contexto de autenticação
   - [ ] Criar componentes reutilizáveis
   - [ ] Implementar validações
   - [ ] Criar testes de componente
   - [ ] Criar testes de integração
   - [ ] Rodar testes
   - [ ] Commitar mudanças
   - [ ] Fazer push da branch

4. **Finalização**
   - [ ] Revisar código
   - [ ] Resolver conflitos
   - [ ] Merge para `main`
   - [ ] Criar tag de versão

### 2. Planos de Teste
1. **Setup Inicial**
   - [ ] Criar branch `feature/test-plans`
   - [ ] Configurar ambiente de desenvolvimento
   - [ ] Definir estrutura de arquivos

2. **Backend**
   - [ ] Criar modelo de Plano de Teste
   - [ ] Implementar rotas CRUD
   - [ ] Implementar validações
   - [ ] Criar testes unitários
   - [ ] Criar testes de API
   - [ ] Rodar testes
   - [ ] Commitar mudanças
   - [ ] Fazer push da branch

3. **Frontend**
   - [ ] Criar páginas de listagem/cadastro
   - [ ] Implementar formulários
   - [ ] Criar componentes reutilizáveis
   - [ ] Implementar validações
   - [ ] Criar testes de componente
   - [ ] Criar testes de integração
   - [ ] Rodar testes
   - [ ] Commitar mudanças
   - [ ] Fazer push da branch

4. **Finalização**
   - [ ] Revisar código
   - [ ] Resolver conflitos
   - [ ] Merge para `main`
   - [ ] Criar tag de versão

### 3. Suítes de Teste
1. **Setup Inicial**
   - [ ] Criar branch `feature/test-suites`
   - [ ] Configurar ambiente de desenvolvimento
   - [ ] Definir estrutura de arquivos

2. **Backend**
   - [ ] Criar modelo de Suíte de Teste
   - [ ] Implementar rotas CRUD
   - [ ] Implementar validações
   - [ ] Criar testes unitários
   - [ ] Criar testes de API
   - [ ] Rodar testes
   - [ ] Commitar mudanças
   - [ ] Fazer push da branch

3. **Frontend**
   - [ ] Criar páginas de listagem/cadastro
   - [ ] Implementar formulários
   - [ ] Criar componentes reutilizáveis
   - [ ] Implementar validações
   - [ ] Criar testes de componente
   - [ ] Criar testes de integração
   - [ ] Rodar testes
   - [ ] Commitar mudanças
   - [ ] Fazer push da branch

4. **Finalização**
   - [ ] Revisar código
   - [ ] Resolver conflitos
   - [ ] Merge para `main`
   - [ ] Criar tag de versão

### 4. Casos de Teste
1. **Setup Inicial**
   - [ ] Criar branch `feature/test-cases`
   - [ ] Configurar ambiente de desenvolvimento
   - [ ] Definir estrutura de arquivos

2. **Backend**
   - [ ] Criar modelo de Caso de Teste
   - [ ] Implementar rotas CRUD
   - [ ] Implementar validações
   - [ ] Criar testes unitários
   - [ ] Criar testes de API
   - [ ] Rodar testes
   - [ ] Commitar mudanças
   - [ ] Fazer push da branch

3. **Frontend**
   - [ ] Criar páginas de listagem/cadastro
   - [ ] Implementar formulários
   - [ ] Criar componentes reutilizáveis
   - [ ] Implementar validações
   - [ ] Criar testes de componente
   - [ ] Criar testes de integração
   - [ ] Rodar testes
   - [ ] Commitar mudanças
   - [ ] Fazer push da branch

4. **Finalização**
   - [ ] Revisar código
   - [ ] Resolver conflitos
   - [ ] Merge para `main`
   - [ ] Criar tag de versão

### 5. Dashboard
1. **Setup Inicial**
   - [ ] Criar branch `feature/dashboard`
   - [ ] Configurar ambiente de desenvolvimento
   - [ ] Definir estrutura de arquivos

2. **Backend**
   - [ ] Implementar endpoints de métricas
   - [ ] Criar testes unitários
   - [ ] Criar testes de API
   - [ ] Rodar testes
   - [ ] Commitar mudanças
   - [ ] Fazer push da branch

3. **Frontend**
   - [ ] Criar componentes de visualização
   - [ ] Implementar gráficos
   - [ ] Criar filtros e busca
   - [ ] Criar testes de componente
   - [ ] Criar testes de integração
   - [ ] Rodar testes
   - [ ] Commitar mudanças
   - [ ] Fazer push da branch

4. **Finalização**
   - [ ] Revisar código
   - [ ] Resolver conflitos
   - [ ] Merge para `main`
   - [ ] Criar tag de versão

### 6. Testes Regressivos
1. **Setup Inicial**
   - [ ] Criar branch `feature/regression-tests`
   - [ ] Configurar ambiente de desenvolvimento
   - [ ] Definir estrutura de arquivos

2. **Backend**
   - [ ] Implementar lógica de regressão
   - [ ] Criar testes unitários
   - [ ] Criar testes de API
   - [ ] Rodar testes
   - [ ] Commitar mudanças
   - [ ] Fazer push da branch

3. **Frontend**
   - [ ] Criar interface de execução
   - [ ] Implementar relatórios
   - [ ] Criar testes de componente
   - [ ] Criar testes de integração
   - [ ] Rodar testes
   - [ ] Commitar mudanças
   - [ ] Fazer push da branch

4. **Finalização**
   - [ ] Revisar código
   - [ ] Resolver conflitos
   - [ ] Merge para `main`
   - [ ] Criar tag de versão

## 📝 Documentação
- Cada fase terá sua documentação
- API será documentada com Swagger
- Guias de contribuição serão mantidos
- Documentação de testes será atualizada

## 🎯 Critérios de Aceitação
- Código deve passar em todos os testes
- Deve haver cobertura de testes adequada
- Interface deve ser responsiva
- Performance deve ser aceitável
- Segurança deve ser mantida

## 🚧 Débitos Técnicos

### Testes Frontend
1. **Login.test.tsx**
   - Teste "navigates to register page when clicking register link" está falhando
   - O `mockNavigate` não está sendo chamado com o caminho "/register"
   - Prioridade: Baixa (não afeta funcionalidade)

2. **AuthContext.test.tsx**
   - Teste está falhando devido a problemas com o mock do `api`
   - Prioridade: Média (afeta testes de contexto de autenticação)

### Melhorias Futuras
1. **React Router**
   - Atualizar para usar as flags futuras do React Router v7
   - `v7_startTransition` e `v7_relativeSplatPath`
   - Prioridade: Baixa (apenas avisos de depreciação)

2. **Testes de Componentes**
   - Migrar de `ReactDOMTestUtils.act` para `React.act`
   - Prioridade: Baixa (apenas avisos de depreciação)

3. **Módulo punycode**
   - Substituir o uso do módulo `punycode` por uma alternativa
   - Prioridade: Baixa (apenas avisos de depreciação)

### Plano de Resolução
1. Corrigir testes do `Login.test.tsx` e `AuthContext.test.tsx` na próxima sprint
2. Atualizar React Router e testes de componentes quando houver tempo disponível
3. Resolver avisos de depreciação do `punycode` em uma futura atualização de dependências 