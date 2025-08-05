// Main Bicep template for Case Zero infrastructure
targetScope = 'resourceGroup'

@description('Environment name (dev, staging, prod)')
param environmentName string = 'dev'

@description('Application name')
param applicationName string = 'casezero'

@description('Azure region for resources')
param location string = resourceGroup().location

@description('Resource token for unique naming')
param resourceToken string = toLower(uniqueString(subscription().id, environmentName, location))

// Variables
var tags = {
  'azd-env-name': environmentName
  'application': applicationName
  'environment': environmentName
}

var resourceBaseName = '${applicationName}-${environmentName}-${resourceToken}'

// Key Vault for secrets
module keyVault 'modules/keyvault.bicep' = {
  name: 'keyvault'
  params: {
    name: 'kv-${resourceBaseName}'
    location: location
    tags: tags
  }
}

// Storage Account for files and evidence
module storage 'modules/storage.bicep' = {
  name: 'storage'
  params: {
    name: 'st${replace(resourceBaseName, '-', '')}'
    location: location
    tags: tags
  }
}

// SQL Database
module database 'modules/database.bicep' = {
  name: 'database'
  params: {
    serverName: 'sql-${resourceBaseName}'
    databaseName: 'casezero'
    location: location
    tags: tags
    keyVaultName: keyVault.outputs.name
  }
}

// App Service for API
module appService 'modules/app-service.bicep' = {
  name: 'app-service'
  params: {
    name: 'app-${resourceBaseName}'
    location: location
    tags: tags
    keyVaultName: keyVault.outputs.name
    databaseConnectionString: database.outputs.connectionString
    storageConnectionString: storage.outputs.connectionString
  }
}

// Static Web App for frontend
module staticWebApp 'modules/static-web-app.bicep' = {
  name: 'static-web-app'
  params: {
    name: 'swa-${resourceBaseName}'
    location: 'West Europe' // Static Web Apps have limited regions
    tags: tags
    apiUrl: appService.outputs.url
  }
}

// Outputs
output AZURE_KEY_VAULT_NAME string = keyVault.outputs.name
output AZURE_STORAGE_ACCOUNT_NAME string = storage.outputs.name
output AZURE_SQL_SERVER_NAME string = database.outputs.serverName
output AZURE_SQL_DATABASE_NAME string = database.outputs.databaseName
output AZURE_APP_SERVICE_NAME string = appService.outputs.name
output AZURE_STATIC_WEB_APP_NAME string = staticWebApp.outputs.name
output API_BASE_URL string = appService.outputs.url
output WEB_BASE_URL string = staticWebApp.outputs.url
