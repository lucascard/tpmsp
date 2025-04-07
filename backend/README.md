# TPMSP - Backend

## Testes

### Limpeza do Banco de Dados

Para garantir que os testes funcionem corretamente, é importante limpar o banco de dados antes de executá-los. Para isso, siga os passos abaixo:

1. Execute o script de limpeza:
```bash
npx ts-node scripts/clear-db.ts
```

Este script irá:
- Conectar ao banco de dados MongoDB
- Limpar as coleções `testplans` e `users`
- Desconectar do banco de dados

### Execução dos Testes

Os testes devem ser executados na seguinte ordem:

1. Limpe o banco de dados
2. Execute os testes:
```bash
npm run test
```

### Problemas Comuns

#### Erro 403 (Forbidden)
Se você encontrar erros 403 ao executar os testes, isso geralmente significa que:
- O banco de dados não foi limpo corretamente
- O token de autenticação está expirado
- O usuário não tem permissão para acessar o recurso

Solução:
1. Limpe o banco de dados
2. Execute os testes novamente

#### IDs Fixos nos Testes
Alguns testes podem falhar se estiverem usando IDs fixos. Certifique-se de que:
1. O teste cria o recurso primeiro
2. Usa o ID retornado da criação
3. Não usa IDs fixos ou hardcoded

### Estrutura dos Testes

Os testes estão organizados em:
- `cypress/e2e/test-plans/`: Testes dos planos de teste
- `cypress/e2e/auth/`: Testes de autenticação

Cada teste segue o padrão:
1. Criação do recurso
2. Operação no recurso (atualização, remoção, etc)
3. Verificação do resultado 