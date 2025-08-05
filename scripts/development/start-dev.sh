#!/bin/bash

# Case Zero - Script de Développement
# Lance le backend et le frontend simultanément

set -e

echo "🎮 Case Zero - Démarrage du mode développement..."
echo "=============================================="

# Couleurs pour les logs
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour nettoyer les processus
cleanup() {
    echo -e "\n${YELLOW}🛑 Arrêt des services...${NC}"
    pkill -f "dotnet run" 2>/dev/null || true
    pkill -f "vite" 2>/dev/null || true
    exit 0
}

# Capturer Ctrl+C
trap cleanup SIGINT

# Vérifier les dépendances
echo -e "${BLUE}📋 Vérification des dépendances...${NC}"

if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js non trouvé${NC}"
    exit 1
fi

if ! command -v dotnet &> /dev/null; then
    echo -e "${RED}❌ .NET non trouvé${NC}"
    exit 1
fi

# Vérifier si les packages npm sont installés
if [ ! -d "frontend/node_modules" ]; then
    echo -e "${YELLOW}📦 Installation des dépendances npm...${NC}"
    cd frontend && npm install && cd ..
fi

echo -e "${GREEN}✅ Dépendances OK${NC}"
echo ""

# Créer des logs séparés
mkdir -p logs

echo -e "${BLUE}🚀 Démarrage des services...${NC}"
echo ""

# Démarrer le backend
echo -e "${GREEN}🔧 Démarrage du backend (.NET API)...${NC}"
cd backend/CaseZero.Api
dotnet run > ../../logs/backend.log 2>&1 &
BACKEND_PID=$!
cd ../..

# Attendre que le backend soit prêt
echo -e "${YELLOW}⏳ Attente du backend...${NC}"
sleep 5

# Vérifier si le backend est toujours en cours d'exécution
if ! kill -0 $BACKEND_PID 2>/dev/null; then
    echo -e "${RED}❌ Échec du démarrage du backend${NC}"
    echo -e "${RED}Logs du backend:${NC}"
    cat logs/backend.log
    exit 1
fi

# Démarrer le frontend
echo -e "${GREEN}🌐 Démarrage du frontend (React + Vite)...${NC}"
cd frontend
npm run dev > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

# Attendre que le frontend soit prêt
echo -e "${YELLOW}⏳ Attente du frontend...${NC}"
sleep 3

echo ""
echo -e "${GREEN}✅ Services démarrés avec succès!${NC}"
echo ""
echo -e "${BLUE}🌐 URLs disponibles:${NC}"
echo -e "   ${GREEN}Frontend:${NC} http://localhost:3000"
echo -e "   ${GREEN}Backend:${NC}  http://localhost:5000"
echo -e "   ${GREEN}Swagger:${NC}  http://localhost:5000/swagger"
echo ""
echo -e "${YELLOW}📝 Logs:${NC}"
echo -e "   Backend:  logs/backend.log"
echo -e "   Frontend: logs/frontend.log"
echo ""
echo -e "${BLUE}Appuyez sur Ctrl+C pour arrêter tous les services${NC}"
echo ""

# Afficher les logs en temps réel
tail -f logs/backend.log logs/frontend.log
