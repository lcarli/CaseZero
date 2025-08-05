import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Configuration i18next
i18n
  .use(Backend) // Charge les traductions depuis des fichiers
  .use(LanguageDetector) // Détecte automatiquement la langue du navigateur
  .use(initReactI18next) // Passe i18n vers react-i18next
  .init({
    // Langue de fallback
    fallbackLng: 'fr',
    
    // Langues supportées
    supportedLngs: ['en', 'fr', 'pt', 'es'],
    
    // Détection automatique de la langue
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    // Configuration des ressources
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
      crossDomain: true,
    },

    // Configuration des interpolations
    interpolation: {
      escapeValue: false, // React échappe déjà par défaut
    },

    // Configuration des namespaces
    defaultNS: 'common',
    ns: ['common'],

    // Mode debug (désactivé en production)
    debug: process.env.NODE_ENV === 'development',

    // Configuration du chargement
    load: 'languageOnly', // Évite les variations régionales (ex: en-US -> en)
    
    // Retourne toujours une clé même si la traduction n'existe pas
    returnEmptyString: false,
    returnNull: false,
    
    // Configuration pour éviter les problèmes de cache
    cleanCode: true,
  });

export default i18n;
