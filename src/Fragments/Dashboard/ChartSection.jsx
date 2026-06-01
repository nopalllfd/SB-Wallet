import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { getTrxChart } from '../../redux/slice/transactionSlice';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ChartSection() {
  const [type, setType] = useState('all');
  const [period, setPeriod] = useState('7d');

  const dispatch = useDispatch();

  const data = useSelector((state) => state.transaction.chart || []);

  useEffect(() => {
    dispatch(
      getTrxChart({
        type,
        period,
      }),
    );
  }, [dispatch, type, period]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: false,
      },
    },
  };

  let chartData = {
    labels: [],
    datasets: [],
  };

  if (type === 'all') {
    const grouped = data.reduce((acc, item) => {
      const date = item.date.split('T')[0];

      if (!acc[date]) {
        acc[date] = {
          income: 0,
          expense: 0,
        };
      }

      if (item.type === 'in') {
        acc[date].income += item.amount;
      }

      if (item.type === 'out') {
        acc[date].expense += item.amount;
      }

      return acc;
    }, {});

    const dates = Object.keys(grouped).sort((a, b) => new Date(a) - new Date(b));

    chartData = {
      labels: dates.map((date) =>
        new Date(date).toLocaleDateString('id-ID', {
          weekday: 'short',
        }),
      ),
      datasets: [
        {
          label: 'Income',
          data: dates.map((date) => grouped[date].income),
          backgroundColor: '#2954FA',
          borderRadius: 4,
        },
        {
          label: 'Expense',
          data: dates.map((date) => grouped[date].expense),
          backgroundColor: '#FF0000',
          borderRadius: 4,
        },
      ],
    };
  } else {
    chartData = {
      labels: data.map((item) =>
        new Date(item.date).toLocaleDateString('id-ID', {
          weekday: 'short',
        }),
      ),
      datasets: [
        {
          label: type === 'in' ? 'Income' : 'Expense',
          data: data.map((item) => item.amount),
          backgroundColor: type === 'in' ? '#2954FA' : '#FF0000',
          borderRadius: 4,
        },
      ],
    };
  }

  return (
    <section className="px-8 mt-6 md:mt-0 flex flex-col gap-6 md:px-2 md:py-4 md:border md:border-gray-200 md:bg-white md:rounded-md">
      <header className="flex justify-around md:justify-between gap-2">
        <h2 className="font-semibold text-md">Transaction Chart</h2>

        <div className="flex gap-2">
          <select value={type} onChange={(e) => setType(e.target.value)} className="px-3 py-1 text-sm border border-gray-300 rounded-md bg-white">
            <option value="all">All</option>
            <option value="in">Income</option>
            <option value="out">Expense</option>
          </select>

          <select value={period} onChange={(e) => setPeriod(e.target.value)} className="px-3 py-1 text-sm border border-gray-300 rounded-md bg-white">
            <option value="7d">7 Days</option>
            <option value="1m">1 Month</option>
          </select>
        </div>
      </header>

      <div className="w-full h-50 md:h-80">
        <Bar options={options} data={chartData} />
      </div>
    </section>
  );
}

export default ChartSection;
