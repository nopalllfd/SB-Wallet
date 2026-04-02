import ForgotPasswordForm from '../../Fragments/Auth/ForgotPassword/ForgotPasswordForm';
import BrandHeader from '../../Fragments/BrandHeader';
import { AuthLayouts } from '../../Layouts/AuthLayouts';
import AuthTitle from '../../Fragments/Auth/AuthTitle';
import AuthSecondaryText from '../../Fragments/Auth/AuthSecondaryText';

function ForgotPasswordPage() {
  return (
    <section className="p-2 flex items-center justify-center bg-blue-500 h-screen">
      <AuthLayouts>
        <BrandHeader />
        <AuthTitle>Fill Out Form Correctly 👋</AuthTitle>
        <AuthSecondaryText>We will send new password to your email</AuthSecondaryText>
        <ForgotPasswordForm />
      </AuthLayouts>
    </section>
  );
}

export default ForgotPasswordPage;
