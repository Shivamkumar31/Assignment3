// src/components/ui/Modal.jsx
import React, { useRef, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

/**
 * Reusable Modal component.
 * @param {boolean} isOpen - Controls the visibility of the modal.
 * @param {function} onClose - Function to call when the modal should close.
 * @param {string} title - Title displayed in the modal header.
 * @param {boolean} closeOnBackdropClick - Allows clicking the backdrop to close.
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  closeOnBackdropClick = true,
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (closeOnBackdropClick && e.target === modalRef.current) {
      onClose();
    }
  };

  return (
    // Backdrop
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 transition-opacity duration-300"
      onClick={handleBackdropClick}
    >
      {/* Modal Content Container */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 transform transition-all duration-300 scale-100 opacity-100">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;