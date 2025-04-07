# Testes E2E - TPMSP

Este diretório contém os testes end-to-end (E2E) do projeto TPMSP, utilizando Cypress.

## Configuração do Ambiente

### Usuário de Teste

Para que os testes de autenticação funcionem corretamente, é necessário ter um usuário pré-cadastrado no banco de dados com as seguintes credenciais:

```json
{
  "email": "massatest@email.com",
  "password": "teste123",
  "name": "massa teste login"
}
```

Este usuário é utilizado nos testes de login e deve ser mantido no banco de dados para garantir o funcionamento correto dos testes.

### Instalação de Dependências

```bash
cd frontend
npm install
```

### Execução dos Testes

Para executar os testes em modo interativo:

```bash
npm run cypress:open
```

Para executar os testes em modo headless:

```bash
npm run cypress:run
```

## Estrutura dos Testes

Os testes estão organizados por funcionalidade:

- `auth/`: Testes relacionados à autenticação (login e registro)
- `dashboard/`: Testes relacionados ao dashboard
- `test-plans/`: Testes relacionados aos planos de teste
- `test-suites/`: Testes relacionados às suites de teste

## Atualizações Recentes

### Autenticação

- Implementado teste de login com usuário de massa pré-cadastrado
- Adicionada verificação do nome do usuário na TopBar após login
- Melhorada a cobertura de testes para diferentes cenários de login
- Removida dependência entre testes de login e registro

### Melhorias nos Testes

- Uso de dados de massa ao invés de criar usuários durante os testes
- Verificação mais robusta dos elementos da interface
- Tratamento de sobreposição de elementos (toast notifications)
- Melhor organização e documentação do código

## Próximos Passos

- [ ] Implementar testes para CRUD de planos de teste
- [ ] Implementar testes para CRUD de suites de teste
- [ ] Adicionar mais cenários de teste para autenticação
- [ ] Melhorar a cobertura de testes do dashboard 