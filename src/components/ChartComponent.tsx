// src/components/ChartComponent.tsx
import React, { useEffect, useState } from 'react';
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
import { MonthlyStatus, fetchMonthlyStatus } from '../services/apiService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent: React.FC = () => {

  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchMonthlyStatus();
        const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        const counts: { [key: string]: number[] } = { CANCELADO: [], PENDENTE: [], SUCESSO: [] };
        for (let i = 0; i < data.length; i++) {
          const statusKey = data[i].status.trim(); // Remove any extra spaces


          if (!counts[statusKey]) {
            counts[statusKey] = []; // Initialize if not already
          }
          if (data[i].count !== undefined) {
            counts[statusKey].push(data[i].count);
          }

        }
        console.log(counts)

        const datasets = [
          {
            label: 'CANCELADO',
            data: counts.CANCELADO,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
          {
            label: 'PENDENTE',
            data: counts.PENDENTE,
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
          },
          {
            label: 'SUCESSO',
            data: counts.SUCESSO,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ];

        setChartData({
          labels: labels,
          datasets: datasets
        });

      } catch (error) {
        console.log(error)
      }
    };
    getData();

  }, []);

  return (
    <div>
      {chartData ? (
        <Bar
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

export default ChartComponent;
