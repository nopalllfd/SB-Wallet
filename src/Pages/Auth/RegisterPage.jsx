import SocialsLogin from '../../Fragments/Auth/SocialsLogin';
import AuthTitle from '../../Fragments/Auth/AuthTitle';
import SeparatorOr from '../../Fragments/Auth/SeparatorOr';
import BrandHeader from '../../Fragments/BrandHeader';
import { AuthLayouts } from '../../Layouts/AuthLayouts';
import AuthSecondaryText from '../../Fragments/Auth/AuthSecondaryText';
import AuthLink from '../../Fragments/Auth/AuthLink';
import RegisterForm from '../../Fragments/Auth/Register/RegisterForm';
function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-blue-500 md:bg-white px-4 py-6">
        <AuthLayouts>
          <BrandHeader />
          <AuthTitle>Start Accessing Banking Needs With All Devices and All Platforms With 30.000+ Users</AuthTitle>
          <AuthSecondaryText>Transfering money is eassier than ever, you can access Zwallet wherever you are. Desktop, laptop, mobile phone? we cover all of that for you!</AuthSecondaryText>
          <SocialsLogin />
          <SeparatorOr />
          <RegisterForm />
          <AuthLink link="/auth/login" type="Login">
            Have an Account?
          </AuthLink>
        </AuthLayouts>
      </div>
      <div className="icon hidden md:flex md:w-1/2 bg-blue-500 items-center justify-center">
        <img className="w-full h-full object-contain" src="/assets/auth/register-page.svg" alt="register page icon" />
      </div>
    </div>
  );
}

export default RegisterPage;
