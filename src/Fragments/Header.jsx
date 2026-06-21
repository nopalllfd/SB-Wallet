import { useState, useEffect } from 'react';
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
  const [isScrolled, setIsScrolled] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isDashboard = props.location === 'dashboard';

  const handleClick = () => setIsBurgerOpen(!isBurgerOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      dispatch(logout());
      toast.success('Logout berhasil');
      setIsBurgerOpen(false);
      navigate('/auth/login');
    } catch {
      toast.error('Logout gagal');
    }
  };

  const navItems = [
    { name: 'Dashboard', path: 'dashboard' },
    { name: 'Transfer', path: 'transfer' },
    { name: 'Top up', path: 'topup' },
    { name: 'Riwayat', path: 'history' },
    { name: 'Profile', path: 'profile' },
  ];

  return (
    <header
      className={`fixed z-20 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
  left-1/2 -translate-x-1/2
  ${
    isScrolled
      ? `
        top-3
        w-[calc(100%-2rem)]
        md:w-[calc(100%-5rem)]
        rounded-2xl
        bg-blue-700/30
        backdrop-blur-3xl
        shadow-[0_20px_50px_rgba(0,0,0,0.35)]
        border border-blue-400/30
      `
      : `
        top-0
        w-full
        rounded-none
        bg-blue-700
        border-transparent
      `
  }`}
    >
      {/* INNER WRAPPER - IMPORTANT: NO flex-1 ANYWHERE */}
      <div className="flex items-center justify-between w-full px-3 md:px-10 py-4 md:py-3">
        {/* LEFT */}
        <div className="flex-shrink-0">
          <BrandHeader location={props.location} textColor="text-white" />
        </div>

        {/* MIDDLE (ONLY DASHBOARD) */}
        {isDashboard && (
          <div className="flex items-center justify-end flex-1">
            <div className={`transition-all duration-300 ${isScrolled ? 'scale-95 opacity-90' : 'scale-100 opacity-100'}`}>
              <ProfileHeader />
            </div>
          </div>
        )}

        {/* RIGHT AUTH (IMPORTANT FIX AREA) */}
        {!isDashboard && (
          <div
            className={`flex items-center gap-2 flex-shrink-0 transition-all duration-300
            ${isScrolled ? 'rounded-xl bg-white/5 px-2 py-1' : ''}`}
          >
            <Link to="/auth/login">
              <Button
                buttonColor="bg-white"
                buttonTextColor="text-blue-600 font-semibold"
                className={`rounded-xl transition-all duration-300
                  ${isScrolled ? '!px-5 !py-2 text-xs' : '!px-6 !py-2 text-base'}
                `}
              >
                Sign In
              </Button>
            </Link>

            <Link to="/auth/register">
              <Button
                buttonColor="bg-transparent"
                buttonTextColor="text-white font-semibold"
                border="border border-white"
                className={`rounded-xl transition-all duration-300
                  ${isScrolled ? '!px-5 !py-2 text-xs' : '!px-6 !py-2 text-base'}
                `}
              >
                Sign Up
              </Button>
            </Link>
          </div>
        )}

        {/* BURGER */}
        <div className="md:hidden ml-2 flex-shrink-0">
          <button onClick={handleClick} className="cursor-pointer">
            <img src="/assets/burger-bar.svg" alt="burger bar icon" />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isBurgerOpen &&
        (!isDashboard ? (
          <nav className="absolute w-screen left-0 top-full drop-shadow-2xl py-5 z-20 rounded-b-xl flex flex-col bg-white md:hidden">
            <NavMenuItem to="/auth/login">Sign In</NavMenuItem>
            <NavMenuItem to="/auth/register">Sign Up</NavMenuItem>
          </nav>
        ) : (
          <nav className="absolute w-screen left-0 top-full drop-shadow-2xl py-5 z-20 rounded-b-xl flex flex-col bg-white md:hidden">
            {navItems.map((item, idx) => (
              <NavMenuItem key={idx} to={`/${item.path}`}>
                {item.name}
              </NavMenuItem>
            ))}
            <div className="px-3 pt-2">
              <Button onClick={handleLogout} buttonTextColor="text-red-600">
                Logout
              </Button>
            </div>
          </nav>
        ))}
    </header>
  );
}

export default Header;
