import { Link } from 'react-router';
import { Button } from '../Button';

export const NavMenuItem = (props) => {
  return (
    <Button buttonTextColor="text-blue-500 pb-5 text-xl">
      <Link to={props.to}>{props.children}</Link>
    </Button>
  );
};
