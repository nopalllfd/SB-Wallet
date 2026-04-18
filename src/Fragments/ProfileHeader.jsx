import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router';

function ProfileHeader({ textColor = 'text-white' }) {
  const { user } = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, _] = useState(() => {
    let data = null;
    try {
      data = JSON.parse(localStorage.getItem('users') || 'null');
    } catch {
      data = null;
    }
    return data?.email || 'Pengguna';
  });
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

      <img src="/assets/profile.svg" alt="profile icon" className="w-10" />
      <div>
        <div className="greetings text-ultralight text-sm md:hidden">Hello,</div>
        <div className="greetings text-normal text-md">{user.fullName ? user.fullName : email}</div>
      </div>
    </div>
  );
}

export default ProfileHeader;
