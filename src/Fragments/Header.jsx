import { useState } from 'react';
import BrandHeader from './BrandHeader';
import { Button } from '../components/Button';
import { Link } from 'react-router';
import ProfileHeader from './ProfileHeader';
import { NavMenuItem } from '../components/NavMenuItems';

function Header(props) {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const handleClick = () => {
    setIsBurgerOpen(!isBurgerOpen);
    console.log(isBurgerOpen);
  };

  const navItems = [
    {
      name: 'Dashboard',
    },
    {
      name: 'Transfer',
    },
    {
      name: 'Top up',
      path: 'top-up',
    },
    {
      name: 'Profile',
    },
  ];

  return (
    <header className="bg-blue-700 px-6 md:px-10 py-5 flex items-center justify-between relative border-b-black">
      {props.location !== 'dashboard' ? <BrandHeader textColor={'text-white'} /> : <ProfileHeader />}
      <nav className="hidden md:flex items-center gap-3">
        <Button
          buttonColor="bg-white"
          buttonTextColor="text-blue-500 font-semibold"
          className="rounded-xl   w-auto! px-6!"
        >
          <Link to="/auth/login">Sign In</Link>
        </Button>
        <Button
          buttonColor="bg-transparent"
          buttonTextColor="text-white font-semibold"
          border="border border-white"
          className="rounded-xl w-auto! px-6!"
        >
          <Link to="/auth/register">Sign Up</Link>
        </Button>
      </nav>
      <button
        onClick={handleClick}
        className="cursor-pointer md:hidden"
      >
        <img
          src="/assets/burger-bar.svg"
          alt="burger bar icon"
        />
      </button>
      {isBurgerOpen ? (
        props.location !== 'dashboard' ? (
          <nav className="absolute w-screen left-0 -bottom-38 drop-shadow-2xl py-5  z-10 rounded-b-xl flex flex-col bg-white md:hidden">
            <NavMenuItem to="/auth/login">Sign In</NavMenuItem>
            <NavMenuItem to="/auth/register">Sign Up</NavMenuItem>
          </nav>
        ) : (
          <nav className="absolute w-screen left-0 top-21 drop-shadow-2xl py-5  z-10 rounded-b-xl flex flex-col bg-white md:hidden">
            {navItems.map((item, idx) => (
              <NavMenuItem
                key={idx}
                to={`/${item.path || item.name}`}
              >
                {item.name}
              </NavMenuItem>
            ))}
          </nav>
        )
      ) : (
        ''
      )}
    </header>
  );
}

export default Header;
