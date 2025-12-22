export function BaseFieldSet({ children, className = '', ...props }) {
  return (
    <fieldset
      className={`border-0 m-0 p-0 min-w-0 ${className}`}
      {...props}
    >
      {children}
    </fieldset>
  );
}
