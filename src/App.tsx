import React from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ServerOverview from './pages/ServerOverview';
import ScrollToTop from './components/atoms/ScrollToTop/ScrollToTop';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <ConfigProvider
        theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 6,
          fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
        },
        components: {
          Card: {
            borderRadiusLG: 8,
            boxShadowTertiary: '0 2px 8px rgba(0,0,0,0.1)',
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
        },
      }}
    >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/servers" element={<ServerOverview />} />
        </Routes>
        <ScrollToTop />
      </ConfigProvider>
    </Router>
  );
};

export default App;
