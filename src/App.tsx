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
      <Header style={{ 
        background: '#001529', 
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Title 
          level={3} 
          style={{ 
            color: 'white', 
            margin: '16px 0',
            fontSize: 'clamp(16px, 4vw, 24px)'
          }}
        >
          Task Manager - Kaiburr Assessment
        </Title>
      </Header>
      
      <Content style={{ 
        padding: '24px',
        background: '#f0f2f5',
        width: '100%',
        maxWidth: '1600px',
        margin: '0 auto'
      }}>
        <div style={{ width: '100%' }}>
          <TaskForm onTaskCreated={handleTaskCreated} />
          <Divider />
          <TaskList key={refreshKey} />
        </div>
      </Content>
      
      <Footer style={{ 
        textAlign: 'center', 
        background: '#001529', 
        color: 'white',
        padding: '12px 24px'
      }}>
        Task Manager Web UI ©2025 | Created by Santosh
      </Footer>
    </Layout>
  );
};

export default App;
