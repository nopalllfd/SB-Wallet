import { useState, useRef, useEffect } from 'react';
import { Button } from '../../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserPin } from '../../../redux/slice/registerSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

function EnterPinForm({ length = 6 }) {
  const [pin, setPin] = useState(new Array(length).fill(''));
  const inputRefs = useRef([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.hasPin) {
      navigate('/dashboard');
    }
  }, [navigate, user.hasPin]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newPin = [...pin];
    newPin[index] = value.substring(value.length - 1);
    setPin(newPin);

    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    const finalPin = pin.join('');
    const data = {
      email: user.email,
      pin: finalPin,
    };
    console.log(data);
    try {
      await dispatch(updateUserPin(data)).unwrap();
      toast.success('PIN berhasil disimpan');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error?.message || 'Gagal menyimpan PIN');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <section className="input-group flex gap-2 mb-8 mt-6 justify-center">
        {pin.map((data, index) => (
          <input
            key={index}
            type="text"
            className="border-b w-1/6 text-4xl pb-6 outline-none text-center focus:border-blue-500"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength="1"
            value={data}
            ref={(el) => (inputRefs.current[index] = el)}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </section>

      <section className="submit-button">
        <Button type="submit" buttonColor={'bg-blue-600'} buttonTextColor={'text-white'} className={'rounded-xl w-full'}>
          Submit
        </Button>
      </section>
    </form>
  );
}

export default EnterPinForm;
