/* eslint-disable react/prop-types */
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

interface DataProps {
  data: {
    year: number;
    month: number;
    status: string;
    count: number;
  }[];
}
// Registrando os componentes necessários do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const BarChart: React.FC<DataProps> = ({ data }) => {
  const groupedData: Record<string, ChartDataItemModel> = data.reduce(
    (acc: Record<string, ChartDataItemModel>, item) => {
      const key = `${item.year}-${item.month}`;
      if (!acc[key]) {
        acc[key] = {
          month: `${item.month}/${item.year}`,
          CANCELADO: 0,
          PENDENTE: 0,
          SUCESSO: 0,
        };
      }

      if (item.status === 'CANCELADO ') {
        acc[key].CANCELADO += item.count;
      } else if (item.status === 'PENDENTE  ') {
        acc[key].PENDENTE += item.count;
      } else if (item.status === 'SUCESSO   ') {
        acc[key].SUCESSO += item.count;
      }

      return acc;
    },
    {},
  );

  const sortedData = Object.values(groupedData).sort((a, b) =>
    a.month.localeCompare(b.month),
  );

  const labels = sortedData.map((item) => item.month);
  const CANCELADO = sortedData.map((item) => item.CANCELADO);
  const PENDENTE = sortedData.map((item) => item.PENDENTE);
  const SUCESSO = sortedData.map((item) => item.SUCESSO);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'CANCELADO',
        data: CANCELADO,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'PENDENTE',
        data: PENDENTE,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'SUCESSO',
        data: SUCESSO,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
