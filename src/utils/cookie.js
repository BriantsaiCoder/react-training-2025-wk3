// Cookie 管理工具函數

/**
 * 設定 Cookie
 * @param {string} name - Cookie 名稱
 * @param {string} value - Cookie 值
 * @param {Date|string} expires - 過期時間
 */
export const setCookie = (name, value, expires) => {
  const expiresDate = expires instanceof Date ? expires : new Date(expires);
  document.cookie = `${name}=${value};expires=${expiresDate.toUTCString()};path=/`;
};

/**
 * 取得 Cookie
 * @param {string} name - Cookie 名稱
 * @returns {string|null} Cookie 值或 null
 */
export const getCookie = (name) => {
  const value = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
    ?.split('=')[1];
  
  return value || null;
};

/**
 * 刪除 Cookie
 * @param {string} name - Cookie 名稱
 */
export const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
};
