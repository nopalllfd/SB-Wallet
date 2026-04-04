import { Button } from '../../../components/Button';
import { InputGroup } from '../../../components/Input';

function ForgotPasswordForm() {
  return (
    <>
      <section className="input-group flex flex-col gap-4">
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
      </section>
      <section className="submit-button">
        <Button
          buttonColor={'bg-blue-600'}
          buttonTextColor={'text-white'}
          className={'rounded-xl'}
        >
          Submit
        </Button>
      </section>
    </>
  );
}

export default ForgotPasswordForm;
