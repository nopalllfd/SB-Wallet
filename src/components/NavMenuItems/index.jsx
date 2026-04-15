import { NavLink } from 'react-router';
import { Button } from '../Button';

export const NavMenuItem = (props) => {
  return (
    <Button buttonTextColor="text-blue-500 pb-5 text-md">
      <NavLink
        to={props.to}
        className={({ isActive }) => (isActive ? 'bg-blue-700 text-white px-3 py-2 rounded-md' : 'text-gray-700 px-3 py-2 rounded-md')}
      >
        {props.children}
      </NavLink>
    </Button>
  );
};
