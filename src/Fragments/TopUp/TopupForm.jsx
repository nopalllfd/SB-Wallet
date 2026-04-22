import React, { useState } from 'react';
import { InputGroup } from '../../components/Input';

function TopupForm({ onChange, amount }) {
  const [selected, setSelected] = useState(null);

  console.log(selected);
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
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-semibold text-gray-900">Amount</h2>
      <p className="text-gray-500 text-sm">Type the amount you want to top up and then press continue to the next steps.</p>
      <InputGroup
        value={amount}
        onChange={(e) => onChange(e.target.value)}
        iconSrc={'assets/transfer/money.svg'}
        placeholder={'Enter nominal top up'}
      />
      <h2 className="font-semibold text-gray-900">Payment Method</h2>
      <p className="text-gray-500 text-sm">Choose your payment method for top up account.</p>
      {paymentsMethod.map((payment) => (
        <label
          key={payment.slug}
          className={`cursor-pointer select-none rounded-md px-8 py-4 justify-start flex gap-10 items-center ${
            selected === payment.slug ? 'bg-blue-200' : 'bg-gray-200'
          }`}
        >
          <input
            type="radio"
            name="paymentMethod"
            value={payment.slug}
            checked={selected === payment.slug}
            onChange={() => setSelected(payment.slug)}
            className="hidden"
          />
          <img width={32} height={32} src={`assets/payment/${payment.slug}.svg`} alt={`${payment.name} icon`} />
          <p>{payment.name}</p>
        </label>
      ))}
    </section>
  );
}

export default TopupForm;
