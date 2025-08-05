# CaseZero API - Controllers Documentation

## Resumé des Controllers Implémentés

### 1. AuthController ✅
**Authentification et autorisation JWT**
- `POST /api/auth/login` - Connexion utilisateur
- `POST /api/auth/register` - Inscription utilisateur
- `GET /api/auth/profile` - Profil utilisateur connecté
- `POST /api/auth/logout` - Déconnexion
- `POST /api/auth/refresh` - Actualiser token JWT

### 2. UsersController ✅
**Gestion des utilisateurs (CRUD)**
- `GET /api/users` - Lister tous les utilisateurs (Admin)
- `GET /api/users/{id}` - Obtenir utilisateur par ID (Admin)
- `PUT /api/users/{id}` - Mettre à jour profil utilisateur
- `DELETE /api/users/{id}` - Désactiver utilisateur (Admin)

### 3. CasesController ✅
**Gestion des cas d'enquête**
- `GET /api/cases` - Lister tous les cas publiés
- `GET /api/cases/{id}` - Obtenir cas spécifique avec détails
- `POST /api/cases` - Créer nouveau cas (Supervisor+)
- `PUT /api/cases/{id}` - Mettre à jour cas (Supervisor+)
- `DELETE /api/cases/{id}` - Supprimer cas (Admin)

### 4. EvidenceController ✅ **NOUVEAU**
**Gestion des preuves/evidences**
- `GET /api/evidence/case/{caseId}` - Preuves d'un cas spécifique
- `GET /api/evidence/{id}` - Preuve spécifique par ID
- `POST /api/evidence` - Créer nouvelle preuve (Analyst+)
- `PUT /api/evidence/{id}` - Mettre à jour preuve (Analyst+)
- `DELETE /api/evidence/{id}` - Supprimer preuve (Admin)
- `POST /api/evidence/{id}/toggle-availability` - Activer/Désactiver preuve
- `GET /api/evidence/requiring-analysis` - Preuves nécessitant analyse

### 5. AnalysisController ✅ **NOUVEAU**
**Gestion des analyses forensiques**
- `GET /api/analysis` - Toutes les analyses (Analyst+)
- `GET /api/analysis/{id}` - Analyse spécifique par ID
- `GET /api/analysis/evidence/{evidenceId}` - Analyses d'une preuve
- `POST /api/analysis` - Demander nouvelle analyse (Analyst+)
- `PUT /api/analysis/{id}` - Mettre à jour résultat d'analyse
- `DELETE /api/analysis/{id}` - Supprimer analyse (Admin)
- `GET /api/analysis/pending` - Analyses en attente
- `GET /api/analysis/status/{status}` - Analyses par statut

### 6. InvestigationSessionController ✅ **NOUVEAU**
**Gestion des sessions d'enquête**
- `GET /api/investigationsession` - Toutes les sessions (Supervisor+)
- `GET /api/investigationsession/{id}` - Session spécifique
- `GET /api/investigationsession/my-sessions` - Mes sessions
- `GET /api/investigationsession/case/{caseId}` - Sessions d'un cas
- `POST /api/investigationsession/start` - Démarrer nouvelle session
- `POST /api/investigationsession/{id}/end` - Terminer session
- `PUT /api/investigationsession/{id}/progress` - Mettre à jour progrès
- `GET /api/investigationsession/statistics` - Statistiques des sessions

## Autorisation et Sécurité

### Rôles Implémentés
1. **Guest** (5) - Accès minimal
2. **Detective** (1) - Enquêteur de base
3. **Analyst** (4) - Analyste forensique
4. **Supervisor** (3) - Superviseur d'équipe
5. **Administrator** (2) - Administrateur système

### Attributes d'Autorisation
- `[AdminOnly]` - Administrator uniquement
- `[SupervisorAndAbove]` - Supervisor + Administrator
- `[AnalystAndAbove]` - Analyst + Supervisor + Administrator
- `[DetectiveAndAbove]` - Detective + Analyst + Supervisor + Administrator

