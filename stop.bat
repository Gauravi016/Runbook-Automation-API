@echo off
REM Stop Runbook Automation Dashboard
REM This script stops both Flask backend and React frontend servers

echo.
echo ========================================
echo Stopping Runbook Automation Dashboard
echo ========================================
echo.

REM Kill Node.js processes (React frontend)
echo Stopping React Frontend...
taskkill /F /IM node.exe 2>nul

REM Kill Python processes (Flask backend)
echo Stopping Flask Backend...
taskkill /F /IM python.exe 2>nul

echo.
echo ========================================
echo All services stopped successfully
echo ========================================
echo.
pause
