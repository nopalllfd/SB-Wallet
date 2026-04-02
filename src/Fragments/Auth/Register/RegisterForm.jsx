import { Button } from '../../../components/Button';
import { InputGroup } from '../../../components/Input';

function RegisterForm() {
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
        <InputGroup
          type="password"
          id="confirm-password"
          name="confirm-password"
          placeholder="Enter Confirm Password"
          iconSrc="../src/assets/inputs/form/password.svg"
          iconAlt="confirm-password icon"
          eyelashIconOpenSrc="../src/assets/inputs/form/eyelash-open.svg"
          eyelashIconCloseSrc="../src/assets/inputs/form/eyelash.svg"
          eyelashIconAlt="eyelash icon"
          isPassword={true}
        >
          Confirm Password
        </InputGroup>
      </section>
      <section className="submit-button">
        <Button
          buttonColor={'bg-blue-600'}
          buttonTextColor={'text-white'}
          className={'rounded-xl'}
        >
          Register
        </Button>
      </section>
    </>
  );
}

export default RegisterForm;
