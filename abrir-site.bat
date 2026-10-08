@echo off
title Energy On - servidor local
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js nao encontrado. Instale a versao LTS em https://nodejs.org e rode este arquivo de novo.
  pause
  exit /b 1
)
node -v
if not exist node_modules (
  echo Instalando dependencias, aguarde...
  call npm install
)
echo Abrindo em http://localhost:3000
call npm run dev
pause
