@echo off
title Research Lab Website
cls
echo ==========================================
echo   Research Lab Website - Startup Script
echo ==========================================
echo.

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

:: Check if .env.local exists
if not exist ".env.local" (
    echo [WARN] .env.local not found. Creating template...
    echo NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url > .env.local
    echo NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key >> .env.local
    echo SUPABASE_SERVICE_ROLE_KEY=your_service_role_key >> .env.local
)

:: Install dependencies if needed
if not exist "node_modules" (
    echo [INFO] Installing dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] npm install failed.
        pause
        exit /b 1
    )
)

:: ─────────────── Supabase (Database / Backend) ───────────────
:: Option A: Use Supabase Cloud (recommended)
:: 1. Go to https://supabase.com and create a project
:: 2. Copy your URL, anon key, and service role key into .env.local
:: 3. Run the SQL from supabase\seed.sql in Supabase SQL Editor
echo.
echo [INFO] Database: Supabase Cloud
echo   Edit .env.local with your Supabase credentials
echo   Run supabase\seed.sql in Supabase SQL Editor to set up tables
echo.
echo ─── Starting Next.js Dev Server ───
echo.

:: Start Next.js dev server
call npx next dev --port 3000

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Next.js dev server failed to start.
    pause
    exit /b 1
)

pause
