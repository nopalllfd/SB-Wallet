import { useState } from 'react';
import { Icon } from './Icon';
import { Input } from './Input';

export const Field = ({ iconAlt, iconSrc, eyelashIconCloseSrc, eyelashIconOpenSrc, eyelashIconAlt, className, onChange, isPassword = false, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => {
    console.log('click');
    console.log(showPassword);
    setShowPassword(!showPassword);
  };

  const inputType = isPassword ? (showPassword ? 'text' : 'password') : props.type;
  console.log(inputType);
  return (
    <>
      <div className={`field flex border-gray-400 border gap-3 px-3 py-3 md:py-2 focus-within:border-blue-500  rounded-xl items-center ${className}`}>
        <Icon
          iconSrc={iconSrc}
          iconAlt={iconAlt}
        />
        <Input
          {...props}
          type={inputType}
          onChange={onChange}
        />

        {isPassword && (
          <Icon
            iconSrc={showPassword ? eyelashIconOpenSrc : eyelashIconCloseSrc}
            iconAlt={eyelashIconAlt}
            onClick={handleClick}
          />
        )}
      </div>
    </>
  );
};
