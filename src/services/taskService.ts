import axios from 'axios';
import { Task, CreateTaskDTO } from '../types/task.types';

const API_BASE_URL = 'http://localhost:8081/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskService = {
  // Get all tasks
  getAllTasks: async (): Promise<Task[]> => {
    const response = await api.get<Task[]>('/tasks');
    return response.data;
  },

  // Get task by ID
  getTaskById: async (id: string): Promise<Task> => {
    const response = await api.get<Task>(`/tasks?id=${id}`);
    return response.data;
  },

  // Search tasks by name
  searchTasks: async (name: string): Promise<Task[]> => {
    const response = await api.get<Task[]>(`/tasks/search?name=${name}`);
    return response.data;
  },

  // Create task
  createTask: async (task: CreateTaskDTO): Promise<Task> => {
    const response = await api.put<Task>('/tasks', task);
    return response.data;
  },

  // Execute task
  executeTask: async (id: string): Promise<Task> => {
    const response = await api.put<Task>(`/tasks/${id}/execute`);
    return response.data;
  },

  // Delete task
  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};
