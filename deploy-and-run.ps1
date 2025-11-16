# BMBLANCE Token - Auto Deployment Script
# Run this script to deploy and test your token automatically

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   BMBLANCE Token - Auto Deployment" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "[OK] Node.js $nodeVersion detected" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Node.js is not installed!" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if npm packages are installed
if (-not (Test-Path "node_modules")) {
    Write-Host ""
    Write-Host "[1/4] Installing dependencies..." -ForegroundColor Cyan
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] Failed to install dependencies!" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
    Write-Host "[OK] Dependencies installed" -ForegroundColor Green
} else {
    Write-Host "[1/4] Dependencies already installed" -ForegroundColor Green
}

# Check if .env exists
if (-not (Test-Path ".env")) {
    Write-Host ""
    Write-Host "[2/4] Setting up configuration..." -ForegroundColor Cyan
    Write-Host ""
    $response = Read-Host "No configuration found. Run setup wizard? (Y/n)"
    
    if ($response -ne "n" -and $response -ne "N") {
        npm run setup
        Write-Host ""
    }
    
    if (-not (Test-Path ".env")) {
        Write-Host "[ERROR] .env file not found! Please run: npm run setup" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
} else {
    Write-Host "[2/4] Configuration found!" -ForegroundColor Green
}

# Deploy contract
Write-Host ""
Write-Host "[3/4] Deploying BMBLANCE Token to Sepolia..." -ForegroundColor Cyan
Write-Host "This will take 1-2 minutes..." -ForegroundColor Yellow
Write-Host ""

npm run deploy

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "[ERROR] Deployment failed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Common issues:" -ForegroundColor Yellow
    Write-Host "  - Make sure you have Sepolia ETH in your wallet"
    Write-Host "  - Check your private key in .env file"
    Write-Host "  - Verify your internet connection"
    Write-Host ""
    Write-Host "Get free Sepolia ETH from: https://sepoliafaucet.com/" -ForegroundColor Cyan
    Read-Host "Press Enter to exit"
    exit 1
}

# Start dev server
Write-Host ""
Write-Host "[4/4] Starting development server..." -ForegroundColor Cyan
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Deployment Successful!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Your BMBLANCE token is now deployed!" -ForegroundColor Green
Write-Host ""
Write-Host "The website will open automatically." -ForegroundColor Yellow
Write-Host "Press Ctrl+C to stop the server when done." -ForegroundColor Yellow
Write-Host ""

Start-Sleep -Seconds 3

npm run dev
