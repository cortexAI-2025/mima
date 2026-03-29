import React, { createContext, useContext, useState } from 'react';
import { themes } from '../theme/themes';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [currentThemeName, setCurrentThemeName] = useState('classic');

  const setTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentThemeName(themeName);
    }
  };

  const currentTheme = themes[currentThemeName];

  return (
    <ThemeContext.Provider value={{ currentTheme, currentThemeName, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeContext;
