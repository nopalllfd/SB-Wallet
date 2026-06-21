import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboard } from '../../redux/slice/walletSlice';
import { currencyFormatter } from '../../utils/currency';

// MUI ICONS
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

function StatCard({ title, amount, icon: Icon, color }) {
  return (
    <div
      className="
        flex items-center justify-between
        bg-white
        px-4 py-3
        rounded-xl
        border border-gray-100
        shadow-sm
        md:flex-col md:items-start
        md:p-5 md:gap-2
        hover:shadow-md transition-all duration-300
      "
    >
      {/* LEFT SIDE */}
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-lg bg-gray-50" style={{ color }}>
          <Icon fontSize="small" />
        </div>

        <h2 className="text-xs md:text-base font-medium text-gray-700">{title}</h2>
      </div>

      {/* RIGHT / AMOUNT */}
      <p className="text-sm md:text-xl font-semibold text-gray-900">{currencyFormatter.format(amount)}</p>
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
      icon: AccountBalanceWalletIcon,
      color: '#1f2937',
    },
    {
      id: 2,
      title: 'Income',
      amount: dashboard?.income || 0,
      icon: TrendingUpIcon,
      color: '#059669',
    },
    {
      id: 3,
      title: 'Expense',
      amount: dashboard?.expense || 0,
      icon: TrendingDownIcon,
      color: '#e11d48',
    },
  ];

  return (
    <section className="relative max-sm:pb-8 max-sm:rounded-b-2xl max-sm:w-scren pt-4 md:pt-6 bg-gradient-to-b from-blue-700 to-blue-600 md:from-transparent md:to-transparent">
      <div className="container mx-auto px-4">
        <div className="w-full max-w-5xl mx-auto flex flex-col gap-3 md:grid md:grid-cols-3 md:gap-6">
          {data.map((item) => (
            <StatCard key={item.id} title={item.title} amount={item.amount} icon={item.icon} color={item.color} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BalanceSection;
