import BrandHeader from '../Fragments/BrandHeader';
import Header from '../Fragments/Header';
import ProfileHeader from '../Fragments/ProfileHeader';
import { Link } from 'react-router';
import { useLocation } from 'react-router';

export const DashboardLayout = ({ navItems, children }) => {
  function LastUrl() {
    const location = useLocation();
    const splitted = location.pathname.split('/');
    const lastUrl = splitted.at(-1);
    const data = {
      url: location.pathname,
      lastUrl: lastUrl,
    };
    return data;
  }
  const data = LastUrl();
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
              <div
                className={`flex ps-4 pe-4 gap-2 justify-start hover:bg-blue-700 w-4/5 rounded-md hover:text-white ${data.url == item.path ? `bg-blue-700 text-white` : console.log(data.url, item.path)} ${item.isLogout ? 'text-red-500 hover:bg-red-500' : ''} transition-all`}
              >
                <img
                  src={data.url == item.path ? `public/assets/dashboard/nav-item${item.path}-white.svg` : `public/assets/dashboard/nav-item${item.path}.svg`}
                  alt={`${item.path} icon`}
                  className="w-6"
                />
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-6 py-3 text-left `}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </nav>
        </aside>

        <div className="min-w-0">
          <div className="md:hidden">
            <Header location="dashboard" />
          </div>
          <main className="md:px-8 lg:px-10 md:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
};
