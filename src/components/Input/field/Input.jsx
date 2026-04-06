/**
 * @typedef {Object.<string, any>} InputRestProps
 */

/**
 * @param {string} type
 * @param {function} onChange
 * @param {string} [className]
 * @param {InputRestProps} props
 * @returns {JSX.Element}
 */

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
