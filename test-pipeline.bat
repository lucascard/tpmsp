@echo off
setlocal enabledelayedexpansion

echo ========================================
echo PIPELINE DE TESTES - TPMSP
echo ========================================
echo.

REM Criar diretório para relatórios
if not exist "test-reports" mkdir test-reports

REM Iniciar testes do backend
echo [1/3] Executando testes do backend...
cd backend
call npm test -- --coverage --testResultsProcessor="jest-junit" > ..\test-reports\backend-tests.log 2>&1
set BACKEND_EXIT_CODE=%ERRORLEVEL%
cd ..
if %BACKEND_EXIT_CODE% equ 0 (
    echo [OK] Testes do backend concluidos com sucesso
) else (
    echo [ERRO] Testes do backend falharam. Verifique test-reports\backend-tests.log
)
echo.

REM Iniciar testes do frontend
echo [2/3] Executando testes do frontend...
cd frontend
call npm test > ..\test-reports\frontend-tests.log 2>&1
set FRONTEND_EXIT_CODE=%ERRORLEVEL%
if %FRONTEND_EXIT_CODE% equ 0 (
    echo [OK] Testes do frontend concluidos com sucesso
) else (
    echo [ERRO] Testes do frontend falharam. Verifique test-reports\frontend-tests.log
)
echo.

REM Iniciar testes E2E
echo [3/3] Executando testes E2E...
call npm run test:e2e > ..\test-reports\e2e-tests.log 2>&1
set E2E_EXIT_CODE=%ERRORLEVEL%
cd ..
if %E2E_EXIT_CODE% equ 0 (
    echo [OK] Testes E2E concluidos com sucesso
) else (
    echo [ERRO] Testes E2E falharam. Verifique test-reports\e2e-tests.log
)
echo.

echo ========================================
echo RESUMO DA EXECUCAO
echo ========================================
echo.

REM Mostrar status de cada fase
if %BACKEND_EXIT_CODE% equ 0 (
    echo Backend:    [PASS] Todos os testes passaram
) else (
    echo Backend:    [FAIL] Alguns testes falharam
)

if %FRONTEND_EXIT_CODE% equ 0 (
    echo Frontend:   [PASS] Todos os testes passaram
) else (
    echo Frontend:   [FAIL] Alguns testes falharam
)

if %E2E_EXIT_CODE% equ 0 (
    echo E2E:        [PASS] Todos os testes passaram
) else (
    echo E2E:        [FAIL] Alguns testes falharam
)

echo.
echo ========================================
echo RELATORIOS DISPONIVEIS
echo ========================================
echo Backend:    test-reports\backend-tests.log
echo Frontend:   test-reports\frontend-tests.log
echo E2E:        test-reports\e2e-tests.log
echo ========================================
echo.

REM Verificar se houve falhas
if %BACKEND_EXIT_CODE% neq 0 exit /b 1
if %FRONTEND_EXIT_CODE% neq 0 exit /b 1
if %E2E_EXIT_CODE% neq 0 exit /b 1

echo [SUCESSO] Todos os testes passaram com sucesso!
exit /b 0 