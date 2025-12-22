import React from 'react';

export function BaseInput({ 
  icon: Icon,      // React component for icon (optional)
  placeholder = '', 
  className = '', 
  ...props 
}) {
  return (
    <div className={`flex items-center bg-[#F2F2F8] rounded-md border border-gray-300 px-3 py-2 w-full ${className}`}>
      {/* Left Icon (optional) */}
      {Icon && <Icon className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" aria-hidden="true" />}
      
      {/* Input Field */}
      <input
        className="flex-grow font-poppins font-thin text-base leading-normal bg-transparent outline-none truncate"
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}
