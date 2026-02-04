import { useState, useRef, useEffect, useCallback } from 'react';
import * as bootstrap from 'bootstrap';
import { MODAL_TYPES, INITIAL_TEMPLATE_DATA } from '../constants';

/**
 * Bootstrap Modal 管理的自定義 Hook
 * @returns {Object} Modal 狀態和方法
 */
export const useModal = () => {
  const modalRef = useRef(null);
  const modalInstanceRef = useRef(null);
  const [modalType, setModalType] = useState('');
  const [modalData, setModalData] = useState(INITIAL_TEMPLATE_DATA);

  // 初始化 Modal
  useEffect(() => {
    const modalElement = document.querySelector('#productModal');
    
    if (modalElement) {
      modalInstanceRef.current = new bootstrap.Modal(modalElement, {
        keyboard: false,
      });

      // Modal 關閉時移除焦點
      const handleHide = () => {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      };

      modalElement.addEventListener('hide.bs.modal', handleHide);

      return () => {
        modalElement.removeEventListener('hide.bs.modal', handleHide);
        if (modalInstanceRef.current) {
          modalInstanceRef.current.dispose();
        }
      };
    }
  }, []);

  // 開啟 Modal
  const openModal = useCallback((data, type) => {
    setModalData(data);
    setModalType(type);
    
    if (modalInstanceRef.current) {
      modalInstanceRef.current.show();
    }
  }, []);

  // 關閉 Modal
  const closeModal = useCallback(() => {
    if (modalInstanceRef.current) {
      modalInstanceRef.current.hide();
    }
    // 重置 modal 資料
    setModalData(INITIAL_TEMPLATE_DATA);
    setModalType('');
  }, []);

  // 更新 Modal 資料
  const updateModalData = useCallback((updates) => {
    setModalData((prev) => ({ ...prev, ...updates }));
  }, []);

  return {
    modalRef,
    modalType,
    modalData,
    openModal,
    closeModal,
    updateModalData,
    isCreate: modalType === MODAL_TYPES.CREATE,
    isEdit: modalType === MODAL_TYPES.EDIT,
    isDelete: modalType === MODAL_TYPES.DELETE,
  };
};
