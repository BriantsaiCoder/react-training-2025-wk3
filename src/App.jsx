import { useEffect, useState } from 'react';
import axios from 'axios';
import './assets/style.css';

// API 設定
const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function App() {
  // 表單資料狀態(儲存登入表單輸入)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // 登入狀態管理(控制顯示登入或產品頁）
  const [isAuth, setIsAuth] = useState(false);
  // 產品資料狀態
  const [products, setProducts] = useState([]);
  // 目前選中的產品
  const [tempProduct, setTempProduct] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData, // 保留原有屬性
      [name]: value, // 更新特定屬性
    }));
  };

  // 表單提交處理
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE}/admin/signin`, formData);
      const { token, expired } = response.data;
      // 設定 Cookie
      document.cookie = `hexToken=${token};expires=${new Date(expired)};`;

      // 設定 axios 預設標頭
      axios.defaults.headers.common['Authorization'] = token;
      // 登入成功，設定 isAuth 為 true
      setIsAuth(true);
      // 取得產品資料
      getData();
    } catch (error) {
      console.error('登入失敗:', error.response);
      setIsAuth(false);
      return;
    }
  };
  // 檢查登入狀態
  const checkLogin = async () => {
    try {
      // 驗證 Token 是否有效
      const res = await axios.post(`${API_BASE}/api/user/check`);
      const { success } = res.data;
      console.log('Token 驗證結果：', success);
      setIsAuth(true);
      // 取得產品資料
      getData();
    } catch (error) {
      console.error('Token 驗證失敗：', error.response?.data);
      setIsAuth(false);
    }
  };
  // 取得產品資料
  const getData = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/${API_PATH}/admin/products`);
      // console.log('產品資料：', response.data);
      setProducts(response.data.products);
    } catch (err) {
      console.error('取得產品失敗：', err.response?.data?.message);
    }
  };

  useEffect(() => {
    // 從 Cookie 取得 Token
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('hexToken='))
      ?.split('=')[1];

    // console.log('目前 Token:', token);

    if (token) {
      axios.defaults.headers.common.Authorization = token;
    }
    checkLogin();
  }, []);
  return (
    <>
      {!isAuth ? (
        // 登入表單畫面
        <div className='container login'>
          <div className='row justify-content-center'>
            <h1 className='h3 mb-3 font-weight-normal'>請先登入</h1>
            <div className='col-8'>
              <form id='form' className='form-signin' onSubmit={(e) => handleSubmit(e)}>
                <div className='form-floating mb-3'>
                  <input
                    type='email'
                    className='form-control'
                    name='username'
                    placeholder='name@example.com'
                    value={formData.username}
                    onChange={(e) => handleInputChange(e)}
                    required
                    autoFocus
                  />
                  <label htmlFor='username'>Email address</label>
                </div>
                <div className='form-floating'>
                  <input
                    type='password'
                    className='form-control'
                    name='password'
                    placeholder='Password'
                    value={formData.password}
                    onChange={(e) => handleInputChange(e)}
                    required
                  />
                  <label htmlFor='password'>Password</label>
                </div>
                <button className='btn btn-lg btn-primary w-100 mt-3' type='submit'>
                  登入
                </button>
              </form>
            </div>
          </div>
          <p className='mt-5 mb-3 text-muted'>&copy; 2024~∞ - 六角學院</p>
        </div>
      ) : (
        // 登入後的產品管理頁面 (同第一週)
        <div className='container'>
          <div className='row mt-5'>
            <div className='col-md-6'>
              {/* 功能按鈕 */}
              <button className='btn btn-danger mb-5' type='button' onClick={() => checkLogin()}>
                確認是否登入
              </button>
              <h2>產品列表</h2>
              <table className='table'>
                <thead>
                  <tr>
                    <th>產品名稱</th>
                    <th>原價</th>
                    <th>售價</th>
                    <th>是否啟用</th>
                    <th>查看細節</th>
                  </tr>
                </thead>
                <tbody>
                  {products && products.length > 0 ? (
                    products.map((item) => (
                      <tr key={item.id}>
                        <td>{item.title}</td>
                        <td>{item.origin_price}</td>
                        <td>{item.price}</td>
                        <td>{item.is_enabled ? '啟用' : '未啟用'}</td>
                        <td>
                          <button className='btn btn-primary' onClick={() => setTempProduct(item)}>
                            查看細節
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan='5'>尚無產品資料</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className='col-md-6'>
              <h2>單一產品細節</h2>
              {tempProduct ? (
                <div className='card mb-3'>
                  <img src={tempProduct.imageUrl} className='card-img-top primary-image' alt='主圖' />
                  <div className='card-body'>
                    <h5 className='card-title'>
                      {tempProduct.title}
                      <span className='badge bg-primary ms-2'>{tempProduct.category}</span>
                    </h5>
                    <p className='card-text'>商品描述：{tempProduct.description}</p>
                    <p className='card-text'>商品內容：{tempProduct.content}</p>
                    <div className='d-flex'>
                      <p className='card-text text-secondary'>
                        <del>{tempProduct.origin_price}</del>
                      </p>
                      元 / {tempProduct.price} 元
                    </div>
                    <h5 className='mt-3'>更多圖片：</h5>
                    <div className='d-flex flex-wrap'>
                      {tempProduct.imagesUrl?.map((url, index) => (
                        <img key={index} src={url} className='images' alt='副圖' />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p className='text-secondary'>請選擇一個商品查看</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default App;
