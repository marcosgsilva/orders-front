// src/components/PieChart.tsx

import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface PieChartProps {
  data: { year: string; month: string; status: string; count: number }[];
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const statusGroups: { [key: string]: number } = {
    CANCELADO: 0,
    PENDENTE: 0,
    SUCESSO: 0,
  };

  data.forEach((item) => {
    const key = item.status.trim();
    if (key in statusGroups) {
      statusGroups[key] += item.count;
    }
  });

  const labels = Object.keys(statusGroups);
  const datasets = [
    {
      data: Object.values(statusGroups),
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(75, 192, 192, 0.6)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 1,
    },
  ];

  const chartData = {
    labels: labels,
    datasets: datasets,
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Total de Status',
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ height: '300px', width: '100%', margin: 'auto' }}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
