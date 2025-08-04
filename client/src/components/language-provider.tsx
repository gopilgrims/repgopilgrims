import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ar' | 'ur' | 'fa' | 'gu';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    // Check localStorage first
    const stored = localStorage.getItem('preferred-language') as Language;
    if (stored && ['en', 'ar', 'ur', 'fa', 'gu'].includes(stored)) {
      return stored;
    }
    
    // Check browser language
    const browserLang = navigator.language.split('-')[0];
    switch (browserLang) {
      case 'ar': return 'ar';
      case 'ur': return 'ur';  
      case 'fa': return 'fa';
      case 'gu': return 'gu';
      default: return 'en';
    }
  });

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem('preferred-language', lang);
  };

  const isRTL = ['ar', 'ur', 'fa'].includes(currentLanguage);

  useEffect(() => {
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [currentLanguage, isRTL]);

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}