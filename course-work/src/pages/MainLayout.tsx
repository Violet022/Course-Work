import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/navigation/NavBar/Navbar';
import Routes from '../components/routing/Routes';

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