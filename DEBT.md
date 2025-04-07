# Débitos Técnicos - TPMSP

## 🚧 Débitos Técnicos Atuais

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

## 📅 Plano de Resolução
1. Corrigir testes do `Login.test.tsx` e `AuthContext.test.tsx` na próxima sprint
2. Atualizar React Router e testes de componentes quando houver tempo disponível
3. Resolver avisos de depreciação do `punycode` em uma futura atualização de dependências 