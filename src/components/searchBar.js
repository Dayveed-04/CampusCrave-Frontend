export function SearchBar({ value, onChange, className = '', ...props }) {
  return (
    <div className={`flex items-center  rounded-2xl border border-gray-300 px-3 py-2 w-full max-w-md bg-[#FFFCE2] ${className}`}>
      {/* Search Icon */}
      <svg
        className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0 bg-[#FFFCE2]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>

      {/* Search Input */}
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder="Search for food, vendors"
        className="w-full outline-none text-gray-700 placeholder-gray-400 "
        {...props}
      />
    </div>
  );
}
