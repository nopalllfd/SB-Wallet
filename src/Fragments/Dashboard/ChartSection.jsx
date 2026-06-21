import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

import { useDispatch, useSelector } from 'react-redux';
import { getTrxChart } from '../../redux/slice/transactionSlice';

// MUI
import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';

import BarChartIcon from '@mui/icons-material/BarChart';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ChartSection() {
  const [type, setType] = useState('all');
  const [period, setPeriod] = useState('7d');

  const dispatch = useDispatch();
  const data = useSelector((state) => state.transaction.chart || []);

  useEffect(() => {
    dispatch(getTrxChart({ type, period }));
  }, [dispatch, type, period]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#f1f5f9',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
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
        acc[date] = { income: 0, expense: 0 };
      }

      if (item.type === 'in') acc[date].income += item.amount;
      if (item.type === 'out') acc[date].expense += item.amount;

      return acc;
    }, {});

    const dates = Object.keys(grouped).sort((a, b) => new Date(a) - new Date(b));

    chartData = {
      labels: dates.map((date) => new Date(date).toLocaleDateString('en-US', { weekday: 'short' })),
      datasets: [
        {
          label: 'Income',
          data: dates.map((date) => grouped[date].income),
          backgroundColor: '#2954FA',
          borderRadius: 6,
        },
        {
          label: 'Expense',
          data: dates.map((date) => grouped[date].expense),
          backgroundColor: '#EF4444',
          borderRadius: 6,
        },
      ],
    };
  } else {
    chartData = {
      labels: data.map((item) =>
        new Date(item.date).toLocaleDateString('en-US', {
          weekday: 'short',
        }),
      ),
      datasets: [
        {
          label: type === 'in' ? 'Income' : 'Expense',
          data: data.map((item) => item.amount),
          backgroundColor: type === 'in' ? '#2954FA' : '#EF4444',
          borderRadius: 6,
        },
      ],
    };
  }

  return (
    <section className="mt-6 md:mt-0 px-4">
      <div className="mx-auto max-w-5xl bg-white border border-gray-100 shadow-sm rounded-xl p-3 md:p-6">
        {/* HEADER */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
          {/* TITLE */}
          <div className="flex items-center gap-2 text-gray-700">
            <BarChartIcon fontSize="small" />
            <h2 className="font-semibold text-sm md:text-base">Transaction Chart</h2>
          </div>

          {/* FILTERS */}
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <FormControl size="small" className="w-full sm:w-auto">
              <InputLabel>Type</InputLabel>
              <Select value={type} label="Type" onChange={(e) => setType(e.target.value)}>
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="in">Income</MenuItem>
                <MenuItem value="out">Expense</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" className="w-full sm:w-auto">
              <InputLabel>Period</InputLabel>
              <Select value={period} label="Period" onChange={(e) => setPeriod(e.target.value)}>
                <MenuItem value="7d">7 Days</MenuItem>
                <MenuItem value="1m">1 Month</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        {/* CHART */}
        <div className="w-full h-56 sm:h-64 md:h-96">
          <Bar options={options} data={chartData} />
        </div>
      </div>
    </section>
  );
}

export default ChartSection;
