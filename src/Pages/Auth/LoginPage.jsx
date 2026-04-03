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
    <div className="flex">
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
      <div className="icon pe-5 bg-blue-500 max-sm:hidden">
        <img
          className="w-full"
          src="../../src/assets/auth/login-page.svg"
          alt="login page icon"
        />
      </div>
    </div>
  );
}

export default LoginPage;
