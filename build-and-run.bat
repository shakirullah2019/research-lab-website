@echo off
title Research Lab - Production Build
cls
echo ==========================================
echo   Research Lab - Production Build + Start
echo ==========================================
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed.
    pause
    exit /b 1
)

:: Install dependencies if needed
if not exist "node_modules" (
    echo [INFO] Installing dependencies...
    call npm install
)

:: Build the project
echo [INFO] Building project for production...
call npx next build
if %errorlevel% neq 0 (
    echo [ERROR] Build failed.
    pause
    exit /b 1
)

:: Start production server
echo [INFO] Starting production server...
call npx next start --port 3000

pause
