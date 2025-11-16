@echo off
echo ========================================
echo    BMBLANCE Token - Auto Deployment
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm packages are installed
if not exist "node_modules\" (
    echo [1/4] Installing dependencies...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Failed to install dependencies!
        pause
        exit /b 1
    )
    echo.
)

REM Check if .env exists
if not exist ".env" (
    echo [2/4] Setting up configuration...
    echo.
    echo You need to configure your deployment settings.
    echo.
    choice /C YN /M "Do you want to run the setup wizard now"
    if errorlevel 2 goto skipsetup
    if errorlevel 1 goto runsetup
    
    :runsetup
    call npm run setup
    echo.
    
    :skipsetup
    if not exist ".env" (
        echo [ERROR] .env file not found! Please run: npm run setup
        pause
        exit /b 1
    )
) else (
    echo [2/4] Configuration found!
    echo.
)

REM Deploy contract
echo [3/4] Deploying BMBLANCE Token to Sepolia...
echo This will take 1-2 minutes...
echo.
call npm run deploy
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Deployment failed!
    echo.
    echo Common issues:
    echo   - Make sure you have Sepolia ETH in your wallet
    echo   - Check your private key in .env file
    echo   - Verify your internet connection
    echo.
    echo Get free Sepolia ETH from: https://sepoliafaucet.com/
    pause
    exit /b 1
)

echo.
echo [4/4] Starting development server...
echo.
echo ========================================
echo    Deployment Successful!
echo ========================================
echo.
echo Your BMBLANCE token is now deployed!
echo.
echo The website will open automatically.
echo Press Ctrl+C to stop the server when done.
echo.
timeout /t 3 /nobreak >nul

REM Start dev server
call npm run dev

pause
