import React from 'react';
import { ConfigProvider } from 'antd';
import Dashboard from './pages/Dashboard';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import './App.css';

const ThemedApp: React.FC = () => {
  const { themeConfig, theme } = useTheme();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: themeConfig.colorPrimary,
          borderRadius: 6,
          fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
          colorBgContainer: themeConfig.colorBgContainer,
          colorBgElevated: themeConfig.colorBgElevated,
          colorBorder: themeConfig.colorBorder,
          colorText: themeConfig.colorText,
          colorTextSecondary: themeConfig.colorTextSecondary,
        },
        components: {
          Card: {
            borderRadiusLG: 8,
            boxShadowTertiary: theme === 'dark' 
              ? '0 2px 8px rgba(0,0,0,0.3)' 
              : '0 2px 8px rgba(0,0,0,0.1)',
          },
          Button: {
            borderRadius: 6,
          },
          Input: {
            borderRadius: 6,
          },
          Select: {
            borderRadius: 6,
          },
          Layout: {
            colorBgHeader: themeConfig.colorBgHeader,
            colorBgContainer: themeConfig.colorBgContainer,
          },
        },
      }}
    >
      <Dashboard />
    </ConfigProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}

export default App;
