import React, { useState } from 'react';
import { Form, Input, Button, message, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { taskService } from '../services/taskService';
import { CreateTaskDTO } from '../types/task.types';

interface TaskFormProps {
  onTaskCreated: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: CreateTaskDTO) => {
    setLoading(true);
    try {
      await taskService.createTask(values);
      message.success('Task created successfully!');
      form.resetFields();
      onTaskCreated();
    } catch (error) {
      message.error('Failed to create task');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Create New Task" style={{ marginBottom: 24 }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Task ID"
          name="id"
          rules={[{ required: true, message: 'Please enter task ID' }]}
        >
          <Input placeholder="e.g., task-001" />
        </Form.Item>

        <Form.Item
          label="Task Name"
          name="name"
          rules={[{ required: true, message: 'Please enter task name' }]}
        >
          <Input placeholder="e.g., List Files" />
        </Form.Item>

        <Form.Item
          label="Owner"
          name="owner"
          rules={[{ required: true, message: 'Please enter owner name' }]}
        >
          <Input placeholder="Your name" />
        </Form.Item>

        <Form.Item
          label="Command"
          name="command"
          rules={[{ required: true, message: 'Please enter command' }]}
        >
          <Input.TextArea
            rows={3}
            placeholder="e.g., echo Hello World"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            icon={<PlusOutlined />}
            block
          >
            Create Task
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default TaskForm;
