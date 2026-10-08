@echo off
title Energy On - publicar na Vercel
cd /d "%~dp0"
echo.
echo Publicando o site Energy On na Vercel...
echo Na primeira vez a Vercel pede login: siga as instrucoes que aparecerem (abre o navegador).
echo.
call npx --yes vercel@latest deploy --prod --yes
echo.
echo Pronto. O endereco do site aparece acima (Production / Aliased).
pause
