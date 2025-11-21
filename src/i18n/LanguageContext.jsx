import React, { createContext, useContext, useState, useEffect } from "react";
import translations from "./translations"; // your big translations file

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    localStorage.getItem("lang") || "en"
  );

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

// translate function updated
export const useTranslate = () => {
  const { language } = useLanguage();

  return (key) => {
    if (!key) return "";
    key = key.toLowerCase();

    return (
      translations[language][key] ||
      translations["en"][key] ||
      key
    );
  };
};
