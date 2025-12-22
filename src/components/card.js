import React from 'react';

export default function Card({ children, className = '', width }) {
  const style = {
    backgroundColor: '#FFFCE2', 
  };


  if (width && !width.startsWith('w-')) {
    style.width = width;
  }

  return (
    <div
      className={` p-4  ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
