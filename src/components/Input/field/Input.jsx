export const Input = ({ type, onChange, className = '', ...props }) => {
  return (
    <input
      {...props}
      type={type}
      className={`outline-none flex-1 w-full min-w-0 ${className}`}
      onChange={onChange}
    />
  );
};
