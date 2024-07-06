import React, { ChangeEvent, useState, useEffect } from "react";
import { Orders } from "../models/Orders";
import { useStatusContext } from "../providers/StatusProvider";

interface FormData {
  status: string;
  customerName: string;
  description: string;
  quantity: number;
}

interface SidebarProps {
  onSubmit: (formData: FormData) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSubmit }) => {
  const { orderStatusData, fetchOrderDataByStatus, orderData, fetchOrderData } = useStatusContext();
  const [formData, setFormData] = useState<FormData>({
    status: "",
    customerName: "",
    description: "",
    quantity: 0,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const orders: Orders = {
      status: formData.status,
      customer_name: formData.customerName,
      quantity: formData.quantity,
      description: formData.description,
    };

    fetchOrderDataByStatus(orders);
    fetchOrderData(orders);
    onSubmit(formData);
    console.log(orderData)

  };

  useEffect(() => {
    console.log(orderData)

  }, [orderStatusData, orderData]);

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-4">
      <div className="p-4 text-lg font-bold">Filtros</div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="customerName"
            className="block text-sm font-medium text-gray-400"
          >
            Cliente
          </label>
          <input
            type="text"
            name="customerName"
            id="customerName"
            value={formData.customerName}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none
             focus:ring-indigo-500 sm:text-sm bg-gray-700 text-white"
          />
        </div>
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-400"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm bg-gray-700 text-white"
          >
            <option value="">Selecione o status</option>
            <option value="CANCELADO">CANCELADO</option>
            <option value="PENDENTE">PENDENTE</option>
            <option value="SUCESSO">SUCESSO</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-400"
          >
            Descrição
          </label>
          <input
            type="text"
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none
             focus:ring-indigo-500 sm:text-sm bg-gray-700 text-white"
          />
        </div>
        <div>
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-400"
          >
            Quantidade
          </label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none
             focus:ring-indigo-500 sm:text-sm bg-gray-700 text-white"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 
        hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Pesquisar
        </button>
      </form>
    </div>
  );
};

export default Sidebar;
