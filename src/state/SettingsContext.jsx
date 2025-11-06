import React, { createContext, useContext, useState } from "react";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    showPrice: true,
    showRating: true,
    showLabels: true,
    visibleCount: 10,
    cardColor: "#ffffff",
    textColor: "#1f2937",
    starColor: "#facc15"
  });

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
