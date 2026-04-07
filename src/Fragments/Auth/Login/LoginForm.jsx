import { useState } from 'react';
import { Button } from '../../../components/Button';
import { InputGroup } from '../../../components/Input';
import ForgotPasswordLink from './ForgotPasswordLink';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';

function LoginForm() {
  const [errorMsg, setErrorMsg] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setErrorMsg('');
    const email = data.email.trim();
    const password = data.password;

    let existingValue = null;
    try {
      existingValue = JSON.parse(localStorage.getItem('users') || 'null');
    } catch {
      existingValue = null;
    }

    if (!existingValue?.email || !existingValue?.password) {
      setErrorMsg('Akun belum terdaftar, silakan Register terlebih dahulu');
      return;
    }

    if (email !== existingValue.email || password !== existingValue.password) {
      setErrorMsg('Kredensial yang anda masukkan salah');
      return;
    }

    localStorage.setItem('isLogin', 'true');
    navigate('/dashboard');
  };

  return (
    <>
      <section className="input-group ">
        <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <p className="text-red-500 text-center text-sm ">{errorMsg ? errorMsg : ''}</p>
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
              Login
            </Button>
          </section>
        </form>
      </section>
    </>
  );
}

export default LoginForm;
