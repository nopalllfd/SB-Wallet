import { Button } from '../../../components/Button';
import { InputGroup } from '../../../components/Input';
import ForgotPasswordLink from './ForgotPasswordLink';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../redux/slice/authSlice';
import { LoadingIndicator } from '../../../components/application/loading-indicator/loading-indicator';
import { toast } from 'sonner';

function LoginForm() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;

      const res = await dispatch(loginUser({ email, password })).unwrap();

      if (!res?.data) {
        throw new Error(res?.error || 'Login gagal');
      }

      const user = res.data;

      toast.success('Login berhasil');

      if (user.isPinExists) {
        navigate('/dashboard');
      } else {
        toast.error('Masukkan PIN dulu');
        navigate('/auth/pin');
      }
    } catch (err) {
      console.error(err);

      const message = err?.error || err || 'Login gagal';

      toast.error(message);

      setError('email', {
        type: 'manual',
        message,
      });
    }
  };
  return (
    <>
      <section className="input-group flex flex-col items-center">
        <form action="" className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(onSubmit)}>
          <InputGroup
            id="email"
            {...register('email', {
              required: 'Email tidak boleh kosong',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Format email salah',
              },
            })}
            placeholder="Enter Your Email"
            iconSrc="/assets/inputs/form/email.svg"
            iconAlt="email icon"
          >
            Email
          </InputGroup>
          <InputGroup
            type="password"
            id="password"
            {...register('password', {
              required: 'password tidak boleh kosong',
              minLength: {
                value: 7,
                message: 'Minimal 7 karakter',
              },
            })}
            placeholder="Enter Your Password"
            iconSrc="/assets/inputs/form/password.svg"
            iconAlt="password icon"
            eyelashIconOpenSrc="/assets/inputs/form/eyelash-open.svg"
            eyelashIconCloseSrc="/assets/inputs/form/eyelash.svg"
            eyelashIconAlt="eyelash icon"
            isPassword={true}
          >
            Password
          </InputGroup>
          {errors.email ? <p className={'text-red-500'}>{errors.email.message}</p> : <p></p>}
          <ForgotPasswordLink />
          <section className="submit-button">
            <Button buttonColor={'bg-blue-600'} buttonTextColor={'text-white'} className={'rounded-xl'}>
              Login
            </Button>
          </section>
        </form>
      </section>
    </>
  );
}

export default LoginForm;
