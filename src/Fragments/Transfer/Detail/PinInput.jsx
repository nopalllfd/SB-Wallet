import { useState, useRef } from 'react';
import { Button } from '../../../components/Button';

function PinInput({ onSubmit }) {
  const [pin, setPin] = useState(new Array(6).fill(''));
  const pinRefs = useRef([]);

  const handleChangePin = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newPin = [...pin];
    newPin[index] = value.substring(value.length - 1);
    setPin(newPin);

    if (value && index < 6) {
      pinRefs.current[index + 1].focus();
    }
  };

  const handleKeyDownPin = (e, index) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      pinRefs.current[index - 1].focus();
    }
  };

  const handleSubmitPin = (e) => {
    e.preventDefault();
    const finalPin = pin.join('');
    onSubmit(finalPin);
  };

  return (
    <div className="input">
      <form
        id="pin-form"
        onSubmit={handleSubmitPin}
        className="
          input-group flex justify-between gap-2 mb-8 mt-6
          [&>input]:border-b
          [&>input]:w-1/8
          [&>input]:text-3xl
          [&>input]:pb-6
          [&>input]:outline-none
          [&>input]:text-center
          [&>input]:focus:border-blue-500
        "
      >
        {pin.map((digit, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            name={`pin-${index}`}
            maxLength="1"
            ref={(el) => (pinRefs.current[index] = el)}
            value={digit}
            onChange={(e) => handleChangePin(e, index)}
            onKeyDown={(e) => handleKeyDownPin(e, index)}
            onFocus={(e) => e.target.select()}
          />
        ))}
      </form>

      <section className="submit-button">
        <Button
          buttonColor={'bg-blue-600'}
          buttonTextColor={'text-white'}
          className={'rounded-xl'}
          onClick={() => {
            const form = document.getElementById('pin-form');
            if (form) form.requestSubmit();
          }}
        >
          Next
        </Button>
      </section>
    </div>
  );
}

export default PinInput;
