import { Link } from 'react-router';

function ForgotPasswordLink() {
  return (
    <section className="additional-link flex justify-end">
      <Link to="/auth/forgot/password" className="text-blue-500">
        Forgot Password
      </Link>
    </section>
  );
}

export default ForgotPasswordLink;
