import axios from 'axios';
import { API_BASE, API_PATH } from '../constants';

// 創建 axios 實例
const apiClient = axios.create({
  baseURL: API_BASE,
});

// 設定 Authorization token
export const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = token;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

// 認證相關 API
export const authAPI = {
  // 登入
  signin: (credentials) => apiClient.post('/admin/signin', credentials),
  
  // 檢查登入狀態
  checkAuth: () => apiClient.post('/api/user/check'),
};

// 產品相關 API
export const productAPI = {
  // 取得所有產品
  getAll: () => apiClient.get(`/api/${API_PATH}/admin/products`),
  
  // 新增產品
  create: (product) => apiClient.post(`/api/${API_PATH}/admin/product`, { data: product }),
  
  // 更新產品
  update: (id, product) => apiClient.put(`/api/${API_PATH}/admin/product/${id}`, { data: product }),
  
  // 刪除產品
  delete: (id) => apiClient.delete(`/api/${API_PATH}/admin/product/${id}`),
};

export default apiClient;
