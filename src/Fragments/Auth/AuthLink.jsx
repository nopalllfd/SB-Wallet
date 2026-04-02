import { Link } from 'react-router';

function AuthLink(props) {
  return (
    <section className="additional-link text-center">
      {props.children}{' '}
      <Link
        to={props.link}
        className="text-blue-500"
      >
        {props.type}
      </Link>
    </section>
  );
}

export default AuthLink;
