#!/bin/bash

# Case Zero - Setup Script
# Este script configura o ambiente de desenvolvimento local

set -e

echo "🎮 Case Zero - Configurando ambiente de desenvolvimento..."
echo "=================================================="

# Verificar dependências
echo "📋 Verificando dependências..."

# Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Instale Node.js 18+ antes de continuar."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js versão 18+ é necessária. Versão atual: $(node -v)"
    exit 1
fi

# .NET 8
if ! command -v dotnet &> /dev/null; then
    echo "❌ .NET 8 não encontrado. Instale .NET 8 SDK antes de continuar."
    exit 1
fi

DOTNET_VERSION=$(dotnet --version | cut -d'.' -f1)
if [ "$DOTNET_VERSION" -lt 8 ]; then
    echo "❌ .NET 8+ é necessária. Versão atual: $(dotnet --version)"
    exit 1
fi

# Azure CLI (opcional)
if ! command -v az &> /dev/null; then
    echo "⚠️  Azure CLI não encontrada. Instale para usar recursos de deploy."
fi

echo "✅ Dependências verificadas!"

# Configurar backend
echo ""
echo "🔧 Configurando backend (.NET)..."
cd backend

# Restaurar pacotes
echo "📦 Restaurando pacotes NuGet..."
dotnet restore

# Build do projeto
echo "🔨 Construindo projeto..."
dotnet build

cd ..

# Configurar frontend
echo ""
echo "⚛️  Configurando frontend (React)..."
cd frontend

# Instalar dependências
echo "📦 Instalando dependências npm..."
npm install

cd ..

# Configurar banco de dados
echo ""
echo "🗄️  Configuração do banco de dados..."
echo "Escolha o tipo de banco de dados:"
echo "1) SQL Server (recomendado para desenvolvimento local)"
echo "2) PostgreSQL" 
echo "3) Pular configuração de banco"

read -p "Digite sua escolha (1-3): " db_choice

case $db_choice in
    1)
        echo "📋 Configurando para SQL Server..."
        echo "Execute os comandos SQL em scripts/database/database_schema.sql"
        ;;
    2)
        echo "📋 Configurando para PostgreSQL..."
        echo "Execute os comandos SQL em scripts/database/database_schema_postgresql.sql"
        ;;
    3)
        echo "⏭️  Pulando configuração de banco..."
        ;;
    *)
        echo "❌ Opção inválida. Pulando configuração de banco..."
        ;;
esac

# Configurar variáveis de ambiente
echo ""
echo "⚙️  Configurando variáveis de ambiente..."

# Backend appsettings.Development.json
if [ ! -f "backend/CaseZero.Api/appsettings.Development.json" ]; then
    echo "📝 Criando appsettings.Development.json..."
    cat > backend/CaseZero.Api/appsettings.Development.json << 'EOF'
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=CaseZeroDev;Trusted_Connection=true;MultipleActiveResultSets=true",
    "StorageConnection": "UseDevelopmentStorage=true"
  },
  "JwtSettings": {
    "Secret": "your-256-bit-secret-key-here-must-be-very-long",
    "Issuer": "CaseZero",
    "Audience": "CaseZeroUsers",
    "ExpiryMinutes": 60
  },
  "Azure": {
    "StorageAccount": {
      "ConnectionString": "UseDevelopmentStorage=true"
    }
  }
}
EOF
fi

# Frontend .env.development
if [ ! -f "frontend/.env.development" ]; then
    echo "📝 Criando .env.development..."
    cat > frontend/.env.development << 'EOF'
VITE_API_BASE_URL=http://localhost:5000
VITE_APP_NAME=Case Zero
VITE_APP_VERSION=1.0.0-dev
VITE_ENVIRONMENT=development
EOF
fi

echo ""
echo "✅ Configuração concluída!"
echo ""
echo "🚀 Para iniciar o desenvolvimento:"
echo ""
echo "   Backend (API):"
echo "   cd backend/CaseZero.Api"
echo "   dotnet run"
echo ""
echo "   Frontend (React):"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "🌐 URLs de desenvolvimento:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
echo "   Swagger:  http://localhost:5000/swagger"
echo ""
echo "📚 Consulte README.md para mais informações!"
echo ""
