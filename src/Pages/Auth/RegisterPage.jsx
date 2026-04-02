import AlternatifRegister from '../../Fragments/Auth/Register/AlternatifRegister';
import RegisterAdditionalLink from '../../Fragments/Auth/Register/RegisterAdditionalLink';
import RegisterForm from '../../Fragments/Auth/Register/RegisterForm';
import RegisterMainText from '../../Fragments/Auth/Register/RegisterMainText';
import RegisterSecondaryText from '../../Fragments/Auth/Register/RegisterSecondaryText';
import SeparatorOr from '../../Fragments/Auth/SeparatorOr';
import BrandHeader from '../../Fragments/BrandHeader';
import { AuthLayouts } from '../../Layouts/AuthLayouts';
function RegisterPage() {
  return (
    <AuthLayouts>
      <BrandHeader />
      <RegisterMainText />
      <RegisterSecondaryText />
      <AlternatifRegister />
      <SeparatorOr />
      <RegisterForm />
      <RegisterAdditionalLink />
    </AuthLayouts>
  );
}

export default RegisterPage;
