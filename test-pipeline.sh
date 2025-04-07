#!/bin/bash

# Cores para o output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Iniciando Pipeline de Testes${NC}\n"

# Criar diretório para relatórios se não existir
mkdir -p test-reports

# Rodar testes do backend
echo -e "${GREEN}📦 Testando Backend...${NC}"
cd backend
npm test -- --coverage --testResultsProcessor="jest-junit" > ../test-reports/backend-tests.log 2>&1
BACKEND_EXIT_CODE=$?
cd ..

# Rodar testes do frontend
echo -e "${GREEN}🌐 Testando Frontend...${NC}"
cd frontend
npm test -- --coverage --testResultsProcessor="jest-junit" > ../test-reports/frontend-tests.log 2>&1
FRONTEND_EXIT_CODE=$?
cd ..

# Gerar relatório consolidado
echo -e "\n${GREEN}📊 Relatório Consolidado:${NC}"
echo "----------------------------------------"

# Verificar resultados do backend
if [ $BACKEND_EXIT_CODE -eq 0 ]; then
    echo -e "Backend: ${GREEN}✅ Todos os testes passaram${NC}"
else
    echo -e "Backend: ${RED}❌ Alguns testes falharam${NC}"
fi

# Verificar resultados do frontend
if [ $FRONTEND_EXIT_CODE -eq 0 ]; then
    echo -e "Frontend: ${GREEN}✅ Todos os testes passaram${NC}"
else
    echo -e "Frontend: ${RED}❌ Alguns testes falharam${NC}"
fi

echo "----------------------------------------"
echo -e "\n${GREEN}📁 Relatórios detalhados disponíveis em:${NC}"
echo "- Backend: test-reports/backend-tests.log"
echo "- Frontend: test-reports/frontend-tests.log"

# Retornar código de erro se algum teste falhou
if [ $BACKEND_EXIT_CODE -ne 0 ] || [ $FRONTEND_EXIT_CODE -ne 0 ]; then
    exit 1
fi 