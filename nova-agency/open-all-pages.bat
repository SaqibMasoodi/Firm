@echo off
setlocal enabledelayedexpansion

:: Navigate to script directory
cd /d "%~dp0"
title Northforge Labs - Open All Site Pages

:: -----------------------------------------------------------------
:: 1. Configuration & All 15 Site URLs
:: -----------------------------------------------------------------
set "BASE_URL=http://localhost:3000"

:: Core Pages
set "URL_HOME=%BASE_URL%/"
set "URL_ABOUT=%BASE_URL%/about"
set "URL_SERVICES=%BASE_URL%/services"
set "URL_CASES=%BASE_URL%/case-studies"
set "URL_BLOG=%BASE_URL%/blog"
set "URL_CONTACT=%BASE_URL%/contact"
set "URL_SITEMAP=%BASE_URL%/sitemap"
set "URL_ADMIN=%BASE_URL%/admin"

:: Case Studies (5 Client Projects)
set "URL_CASE_DASHIT=%BASE_URL%/case-studies/dashit"
set "URL_CASE_DREAMCABS=%BASE_URL%/case-studies/dreamcabs"
set "URL_CASE_MERSH=%BASE_URL%/case-studies/mersh-kashmir"
set "URL_CASE_POCKETHOST=%BASE_URL%/case-studies/pockethost"
set "URL_CASE_WOLF=%BASE_URL%/case-studies/wolf-adventures-kashmir"

:: Blog Posts (3 Articles)
set "URL_BLOG_IDENTITY=%BASE_URL%/blog/building-brand-identity"
set "URL_BLOG_AI=%BASE_URL%/blog/future-of-ai-business"
set "URL_BLOG_COMMERCE=%BASE_URL%/blog/social-commerce-trends"

:: Grouped URL lists
set "CORE_URLS=%URL_HOME% %URL_ABOUT% %URL_SERVICES% %URL_CASES% %URL_BLOG% %URL_CONTACT% %URL_SITEMAP% %URL_ADMIN%"
set "CASE_URLS=%URL_CASE_DASHIT% %URL_CASE_DREAMCABS% %URL_CASE_MERSH% %URL_CASE_POCKETHOST% %URL_CASE_WOLF%"
set "BLOG_URLS=%URL_BLOG_IDENTITY% %URL_BLOG_AI% %URL_BLOG_COMMERCE%"
set "ALL_URLS=%CORE_URLS% %CASE_URLS% %BLOG_URLS%"

:: -----------------------------------------------------------------
:: 2. Check Next.js Development Server
:: -----------------------------------------------------------------
echo ================================================================
echo            NORTHFORGE LABS - ALL PAGES LAUNCHER
echo ================================================================
echo.
echo [1/3] Checking Next.js dev server on %BASE_URL%...

curl.exe -s --connect-timeout 1 -o nul "%BASE_URL%"
if %errorlevel% neq 0 (
    echo [!] Server is not running on %BASE_URL%.
    echo [^>] Launching Next.js development server in background...
    start "Northforge Labs Dev Server" cmd /c "npm run dev"
    echo [^>] Waiting for dev server to become responsive...
    :wait_server_loop
    ping 127.0.0.1 -n 3 >nul
    curl.exe -s --connect-timeout 1 -o nul "%BASE_URL%"
    if %errorlevel% neq 0 goto :wait_server_loop
    echo [OK] Dev server is online!
) else (
    echo [OK] Dev server is actively running!
)
echo.

:: -----------------------------------------------------------------
:: 3. Detect Browser Executable for Isolated New-Window Opening
:: -----------------------------------------------------------------
echo [2/3] Detecting installed web browser...
set "BROWSER_EXE="
set "BROWSER_NAME=Default Browser"

if exist "C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe" (
    set "BROWSER_EXE=C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe"
    set "BROWSER_NAME=Brave Browser"
) else if exist "%LocalAppData%\BraveSoftware\Brave-Browser\Application\brave.exe" (
    set "BROWSER_EXE=%LocalAppData%\BraveSoftware\Brave-Browser\Application\brave.exe"
    set "BROWSER_NAME=Brave Browser"
) else if exist "C:\Program Files\Google\Chrome\Application\chrome.exe" (
    set "BROWSER_EXE=C:\Program Files\Google\Chrome\Application\chrome.exe"
    set "BROWSER_NAME=Google Chrome"
) else if exist "%LocalAppData%\Google\Chrome\Application\chrome.exe" (
    set "BROWSER_EXE=%LocalAppData%\Google\Chrome\Application\chrome.exe"
    set "BROWSER_NAME=Google Chrome"
) else if exist "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" (
    set "BROWSER_EXE=C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
    set "BROWSER_NAME=Microsoft Edge"
) else if exist "C:\Program Files\Microsoft\Edge\Application\msedge.exe" (
    set "BROWSER_EXE=C:\Program Files\Microsoft\Edge\Application\msedge.exe"
    set "BROWSER_NAME=Microsoft Edge"
) else if exist "C:\Program Files\Mozilla Firefox\firefox.exe" (
    set "BROWSER_EXE=C:\Program Files\Mozilla Firefox\firefox.exe"
    set "BROWSER_NAME=Mozilla Firefox"
)

