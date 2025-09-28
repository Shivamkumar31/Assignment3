// src/components/ui/FormInput.jsx
import React from 'react';

/**
 * Reusable Form Input component.
 * @param {string} id - Unique ID for input and label association.
 * @param {string} label - Text for the input label.
 * @param {string} error - Validation error message to display.
 * @param {string} type - Standard HTML input type (e.g., 'text', 'email', 'password').
 */
const FormInput = ({
  id,
  label,
  error,
  type = 'text',
  className = '',
  ...props
}) => {
  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={`
          block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm
          focus:ring-indigo-500 focus:border-indigo-500
          ${error ? 'border-red-500' : 'border-gray-300'}
        `}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;