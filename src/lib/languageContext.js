import { createContext, useContext } from "react";

const LanguageContext = createContext({
  language: "en",
  toggleLanguage: () => {},
});

export const LanguageProvider = ({ children, value }) => (
  <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
);

export const useLanguage = () => useContext(LanguageContext);
