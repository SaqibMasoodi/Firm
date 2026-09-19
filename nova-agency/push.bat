@echo off
setlocal enabledelayedexpansion

:: Set script title and color
title Northforge Labs - Push to GitHub ^& Auto-Deploy Vercel
color 0A

:: Navigate to script directory
cd /d "%~dp0"

echo ================================================================
echo       NORTHFORGE LABS - PUSH TO GITHUB ^& AUTO-DEPLOY
echo ================================================================
echo.

:: 1. Verify Git is available
where git >nul 2>nul
if %errorlevel% neq 0 (
    color 0C
    echo [ERROR] Git is not installed or not found in your PATH.
    echo Please install Git or restart your terminal.
    echo.
    pause
    exit /b 1
)

:: 2. Find Git Repository Root
for /f "delims=" %%i in ('git rev-parse --show-toplevel 2^>nul') do set "GIT_ROOT=%%i"
if not defined GIT_ROOT (
    color 0C
    echo [ERROR] Not inside a Git repository!
    echo.
    pause
    exit /b 1
)

cd /d "%GIT_ROOT%"
echo [OK] Git Repository: %GIT_ROOT%
echo.

:: 3. Check for uncommitted changes
echo [1/4] Checking repository status...
git status --short > "%TEMP%\git_status_check.txt"

set HAS_CHANGES=0
for %%A in ("%TEMP%\git_status_check.txt") do if %%~zA gtr 0 set HAS_CHANGES=1

if %HAS_CHANGES% equ 0 (
    echo [i] Working tree is clean. No local modifications detected.
    echo.
    set /p "FORCE_PUSH=Would you like to push any existing unpushed commits? (y/n) [default: y]: "
    if "!FORCE_PUSH!"=="" set "FORCE_PUSH=y"
    if /i "!FORCE_PUSH!"=="n" (
        echo [x] Push cancelled.
        echo.
        pause
        exit /b 0
    )
    goto :do_push
)

:: Display modified files
echo Local changes detected:
echo ----------------------------------------------------------------
type "%TEMP%\git_status_check.txt"
echo ----------------------------------------------------------------
echo.

:: 4. Prompt for Commit Message
echo [2/4] Enter a commit message:
echo (Press Enter to use default: "update: site content and design improvements")
set "COMMIT_MSG="
set /p "COMMIT_MSG=> "

if "!COMMIT_MSG!"=="" (
    for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /value 2^>nul') do set "DT=%%I"
    set "COMMIT_MSG=update: site updates (!date! !time!)"
)

:: 5. Stage all changes
echo.
echo [3/4] Staging and committing changes...
git add -A
git commit -m "!COMMIT_MSG!"
if %errorlevel% neq 0 (
    color 0C
    echo [ERROR] Commit failed! Check the output above.
    echo.
    pause
    exit /b 1
)

:do_push
:: 6. Push to origin main
echo.
echo [4/4] Pushing to origin main...
git push origin main
if %errorlevel% neq 0 (
    color 0C
    echo.
    echo [ERROR] Git push failed!
    echo Please check your internet connection or git credentials.
    echo.
    pause
    exit /b 1
)

:: 7. Success Banner
color 0A
echo.
echo ================================================================
echo             [SUCCESS] CHANGES PUSHED TO GITHUB!
echo ================================================================
echo.
echo  - GitHub Repo: https://github.com/SaqibMasoodi/Firm
echo  - Vercel:      Triggered automatic build and deployment!
echo  - Live Site:   Will update automatically in ~30-45 seconds.
echo.
echo ================================================================
echo.
pause
exit /b 0
