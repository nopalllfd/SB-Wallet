import { useState } from 'react';
import BrandHeader from './BrandHeader';
import { Button } from '../components/Button';
import { Link, useNavigate } from 'react-router';
import { NavMenuItem } from '../components/NavMenuItems';
import ProfileHeader from './ProfileHeader';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { logout, logoutUser } from '../redux/slice/authSlice';

function Header(props) {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };
  const isDashboard = props.location === 'dashboard';

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      dispatch(logout);
      toast.success('Logout berhasil');
      setIsBurgerOpen(false);
      navigate('/auth/login');
    } catch {
      toast.error('Logout gagal');
    }
  };

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
      path: 'topup',
    },
    {
      name: 'Riwayat',
      path: 'history',
    },
    {
      name: 'Profile',
      path: 'profile',
    },
  ];

  return (
    <header className="bg-blue-700 z-20 px-3 md:px-10 py-4 md:py-3 fixed w-full flex items-center justify-between border-b-black">
      <BrandHeader location={props.location} textColor="text-white" />
      {isDashboard && (props.locationDetail ? <ProfileHeader /> : <ProfileHeader />)}
      {!isDashboard && (
        <nav className="hidden md:flex items-center gap-3">
          <Link to="/auth/login">
            <Button buttonColor="bg-white" buttonTextColor="text-blue-500 font-semibold" className="rounded-xl !w-auto !px-6">
              Sign In
            </Button>
          </Link>

          <Link to="/auth/register">
            <Button
              buttonColor="bg-transparent"
              buttonTextColor="text-white font-semibold"
              border="border border-white"
              className="rounded-xl !w-auto !px-6"
            >
              Sign Up
            </Button>
          </Link>
        </nav>
      )}

      <div className="burger-bar md:hidden">
        <button onClick={handleClick} className="cursor-pointer md:hidden">
          <img src="/assets/burger-bar.svg" alt="burger bar icon" />
        </button>
      </div>
      {isBurgerOpen ? (
        !isDashboard ? (
          <nav className="absolute w-screen left-0 -bottom-38 drop-shadow-2xl py-5  z-10 rounded-b-xl flex flex-col bg-white md:hidden">
            <NavMenuItem to="/auth/login">Sign In</NavMenuItem>
            <NavMenuItem to="/auth/register">Sign Up</NavMenuItem>
          </nav>
        ) : (
          <nav className="absolute w-screen left-0 top-19 drop-shadow-2xl py-5  z-20 rounded-b-xl flex flex-col bg-white md:hidden">
            {navItems.map((item, idx) => (
              <NavMenuItem key={idx} to={`/${item.path}`}>
                {item.name}
              </NavMenuItem>
            ))}
            <div className="px-3 pt-2">
              <Button onClick={handleLogout} buttonTextColor="text-red-600 pb-5 text-md">
                Logout
              </Button>
            </div>
          </nav>
        )
      ) : (
        ''
      )}
    </header>
  );
}

export default Header;
