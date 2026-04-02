import { Button } from '../../../components/Button';
import { InputGroup } from '../../../components/Input';

function EnterPinForm() {
  return (
    <>
      <section className="input-group flex gap-2 mb-8 mt-6">
        <input
          type="text"
          className="border-b w-1/6 text-4xl pb-6 outline-none text-center focus:border-blue-500"
          inputMode="numeric"
          pattern="[0-9]*"
          id=""
          name="pin"
          maxLength="1"
        />
        <input
          type="text"
          className="border-b w-1/6 text-4xl pb-6  outline-none text-center focus:border-blue-500"
          inputMode="numeric"
          pattern="[0-9]*"
          id=""
          name="pin"
          maxLength="1"
        />
        <input
          type="text"
          className="border-b w-1/6 text-4xl pb-6  outline-none text-center focus:border-blue-500"
          inputMode="numeric"
          pattern="[0-9]*"
          id=""
          name="pin"
          maxLength="1"
        />
        <input
          type="text"
          className="border-b w-1/6 text-4xl pb-6  outline-none text-center focus:border-blue-500"
          inputMode="numeric"
          pattern="[0-9]*"
          id=""
          name="pin"
          maxLength="1"
        />
        <input
          type="text"
          className="border-b w-1/6 text-4xl pb-6  outline-none text-center focus:border-blue-500"
          inputMode="numeric"
          pattern="[0-9]*"
          id=""
          name="pin"
          maxLength="1"
        />
        <input
          type="text"
          className="border-b w-1/6 text-4xl pb-6 outline-none text-center focus:border-blue-500"
          inputMode="numeric"
          pattern="[0-9]*"
          id=""
          name="pin"
          maxLength="1"
        />

        <input
          type="text"
          className="border-b w-1/6 text-4xl pb-6 outline-none text-center focus:border-blue-500"
          inputMode="numeric"
          pattern="[0-9]*"
          id=""
          name="pin"
          maxLength="1"
        />
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

export default EnterPinForm;
