import { PolarArea } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PolarAreaController,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PolarAreaController,
);

interface DataProps {
  data: {
    year: string;
    month: string;
    status: string;
    count: number;
  }[];
}

const PolarAreaChart: React.FC<DataProps> = ({ data }) => {
  // Filtrar e organizar os dados por tipo de status e mês
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

      // Adicionar contagem ao tipo de status correto
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

  // Ordenar os meses para garantir a ordem correta no gráfico
  const sortedData = Object.values(groupedData).sort((a, b) =>
    a.month.localeCompare(b.month),
  );

  // Extrair labels e dados para o gráfico
  const CANCELADO = sortedData.map((item) => item.CANCELADO);
  const PENDENTE = sortedData.map((item) => item.PENDENTE);
  const SUCESSO = sortedData.map((item) => item.SUCESSO);

  const chartData = {
    labels: ['CANCELADO', 'PENDENTE', 'SUCESSO'],
    datasets: [
      {
        label: 'Status Mensal',
        data: [
          CANCELADO.reduce((a, b) => a + b, 0),
          PENDENTE.reduce((a, b) => a + b, 0),
          SUCESSO.reduce((a, b) => a + b, 0),
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderWidth: 1,
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Polar Area Chart',
      },
    },
    scales: {
      r: {
        ticks: {
          display: false,
        },
      },
    },
  };

  return (
    <div style={{ height: '300px', width: '300px', margin: 'auto' }}>
      <PolarArea data={chartData} options={options} />
    </div>
  );
};

export default PolarAreaChart;
