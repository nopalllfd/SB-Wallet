import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboard } from '../../redux/slice/walletSlice';
import { currencyFormatter } from '../../utils/currency';

function StatCard({ title, iconSrc, amount, textColor }) {
  return (
    <div className="flex flex-col gap-2 items-start md:flex-1 md:border md:border-gray-200 md:rounded-md md:bg-white md:py-3 md:px-4 md:justify-center">
      <div className="flex gap-2 items-center">
        <img src={iconSrc} alt={`${title} icon`} className="hidden md:block" />
        <h2 className="md:text-base md:font-medium">{title}</h2>
      </div>

      <p className={`value flex md:text-xl md:mt-1 ${textColor}`}>
        <span className="font-bold md:ml-1 md:font-normal">{currencyFormatter.format(amount)}</span>
      </p>
    </div>
  );
}

function BalanceSection() {
  const dispatch = useDispatch();

  const { dashboard } = useSelector((state) => state.wallet);

  useEffect(() => {
    dispatch(getDashboard());
  }, [dispatch]);

  const data = [
    {
      id: 1,
      title: 'Balance',
      amount: dashboard?.balance || 0,
      iconSrc: '/assets/dashboard/balance.svg',
      textColor: 'text-slate-800',
    },
    {
      id: 2,
      title: 'Income',
      amount: dashboard?.income || 0,
      iconSrc: '/assets/dashboard/income.svg',
      textColor: 'text-emerald-600',
    },
    {
      id: 3,
      title: 'Expense',
      amount: dashboard?.expense || 0,
      iconSrc: '/assets/dashboard/expense.svg',
      textColor: 'text-rose-600',
    },
  ];

  return (
    <section className="relative flex">
      <div className="absolute top-0 left-0 right-0 h-30 bg-blue-700 md:bg-gray-50 border-t md:border-none border-gray-200 z-0"></div>

      <div className="container w-full h-full relative z-10 flex flex-col items-center justify-center">
        <div className="balance-card h-30 md:relative md:top-2 bg-white relative w-5/6 flex gap-8 text-xs py-5 justify-between px-6 rounded-2xl top-10 md:h-auto md:w-full md:max-w-4xl md:bg-transparent md:gap-2 md:px-0 md:py-0 md:justify-center">
          {data.map((item) => (
            <StatCard key={item.id} title={item.title} amount={item.amount} iconSrc={item.iconSrc} textColor={item.textColor} />
          ))}
        </div>

        <img className="absolute -bottom-10 rounded-b-2xl w-5/6 md:hidden" src="/assets/wave.svg" alt="wave icon" />
      </div>
    </section>
  );
}

export default BalanceSection;
