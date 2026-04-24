import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { InputGroup } from '../components/Input';
import HeaderSection from '../Fragments/Profile/HeaderSection';
import { DashboardLayout } from '../Layouts/DashboardLayout';
import { updateUserPin } from '../redux/slice/registerSlice';
import { toast } from 'sonner';

function ProfileChangePinPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.register);
  const email = user?.email || '';
  const currentUser = users.find((item) => item.email === email);
  const currentPin = currentUser?.pin || '';

  const [oldPin, setOldPin] = useState('');
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const pinValue = digits.join('');

  const focusIndex = (index) => {
    const el = inputRefs.current[index];
    if (el) el.focus();
  };

  const handleChange = (index, rawValue) => {
    const value = String(rawValue || '')
      .replace(/\D/g, '')
      .slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
    if (value && index < 5) focusIndex(index + 1);
  };

  const handleKeyDown = (index, e) => {
    if (e.key !== 'Backspace') return;
    if (digits[index]) {
      setDigits((prev) => {
        const next = [...prev];
        next[index] = '';
        return next;
      });
      return;
    }
    if (index > 0) focusIndex(index - 1);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(oldPin)) {
      toast.error('PIN lama harus 6 digit angka');
      return;
    }
    if (currentPin && oldPin !== currentPin) {
      toast.error('PIN lama tidak sesuai');
      return;
    }
    if (pinValue.length !== 6) {
      toast.error('PIN baru harus 6 digit');
      return;
    }
    if (oldPin === pinValue) {
      toast.error('PIN baru harus berbeda dari PIN lama');
      return;
    }
    if (!email) {
      toast.error('Silakan login terlebih dahulu');
      return;
    }
    try {
      await dispatch(updateUserPin({ email, pin: pinValue })).unwrap();
      toast.success('PIN berhasil diubah');
      navigate('/profile');
    } catch (error) {
      toast.error(error?.message || 'PIN gagal diubah');
    }
  };

  return (
    <DashboardLayout>
      <section className="max-md:py-6 px-6 flex flex-col gap-8">
        <HeaderSection />
        <section className="bg-white border border-gray-200 rounded-md p-6 md:p-10">
          <form onSubmit={onSubmit} className="flex flex-col items-center gap-10">
            <div className="text-center">
              <h1 className="font-semibold text-gray-900">Change Pin</h1>
              <p className="text-gray-500 text-sm">Please save your pin because this so important.</p>
            </div>

            <div className="w-full max-w-md">
              <InputGroup
                id="oldPin"
                type="password"
                value={oldPin}
                onChange={(e) => {
                  setOldPin(e.target.value.replace(/\D/g, '').slice(0, 6));
                }}
                placeholder="Masukkan PIN lama (6 digit)"
                iconSrc="/assets/inputs/form/password.svg"
                iconAlt="old pin icon"
                isPassword={true}
                eyelashIconOpenSrc="/assets/inputs/form/eyelash-open.svg"
                eyelashIconCloseSrc="/assets/inputs/form/eyelash.svg"
                eyelashIconAlt="toggle password icon"
                inputMode="numeric"
                maxLength={6}
              >
                PIN Lama
              </InputGroup>
            </div>

            <div className="w-full flex justify-center gap-3 md:gap-6">
              {digits.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  type="password"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  className="border-b w-10 md:w-16 text-3xl md:text-4xl pb-4 outline-none text-center focus:border-blue-500"
                />
              ))}
            </div>

            <div className="w-full">
              <Button buttonColor={'bg-blue-600'} buttonTextColor={'text-white'} className={'rounded-md'}>
                Submit
              </Button>
            </div>
          </form>
        </section>
      </section>
    </DashboardLayout>
  );
}

export default ProfileChangePinPage;
