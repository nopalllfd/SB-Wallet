import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import { Button } from '../components/Button';
import { InputGroup } from '../components/Input';
import HeaderSection from '../Fragments/Profile/HeaderSection';
import { DashboardLayout } from '../Layouts/DashboardLayout';
import { changePin } from '../redux/slice/authSlice';

function ProfileChangePinPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

    if (value && index < 5) {
      focusIndex(index + 1);
    }
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

    if (index > 0) {
      focusIndex(index - 1);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{6}$/.test(pinValue)) {
      toast.error('PIN baru harus 6 digit angka');
      return;
    }
    try {
      await dispatch(
        changePin({
          pin: pinValue,
        }),
      ).unwrap();

      toast.success('PIN berhasil diubah');
      navigate('/profile');
    } catch (error) {
      toast.error(error || 'PIN gagal diubah');
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
              <p className="text-gray-500 text-sm">Please save your PIN because it is very important.</p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <p className="text-sm text-gray-600 font-medium">PIN Baru</p>

              <div className="w-full flex justify-center gap-3 md:gap-6">
                {digits?.map((digit, index) => (
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
            </div>

            <div className="w-full">
              <Button buttonColor="bg-blue-600" buttonTextColor="text-white" className="rounded-md">
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
