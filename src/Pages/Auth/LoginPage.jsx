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
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-blue-500 md:bg-white px-4 py-6">
        <AuthLayouts>
          <BrandHeader />
          <AuthTitle>Hello Welcome Back 👋</AuthTitle>
          <AuthSecondaryText>Fill out the form correctly or you can login with several option.</AuthSecondaryText>
          <SocialsLogin />
          <SeparatorOr />
          <LoginForm />
          <AuthLink link="/auth/register" type="Register">
            Not Have an Account?
          </AuthLink>
        </AuthLayouts>
      </div>
      <div className="icon hidden md:flex md:w-1/2 bg-blue-500 items-center justify-center">
        <img className="w-full h-full object-contain" src="/assets/auth/login-page.svg" alt="login page icon" />
      </div>
    </div>
  );
}

export default LoginPage;
