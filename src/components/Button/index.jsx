export const Button = (props) => {
  const { children, buttonText = 'Submit', buttonColor = 'bg-white', buttonTextColor = 'text-black', border = 'none', className = '' } = props;
  return <button className={`${className} ${buttonColor} ${buttonTextColor} ${border} py-3 md:py-2 px-2 w-full`}>{children ? children : buttonText}</button>;
};
