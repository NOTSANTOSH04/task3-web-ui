import React, { useState } from 'react';
import { Form, Input, Button, message, Card, Alert } from 'antd';
import { PlusOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { taskService } from '../services/taskService';
import { CreateTaskDTO } from '../types/task.types';

interface TaskFormProps {
  onTaskCreated: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (values: CreateTaskDTO) => {
    setLoading(true);
    setShowSuccess(false);
    
    try {
      const result = await taskService.createTask(values);
      
      // Show success message
      message.success({
        content: `Task "${result.name}" created successfully!`,
        duration: 15,
        icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
      });
      
      // Show success alert
      setShowSuccess(true);
      
      // Reset form
      form.resetFields();
      
      // Notify parent
      onTaskCreated();
      
      // Hide success alert after 3 seconds
      setTimeout(() => setShowSuccess(false), 15000);
      
    } catch (error: any) {
      console.error('Error creating task:', error);
      
      // Show error message
      message.error({
        content: error.response?.data?.message || 'Failed to create task. Please try again.',
        duration: 5,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Create New Task" style={{ marginBottom: 24 }}>
      {showSuccess && (
        <Alert
          message="Success!"
          description="Task created successfully and added to the list below."
          type="success"
          showIcon
          closable
          onClose={() => setShowSuccess(false)}
          style={{ marginBottom: 16 }}
        />
      )}
      
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Task ID"
          name="id"
          rules={[
            { required: true, message: 'Please enter task ID' },
            { pattern: /^[a-zA-Z0-9-_]+$/, message: 'ID can only contain letters, numbers, hyphens, and underscores' }
          ]}
          tooltip="Unique identifier for the task"
        >
          <Input 
            placeholder="e.g., task-001" 
            disabled={loading}
          />
        </Form.Item>

        <Form.Item
          label="Task Name"
          name="name"
          rules={[
            { required: true, message: 'Please enter task name' },
            { min: 3, message: 'Name must be at least 3 characters' }
          ]}
        >
          <Input 
            placeholder="e.g., List Files" 
            disabled={loading}
          />
        </Form.Item>

        <Form.Item
          label="Owner"
          name="owner"
          rules={[
            { required: true, message: 'Please enter owner name' },
            { min: 2, message: 'Owner name must be at least 2 characters' }
          ]}
        >
          <Input 
            placeholder="Your name" 
            disabled={loading}
          />
        </Form.Item>

        <Form.Item
          label="Command"
          name="command"
          rules={[
            { required: true, message: 'Please enter command' },
            { min: 1, message: 'Command cannot be empty' }
          ]}
          tooltip="Command to execute (e.g., echo Hello World)"
        >
          <Input.TextArea
            rows={3}
            placeholder="e.g., echo Hello World"
            disabled={loading}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            icon={<PlusOutlined />}
            block
            size="large"
          >
            {loading ? 'Creating Task...' : 'Create Task'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default TaskForm;
