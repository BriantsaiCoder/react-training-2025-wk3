import { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * 登入表單組件
 */
const LoginForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className='container login'>
      <div className='row justify-content-center'>
        <h1 className='h3 mb-3 font-weight-normal'>請先登入</h1>
        <div className='col-8'>
          <form id='form' className='form-signin' onSubmit={handleSubmit}>
            <div className='form-floating mb-3'>
              <input
                type='email'
                className='form-control'
                name='username'
                id='username'
                placeholder='name@example.com'
                value={formData.username}
                onChange={handleInputChange}
                required
                autoFocus
                disabled={isLoading}
              />
              <label htmlFor='username'>Email address</label>
            </div>
            <div className='form-floating'>
              <input
                type='password'
                className='form-control'
                name='password'
                id='password'
                placeholder='Password'
                value={formData.password}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
              <label htmlFor='password'>Password</label>
            </div>
            <button
              className='btn btn-lg btn-primary w-100 mt-3'
              type='submit'
              disabled={isLoading}>
              {isLoading ? '登入中...' : '登入'}
            </button>
          </form>
        </div>
      </div>
      <p className='mt-5 mb-3 text-muted'>&copy; 2024~∞ - 六角學院</p>
    </div>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

LoginForm.defaultProps = {
  isLoading: false,
};

export default LoginForm;
