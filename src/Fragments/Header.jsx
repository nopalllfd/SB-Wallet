import { useState } from 'react';
import BrandHeader from './BrandHeader';
import { Button } from '../components/Button';
import { Link } from 'react-router';
import { NavMenuItem } from '../components/NavMenuItems';
import ProfileHeader from './ProfileHeader';

function Header(props) {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const handleClick = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };
  const isDashboard = props.location === 'dashboard';
  console.log(props.locationDetail);

  const navItems = [
    {
      name: 'Dashboard',
      path: 'dashboard',
    },
    {
      name: 'Transfer',
      path: 'transfer',
    },
    {
      name: 'Top up',
      path: 'top-up',
    },
    {
      name: 'Transaction',
      path: 'transaction',
    },
    {
      name: 'Profile',
      path: 'profile',
    },
  ];

  return (
    <header className="bg-blue-700 z-20 px-3 md:px-10 py-4 md:py-3 fixed w-full flex items-center justify-between border-b-black">
      <BrandHeader
        location={props.location}
        textColor="text-white"
      />
      {isDashboard && (props.locationDetail ? <ProfileHeader /> : <ProfileHeader />)}
      {!isDashboard && (
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
      )}

      <div className="burger-bar md:hidden">
        <button
          onClick={handleClick}
          className="cursor-pointer md:hidden"
        >
          <img
            src="/assets/burger-bar.svg"
            alt="burger bar icon"
          />
        </button>
      </div>
      {isBurgerOpen ? (
        !isDashboard ? (
          <nav className="absolute w-screen left-0 -bottom-38 drop-shadow-2xl py-5  z-10 rounded-b-xl flex flex-col bg-white md:hidden">
            <NavMenuItem to="/auth/login">Sign In</NavMenuItem>
            <NavMenuItem to="/auth/register">Sign Up</NavMenuItem>
          </nav>
        ) : (
          <nav className="absolute w-screen left-0 top-21 drop-shadow-2xl py-5  z-20 rounded-b-xl flex flex-col bg-white md:hidden">
            {navItems.map((item, idx) => (
              <NavMenuItem
                key={idx}
                to={`/${item.path}`}
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
