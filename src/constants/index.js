// API 設定
export const API_BASE = import.meta.env.VITE_API_BASE;
export const API_PATH = import.meta.env.VITE_API_PATH;

// 初始產品資料模板
export const INITIAL_TEMPLATE_DATA = {
  id: '',
  title: '',
  category: '',
  origin_price: '',
  price: '',
  unit: '',
  description: '',
  content: '',
  is_enabled: false,
  imageUrl: '',
  imagesUrl: [],
};

// Modal 類型
export const MODAL_TYPES = {
  CREATE: 'create',
  EDIT: 'edit',
  DELETE: 'delete',
};
