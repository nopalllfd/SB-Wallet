import React from 'react';

const balanceData = [
  {
    id: 1,
    title: 'Balance',
    amount: '500.000',
    percentage: '+2%',
    percentageColor: 'text-green-400',
    iconSrc: 'public/assets/dashboard/balance.svg',
    chartIconSrc: 'public/assets/dashboard/up-chart.svg',
  },
  {
    id: 2,
    title: 'Income',
    amount: '500.000',
    percentage: '+11.01%',
    percentageColor: 'text-green-400',
    iconSrc: 'public/assets/dashboard/income.svg',
    chartIconSrc: 'public/assets/dashboard/up-chart.svg',
  },
  {
    id: 3,
    title: 'Expense',
    amount: '500.000',
    percentage: '-5.06%',
    percentageColor: 'text-red-500',
    iconSrc: 'public/assets/dashboard/expense.svg',
    chartIconSrc: 'public/assets/dashboard/down-chart.svg',
  },
];

function StatCard({ title, iconSrc, amount, chartIconSrc, percentage, percentageColor }) {
  return (
    <div className="flex flex-col gap-2 items-start md:flex-1 md:border md:border-gray-200 md:rounded-md md:bg-white md:py-3 md:px-4 md:justify-center">
      <div className="flex gap-2 items-center">
        <img
          src={iconSrc}
          alt={`${title} icon`}
          className="hidden md:block"
        />
        <h2 className="md:text-base  md:font-medium">{title}</h2>
      </div>
      <p className="value flex md:text-xl md:mt-1">
        Rp. <span className="font-bold md:ml-1 md:font-normal">{amount}</span>
      </p>
      {percentage && (
        <div className="flex gap-2">
          <p className={`${percentageColor} text-xs md:text-sm md:font-medium`}>{percentage}</p>
          <img
            src={chartIconSrc}
            alt={`${{ chartIconSrc }} icon`}
          />
        </div>
      )}
    </div>
  );
}

function BalanceSection() {
  return (
    <section className="relative flex">
      <div className="absolute top-0 left-0 right-0 h-30 bg-blue-700 md:bg-gray-50 border-t md:border-none border-gray-200 z-0"></div>

      <div className="container w-full h-full relative z-10 flex flex-col items-center justify-center">
        <div className="balance-card h-30 md:relative md:top-2 bg-white relative w-5/6 flex gap-8 text-xs py-5 justify-between px-6 rounded-2xl top-10 md:h-auto md:w-full md:max-w-4xl md:bg-transparent md:gap-6 md:px-0 md:py-0 md:justify-center">
          {balanceData.map((item) => (
            <StatCard
              iconSrc={item.iconSrc}
              key={item.id}
              title={item.title}
              amount={item.amount}
              percentage={item.percentage}
              percentageColor={item.percentageColor}
              chartIconSrc={item.chartIconSrc}
            />
          ))}
        </div>

        <img
          className="absolute -bottom-10 rounded-b-2xl w-5/6 md:hidden"
          src="/assets/wave.svg"
          alt="wave icon"
        />
      </div>
    </section>
  );
}

export default BalanceSection;
