import PropTypes from 'prop-types';
import { memo, useCallback } from 'react';
import { MODAL_TYPES } from '../constants';

/**
 * 產品 Modal 組件
 */
const ProductModal = memo(
  ({ modalType, productData, onInputChange, onImageChange, onAddImage, onRemoveImage, onConfirm, onCancel }) => {
    const isDelete = modalType === MODAL_TYPES.DELETE;

    const handleInputChange = useCallback(
      (e) => {
        const { name, value, type, checked } = e.target;
        onInputChange(name, type === 'checkbox' ? checked : value);
      },
      [onInputChange]
    );

    return (
      <div
        className='modal fade'
        id='productModal'
        tabIndex='-1'
        aria-labelledby='productModalLabel'
        aria-hidden='true'>
        <div className='modal-dialog modal-xl'>
          <div className='modal-content border-0'>
            <div className={`modal-header bg-${isDelete ? 'danger' : 'dark'} text-white`}>
              <h5 id='productModalLabel' className='modal-title'>
                <span>
                  {modalType === MODAL_TYPES.CREATE
                    ? '新增'
                    : modalType === MODAL_TYPES.EDIT
                      ? '編輯'
                      : '刪除'}
                  產品
                </span>
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              {isDelete ? (
                <p className='fs-4'>
                  確定要刪除
                  <span className='text-danger'>{productData.title}</span>嗎？
                </p>
              ) : (
                <div className='row'>
                  <div className='col-sm-4'>
                    {/* 主圖片 */}
                    <div className='mb-2'>
                      <div className='mb-3'>
                        <label htmlFor='imageUrl' className='form-label'>
                          輸入圖片網址
                        </label>
                        <input
                          type='text'
                          id='imageUrl'
                          name='imageUrl'
                          className='form-control'
                          placeholder='請輸入圖片連結'
                          value={productData.imageUrl}
                          onChange={handleInputChange}
                        />
                      </div>
                      {productData.imageUrl && (
                        <img className='img-fluid' src={productData.imageUrl} alt='主圖' />
                      )}
                    </div>

                    {/* 副圖片 */}
                    <div>
                      {productData.imagesUrl?.map((image, index) => (
                        <div key={index}>
                          <label htmlFor={`imageUrl-${index}`} className='form-label'>
                            輸入圖片網址
                          </label>
                          <input
                            type='text'
                            id={`imageUrl-${index}`}
                            className='form-control'
                            placeholder={`圖片網址${index + 1}`}
                            value={image}
                            onChange={(e) => onImageChange(index, e.target.value)}
                          />
                          {image && <img className='img-fluid' src={image} alt={`副圖${index + 1}`} />}
                        </div>
                      ))}
                      {productData.imagesUrl?.length < 5 &&
                        productData.imagesUrl[productData.imagesUrl.length - 1] !== '' && (
                          <button
                            className='btn btn-outline-primary btn-sm d-block w-100 my-2'
                            onClick={onAddImage}
                            type='button'>
                            新增圖片
                          </button>
                        )}
                      {productData.imagesUrl?.length >= 1 && (
                        <button
                          className='btn btn-outline-danger btn-sm d-block w-100'
                          onClick={onRemoveImage}
                          type='button'>
                          刪除圖片
                        </button>
                      )}
                    </div>
                  </div>

                  <div className='col-sm-8'>
                    {/* 產品資訊表單 */}
                    <div className='mb-3'>
                      <label htmlFor='title' className='form-label'>
                        標題
                      </label>
                      <input
                        name='title'
                        id='title'
                        type='text'
                        className='form-control'
                        placeholder='請輸入標題'
                        value={productData.title}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className='row'>
                      <div className='mb-3 col-md-6'>
                        <label htmlFor='category' className='form-label'>
                          分類
                        </label>
                        <input
                          name='category'
                          id='category'
                          type='text'
                          className='form-control'
                          placeholder='請輸入分類'
                          value={productData.category}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className='mb-3 col-md-6'>
                        <label htmlFor='unit' className='form-label'>
                          單位
                        </label>
                        <input
                          name='unit'
                          id='unit'
                          type='text'
                          className='form-control'
                          placeholder='請輸入單位'
                          value={productData.unit}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className='row'>
                      <div className='mb-3 col-md-6'>
                        <label htmlFor='origin_price' className='form-label'>
                          原價
                        </label>
                        <input
                          name='origin_price'
                          id='origin_price'
                          type='number'
                          min='0'
                          className='form-control'
                          placeholder='請輸入原價'
                          value={productData.origin_price}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className='mb-3 col-md-6'>
                        <label htmlFor='price' className='form-label'>
                          售價
                        </label>
                        <input
                          name='price'
                          id='price'
                          type='number'
                          min='0'
                          className='form-control'
                          placeholder='請輸入售價'
                          value={productData.price}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <hr />

                    <div className='mb-3'>
                      <label htmlFor='description' className='form-label'>
                        產品描述
                      </label>
                      <textarea
                        name='description'
                        id='description'
                        className='form-control'
                        placeholder='請輸入產品描述'
                        value={productData.description}
                        onChange={handleInputChange}></textarea>
                    </div>
                    <div className='mb-3'>
                      <label htmlFor='content' className='form-label'>
                        說明內容
                      </label>
                      <textarea
                        name='content'
                        id='content'
                        className='form-control'
                        placeholder='請輸入說明內容'
                        value={productData.content}
                        onChange={handleInputChange}></textarea>
                    </div>
                    <div className='mb-3'>
                      <div className='form-check'>
                        <input
                          name='is_enabled'
                          id='is_enabled'
                          className='form-check-input'
                          type='checkbox'
                          checked={productData.is_enabled}
                          onChange={handleInputChange}
                        />
                        <label className='form-check-label' htmlFor='is_enabled'>
                          是否啟用
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className='modal-footer'>
              {isDelete ? (
                <button type='button' className='btn btn-danger' onClick={onConfirm}>
                  刪除
                </button>
              ) : (
                <>
                  <button
                    type='button'
                    className='btn btn-outline-secondary'
                    data-bs-dismiss='modal'
                    onClick={onCancel}>
                    取消
                  </button>
                  <button type='button' className='btn btn-primary' onClick={onConfirm}>
                    確認
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ProductModal.displayName = 'ProductModal';

ProductModal.propTypes = {
  modalType: PropTypes.oneOf([MODAL_TYPES.CREATE, MODAL_TYPES.EDIT, MODAL_TYPES.DELETE]).isRequired,
  productData: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    category: PropTypes.string,
    origin_price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    unit: PropTypes.string,
    description: PropTypes.string,
    content: PropTypes.string,
    is_enabled: PropTypes.bool,
    imageUrl: PropTypes.string,
    imagesUrl: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onInputChange: PropTypes.func.isRequired,
  onImageChange: PropTypes.func.isRequired,
  onAddImage: PropTypes.func.isRequired,
  onRemoveImage: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ProductModal;
