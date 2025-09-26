import React, { useState } from 'react';
import './LanguageToggle.css';

const LanguageToggle = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'ne', name: 'Nepali', flag: '🇳🇵' },
    { code: 'si', name: 'Sikkimese', flag: '🇮🇳' },
    { code: 'bn', name: 'Bengali', flag: '🇧🇩' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' }
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    setIsOpen(false);
    // Here you would typically integrate with your i18n library
    console.log('Language changed to:', languageCode);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="language-toggle">
      <button 
        className="language-toggle__current"
        onClick={toggleDropdown}
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <span className="language-toggle__flag">{currentLang?.flag}</span>
        <span className="language-toggle__code">{currentLang?.code.toUpperCase()}</span>
        <span className={`language-toggle__chevron ${isOpen ? 'language-toggle__chevron--open' : ''}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="language-dropdown">
          <div className="language-dropdown__content">
            {languages.map((language) => (
              <button
                key={language.code}
                className={`language-option ${currentLanguage === language.code ? 'language-option--active' : ''}`}
                onClick={() => handleLanguageChange(language.code)}
              >
                <span className="language-option__flag">{language.flag}</span>
                <span className="language-option__name">{language.name}</span>
                {currentLanguage === language.code && (
                  <span className="language-option__check">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Overlay to close dropdown when clicking outside */}
      {isOpen && (
        <div 
          className="language-toggle__overlay"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default LanguageToggle;