import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { DEFAULT_PROFILE_IMAGE_SRC, getProfileImageSrc } from '../utils/profileImage';
import { logout, logoutUser } from '../redux/slice/authSlice';
import { toast } from 'sonner';

function ProfileHeader({ textColor = 'text-white' }) {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth/login');
    }
  }, [user, navigate]);

  const ConfirmLogoutModal = ({ open, onCancel, onConfirm, isLoading }) => {
    if (!open) return null;

    return (
      <>
        <button type="button" className="fixed inset-0 z-40 bg-black/40" onClick={onCancel} />

        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="w-full max-w-sm rounded-lg bg-white p-5 shadow-lg">
            <div className="text-base font-semibold text-blue-700">Logout</div>
            <div className="text-sm text-gray-600 mt-1">Yakin ingin logout?</div>

            <div className="mt-5 flex gap-3">
              <div className="flex-1">
                <Button onClick={onCancel} buttonColor="bg-gray-100" buttonTextColor="text-gray-800" className="rounded-md">
                  Batal
                </Button>
              </div>

              <div className="flex-1">
                <Button onClick={onConfirm} buttonColor="bg-blue-700" buttonTextColor="text-white" className="rounded-md">
                  {isLoading ? 'Logout...' : 'Logout'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const modalItem = [
    { name: 'Profile', path: 'profile' },
    { name: 'Logout', path: 'auth/logout', isLogout: true },
  ];

  const handleClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleConfirmLogout = async () => {
    if (isLogoutLoading) return;

    setIsLogoutLoading(true);

    try {
      await dispatch(logoutUser()).unwrap();
      dispatch(logout());

      navigate('/auth/login');
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLogoutLoading(false);
      setIsLogoutConfirmOpen(false);
    }
  };

  const handleClickList = (event, item) => {
    setIsModalOpen(false);

    if (!item?.isLogout) return;

    event.preventDefault();
    setIsLogoutConfirmOpen(true);
  };

  return (
    <div className={`flex ${textColor} gap-2 md:gap-4 items-center md:flex-row-reverse relative justify-center`}>
      <div onClick={handleClick} className="hidden md:block cursor-pointer">
        <img src="/assets/utils/arrow-down.svg" alt="arrow down icon" />
      </div>

      {isModalOpen && (
        <>
          <button className="fixed inset-0 z-40 bg-transparent" onClick={() => setIsModalOpen(false)} />

          <div className="absolute -bottom-30 right-5 z-50 bg-white flex flex-col gap-2 py-2 rounded-md drop-shadow-md">
            {modalItem.map((item) => (
              <NavLink
                key={item.path}
                to={`/${item.path}`}
                onClick={(event) => handleClickList(event, item)}
                className={({ isActive }) => {
                  const base = 'flex gap-6 items-center px-8 py-2 font-semibold transition-all';

                  if (item.isLogout) {
                    return `${base} text-red-500 hover:bg-red-500 hover:text-white`;
                  }

                  return `${base} text-blue-700 hover:bg-blue-700 hover:text-white ${isActive ? 'bg-blue-700 text-white' : ''}`;
                }}
              >
                {({ isActive }) => (
                  <>
                    <img
                      src={`/assets/dashboard/nav-item/${item.path}.svg`}
                      alt={item.name}
                      className={`${!item.isLogout && isActive ? 'brightness-0 invert' : ''}`}
                    />
                    <span>{item.name}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </>
      )}

      <ConfirmLogoutModal
        open={isLogoutConfirmOpen}
        onCancel={() => setIsLogoutConfirmOpen(false)}
        onConfirm={handleConfirmLogout}
        isLoading={isLogoutLoading}
      />

      {/* 🔥 INI BAGIAN PENTING */}
      <img
        src={getProfileImageSrc(user)} // <-- ini sudah pakai user.photo dari Redux
        onError={(e) => {
          e.currentTarget.src = DEFAULT_PROFILE_IMAGE_SRC;
        }}
        alt="profile"
        className="w-10 h-10 rounded-full object-cover"
      />

      <div>
        <div className="text-sm md:hidden">Hello,</div>
        <div className="text-md font-medium">{user?.display_name}</div>
      </div>
    </div>
  );
}

export default ProfileHeader;
