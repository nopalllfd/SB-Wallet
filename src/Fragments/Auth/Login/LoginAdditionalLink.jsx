import { Link } from 'react-router';

function LoginAdditionalLink() {
  return (
    <section className="additional-link text-center">
      Not have an account?{' '}
      <Link
        to="/auth/register"
        className="text-blue-500"
      >
        Register
      </Link>
    </section>
  );
}

export default LoginAdditionalLink;
