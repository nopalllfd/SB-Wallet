import { useState } from 'react';
import BrandHeader from './BrandHeader';
import { Button } from '../components/Button';
import { Link } from 'react-router';

function Header() {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const handleClick = () => {
    setIsBurgerOpen(!isBurgerOpen);
    console.log(isBurgerOpen);
  };

  return (
    <header className="bg-blue-500 px-10 py-5 flex items-center justify-between relative">
      <BrandHeader textColor={'text-white'} />
      <button
        onClick={handleClick}
        className="cursor-pointer"
      >
        <img
          src="../../src/assets/burger-bar.svg"
          alt="burger bar icon"
        />
      </button>
      {isBurgerOpen ? (
        <nav className="absolute w-screen left-0 -bottom-32 py-5  z-10 rounded-b-xl flex flex-col gap-2">
          <Button buttonTextColor="text-blue-500">
            <Link to="/auth/login">Sign In</Link>
          </Button>
          <Button buttonTextColor="text-blue-500">Sign Up</Button>
        </nav>
      ) : (
        ''
      )}
    </header>
  );
}

export default Header;
