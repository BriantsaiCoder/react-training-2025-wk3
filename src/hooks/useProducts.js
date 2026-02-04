import { useState, useCallback } from 'react';
import { productAPI } from '../services/api';

/**
 * 產品管理的自定義 Hook
 * @returns {Object} 產品狀態和方法
 */
export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 取得所有產品
  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await productAPI.getAll();
      setProducts(response.data.products || []);
      
      return { success: true };
    } catch (err) {
      console.error('取得產品失敗：', err.response?.data?.message);
      setError(err.response?.data?.message || '取得產品失敗');
      return { success: false, error: err.response?.data?.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 創建產品
  const createProduct = useCallback(async (productData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const formattedData = {
        ...productData,
        origin_price: Number(productData.origin_price),
        price: Number(productData.price),
        is_enabled: productData.is_enabled ? 1 : 0,
        imagesUrl: productData.imagesUrl.filter((url) => url !== ''),
      };
      
      const response = await productAPI.create(formattedData);
      console.log('產品新增成功：', response.data);
      
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      console.error('新增失敗：', errorMsg);
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 更新產品
  const updateProduct = useCallback(async (id, productData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const formattedData = {
        ...productData,
        origin_price: Number(productData.origin_price),
        price: Number(productData.price),
        is_enabled: productData.is_enabled ? 1 : 0,
        imagesUrl: productData.imagesUrl.filter((url) => url !== ''),
      };
      
      const response = await productAPI.update(id, formattedData);
      console.log('產品更新成功：', response.data);
      
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      console.error('更新失敗：', errorMsg);
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 刪除產品
  const deleteProduct = useCallback(async (id) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await productAPI.delete(id);
      console.log('產品刪除成功：', response.data);
      
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      console.error('刪除失敗：', errorMsg);
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    products,
    isLoading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};
