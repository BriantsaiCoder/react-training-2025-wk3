import { useEffect, useCallback } from 'react';
import './assets/style.css';

// Hooks
import { useAuth } from './hooks/useAuth';
import { useProducts } from './hooks/useProducts';
import { useModal } from './hooks/useModal';

// Components
import LoginForm from './components/LoginForm';
import ProductTable from './components/ProductTable';
import ProductModal from './components/ProductModal';

// Constants
import { INITIAL_TEMPLATE_DATA, MODAL_TYPES } from './constants';

function App() {
  // 使用自定義 hooks
  const { isAuth, isLoading: authLoading, login } = useAuth();
  const { products, isLoading: productsLoading, fetchProducts, createProduct, updateProduct, deleteProduct } = useProducts();
  const { modalType, modalData, openModal, closeModal, updateModalData, isCreate, isEdit, isDelete } = useModal();

  // 登入成功後取得產品資料
  useEffect(() => {
    if (isAuth) {
      fetchProducts();
    }
  }, [isAuth, fetchProducts]);

  // 處理登入
  const handleLogin = useCallback(
    async (credentials) => {
      const result = await login(credentials);
      if (result.success) {
        await fetchProducts();
      } else {
        alert(result.error || '登入失敗');
      }
    },
    [login, fetchProducts]
  );

  // 處理圖片變更
  const handleImageChange = useCallback(
    (index, value) => {
      const newImages = [...modalData.imagesUrl];
      newImages[index] = value;

      // 填寫最後一個空輸入框時，自動新增空白輸入框
      if (value !== '' && index === newImages.length - 1 && newImages.length < 5) {
        newImages.push('');
      }

      // 清空輸入框時，移除最後的空白輸入框
      if (value === '' && newImages.length > 1 && newImages[newImages.length - 1] === '') {
        newImages.pop();
      }

      updateModalData({ imagesUrl: newImages });
    },
    [modalData.imagesUrl, updateModalData]
  );

  // 新增圖片
  const handleAddImage = useCallback(() => {
    updateModalData({ imagesUrl: [...modalData.imagesUrl, ''] });
  }, [modalData.imagesUrl, updateModalData]);

  // 移除圖片
  const handleRemoveImage = useCallback(() => {
    const newImages = [...modalData.imagesUrl];
    newImages.pop();
    updateModalData({ imagesUrl: newImages });
  }, [modalData.imagesUrl, updateModalData]);

  // Modal 輸入變更
  const handleModalInputChange = useCallback(
    (name, value) => {
      updateModalData({ [name]: value });
    },
    [updateModalData]
  );

  // 確認 Modal 操作
  const handleModalConfirm = useCallback(async () => {
    let result;

    if (isDelete) {
      result = await deleteProduct(modalData.id);
    } else if (isEdit) {
      result = await updateProduct(modalData.id, modalData);
    } else if (isCreate) {
      result = await createProduct(modalData);
    }

    if (result?.success) {
      closeModal();
      await fetchProducts();
    } else {
      alert(result?.error || '操作失敗');
    }
  }, [isDelete, isEdit, isCreate, modalData, deleteProduct, updateProduct, createProduct, closeModal, fetchProducts]);

  // 載入中狀態
  if (authLoading) {
    return (
      <div className='container login'>
        <div className='spinner-border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {!isAuth ? (
        <LoginForm onSubmit={handleLogin} isLoading={authLoading} />
      ) : (
        <>
          <div className='container'>
            <div className='text-end mt-4'>
              <button
                type='button'
                className='btn btn-primary'
                onClick={() => openModal(INITIAL_TEMPLATE_DATA, MODAL_TYPES.CREATE)}>
                建立新的產品
              </button>
            </div>
          </div>

          <ProductTable
            products={products}
            onEdit={(product) => openModal(product, MODAL_TYPES.EDIT)}
            onDelete={(product) => openModal(product, MODAL_TYPES.DELETE)}
          />

          {productsLoading && (
            <div className='text-center my-3'>
              <div className='spinner-border' role='status'>
                <span className='visually-hidden'>Loading...</span>
              </div>
            </div>
          )}
        </>
      )}

      {modalType && (
        <ProductModal
          modalType={modalType}
          productData={modalData}
          onInputChange={handleModalInputChange}
          onImageChange={handleImageChange}
          onAddImage={handleAddImage}
          onRemoveImage={handleRemoveImage}
          onConfirm={handleModalConfirm}
          onCancel={closeModal}
        />
      )}
    </>
  );
}

export default App;
