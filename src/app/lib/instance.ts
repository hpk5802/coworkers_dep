import axios from 'axios';
import { store } from '@/app/stores/store';

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTM3OSwidGVhbUlkIjoiMTEtOCIsInNjb3BlIjoiYWNjZXNzIiwiaWF0IjoxNzM4MzMyNTUyLCJleHAiOjE3MzgzMzYxNTIsImlzcyI6InNwLWNvd29ya2VycyJ9.rYQDBurSjQ3b5GET_McvCx7TZU_72xK88iNqV_35jSU';
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${TOKEN}`,
  },
});

// 요청 인터셉터: Access Token 추가
instance.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;
