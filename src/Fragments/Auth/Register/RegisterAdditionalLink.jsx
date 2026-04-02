import { Link } from 'react-router';

function RegisterAdditionalLink() {
  return (
    <section className="additional-link text-center">
      Have an account?{' '}
      <Link
        to="/auth/login"
        className="text-blue-500"
      >
        Login
      </Link>
    </section>
  );
}

export default RegisterAdditionalLink;
