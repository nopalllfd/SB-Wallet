import { Button } from '../../../components/Button';
import { InputGroup } from '../../../components/Input';
import ForgotPasswordLink from './ForgotPasswordLink';

function LoginForm() {
  return (
    <>
      <section className="input-group flex flex-col gap-4">
        <InputGroup
          type="email"
          id="email"
          name="email"
          placeholder="Enter Your Email"
          iconSrc="../src/assets/inputs/form/email.svg"
          iconAlt="email icon"
        >
          Email
        </InputGroup>
        <InputGroup
          type="password"
          id="password"
          name="password"
          placeholder="Enter Your Password"
          iconSrc="../src/assets/inputs/form/password.svg"
          iconAlt="password icon"
          eyelashIconOpenSrc="../src/assets/inputs/form/eyelash-open.svg"
          eyelashIconCloseSrc="../src/assets/inputs/form/eyelash.svg"
          eyelashIconAlt="eyelash icon"
          isPassword={true}
        >
          Password
        </InputGroup>
      </section>
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
    </>
  );
}

export default LoginForm;
