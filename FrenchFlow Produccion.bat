@echo off
title FrenchFlow
cd /d "%~dp0"
echo ========================================
echo    FrenchFlow - Version Produccion
echo ========================================
echo.
echo Construyendo...
call npm run build
echo.
echo Abriendo en el navegador...
echo.

start "" "http://localhost:4321"
call npm run preview
