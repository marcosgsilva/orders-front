import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  LineElement,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';
import { ChartData } from '../models/ChartData';

// Registrando os componentes necessários do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  data: {
    year: string;
    month: string;
    status: string;
    count: number;
  }[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const [chartData, setChartData] = useState<ChartData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Agrupar os dados por mês e status
        const groupedData = data.reduce((acc, item) => {
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
        }, {});

        // Ordenar os meses para garantir a ordem correta no gráfico
        const sortedData = Object.values(groupedData).sort((a, b) =>
          a.month.localeCompare(b.month)
        );

        // Extrair labels e dados para o gráfico
        const months = sortedData.map((item) => item.month);
        const CANCELADO = sortedData.map((item) => item.CANCELADO);
        const PENDENTE = sortedData.map((item) => item.PENDENTE);
        const SUCESSO = sortedData.map((item) => item.SUCESSO);

        setChartData({
          labels: months,
          datasets: [
            {
              label: 'CANCELADO',
              data: CANCELADO,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
            {
              label: 'PENDENTE',
              data: PENDENTE,
              backgroundColor: 'rgba(255, 206, 86, 0.2)',
              borderColor: 'rgba(255, 206, 86, 1)',
              borderWidth: 1,
            },
            {
              label: 'SUCESSO',
              data: SUCESSO,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [data]);

  return (
    <div>
      {chartData ? (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Status Mensal de Pedidos',
              },
            },
          }}
        />
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default LineChart;
