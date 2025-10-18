import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider, message } from 'antd'
import App from './App.tsx'
import './index.css'

// Configure message globally
message.config({
  top: 80,
  duration: 3,
  maxCount: 3,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
)
