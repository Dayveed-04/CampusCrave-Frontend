import React from 'react';

export default function Button({
  width,            
  backgroundColor,  
  color,            
  children,
  className = '',
  ...props
}) {

  const style = {
    backgroundColor: backgroundColor && !backgroundColor.startsWith('bg-') ? backgroundColor : undefined,
    color: color && !color.startsWith('text-') ? color : undefined,
    width: width && !width.startsWith('w-') ? width : undefined,
  };

  const bgClass = backgroundColor && backgroundColor.startsWith('bg-') ? backgroundColor : 'bg-black'; 
  const textClass = color && color.startsWith('text-') ? color : 'text-white';

  const widthClass = width && width.startsWith('w-') ? width : 'w-full';

  return (
    <button
      className={`text-center rounded-xl px-3 py-3.5 text-base cursor-pointer font-medium hover:bg-gray-900 transition duration-300 ${bgClass} ${textClass} ${widthClass} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
}
