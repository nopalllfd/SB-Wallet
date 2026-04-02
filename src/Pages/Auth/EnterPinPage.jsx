import AuthLink from '../../Fragments/Auth/AuthLink';
import AuthSecondaryText from '../../Fragments/Auth/AuthSecondaryText';
import AuthTitle from '../../Fragments/Auth/AuthTitle';
import EnterPinForm from '../../Fragments/Auth/EnterPin/EnterPinForm';
import BrandHeader from '../../Fragments/BrandHeader';
import { AuthLayouts } from '../../Layouts/AuthLayouts';

function EnterPinPage() {
  return (
    <section className="p-2 px-4 flex items-center justify-center bg-blue-500 h-screen">
      <AuthLayouts>
        <BrandHeader />
        <AuthTitle>Enter Your Pin 👋</AuthTitle>
        <AuthSecondaryText>Please save your pin because this so important.</AuthSecondaryText>
        <EnterPinForm />
        <AuthLink
          link="/auth/reset-pin"
          type="Reset"
        >
          Forgot Your Pin?
        </AuthLink>
      </AuthLayouts>
    </section>
  );
}

export default EnterPinPage;
