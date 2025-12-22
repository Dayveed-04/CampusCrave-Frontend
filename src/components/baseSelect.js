export function BaseSelect({ className = '', ...props }) {
  return (
    <select
      className={`
        font-poppins font-thin text-base leading-normal
        p-[var(--cardPadding)] overflow-hidden truncate w-full
        ${className}
      `}
      {...props}
    />
  );
}
