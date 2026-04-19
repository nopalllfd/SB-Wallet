import { Link } from 'react-router';

function ForgotPasswordLink() {
  return (
    <section className="additional-link text-center">
      <Link to="/auth/forgot/password" className="text-blue-500">
        Forgot Password
      </Link>
    </section>
  );
}

export default ForgotPasswordLink;
