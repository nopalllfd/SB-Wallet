import BrandHeader from '../../Fragments/BrandHeader';
import AuthSecondaryText from '../../Fragments/Auth/AuthSecondaryText';
import AuthTitle from '../../Fragments/Auth/AuthTitle';
import { AuthLayouts } from '../../Layouts/AuthLayouts';
import { InputGroup } from '../../components/Input';
import { Button } from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { updateUserPassword } from '../../redux/slice/registerSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

function ForgotPasswordChangePage() {
  const { email } = useSelector((state) => state.user.forgotPassword);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitForm = (data) => {
    const { email, newPassword } = data;
    dispatch(updateUserPassword({ email, newPassword }));
    toast.success('Password berhasil diubah');
    navigate('/auth/login');
  };

  return (
    <section className="p-2 flex items-center justify-center bg-blue-500 h-screen">
      <AuthLayouts>
        <BrandHeader />
        <AuthTitle>Create New Password</AuthTitle>
        <AuthSecondaryText>Masukkan password baru untuk akun ini.</AuthSecondaryText>

        <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col gap-4">
          <InputGroup
            type="email"
            id="email"
            {...register('email')}
            value={email}
            disabled={true}
            placeholder="Enter Your Email"
            iconSrc="/assets/inputs/form/email.svg"
            iconAlt="email icon"
          >
            Email
          </InputGroup>

          <InputGroup
            type="password"
            {...register('newPassword', {
              required: 'password tidak boleh kosong',
              minLength: {
                value: 7,
                message: 'Minimal 7 karakter',
              },
            })}
            id="newPassword"
            placeholder="Enter Your New Password"
            iconSrc="/assets/inputs/form/password.svg"
            iconAlt="password icon"
            eyelashIconOpenSrc="/assets/inputs/form/eyelash-open.svg"
            eyelashIconCloseSrc="/assets/inputs/form/eyelash.svg"
            eyelashIconAlt="eyelash icon"
            isPassword={true}
          >
            New Password
          </InputGroup>
          {errors.newPassword ? <p className="text-red-500">{errors.newPassword.message}</p> : <p></p>}

          <InputGroup
            type="password"
            {...register('confirmPassword', {
              required: 'confirm password tidak boleh kosong',
              validate: (val) => val === getValues('newPassword') || 'confirm password tidak cocok',
            })}
            id="confirmNewPassword"
            placeholder="Re-Type Your New Password"
            iconSrc="/assets/inputs/form/password.svg"
            iconAlt="confirm password icon"
            eyelashIconOpenSrc="/assets/inputs/form/eyelash-open.svg"
            eyelashIconCloseSrc="/assets/inputs/form/eyelash.svg"
            eyelashIconAlt="eyelash icon"
            isPassword={true}
          >
            Confirm New Password
          </InputGroup>
          {errors.confirmPassword ? <p className="text-red-500">{errors.confirmPassword.message}</p> : <p></p>}

          <section className="submit-button">
            <Button buttonColor={'bg-blue-600'} buttonTextColor={'text-white'} className={'rounded-xl'}>
              Submit
            </Button>
          </section>
        </form>
      </AuthLayouts>
    </section>
  );
}

export default ForgotPasswordChangePage;
