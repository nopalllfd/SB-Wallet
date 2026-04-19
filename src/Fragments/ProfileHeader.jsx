import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router';
import { logoutUser } from '../redux/slice/userSlice';
import { Button } from '../components/Button';

function ProfileHeader({ textColor = 'text-white' }) {
  const { user } = useSelector((state) => state.user);
  console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);

  const ConfirmLogoutModal = ({ open, onCancel, onConfirm, isLoading }) => {
    if (!open) return null;
    return (
      <>
        <button
          type="button"
          className="fixed inset-0 z-40 cursor-default bg-black/40"
          aria-label="Close confirm dialog"
          onClick={onCancel}
        />
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="w-full max-w-sm rounded-lg bg-white p-5 shadow-lg">
            <div className="flex flex-col gap-2">
              <div className="text-base font-semibold text-gray-900">Logout</div>
              <div className="text-sm text-gray-600">Yakin ingin logout?</div>
            </div>

            <div className="mt-5 flex gap-3">
              <div className="flex-1">
                <Button
                  onClick={onCancel}
                  buttonColor="bg-gray-100"
                  buttonTextColor="text-gray-800"
                  className="rounded-md"
                >
                  Batal
                </Button>
              </div>
              <div className="flex-1">
                <Button
                  onClick={onConfirm}
                  buttonColor="bg-red-500"
                  buttonTextColor="text-white"
                  className="rounded-md"
                >
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
    {
      name: 'Profile',
      path: 'profile',
    },
    {
      name: 'Logout',
      path: 'auth/logout',
      isLogout: true,
    },
  ];
  const handleClick = () => {
    return setIsModalOpen(!isModalOpen);
  };

  const handleConfirmLogout = async () => {
    if (isLogoutLoading) return;
    setIsLogoutLoading(true);
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/auth/login');
    } finally {
      setIsLogoutLoading(false);
      setIsLogoutConfirmOpen(false);
    }
  };

  const handleClickList = async (event, item) => {
    setIsModalOpen(false);
    if (!item?.isLogout) return;
    event.preventDefault();
    setIsLogoutConfirmOpen(true);
  };
  return (
    <div className={`flex ${textColor} gap-2 md:gap-4 items-center md:flex-row-reverse relative justify-center`}>
      <div onClick={handleClick} className="hidden md:block relative cursor-pointer">
        <img src="/assets/utils/arrow-down.svg" alt="arrow down icon" />
      </div>
      {isModalOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default bg-transparent"
            aria-label="Close menu"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="absolute -bottom-30 right-5 px-3 z-50 bg-white flex flex-col gap-2 py-2 rounded-md drop-shadow-md">
            {modalItem.map((item) => (
              <NavLink
                onClick={(event) => handleClickList(event, item)}
                key={item.path}
                to={`/${item.path}`}
                className={({ isActive }) => {
                  const base = 'rounded-xl flex gap-6 items-center w-auto px-8 py-2 text-left transition-all font-semibold';
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
                      alt={`${item.name} icon`}
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

      <img src="/assets/profile.svg" alt="profile icon" className="w-10" />
      <div>
        <div className="greetings text-ultralight text-sm md:hidden">Hello,</div>
        <div className="greetings text-normal text-md">{user.fullName ? user.fullName : user.email}</div>
      </div>
    </div>
  );
}

export default ProfileHeader;
