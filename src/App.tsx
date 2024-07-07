import React from 'react';
import './App.css';
import BarChart from './components/BarChart';
import DoughnutChart from './components/DoughnutChart';
import LineChart from './components/LineChart';
import PieChart from './components/PieChart';
import Sidebar from './components/SideBar';
import { StatusProvider, useStatusContext } from './providers/StatusProvider';
import { OrdersModel } from './models/OrdersModel';
import PolarAreaChart from './components/PolarAreaChart';
import PaginationList from './components/PaginationList';
import { DetailOrderProvider } from './providers/DetailProvider';

const MainContent = () => {
  const { error, orderData, orderStatusData,orderListPagination, fetchOrderDataByStatus, fetchOrderData } =
    useStatusContext();

  let handleSubmit = null;

  handleSubmit = async (formData: OrdersModel): Promise<void>=> {
    fetchOrderDataByStatus(formData);
    fetchOrderData(formData);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='flex'>
      <div className='w-64'>
        <Sidebar onSubmit={handleSubmit} />
      </div>
      <div className='flex-1 p-4'>
        <header className='w-full py-10'>
          <div className='mx-auto text-center'>
            <h1 className='text-3xl font-extrabold text-gray-400'>Análise de Pedidos</h1>
          </div>
        </header>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          <div className='bg-white p-4 rounded shadow'>
            <div className='w-full h-full'>
              <BarChart data={orderStatusData} />
            </div>
          </div>
          <div className='bg-white p-4 rounded shadow'>
            <div className='w-full h-full'>
              <DoughnutChart data={orderStatusData} />
            </div>
          </div>
          <div className='bg-white p-4 rounded shadow'>
            <div className='w-full h-full'>
              <LineChart data={orderStatusData} />
            </div>
          </div>
          <div className='bg-white p-4 rounded shadow'>
            <div className='w-full h-full'>
              <PieChart data={orderStatusData} />
            </div>
          </div>
          <div className='bg-white p-4 rounded shadow'>
            <div className='w-full h-full'>
              <PolarAreaChart data={orderStatusData} />
            </div>
          </div>
        </div>
        <PaginationList data={orderListPagination} />
      </div>
    </div>
  );
};

function App() {
  return (
    <StatusProvider>
      <DetailOrderProvider>
        <MainContent />
      </DetailOrderProvider>
    </StatusProvider>
  );
}

export default App;
