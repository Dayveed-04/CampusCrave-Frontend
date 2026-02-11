export function RadioButton({ selected, onClick, className = '' }) {
  return (
    <div
      onClick={onClick}
      className={`w-5 h-5 rounded-full border-2 border-[#292D328F] flex items-center justify-center cursor-pointer ${className}`}
    >
      {selected && (
        <div className="w-5 h-5 rounded-full bg-[#292D328F]"></div>
      )}
    </div>
  );
}