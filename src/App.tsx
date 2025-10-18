import React, { useState } from 'react';
import { Layout, Typography, Divider } from 'antd';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTaskCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#001529', padding: '0 50px' }}>
        <Title level={3} style={{ color: 'white', margin: '16px 0' }}>
          Task Manager - Kaiburr Assessment
        </Title>
      </Header>
      
      <Content style={{ padding: '50px', background: '#f0f2f5' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <TaskForm onTaskCreated={handleTaskCreated} />
          <Divider />
          <TaskList key={refreshKey} />
        </div>
      </Content>
      
      <Footer style={{ textAlign: 'center', background: '#001529', color: 'white' }}>
        Task Manager Web UI ©2025 | Created by Santosh
      </Footer>
    </Layout>
  );
};

export default App;
