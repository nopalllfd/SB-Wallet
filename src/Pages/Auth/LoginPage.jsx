import AlternatifLogin from '../../Fragments/Auth/Login/AlternatifLogin';
import LoginAdditionalLink from '../../Fragments/Auth/Login/LoginAdditionalLink';
import LoginForm from '../../Fragments/Auth/Login/LoginForm';
import LoginMainText from '../../Fragments/Auth/Login/LoginMainText';
import LoginSecondaryText from '../../Fragments/Auth/Login/LoginSecondaryText';
import SeparatorOr from '../../Fragments/Auth/SeparatorOr';
import BrandHeader from '../../Fragments/BrandHeader';
import { AuthLayouts } from '../../Layouts/AuthLayouts';
function LoginPage() {
  return (
    <AuthLayouts>
      <BrandHeader />
      <LoginMainText />
      <LoginSecondaryText />
      <AlternatifLogin />
      <SeparatorOr />
      <LoginForm />
      <LoginAdditionalLink />
    </AuthLayouts>
  );
}

export default LoginPage;
