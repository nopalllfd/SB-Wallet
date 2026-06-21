import React, { useEffect, useState } from 'react';
import { InputGroup } from '../../components/Input';
import { useDispatch, useSelector } from 'react-redux';
import { getMethods } from '../../redux/slice/transactionSlice';

// MUI ICON
import PaymentsIcon from '@mui/icons-material/Payments';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

function TopupForm({ onChange, amount, onPaymentSelect, isSubmitted }) {
  const [selected, setSelected] = useState(null);
  const dispatch = useDispatch();
  const { methods } = useSelector((state) => state.transaction);

  useEffect(() => {
    dispatch(getMethods());
  }, [dispatch]);

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    onChange(value ? Number(value) : '');
  };

  const formatRupiah = (value) =>
    value
      ? new Intl.NumberFormat('id-ID').format(value)
      : '';

  return (
    <section className="flex flex-col gap-5 w-full">

      <div className="flex items-center gap-2">
        <LocalAtmIcon className="text-blue-700" />
        <h2 className="font-semibold">Amount</h2>
      </div>

      <p className="text-sm text-gray-500">
        Type the amount you want to top up.
      </p>

      <InputGroup
        value={formatRupiah(amount)}
        onChange={handleAmountChange}
        iconSrc="/assets/transfer/money.svg"
        placeholder="Rp 0"
      />

      <div className="flex items-center gap-2 mt-4">
        <PaymentsIcon className="text-blue-700" />
        <h2 className="font-semibold">Payment Method</h2>
      </div>

      <p className="text-sm text-gray-500">
        Choose your payment method.
      </p>

      {isSubmitted && !selected && (
        <p className="text-red-500 text-sm">
          Please select a payment method
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {methods?.map((p) => (
          <label
            key={p.id}
            className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition
            ${selected === p.id ? 'border-blue-500 bg-blue-50' : 'bg-white hover:bg-gray-50'}`}
          >
            <input
              type="radio"
              className="hidden"
              checked={selected === p.id}
              onChange={() => {
                setSelected(p.id);
                onPaymentSelect?.(p.id);
              }}
            />

            <img
              src={`/assets/payment/${p.slug}.svg`}
              className="w-8 h-8"
            />

            <span className="text-sm font-medium">
              {p.name}
            </span>
          </label>
        ))}
      </div>
    </section>
  );
}

export default TopupForm;