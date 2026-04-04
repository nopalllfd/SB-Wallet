import { useState } from 'react';
import { Button } from '../../../components/Button';
import { InputGroup } from '../../../components/Input';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [_, setConfirmPassword] = useState('');
  const [errorPwdMsg, setErrorPwdMsg] = useState('');
  const [errorEmailMsg, setErrorEmailMsg] = useState('');
  const [confirmErrorPwdMsg, setConfirmErrorPwdMsg] = useState('');
  console.log(email);
  const handleChangePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length < 7 && value.length > 0) {
      setErrorPwdMsg('Password minimal 7 karakter');
    } else {
      setErrorPwdMsg('');
    }
  };
  const handleChangeConfirmPassword = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value != password) {
      setConfirmErrorPwdMsg('Konfirmasi password harus sama dengan password!');
    } else {
      setConfirmErrorPwdMsg('');
    }
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem('users'));
    if (existingUsers.email == email) {
      setErrorEmailMsg('Email sudah digunakan!');
    } else {
      setErrorEmailMsg('');
    }
    const data = {
      email: email,
      password: password,
    };
    localStorage.setItem('users', JSON.stringify(data));
  };
  return (
    <>
      <section className="input-group ">
        <form
          className="flex flex-col gap-4"
          onSubmit={handleFormSubmit}
          action=""
        >
          <InputGroup
            type="email"
            id="email"
            name="email"
            placeholder="Enter Your Email"
            iconSrc="/assets/inputs/form/email.svg"
            iconAlt="email icon"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          >
            Email
          </InputGroup>
          <p className="text-red-500 text-xs">{errorEmailMsg ? errorEmailMsg : ''}</p>
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
            onChange={handleChangePassword}
          >
            Password
          </InputGroup>
          <p className="text-red-500 text-xs">{errorPwdMsg ? errorPwdMsg : ''}</p>
          <InputGroup
            type="password"
            id="confirm-password"
            name="confirm-password"
            placeholder="Enter Confirm Password"
            iconSrc="/assets/inputs/form/password.svg"
            iconAlt="confirm-password icon"
            eyelashIconOpenSrc="/assets/inputs/form/eyelash-open.svg"
            eyelashIconCloseSrc="/assets/inputs/form/eyelash.svg"
            eyelashIconAlt="eyelash icon"
            isPassword={true}
            onChange={handleChangeConfirmPassword}
          >
            Confirm Password
          </InputGroup>
          <p className="text-red-500 text-xs">{confirmErrorPwdMsg ? confirmErrorPwdMsg : ''}</p>
          <section className="submit-button">
            <Button
              buttonColor={'bg-blue-600'}
              buttonTextColor={'text-white'}
              className={'rounded-xl'}
            >
              Register
            </Button>
          </section>
        </form>
      </section>
    </>
  );
}

export default RegisterForm;
