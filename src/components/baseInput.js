"use client";

export function BaseInput({ 
  icon, 
  type = "text", 
  placeholder = "", 
  className = "", 
  ...props 
}) {
  return (
    <div className="relative w-full">
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          {icon}
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`
          w-full py-3 pr-4 text-sm placeholder:text-xs
          bg-white rounded-lg
          focus:outline-none focus:ring-2 focus:ring-gray-300
          ${icon ? "pl-10" : "pl-4"}
          ${className}
        `}
        {...props}
      />
    </div>
  );
}
