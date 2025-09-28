// src/components/ui/Button.jsx
import React from 'react';
import { FiLoader } from 'react-icons/fi';

const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2";

const variantStyles = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
  secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  outline: "bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500",
  text: "bg-transparent text-indigo-600 hover:bg-gray-100",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

/**
 * Reusable Button component.
 * @param {string} variant - 'primary' | 'secondary' | 'danger' | 'outline' | 'text'
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {boolean} isLoading - Displays a loading spinner and disables the button.
 * @param {boolean} disabled - Standard disabled state.
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const isDisabled = disabled || isLoading;

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className} ${
        isDisabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={isDisabled}
      {...props}
    >
      {isLoading ? (
        <FiLoader className="animate-spin mr-2 h-5 w-5" />
      ) : null}
      {children}
    </button>
  );
};

export default Button;