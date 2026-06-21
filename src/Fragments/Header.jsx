import { useState, useEffect } from 'react';
import BrandHeader from './BrandHeader';
import { Button } from '../components/Button';
import { Link, useNavigate, useLocation } from 'react-router';
import { NavMenuItem } from '../components/NavMenuItems';
import ProfileHeader from './ProfileHeader';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { logout, logoutUser } from '../redux/slice/authSlice';

function Header() {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // =========================
  // CLEAN PATH NORMALIZATION
  // =========================
  const cleanPath = location.pathname.split('?')[0].replace(/\/+$/, '');

  // =========================
  // DASHBOARD AREA ROUTES
  // =========================
  const dashboardRoutes = ['/dashboard', '/transfer', '/topup', '/history', '/profile', '/profile/change/pin', '/profile/change/password'];

  const isDashboardArea = dashboardRoutes.includes(cleanPath);

  // =========================
  // ONLY TRUE DASHBOARD PAGE
  // (ini FIX UTAMA)
  // =========================
  const isRealDashboardPage = cleanPath === '/dashboard';

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
    <header className="fixed z-20 top-0 left-0 w-full flex justify-center">
      {/* TOP BAR */}
      <div
        className={`
          flex items-center justify-between
          px-3 md:px-10 py-4 md:py-3
          transition-all duration-300 ease-out
          w-full
          ${
            isScrolled
              ? `
                bg-blue-700/30
                backdrop-blur-3xl
                shadow-[0_20px_50px_rgba(0,0,0,0.35)]
                border border-blue-400/30
                max-w-[92%]
                mt-3
                rounded-2xl
              `
              : `
                bg-blue-700
                w-full
                mt-0
                rounded-none
              `
          }
        `}
      >
        {/* LEFT */}
        <div className="flex-shrink-0">
          <BrandHeader textColor="text-white" />
        </div>

        {/* PROFILE ONLY ON REAL DASHBOARD PAGE */}
        {isRealDashboardPage && (
          <div className="flex flex-1 justify-end">
            <ProfileHeader />
          </div>
        )}

        {/* AUTH BUTTONS */}
        {!isDashboardArea && (
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <Link to="/auth/login">
              <Button className="rounded-xl !px-6 !py-2">Sign In</Button>
            </Link>

            <Link to="/auth/register">
              <Button buttonColor="bg-transparent" buttonTextColor="text-white" border="border border-white" className="rounded-xl !px-6 !py-2">
                Sign Up
              </Button>
            </Link>
          </div>
        )}

        {/* BURGER */}
        <div className="md:hidden ml-2 flex-shrink-0">
          <button onClick={handleClick}>
            <img src="/assets/burger-bar.svg" alt="burger bar icon" />
          </button>
        </div>
      </div>
      {/* MOBILE AUTH */}
      {isBurgerOpen && !isDashboardArea && (
        <nav className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-white rounded-xl shadow-xl flex flex-col py-4 w-[92%]">
          <NavMenuItem to="/auth/login">Sign In</NavMenuItem>
          <NavMenuItem to="/auth/register">Sign Up</NavMenuItem>
        </nav>
      )}
      {/* MOBILE DASHBOARD */}
      {isBurgerOpen && isDashboardArea && (
        <nav className="fixed left-1/2 -translate-x-1/2 top-20 z-50 bg-white rounded-xl shadow-xl flex flex-col py-4 w-[92%]">
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
      )}
    </header>
  );
}

export default Header;
