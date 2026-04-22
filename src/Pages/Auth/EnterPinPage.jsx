import AuthLink from '../../Fragments/Auth/AuthLink';
import AuthSecondaryText from '../../Fragments/Auth/AuthSecondaryText';
import AuthTitle from '../../Fragments/Auth/AuthTitle';
import EnterPinForm from '../../Fragments/Auth/EnterPin/EnterPinForm';
import BrandHeader from '../../Fragments/BrandHeader';
import { AuthLayouts } from '../../Layouts/AuthLayouts';

function EnterPinPage() {
  // const { user } = useSelector((state) => state.user);
  // useEffect(() => {
  //   if (user.pin == '' || user.pin.length < 5) {
  //     toast.error('Masukkan PIN dulu');
  //   }
  // }, []);
  return (
    <section className="p-2 px-4 md:p-0 md:px-0 flex items-center justify-center bg-blue-500 h-screen overflow-hidden">
      <div className="md:h-screen flex w-full md:w-2/3 lg:w-2/4 xl:w-[40%]">
        {' '}
        <AuthLayouts>
          <BrandHeader />
          <AuthTitle>Enter Your Pin 👋</AuthTitle>
          <AuthSecondaryText>Please save your pin because this so important.</AuthSecondaryText>
          <EnterPinForm />
          <AuthLink link="/auth/reset-pin" type="Reset">
            Forgot Your Pin?
          </AuthLink>
        </AuthLayouts>
      </div>
      <div className="icon hidden sm:flex flex-1 items-center justify-center mt-20 bg-blue-500">
        {' '}
        <img className="w-1/2" src="/assets/auth/enter-pin.svg" alt="login page icon" />
      </div>
    </section>
  );
}

export default EnterPinPage;
