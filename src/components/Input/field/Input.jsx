/**
 * @typedef {Object.<string, any>} InputRestProps
 */

import { forwardRef } from 'react';

/**
 * @param {string} type
 * @param {function} onChange
 * @param {string} [className]
 * @param {InputRestProps} props
 * @returns {JSX.Element}
 */

export const Input = forwardRef(({ type, onChange, className = '', ...props }, ref) => {
  return <input {...props} ref={ref} type={type} className={`outline-none flex-1 w-full min-w-0 ${className}`} onChange={onChange} />;
});
