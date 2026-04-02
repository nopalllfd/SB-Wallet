import SocialsLogin from '../../Fragments/Auth/SocialsLogin';
import AuthTitle from '../../Fragments/Auth/AuthTitle';
import SeparatorOr from '../../Fragments/Auth/SeparatorOr';
import BrandHeader from '../../Fragments/BrandHeader';
import { AuthLayouts } from '../../Layouts/AuthLayouts';
import AuthSecondaryText from '../../Fragments/Auth/AuthSecondaryText';
import AuthLink from '../../Fragments/Auth/AuthLink';
import LoginForm from '../../Fragments/Auth/Login/LoginForm';
function LoginPage() {
  return (
    <AuthLayouts>
      <BrandHeader />
      <AuthTitle>Hello Welcome Back 👋</AuthTitle>
      <AuthSecondaryText>Fill out the form correctly or you can login with several option.</AuthSecondaryText>
      <SocialsLogin />
      <SeparatorOr />
      <LoginForm />
      <AuthLink
        link="/auth/register"
        type="Register"
      >
        Not Have an Account?
      </AuthLink>
    </AuthLayouts>
  );
}

export default LoginPage;
