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
    const email = e.target.email.value;
    const password = e.target.password.value;
    const existingValue = JSON.parse(localStorage.getItem('users'));
    if (email !== existingValue.email || password !== existingValue.password) {
      setErrorMsg('Kredensial yang anda masukkan salah');
    } else {
      localStorage.setItem('isLogin', true);
      navigate('/');
    }
  };

  return (
    <>
      <section
        onSubmit={handleSubmit}
        className="input-group "
      >
        <form
          action=""
          className="flex flex-col gap-4"
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
