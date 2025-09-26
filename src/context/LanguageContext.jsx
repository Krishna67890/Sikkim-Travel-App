import React, { createContext, useContext, useState, useEffect } from 'react';

// Available languages configuration
const languages = {
  en: {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    dir: 'ltr'
  },
  es: {
    code: 'es',
    name: 'Español',
    flag: '🇪🇸',
    dir: 'ltr'
  },
  fr: {
    code: 'fr',
    name: 'Français',
    flag: '🇫🇷',
    dir: 'ltr'
  },
  ar: {
    code: 'ar',
    name: 'العربية',
    flag: '🇸🇦',
    dir: 'rtl'
  },
  // Add more languages as needed
};

// Default translations - you can move these to separate files
const defaultTranslations = {
  en: {
    welcome: "Welcome",
    about: "About",
    contact: "Contact",
    home: "Home",
    settings: "Settings",
    language: "Language",
    save: "Save",
    cancel: "Cancel",
    loading: "Loading...",
    error: "An error occurred",
    success: "Success!",
  },
  es: {
    welcome: "Bienvenido",
    about: "Acerca de",
    contact: "Contacto",
    home: "Inicio",
    settings: "Configuración",
    language: "Idioma",
    save: "Guardar",
    cancel: "Cancelar",
    loading: "Cargando...",
    error: "Ocurrió un error",
    success: "¡Éxito!",
  },
  fr: {
    welcome: "Bienvenue",
    about: "À propos",
    contact: "Contact",
    home: "Accueil",
    settings: "Paramètres",
    language: "Langue",
    save: "Enregistrer",
    cancel: "Annuler",
    loading: "Chargement...",
    error: "Une erreur est survenue",
    success: "Succès!",
  },
  ar: {
    welcome: "مرحباً",
    about: "حول",
    contact: "اتصال",
    home: "الرئيسية",
    settings: "الإعدادات",
    language: "اللغة",
    save: "حفظ",
    cancel: "إلغاء",
    loading: "جاري التحميل...",
    error: "حدث خطأ",
    success: "نجاح!",
  },
};

// Create context
const LanguageContext = createContext();

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Language provider component
export const LanguageProvider = ({ children, translations = {} }) => {
  // Get browser language or default to English
  const getDefaultLanguage = () => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    const browserLanguage = navigator.language.split('-')[0];
    
    if (savedLanguage && languages[savedLanguage]) {
      return savedLanguage;
    }
    
    if (languages[browserLanguage]) {
      return browserLanguage;
    }
    
    return 'en'; // default to English
  };

  const [currentLanguage, setCurrentLanguage] = useState(getDefaultLanguage);
  const [isLoading, setIsLoading] = useState(false);

  // Merge default translations with custom translations
  const allTranslations = {
    ...defaultTranslations,
    ...translations
  };

  // Function to change language
  const changeLanguage = (languageCode) => {
    if (languages[languageCode]) {
      setIsLoading(true);
      
      // Simulate loading (remove this in production)
      setTimeout(() => {
        setCurrentLanguage(languageCode);
        localStorage.setItem('selectedLanguage', languageCode);
        
        // Update document direction for RTL languages
        document.documentElement.dir = languages[languageCode].dir;
        document.documentElement.lang = languageCode;
        
        setIsLoading(false);
      }, 300);
    }
  };

  // Function to translate text
  const t = (key, params = {}) => {
    const translation = allTranslations[currentLanguage]?.[key] || 
                       allTranslations.en?.[key] || 
                       key;

    // Replace parameters in translation string
    return translation.replace(/\{(\w+)\}/g, (match, param) => {
      return params[param] || match;
    });
  };

  // Initialize document language and direction
  useEffect(() => {
    const langData = languages[currentLanguage];
    document.documentElement.dir = langData.dir;
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  // Context value
  const contextValue = {
    currentLanguage,
    languages,
    changeLanguage,
    t,
    isLoading,
    currentLanguageData: languages[currentLanguage]
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

// Higher Order Component for class components (optional)
export const withLanguage = (Component) => {
  return function WrappedComponent(props) {
    const languageContext = useLanguage();
    return <Component {...props} language={languageContext} />;
  };
};

export default LanguageContext;