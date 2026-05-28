import { useEffect, useRef, useState } from 'react';
import { Button } from '../../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { useNavigate } from 'react-router';
import { setUserPin } from '../../../redux/slice/authSlice';

export const EnterPinForm = ({ length = 6 }) => {
  const [pin, setPin] = useState(new Array(length).fill(''));
  const inputRefs = useRef([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  // FIX: pakai isPinExists
  useEffect(() => {
    if (user?.isPinExists) {
      navigate('/dashboard');
    }
  }, [navigate, user]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (isNaN(value)) return;

    const newPin = [...pin];
    newPin[index] = value.slice(-1);

    setPin(newPin);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalPin = pin.join('');

    // const data = {
    //   pin: finalPin,
    // };

    try {
      await dispatch(setUserPin(finalPin)).unwrap();

      toast.success('PIN berhasil disimpan');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error || 'Gagal menyimpan PIN');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <section className="input-group flex gap-2 mb-8 mt-6 justify-center">
        {pin.map((value, index) => (
          <input
            key={index}
            type="password"
            className="border-b w-1/6 text-4xl pb-6 outline-none text-center focus:border-blue-500"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength="1"
            value={value}
            ref={(el) => (inputRefs.current[index] = el)}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </section>

      <section>
        <button type="submit" className="bg-blue-600 text-white rounded-xl w-full py-2">
          Submit
        </button>
      </section>
    </form>
  );
};

export default EnterPinForm;
