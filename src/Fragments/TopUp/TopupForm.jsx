import React, { useState } from 'react';
import { InputGroup } from '../../components/Input';

function TopupForm({ onChange, amount, onPaymentSelect, isSubmitted }) {
  const [selected, setSelected] = useState(null);

  const paymentsMethod = [
    {
      name: 'Bank Rakyat Indonesia',
      slug: 'bri',
    },
    {
      name: 'Dana',
      slug: 'dana',
    },
    {
      name: 'Bank Central Asia',
      slug: 'bca',
    },
    {
      name: 'Gopay',
      slug: 'gopay',
    },
    {
      name: 'Ovo',
      slug: 'ovo',
    },
  ];

  const handleAmountChange = (e) => {
    const rawValue = e.target.value;
    const cleanValue = rawValue.replace(/[^0-9]/g, '');

    if (cleanValue === '') {
      onChange('');
      return;
    }

    onChange(Number(cleanValue));
  };

  const formatRupiah = (value) => {
    if (!value) return '';
    return new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handlePaymentChange = (slug) => {
    setSelected(slug);
    if (onPaymentSelect) {
      onPaymentSelect(slug);
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-semibold text-gray-900">Amount</h2>
      <p className="text-gray-500 text-sm">Type the amount you want to top up and then press continue to the next steps.</p>

      <InputGroup value={formatRupiah(amount)} onChange={handleAmountChange} iconSrc={'assets/transfer/money.svg'} placeholder={'Rp 0'} />

      <h2 className="font-semibold text-gray-900 mt-4">Payment Method</h2>
      <p className="text-gray-500 text-sm">Choose your payment method for top up account.</p>

      {isSubmitted && !selected && <p className="text-red-500 text-sm font-medium">Please select a payment method to continue.</p>}

      {paymentsMethod.map((payment) => (
        <label
          key={payment.slug}
          className={`cursor-pointer select-none rounded-md px-8 py-4 justify-start flex gap-10 items-center border-2 transition-all ${
            selected === payment.slug ? 'bg-blue-100 border-blue-500' : 'bg-gray-50 border-transparent hover:bg-gray-200'
          }`}
        >
          <input
            type="radio"
            name="paymentMethod"
            value={payment.slug}
            checked={selected === payment.slug}
            onChange={() => handlePaymentChange(payment.slug)}
            className="hidden"
          />
          <img width={32} height={32} src={`assets/payment/${payment.slug}.svg`} alt={`${payment.name} icon`} />
          <p className={selected === payment.slug ? 'font-semibold text-blue-700' : 'text-gray-700'}>{payment.name}</p>
        </label>
      ))}
    </section>
  );
}

export default TopupForm;
