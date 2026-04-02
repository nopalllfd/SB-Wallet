export const Button = (props) => {
  const { children, buttonText = 'Submit', buttonColor = 'bg-white', buttonTextColor = 'text-black', border = 'none', className } = props;
  return <button className={`${buttonColor} ${buttonTextColor} ${border} py-2 px-2 w-full ${className}`}>{children ? children : buttonText}</button>;
};