echo [OK] Using: !BROWSER_NAME!
echo.

:: -----------------------------------------------------------------
:: 4. Direct CLI Flag Handling (bypass interactive menu)
:: -----------------------------------------------------------------
if "%~1"=="--tabs" goto :opt_one_window
if "%~1"=="--windows" goto :opt_multi_windows
if "%~1"=="--core" goto :opt_core_only
if "%~1"=="--cases" goto :opt_cases_only
if "%~1"=="--blog" goto :opt_blog_only

:: -----------------------------------------------------------------
:: 5. Interactive Menu (Auto-defaults to Option 1 in 5 seconds)
:: -----------------------------------------------------------------
echo [3/3] Choose how you want to open the site pages:
echo.
echo   [1] Open ALL 16 pages in ONE SEPARATE browser window (Tabs)  [Default in 5s]
echo   [2] Open EACH page in its OWN separate browser window (16 Windows)
echo   [3] Open only 8 Core pages in a separate window
echo   [4] Open only 5 Case Studies in a separate window
echo   [5] Open only 3 Blog Articles in a separate window
echo.
echo Pages included (16 total):
echo   - Home, About, Services, Case Studies, Blog, Contact, Sitemap, Admin
echo   - Case Studies: Dashit, Dream Lines, MershKashmir, PocketHost, Wolf Adventures
echo   - Blog: Brand Identity, Future of AI, Social Commerce
echo.

choice /c 12345 /d 1 /t 5 /m "Select option (1-5):"
if errorlevel 5 goto :opt_blog_only
if errorlevel 4 goto :opt_cases_only
if errorlevel 3 goto :opt_core_only
if errorlevel 2 goto :opt_multi_windows
if errorlevel 1 goto :opt_one_window

:: -----------------------------------------------------------------
:: Actions
:: -----------------------------------------------------------------

:opt_one_window
echo.
echo [^>] Opening all 15 pages in ONE separate browser window...
if defined BROWSER_EXE (
    start "" "!BROWSER_EXE!" --new-window %ALL_URLS%
) else (
    start msedge --new-window %ALL_URLS% 2>nul || (
        for %%u in (%ALL_URLS%) do start "" "%%u"
    )
)
goto :done

:opt_multi_windows
echo.
echo [^>] Opening each page in its OWN separate browser window...
for %%u in (%ALL_URLS%) do (
    if defined BROWSER_EXE (
        start "" "!BROWSER_EXE!" --new-window "%%u"
    ) else (
        start msedge --new-window "%%u" 2>nul || start "" "%%u"
    )
    ping 127.0.0.1 -n 2 >nul
)
goto :done

:opt_core_only
echo.
echo [^>] Opening 7 core pages in a separate browser window...
if defined BROWSER_EXE (
    start "" "!BROWSER_EXE!" --new-window %CORE_URLS%
) else (
    start msedge --new-window %CORE_URLS% 2>nul || (
        for %%u in (%CORE_URLS%) do start "" "%%u"
    )
)
goto :done

:opt_cases_only
echo.
echo [^>] Opening 5 case study pages in a separate browser window...
if defined BROWSER_EXE (
    start "" "!BROWSER_EXE!" --new-window %CASE_URLS%
) else (
    start msedge --new-window %CASE_URLS% 2>nul || (
        for %%u in (%CASE_URLS%) do start "" "%%u"
    )
)
goto :done

:opt_blog_only
echo.
echo [^>] Opening 3 blog article pages in a separate browser window...
if defined BROWSER_EXE (
    start "" "!BROWSER_EXE!" --new-window %BLOG_URLS%
) else (
    start msedge --new-window %BLOG_URLS% 2>nul || (
        for %%u in (%BLOG_URLS%) do start "" "%%u"
    )
)
goto :done

:done
echo.
echo [SUCCESS] Pages opened successfully!
ping 127.0.0.1 -n 4 >nul
exit /b 0
