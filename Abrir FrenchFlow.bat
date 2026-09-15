@echo off
title FrenchFlow
C:\Nueva carpeta "%~dp0"
echo ========================================
echo    FrenchFlow - Aprendiendo Frances
echo ========================================
echo.
echo Abriendo en el navegador...
echo.

start "" "http://localhost:4321"
call npm run dev
