import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeType = 'light' | 'dark';

export interface ThemeConfig {
  // Base colors
  colorPrimary: string;
  colorBgContainer: string;
  colorBgElevated: string;
  colorBorder: string;
  colorText: string;
  colorTextSecondary: string;
  colorBgHeader: string;
  colorBgSider: string;
  
  // Component specific colors
  cardBackground: string;
  cardBorder: string;
  sidebarBackground: string;
  topBarBackground: string;
  chartGridColor: string;
  chartTextColor: string;
  
  // Status colors
  successColor: string;
  warningColor: string;
  errorColor: string;
  infoColor: string;
}

export const lightTheme: ThemeConfig = {
  colorPrimary: '#1890ff',
  colorBgContainer: '#ffffff',
  colorBgElevated: '#fafafa',
  colorBorder: '#d9d9d9',
  colorText: '#262626',
  colorTextSecondary: '#8c8c8c',
  colorBgHeader: '#ffffff',
  colorBgSider: '#fafafa',
  cardBackground: '#ffffff',
  cardBorder: '#f0f0f0',
  sidebarBackground: '#fafafa',
  topBarBackground: '#ffffff',
  chartGridColor: '#f0f0f0',
  chartTextColor: '#8c8c8c',
  successColor: '#52c41a',
  warningColor: '#faad14',
  errorColor: '#ff4d4f',
  infoColor: '#1890ff',
};

export const darkTheme: ThemeConfig = {
  colorPrimary: '#1890ff',
  colorBgContainer: '#1a1a1a',
  colorBgElevated: '#2a2a2a',
  colorBorder: '#404040',
  colorText: '#ffffff',
  colorTextSecondary: '#666666',
  colorBgHeader: '#2a2a2a',
  colorBgSider: '#2a2a2a',
  cardBackground: '#2a2a2a',
  cardBorder: '#404040',
  sidebarBackground: '#2a2a2a',
  topBarBackground: '#2a2a2a',
  chartGridColor: '#404040',
  chartTextColor: '#666666',
  successColor: '#52c41a',
  warningColor: '#faad14',
  errorColor: '#ff4d4f',
  infoColor: '#1890ff',
};

interface ThemeContextType {
  theme: ThemeType;
  themeConfig: ThemeConfig;
  toggleTheme: () => void;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeType>(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('dashboard-theme') as ThemeType;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      return savedTheme;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  });

  const themeConfig = theme === 'dark' ? darkTheme : lightTheme;

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setThemeState(newTheme);
    localStorage.setItem('dashboard-theme', newTheme);
  };

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    localStorage.setItem('dashboard-theme', newTheme);
  };

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('dashboard-theme')) {
        setThemeState(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const value: ThemeContextType = {
    theme,
    themeConfig,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
