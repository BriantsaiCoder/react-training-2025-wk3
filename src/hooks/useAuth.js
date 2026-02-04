import { useState, useCallback, useEffect } from 'react';
import { authAPI, setAuthToken } from '../services/api';
import { getCookie, setCookie } from '../utils/cookie';

/**
 * 認證相關的自定義 Hook
 * @returns {Object} 認證狀態和方法
 */
export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 檢查登入狀態
  const checkLogin = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const res = await authAPI.checkAuth();
      const { success } = res.data;
      
      console.log('Token 驗證結果：', success);
      setIsAuth(success);
      
      return success;
    } catch (err) {
      console.error('Token 驗證失敗：', err.response?.data);
      setIsAuth(false);
      setError(err.response?.data?.message || '驗證失敗');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 登入
  const login = useCallback(async (credentials) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await authAPI.signin(credentials);
      const { token, expired } = response.data;
      
      // 在 useEffect 外使用 cookie 和 axios 設定
      setCookie('hexToken', token, expired);
      setAuthToken(token);
      
      setIsAuth(true);
      return { success: true };
    } catch (err) {
      console.error('登入失敗:', err.response);
      setIsAuth(false);
      setError(err.response?.data?.message || '登入失敗');
      return { success: false, error: err.response?.data?.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 登出
  const logout = useCallback(() => {
    setAuthToken(null);
    setCookie('hexToken', '', new Date(0));
    setIsAuth(false);
  }, []);

  // 初始化：從 Cookie 取得 Token
  useEffect(() => {
    const token = getCookie('hexToken');
    
    if (token) {
      setAuthToken(token);
      checkLogin();
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 只在組件掛載時執行一次

  return {
    isAuth,
    isLoading,
    error,
    login,
    logout,
    checkLogin,
  };
};
