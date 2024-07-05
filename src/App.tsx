import React, { useState } from "react";
import "./App.css";
import BarChart from "./components/BarChart";
import DoughnutChart from "./components/DoughnutChart";
import LineChart from "./components/LineChart";
import PieChart from "./components/PieChart";
import Sidebar from "./components/SideBar";
import { StatusProvider, useStatusContext } from "./providers/StatusProvider";
import { Orders } from "./models/Orders";
import PolarAreaChart from "./components/PolarAreaChart";

const MainContent = () => {
  const { error, orderStatusData, fetchOrderDataByStatus } = useStatusContext();
  const [sideMenuIsExpand, setSideMenuIsExpand] = useState(true);

  let handleSubmit = null;

  handleSubmit = async (formData: Orders) => {
    fetchOrderDataByStatus(formData);
    console.log(orderStatusData);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex">
      <div className="w-64">
        <Sidebar onSubmit={handleSubmit} />
        <div
          className={`flex-1 min-h-screen mx-0 bg-slate-100 transition-all duration-300 ease-in-out ${
            sideMenuIsExpand ? "md:ml-72" : "md:ml-20"
          }`}
        ></div>
      </div>

      {/* <button
            className="bg-blue-500 text-white py-4 py-2 rounded"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? "Fechar Sidebar" : "Abrir Sidebar"}
          </button> */}
      <div className="flex-1 p-4">
        <header className="w-full py-10">
          <div className="mx-auto text-center">
            <h1 className="text-3xl font-extrabold text-gray-400">
              Análise de Pedidos
            </h1>
          </div>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <div className="w-full h-full">
              <BarChart data={orderStatusData} />
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <div className="w-full h-full">
              <DoughnutChart data={orderStatusData} />
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <div className="w-full h-full">
              <LineChart data={orderStatusData} />
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <div className="w-full h-full">
              <PieChart data={orderStatusData} />
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <div className="w-full h-full">
              <PolarAreaChart data={orderStatusData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <StatusProvider>
      <MainContent />
    </StatusProvider>
  );
}

export default App;
