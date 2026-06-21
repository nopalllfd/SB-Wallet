import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { DEFAULT_PROFILE_IMAGE_SRC, getProfileImageSrc } from '../utils/profileImage';
import { logout, logoutUser } from '../redux/slice/authSlice';
import { toast } from 'sonner';

/* MUI ICON */
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function ProfileHeader({ textColor = 'text-white' }) {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);

  const modalItem = [
    { name: 'Profile', path: 'profile' },
    { name: 'Logout', path: 'auth/logout', isLogout: true },
  ];

  const handleClick = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleClickList = (event, item) => {
    setIsModalOpen(false);

    if (!item?.isLogout) return;

    event.preventDefault();
    setIsLogoutConfirmOpen(true);
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

  const ConfirmLogoutModal = ({ open, onCancel, onConfirm, isLoading }) => {
    if (!open) return null;

    return (
      <>
        <button className="fixed inset-0 z-40 bg-black/40" onClick={onCancel} />

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

  return (
    <div
      className={`
        flex items-center gap-2 md:gap-4
        w-full md:w-auto
        justify-start md:justify-center
        relative md:flex-row-reverse
        ${textColor}
      `}
    >
      {/* dropdown toggle */}
      <div onClick={handleClick} className="hidden md:flex items-center cursor-pointer">
        <KeyboardArrowDownIcon className="text-white" fontSize="medium" />
      </div>

      {/* dropdown menu */}
      {isModalOpen && (
        <>
          <button className="fixed inset-0 z-40 bg-transparent" onClick={() => setIsModalOpen(false)} />

          <div
            className="
              absolute top-full mt-2 right-0
              z-50 bg-white
              flex flex-col gap-1
              py-2
              rounded-md shadow-md
              min-w-40
            "
          >
            {modalItem.map((item) => (
              <NavLink
                key={item.path}
                to={`/${item.path}`}
                onClick={(event) => handleClickList(event, item)}
                className={({ isActive }) => {
                  const base = 'flex gap-3 items-center px-5 py-2 text-sm font-semibold transition-all';

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
                      className={`w-4 h-4 ${!item.isLogout && isActive ? 'brightness-0 invert' : ''}`}
                    />
                    <span>{item.name}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </>
      )}

      {/* logout modal */}
      <ConfirmLogoutModal
        open={isLogoutConfirmOpen}
        onCancel={() => setIsLogoutConfirmOpen(false)}
        onConfirm={handleConfirmLogout}
        isLoading={isLogoutLoading}
      />

      {/* profile image */}
      <img
        src={getProfileImageSrc(user)}
        onError={(e) => {
          e.currentTarget.src = DEFAULT_PROFILE_IMAGE_SRC;
        }}
        alt="profile"
        className="w-10 h-10 rounded-full object-cover shrink-0"
      />

      {/* user text */}
      <div className="leading-tight">
        <div className="text-xs md:hidden text-white/80">Hello,</div>
        <div className="text-sm md:text-md text-white font-medium">{user?.display_name || 'User'}</div>
      </div>
    </div>
  );
}

export default ProfileHeader;
