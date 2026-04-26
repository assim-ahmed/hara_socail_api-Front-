import React from 'react';

const Input = ({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  error, 
  placeholder,
  required = false,
  ...props 
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-white/80 mb-2">
          {label}
          {required && <span className="text-red-400 mr-1">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl
          text-white placeholder-white/50
          focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent
          transition-all duration-200
          ${error ? 'border-red-400 focus:ring-red-400' : 'border-white/20 focus:border-primary-400'}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-300">{error}</p>}
    </div>
  );
};

export default Input;