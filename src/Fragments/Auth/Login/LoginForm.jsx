import { Button } from '../../../components/Button';
import { InputGroup } from '../../../components/Input';
import ForgotPasswordLink from './ForgotPasswordLink';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../redux/slice/userSlice';
import { LoadingIndicator } from '../../../components/application/loading-indicator/loading-indicator';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import ToastSuccess from '../../../components/toast/Toast';
function LoginForm() {
  const { user, isLogin, loading, error } = useSelector((state) => state.users);
  console.log(user, loading);

  const dispatch = useDispatch();
  console.log(user);
  console.log(isLogin);
  const { data: existingValue } = useLocalStorage('users');
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
      console.log(data);
      console.log('PPPPPPP');
      if (!existingValue?.email || !existingValue?.password) {
        throw new Error('Akun belum terdaftar');
      }
      if (email !== existingValue.email || password !== existingValue.password) {
        throw new Error('Email atau password salah');
      }
      console.log('DISPATCHHHHHHHHHh');
      await dispatch(loginUser({ email, existingValue })).unwrap();
      navigate('/dashboard');
      <ToastSuccess />;
    } catch (err) {
      setError('email', {
        type: 'manual',
        message: err.message,
      });
    }
  };

  return (
    <>
      <section className="input-group flex flex-col items-center">
        {error ? <p className={'text-red-500'}>{error}</p> : <p></p>}
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
          {errors.email ? <p className={'text-red-500'}>{errors.email.message}</p> : <p></p>}
          <InputGroup
            type="password"
            id="password"
            {...register('password', {
              required: 'Password tidak boleh kosong',
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
          {errors.password ? <p className={'text-red-500'}>{errors.password.message}</p> : <p></p>}
          <ForgotPasswordLink />
          <section className="submit-button">
            <Button buttonColor={'bg-blue-600'} buttonTextColor={'text-white'} className={'rounded-xl'}>
              {loading ? <LoadingIndicator /> : 'Login'}
            </Button>
          </section>
        </form>
      </section>
    </>
  );
}

export default LoginForm;
