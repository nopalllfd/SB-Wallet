import { Link, useLocation } from 'react-router';

function BrandHeader() {
  const location = useLocation();

  const isAuthPage = location.pathname.startsWith('/auth');

  return (
    <Link to="/" className={`icons ${location.pathname === '/dashboard' ? 'max-md:hidden' : ''}`}>
      {isAuthPage ? (
        <div className={`p-2 rounded-xl backdrop-blur-sm  bg-gray-900`}>
          <img src="/logo.svg" alt="e-wallet icon" className="w-36 md:w-40" />
        </div>
      ) : (
        <img src="/logo.svg" alt="e-wallet icon" className="w-36 md:w-40" />
      )}
    </Link>
  );
}

export default BrandHeader;
