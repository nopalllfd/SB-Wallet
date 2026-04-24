import { useEffect } from 'react';
import BrandHeader from '../Fragments/BrandHeader';
import Header from '../Fragments/Header';
import ProfileHeader from '../Fragments/ProfileHeader';
import { NavLink, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

export const DashboardLayout = ({ children, locationDetail }) => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Transfer', path: '/transfer' },
    { name: 'Riwayat', path: '/history' },
    { name: 'Top up', path: '/topup' },
    { name: 'Profile', path: '/profile' },
  ];
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const getIconSrc = (item) => {
    if (item.isLogout) return '/assets/dashboard/nav-item/auth/logout.svg';
    const base = String(item.path || '').replace(/^\//, '');
    const mapped = base === 'history' ? 'transaction' : base;
    return `/assets/dashboard/nav-item/${mapped}.svg`;
  };

  useEffect(() => {
    if (!user) {
      toast.error('Kamu harus login terlebih dahulu');
      navigate('/auth/login');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 md:grid md:grid-rows-[auto_1fr]">
      <header className="hidden md:grid md:grid-cols-[16rem_1fr] lg:grid-cols-[18rem_1fr] bg-white border-b border-gray-200">
        <div className="px-6 py-3 flex items-center">
          <BrandHeader />
        </div>
        <div className="px-8 lg:px-10 py-3 flex items-center justify-end">
          <ProfileHeader textColor="text-gray-800" />
        </div>
      </header>

      <div className="md:grid md:grid-cols-[16rem_1fr] lg:grid-cols-[18rem_1fr]">
        <aside className="hidden md:flex bg-white text-black border-r border-gray-300 flex-col">
          <nav className="flex flex-col py-6 ps-4 gap-3">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => {
                  const base = 'flex items-center gap-3 px-5 py-2.5 justify-start w-4/5 rounded-md transition-all';

                  return `${base} hover:bg-blue-100 hover:text-blue-700 ${isActive ? 'bg-blue-700 text-white' : ''}`;
                }}
              >
                {({ isActive }) => (
                  <>
                    <img
                      src={getIconSrc(item)}
                      alt={`${item.name} icon`}
                      className={`w-6 ${!item.isLogout && isActive ? 'brightness-0 invert' : ''}`}
                    />
                    <span className="text-left">{item.name}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </aside>

        <div className="min-w-0">
          <div className="md:hidden">
            <Header locationDetail={locationDetail} location={'dashboard'} />
          </div>
          <main className="md:px-8 pt-18 lg:px-10 md:py-8 overflow-x-hidden">{children}</main>
        </div>
      </div>
    </div>
  );
};
