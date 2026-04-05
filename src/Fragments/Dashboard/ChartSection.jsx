import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Button } from '../../components/Button';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
function ChartSection() {
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
        display: false,
      },
      title: {
        display: false,
        text: 'Income Chart',
      },
    },
  };
  const data = {
    labels: ['Sat', 'Sun', 'Mo', 'Tue', 'We', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Pengunjung Aktif',
        data: [14000, 1500, 95000, 30000, 42000, 20000, 14000],
        backgroundColor: '#2954FA',
        borderRadius: 4,
      },
    ],
  };
  return (
    <section className="px-8 mt-6 md:mt-0 flex flex-col gap-6 md:px-2 md:py-4 md:border md:border-gray-200 md:bg-white md:rounded-md">
      <header className="flex justify-around md:justify-between gap-2">
        <h2 className="title flex font-semibold text-md">Income Chart</h2>
        <div className="buttons flex gap-2 items-center justify-center">
          <button className="bg-gray-300 px-5 py-1 text-sm rounded-md">Income</button>
          <button className="bg-gray-300 px-5 py-1 text-sm rounded-md">7 Days</button>
        </div>
      </header>
      <div className="chart">
        <div className="w-full h-50 md:h-80">
          <Bar
            options={options}
            data={data}
          />
        </div>
      </div>
    </section>
  );
}

export default ChartSection;
