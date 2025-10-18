import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Space,
  message,
  Popconfirm,
  Tag,
  Card,
  Input,
} from 'antd';
import {
  DeleteOutlined,
  PlayCircleOutlined,
  SearchOutlined,
  ReloadOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { taskService } from '../services/taskService';
import { Task } from '../types/task.types';
import TaskDetails from './TaskDetails';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [detailsVisible, setDetailsVisible] = useState(false);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await taskService.getAllTasks();
      setTasks(data);
    } catch (error) {
      message.error('Failed to load tasks');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleSearch = async () => {
    if (!searchText.trim()) {
      loadTasks();
      return;
    }

    setLoading(true);
    try {
      const data = await taskService.searchTasks(searchText);
      setTasks(data);
      message.success(`Found ${data.length} task(s)`);
    } catch (error) {
      message.error('Search failed');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleExecute = async (id: string) => {
  // Find task name for better message
  const task = tasks.find(t => t.id === id);
  const taskName = task?.name || id;
  
  setLoading(true);
  
  // Show loading message
  message.loading({
    content: `Executing "${taskName}"...`,
    key: 'executing',
    duration: 0,
  });
  
  try {
    await taskService.executeTask(id);
    
    // Show success message
    message.success({
      content: `✓ Task "${taskName}" executed successfully!`,
      key: 'executing',
      duration: 3,
    });
    
    loadTasks();
  } catch (error) {
    message.error({
      content: 'Failed to execute task',
      key: 'executing',
      duration: 3,
    });
    console.error(error);
  } finally {
    setLoading(false);
  }
};


  const handleDelete = async (id: string) => {
    try {
      await taskService.deleteTask(id);
      message.success('Task deleted successfully!');
      loadTasks();
    } catch (error) {
      message.error('Failed to delete task');
      console.error(error);
    }
  };

  const handleViewDetails = async (id: string) => {
    try {
      const task = await taskService.getTaskById(id);
      setSelectedTask(task);
      setDetailsVisible(true);
    } catch (error) {
      message.error('Failed to load task details');
      console.error(error);
    }
  };

  const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 100,
    fixed: 'left' as const, // Pin ID column
    ellipsis: true,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 150,
    ellipsis: true,
  },
  {
    title: 'Owner',
    dataIndex: 'owner',
    key: 'owner',
    width: 120,
    ellipsis: true,
  },
  {
    title: 'Command',
    dataIndex: 'command',
    key: 'command',
    width: 200,
    ellipsis: true,
  },
  {
    title: 'Executions',
    key: 'executions',
    width: 100,
    align: 'center' as const,
    render: (_: any, record: Task) => (
      <Tag color={record.taskExecutions.length > 0 ? 'green' : 'default'}>
        {record.taskExecutions.length}
      </Tag>
    ),
  },
  {
    title: 'Actions',
    key: 'actions',
    width: 280,
    fixed: 'right' as const, // Pin actions column
    render: (_: any, record: Task) => (
      <Space size="small" wrap>
        <Button
          type="primary"
          size="small"
          icon={<PlayCircleOutlined />}
          onClick={() => handleExecute(record.id)}
        >
          Execute
        </Button>
        <Button
          size="small"
          icon={<EyeOutlined />}
          onClick={() => handleViewDetails(record.id)}
        >
          View
        </Button>
        <Popconfirm
          title="Delete this task?"
          onConfirm={() => handleDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button
            danger
            size="small"
            icon={<DeleteOutlined />}
          >
            Delete
          </Button>
        </Popconfirm>
      </Space>
    ),
  },
];


  return (
    <>
      <Card
        title="Task Management"
        extra={
          <Button
            icon={<ReloadOutlined />}
            onClick={loadTasks}
            loading={loading}
          >
            Refresh
          </Button>
        }
      >
        <Space style={{ marginBottom: 16, width: '100%' }}>
          <Input
            placeholder="Search tasks by name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onPressEnter={handleSearch}
            style={{ width: 300 }}
            prefix={<SearchOutlined />}
          />
          <Button type="primary" onClick={handleSearch}>
            Search
          </Button>
          <Button onClick={() => { setSearchText(''); loadTasks(); }}>
            Clear
          </Button>
        </Space>

       <Table
  columns={columns}
  dataSource={tasks}
  rowKey="id"
  loading={loading}
  pagination={{ 
    pageSize: 10,
    showSizeChanger: false,
    simple: true, // Simpler pagination for mobile
  }}
  scroll={{ 
    x: 1000, // Minimum width before scrolling
    y: 600,  // Max height before vertical scroll
  }}
  size="middle"
/>

      </Card>

      {selectedTask && (
        <TaskDetails
          task={selectedTask}
          visible={detailsVisible}
          onClose={() => {
            setDetailsVisible(false);
            setSelectedTask(null);
          }}
        />
      )}
    </>
  );
};

export default TaskList;
