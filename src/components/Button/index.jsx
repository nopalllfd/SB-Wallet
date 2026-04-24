/**
 * @param {object} props
 * @param {React.ReactNode} [props.children]
 * @param {string} [props.buttonText='submit']
 * @param {string} [props.buttonColor='bg-white']
 * @param {string} [props.buttonTextColor='text-black']
 * @param {string} [props.border='none']
 * @param {string} [props.className='']
 * @param {function} [props.onClick]
 * @returns {JSX.Element}
 */

export const Button = (props) => {
  const { children, buttonText = 'Submit', buttonColor = 'bg-white', buttonTextColor = 'text-black', border = 'none', className = '' } = props;
  return (
    <button
      onClick={props.onClick}
      className={`${buttonColor} ${buttonTextColor} ${border} py-3 md:py-2 px-2 w-full cursor-pointer ${className}`}
    >
      {children ? children : buttonText}
    </button>
  );
};
