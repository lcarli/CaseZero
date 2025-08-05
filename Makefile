# Case Zero - Makefile pour le développement
.PHONY: help install dev dev-backend dev-frontend build clean test

# Couleurs pour les messages
BLUE = \033[34m
GREEN = \033[32m
YELLOW = \033[33m
RED = \033[31m
NC = \033[0m # No Color

help: ## Afficher l'aide
	@echo "$(BLUE)Case Zero - Commandes disponibles:$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(GREEN)%-15s$(NC) %s\n", $$1, $$2}'

install: ## Installer toutes les dépendances
	@echo "$(YELLOW)📦 Installation des dépendances...$(NC)"
	npm install --prefix frontend
	dotnet restore backend/CaseZero.Api
	@echo "$(GREEN)✅ Dépendances installées$(NC)"

dev: ## Démarrer le mode développement (frontend + backend)
	@echo "$(BLUE)🚀 Démarrage du mode développement...$(NC)"
	@echo "$(YELLOW)Frontend: http://localhost:3000$(NC)"
	@echo "$(YELLOW)Backend: http://localhost:5000$(NC)"
	@echo "$(YELLOW)Swagger: http://localhost:5000/swagger$(NC)"
	@echo ""
	npm run dev

dev-backend: ## Démarrer seulement le backend
	@echo "$(BLUE)🔧 Démarrage du backend...$(NC)"
	cd backend/CaseZero.Api && dotnet run

dev-frontend: ## Démarrer seulement le frontend
	@echo "$(BLUE)🌐 Démarrage du frontend...$(NC)"
	cd frontend && npm run dev

build: ## Build le projet complet
	@echo "$(YELLOW)🔨 Build du projet...$(NC)"
	npm run build

build-frontend: ## Build seulement le frontend
	@echo "$(YELLOW)🔨 Build du frontend...$(NC)"
	cd frontend && npm run build

build-backend: ## Build seulement le backend
	@echo "$(YELLOW)🔨 Build du backend...$(NC)"
	cd backend/CaseZero.Api && dotnet build

clean: ## Nettoyer les fichiers de build
	@echo "$(RED)🧹 Nettoyage...$(NC)"
	npm run clean

test: ## Exécuter tous les tests
	@echo "$(BLUE)🧪 Exécution des tests...$(NC)"
	npm run test

logs: ## Afficher les logs de développement
	@echo "$(BLUE)📝 Logs de développement:$(NC)"
	@if [ -f logs/backend.log ]; then echo "$(GREEN)Backend:$(NC)"; tail -n 20 logs/backend.log; fi
	@if [ -f logs/frontend.log ]; then echo "$(GREEN)Frontend:$(NC)"; tail -n 20 logs/frontend.log; fi
