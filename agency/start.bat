@echo off
setlocal enabledelayedexpansion

:: Switch to the directory where this script is located
cd /d "%~dp0"

:: If launched as the background browser opener worker
if "%~1"=="--open-browser" goto :browser_worker

title Northforge Labs - Development Server

echo ================================================================
echo             NORTHFORGE LABS - DEV ENVIRONMENT
echo ================================================================
echo.
echo Target URLs:
echo   [Site]        http://localhost:3000
echo   [Admin Panel] http://localhost:3000/admin
echo.
echo ================================================================
echo.

:: 1. Check if Node.js is installed
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not found in PATH.
    echo Please install Node.js from https://nodejs.org/ and try again.
    echo.
    pause
    exit /b 1
)

:: 2. Check if node_modules exists, install if missing
if not exist "node_modules\" (
    echo [INFO] node_modules not found. Running "npm install"...
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo [ERROR] npm install failed. Please check the error above.
        pause
        exit /b %errorlevel%
    )
    echo.
)

:: 3. Check if server is ALREADY running on port 3000
curl.exe -s --connect-timeout 1 -o nul http://127.0.0.1:3000
if %errorlevel% equ 0 (
    echo [INFO] Dev server is already running on http://localhost:3000!
    echo Opening Site and Admin Panel in browser...
    start http://localhost:3000
    start http://localhost:3000/admin
    echo.
    echo Done!
    timeout /t 3 >nul
    exit /b 0
)

:: 4. Start the background worker that waits for the server to be ready
start "" /b cmd /c call "%~f0" --open-browser

:: 5. Start the Next.js development server
echo Starting Next.js server...
echo (Browser tabs will automatically open once the server is ready)
echo.
call npm run dev

:: In case npm run dev stops or errors
echo.
echo Server process ended.
pause
exit /b 0

:: -----------------------------------------------------------------
:: Background Worker: Polls port 3000 and opens browser tabs
:: -----------------------------------------------------------------
:browser_worker
set /a attempts=0
:poll_loop
ping 127.0.0.1 -n 2 >nul
curl.exe -s --connect-timeout 1 -o nul http://127.0.0.1:3000
if %errorlevel% equ 0 goto :launch_browser

set /a attempts+=1
if %attempts% geq 30 goto :launch_browser
goto :poll_loop

:launch_browser
:: Server is ready (or timeout reached), open both URLs
start http://localhost:3000
ping 127.0.0.1 -n 2 >nul
start http://localhost:3000/admin
exit /b 0
