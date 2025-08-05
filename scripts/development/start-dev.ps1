# Case Zero - Script de Développement PowerShell
# Lance le backend et le frontend simultanément

param(
    [switch]$Help,
    [switch]$InstallDeps
)

if ($Help) {
    Write-Host "Case Zero - Script de Développement" -ForegroundColor Blue
    Write-Host "====================================" -ForegroundColor Blue
    Write-Host ""
    Write-Host "Usage:" -ForegroundColor Green
    Write-Host "  .\scripts\development\start-dev.ps1           # Démarrer le mode dev"
    Write-Host "  .\scripts\development\start-dev.ps1 -Help     # Afficher cette aide"
    Write-Host "  .\scripts\development\start-dev.ps1 -InstallDeps # Installer les dépendances"
    Write-Host ""
    exit 0
}

Write-Host "🎮 Case Zero - Démarrage du mode développement..." -ForegroundColor Blue
Write-Host "=============================================="

# Installer les dépendances si demandé
if ($InstallDeps) {
    Write-Host "📦 Installation des dépendances..." -ForegroundColor Yellow
    
    Set-Location frontend
    npm install
    Set-Location ..
    
    Set-Location backend\CaseZero.Api
    dotnet restore
    Set-Location ..\..
    
    Write-Host "✅ Dépendances installées" -ForegroundColor Green
    Write-Host ""
}

# Vérifier les dépendances
Write-Host "📋 Vérification des dépendances..." -ForegroundColor Blue

if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js non trouvé" -ForegroundColor Red
    exit 1
}

if (!(Get-Command dotnet -ErrorAction SilentlyContinue)) {
    Write-Host "❌ .NET non trouvé" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Dépendances OK" -ForegroundColor Green
Write-Host ""

# Créer le dossier logs
if (!(Test-Path "logs")) {
    New-Item -ItemType Directory -Path "logs"
}

Write-Host "🚀 Démarrage des services..." -ForegroundColor Blue
Write-Host ""

# Fonction pour nettoyer les processus
function Cleanup {
    Write-Host "🛑 Arrêt des services..." -ForegroundColor Yellow
    Get-Process | Where-Object {$_.ProcessName -eq "dotnet" -or $_.ProcessName -eq "node"} | Stop-Process -Force -ErrorAction SilentlyContinue
}

# Capturer Ctrl+C
$null = Register-EngineEvent PowerShell.Exiting -Action { Cleanup }

try {
    # Démarrer le backend
    Write-Host "🔧 Démarrage du backend (.NET API)..." -ForegroundColor Green
    $backendJob = Start-Job -ScriptBlock {
        Set-Location $using:PWD\backend\CaseZero.Api
        dotnet run
    }
    
    # Attendre un peu
    Start-Sleep -Seconds 5
    
    # Démarrer le frontend
    Write-Host "🌐 Démarrage du frontend (React + Vite)..." -ForegroundColor Green
    $frontendJob = Start-Job -ScriptBlock {
        Set-Location $using:PWD\frontend
        npm run dev
    }
    
    Start-Sleep -Seconds 3
    
    Write-Host ""
    Write-Host "✅ Services démarrés avec succès!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🌐 URLs disponibles:" -ForegroundColor Blue
    Write-Host "   Frontend: http://localhost:3000" -ForegroundColor Green
    Write-Host "   Backend:  http://localhost:5000" -ForegroundColor Green
    Write-Host "   Swagger:  http://localhost:5000/swagger" -ForegroundColor Green
    Write-Host ""
    Write-Host "Appuyez sur Ctrl+C pour arrêter tous les services" -ForegroundColor Blue
    Write-Host ""
    
    # Attendre que les jobs se terminent ou que l'utilisateur appuie sur Ctrl+C
    while ($backendJob.State -eq "Running" -or $frontendJob.State -eq "Running") {
        Start-Sleep -Seconds 1
    }
}
finally {
    Cleanup
    Remove-Job $backendJob, $frontendJob -Force -ErrorAction SilentlyContinue
}
