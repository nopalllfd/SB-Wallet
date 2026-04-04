import { useState } from 'react';
import { Button } from '../../../components/Button';
import { InputGroup } from '../../../components/Input';
import ForgotPasswordLink from './ForgotPasswordLink';
import { useNavigate } from 'react-router';

function LoginForm() {
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const email = e.target.email.value?.trim?.() ?? '';
    const password = e.target.password.value ?? '';

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
    navigate('/');
  };

  return (
    <>
      <section className="input-group ">
        <form
          action=""
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <p className="text-red-500 text-center text-sm ">{errorMsg ? errorMsg : ''}</p>
          <InputGroup
            type="email"
            id="email"
            name="email"
            placeholder="Enter Your Email"
            iconSrc="/assets/inputs/form/email.svg"
            iconAlt="email icon"
          >
            Email
          </InputGroup>
          <p></p>
          <InputGroup
            type="password"
            id="password"
            name="password"
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
          <p></p>

          <ForgotPasswordLink />
          <section className="submit-button">
            <Button
              buttonColor={'bg-blue-600'}
              buttonTextColor={'text-white'}
              className={'rounded-xl'}
            >
              Login
            </Button>
          </section>
        </form>
      </section>
    </>
  );
}

export default LoginForm;