### JWT Configuration
- **Access Token**: Expires en 1 heure
- **Refresh Token**: Structure pour renouvellement (à implémenter)
- **Claims**: UserId, Username, Email, Role
- **Encryption**: HS256 avec clé secrète

## Fonctionnalités Clés

### Gestion des Preuves
- Support multi-langue (PT/EN)
- Types: Document, Photo, Video, Audio, Physical, Digital, Statement, Report, Analysis
- Catégories: Scene, Witness, Victim, Suspect, Administrative, Technical, Legal, Other
- Localisation et métadonnées complètes
- Statut disponibilité et besoin d'analyse

### Analyses Forensiques
- Types d'analyse configurables
- Statuts: Pending, Completed, InProgress
- Estimation temps et coûts
- Résultats multilingues
- Traçabilité complète (qui, quand, combien de temps)

### Sessions d'Enquête
- Tracking complet du progrès utilisateur
- Score, indices utilisés, preuves vues
- Temps total, notes, données de session JSON
- Statuts: Active, Paused, Completed, Abandoned, TimeExpired
- Statistiques et rapports pour superviseurs

## Base de Données

### Entités Principales
- **User**: Utilisateurs du système
- **Case**: Cas d'enquête
- **Evidence**: Preuves/indices
- **Analysis**: Analyses forensiques
- **InvestigationSession**: Sessions d'enquête utilisateur
- **Timeline**: Événements chronologiques
- **Location**: Lieux importants

### Seed Data Inclus
- Admin par défaut (admin@casezero.com / Admin123!)
- Cas tutorial avec preuves exemple
- Structure complète pour tests

## Tests et Documentation

### Fichier HTTP de Tests
- 32 endpoints testés
- Exemples de données réalistes
- Variables pour tokens JWT
- Documentation inline

### Swagger/OpenAPI
- Documentation automatique
- Interface de test intégrée
- Schémas DTOs complets
- Autorisation JWT intégrée

## Prochaines Étapes Suggérées

### Backend
1. **AccusationsController** - Gestion des accusations/solutions
2. **TimelineController** - Gestion des événements chronologiques  
3. **LocationsController** - Gestion des lieux
4. **Refresh Token Persistence** - Stockage sécurisé tokens
5. **Rate Limiting** - Protection contre abus
6. **Validation améliorée** - FluentValidation
7. **Caching** - Redis pour performance
8. **Logging avancé** - Serilog avec ELK stack

### Frontend React
1. **Authentification UI** - Login/Register
2. **Dashboard** - Vue d'ensemble cas/sessions
3. **Case Explorer** - Interface navigation cas
4. **Evidence Viewer** - Visualisation preuves
5. **Analysis Request** - Interface demandes analyses
6. **Investigation Session** - Gameplay principal
7. **Admin Panel** - Gestion utilisateurs/cas

### DevOps & Production
1. **Azure Deployment** - App Service + SQL Database
2. **CI/CD Pipeline** - GitHub Actions
3. **Monitoring** - Application Insights
4. **Security Scanning** - OWASP ZAP
5. **Performance Testing** - Load tests
6. **Backup Strategy** - Automated backups

## État Actuel

✅ **Completed:**
- Backend structure et architecture
- Authentification JWT complète
- 6 controllers principaux avec CRUD
- Autorisation basée sur rôles
- Tests HTTP complets
- Documentation API Swagger
- Data seeding automatique
- Git setup avec repo GitHub

🔄 **En Cours:**
- Server running sur localhost:5030
- Tests validation des endpoints
- Documentation technique

📋 **À Faire:**
- Frontend React
- Deployment Azure
- Controllers additionnels (Accusations, Timeline, Locations)
- Fonctionnalités avancées (cache, rate limiting, etc.)

## Commandes Utiles

```bash
# Démarrer le serveur
cd /Users/lucashumenhuk/repos/CaseZero
dotnet run --project backend/CaseZero.Api/CaseZero.Api.csproj --urls="http://localhost:5030"

# Swagger UI
http://localhost:5030/swagger

# Tests HTTP
Utiliser le fichier CaseZero.Api.http dans VS Code avec l'extension REST Client
```
