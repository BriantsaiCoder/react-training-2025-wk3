import PropTypes from 'prop-types';
import { memo } from 'react';

/**
 * 產品列表表格組件
 */
const ProductTable = memo(({ products, onEdit, onDelete }) => {
  return (
    <div className='container'>
      <h2>產品列表</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>分類</th>
            <th>產品名稱</th>
            <th>原價</th>
            <th>售價</th>
            <th>是否啟用</th>
            <th>編輯</th>
          </tr>
        </thead>
        <tbody>
          {products && products.length > 0 ? (
            products.map((item) => (
              <tr key={item.id}>
                <td>{item.category}</td>
                <td>{item.title}</td>
                <td>{item.origin_price}</td>
                <td>{item.price}</td>
                <td className={`${item.is_enabled ? 'text-success' : ''}`}>
                  {item.is_enabled ? '啟用' : '未啟用'}
                </td>
                <td>
                  <div className='btn-group'>
                    <button
                      type='button'
                      className='btn btn-outline-primary btn-sm'
                      onClick={() => onEdit(item)}
                      aria-label={`編輯 ${item.title}`}>
                      編輯
                    </button>
                    <button
                      type='button'
                      className='btn btn-outline-danger btn-sm'
                      onClick={() => onDelete(item)}
                      aria-label={`刪除 ${item.title}`}>
                      刪除
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='6'>尚無產品資料</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
});

ProductTable.displayName = 'ProductTable';

ProductTable.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      category: PropTypes.string,
      title: PropTypes.string,
      origin_price: PropTypes.number,
      price: PropTypes.number,
      is_enabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ProductTable;
