import ForgotPasswordMainText from '../../Fragments/Auth/ForgotPassword/ForgotPasswordMainText';
import ForgotPasswordSecondaryText from '../../Fragments/Auth/ForgotPassword/ForgotPasswordSecondaryText';
import ForgotPasswordForm from '../../Fragments/Auth/ForgotPassword/ForgotPasswordForm';
import BrandHeader from '../../Fragments/BrandHeader';
import { AuthLayouts } from '../../Layouts/AuthLayouts';

function ForgotPasswordPage() {
  return (
    <AuthLayouts>
      <BrandHeader />
      <ForgotPasswordMainText />
      <ForgotPasswordSecondaryText />
      <ForgotPasswordForm />
    </AuthLayouts>
  );
}

export default ForgotPasswordPage;
