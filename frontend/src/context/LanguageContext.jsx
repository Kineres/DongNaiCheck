import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem("dong-nai-language") || "vi");

  useEffect(() => {
    localStorage.setItem("dong-nai-language", language);
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => setLanguage(current => current === "vi" ? "en" : "vi");

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
