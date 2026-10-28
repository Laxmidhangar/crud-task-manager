import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/tasks',
});

export const getTasks = () => API.get('/');
export const addTask = (taskData) => API.post('/', taskData);
export const editTask = (id, taskData) => API.put(`/${id}`, taskData);
export const removeTask = (id) => API.delete(`/${id}`);