export function BaseTextArea({ className = '', ...props }) {
  return (
    <textarea
      className={`
        font-poppins font-thin text-base leading-normal
        p-[var(--cardPadding)] overflow-hidden
        outline-none border-0 bg-[#F2F2F8] rounded-lg
        truncate w-full
        ${className}
      `}
      {...props}
    />
  );
}
