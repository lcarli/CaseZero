@description('Static Web App name')
param name string

@description('Azure region')
param location string = 'West Europe'

@description('Resource tags')
param tags object = {}

@description('API URL for backend integration')
param apiUrl string

@description('SKU for Static Web App')
param sku string = 'Free'

// Static Web App
resource staticWebApp 'Microsoft.Web/staticSites@2023-12-01' = {
  name: name
  location: location
  tags: tags
  sku: {
    name: sku
  }
  properties: {
    repositoryUrl: ''
    branch: 'main'
    buildProperties: {
      appLocation: '/frontend'
      apiLocation: ''
      outputLocation: 'dist'
    }
    stagingEnvironmentPolicy: 'Enabled'
    allowConfigFileUpdates: true
    enterpriseGradeCdnStatus: 'Disabled'
  }
}

// API configuration
resource staticWebAppConfig 'Microsoft.Web/staticSites/config@2023-12-01' = {
  parent: staticWebApp
  name: 'appsettings'
  properties: {
    VITE_API_BASE_URL: apiUrl
    VITE_APP_NAME: 'Case Zero'
    VITE_APP_VERSION: '1.0.0'
  }
}

output id string = staticWebApp.id
output name string = staticWebApp.name
output url string = 'https://${staticWebApp.properties.defaultHostname}'
output repositoryToken string = staticWebApp.listSecrets().properties.repositoryToken
