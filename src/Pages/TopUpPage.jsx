import React, { useState } from 'react';
import { DashboardLayout } from '../Layouts/DashboardLayout';
import HeaderSection from '../Fragments/TopUp/HeaderSection';
import AccountCard from '../Fragments/TopUp/AccountCard';
import TopupForm from '../Fragments/TopUp/TopupForm';
import Cart from '../Fragments/TopUp/Cart';

function TopUpPage() {
  const [amount, setAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const onAmountSet = (amount) => {
    setAmount(amount);
  };

  const handlePaymentSelect = (method) => {
    setPaymentMethod(method);
  };

  const handleAfterSubmit = () => {
    setIsSubmitted(false);
    setPaymentMethod('');
    setFormKey((k) => k + 1);
  };

  return (
    <DashboardLayout>
      <section className="max-md:py-6 px-6 flex flex-col gap-8">
        <HeaderSection />
        <div className="bg-white md:border md:p-6 md:border-gray-300 md:rounded-md md:py-4">
          <section className="flex flex-col gap-6 md:flex-row md:items-start md:gap-6">
            <div className="flex flex-col gap-6 md:flex-1">
              <AccountCard />
              <TopupForm key={formKey} amount={amount} onChange={onAmountSet} onPaymentSelect={handlePaymentSelect} isSubmitted={isSubmitted} />
            </div>
            <div className="md:w-[26rem]">
              <Cart
                amount={amount}
                setAmount={setAmount}
                paymentMethod={paymentMethod}
                onSubmitAttempt={() => setIsSubmitted(true)}
                onAfterSubmit={handleAfterSubmit}
              />
            </div>
          </section>
        </div>
      </section>
    </DashboardLayout>
  );
}

export default TopUpPage;
