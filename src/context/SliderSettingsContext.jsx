import React, { createContext, useState, useContext, useEffect } from "react";

const SliderSettingsContext = createContext();

export const SliderSettingsProvider = ({ children }) => {
  const defaultSettings = {
    showPrice: true,
    showRating: true,
    showLabels: true,
    cardColor: "#ffffff",
    textColor: "#000000",
    starColor: "#fbbf24",
    visibleCount: 10,
  };

  const [settings, setSettings] = useState(() => {
    // Load from localStorage if exists
    const saved = localStorage.getItem("sliderSettings");
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem("sliderSettings", JSON.stringify(settings));
  }, [settings]);

  return (
    <SliderSettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SliderSettingsContext.Provider>
  );
};

export const useSliderSettings = () => useContext(SliderSettingsContext);
