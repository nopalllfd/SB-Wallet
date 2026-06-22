import { NavLink } from 'react-router';

export const NavMenuItem = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
        block w-full px-4 py-3 rounded-md transition-all duration-200
        ${isActive ? 'bg-blue-700 text-white' : 'text-gray-700 hover:bg-gray-100'}
      `
      }
    >
      {children}
    </NavLink>
  );
};
