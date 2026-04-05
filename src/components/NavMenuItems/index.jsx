import { Link } from 'react-router';
import { Button } from '../Button';

export const NavMenuItem = (props) => {
  console.log(props.icon);
  return (
    <Button buttonTextColor="text-blue-500 pb-5 text-md">
      <Link to={props.to}>{props.children}</Link>
    </Button>
  );
};
