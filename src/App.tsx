
import './App.css'
import BubbleChart from './components/BubleChart'
import ChartComponent from './components/ChartComponent'
import DoughnutChart from './components/DoughnutChart'
import LineChart from './components/LineChart'
import PieChart from './components/PieChart'
import PolarAreaChart from './components/PolarAreaChart'
import Sidebar from './components/SideBar'

function App() {

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4 ml-1">
        <h1 className="text-2xl mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <ChartComponent />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <LineChart />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <PolarAreaChart />
          </div>
          <div className="bg-white p-4 rounded shadow">

            <DoughnutChart />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <PieChart />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <BubbleChart />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
