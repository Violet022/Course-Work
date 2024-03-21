import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './NavBar/Navbar';
import Routes from './Routes';

const MainLayout: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <Navbar/>
        <Routes/>
      </Layout>
    </BrowserRouter>
  )
};

export default MainLayout;