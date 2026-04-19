import { Button } from '../../../components/Button';
import { InputGroup } from '../../../components/Input';
import ForgotPasswordLink from './ForgotPasswordLink';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../redux/slice/userSlice';
import { LoadingIndicator } from '../../../components/application/loading-indicator/loading-indicator';
import { toast } from 'react-hot-toast';

function LoginForm() {
  const { user, loading, error } = useSelector((state) => state.user);
  console.log(user, loading);

  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.register);
  console.log(users);
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
      const existingValue = users.find((obj) => obj.email == email);
      if (!existingValue) {
        throw new Error('Email belum terdaftar');
      }
      if (password !== existingValue.password) {
        throw new Error('Email atau password salah');
      }
      const hasPin = existingValue.pin !== '';
      console.log('DISPATCHHHHHHHHHh');
      const { password: _password, pin: _pin, ...userData } = existingValue;

      await dispatch(loginUser({ ...userData, hasPin })).unwrap();

      if (hasPin) {
        toast.success('Login berhasil');
        navigate('/dashboard');
      } else {
        toast.error('Enter your pin first');
        navigate('/auth/pin');
      }
    } catch (err) {
      toast.error(err?.message || 'Login gagal');
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
