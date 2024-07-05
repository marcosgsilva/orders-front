import { useState } from "react";
import { useStatusContext } from "../providers/StatusProvider";
import DetalhesItem from "./Detail";

const ITEMS_PER_PAGE = 10;

const PaginationList = () => {
  const { ordersList } = useStatusContext();

  if (!ordersList) {
    return <div>Loading...</div>;
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleNextPage = () => {
    if (startIndex + ITEMS_PER_PAGE < items.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const items = ordersList.data;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const [modalOpenMap, setModalOpenMap] = useState<{ [key: number]: boolean }>(
    {}
  );

  const openModal = (id: number) => {
    setSelectedId(id);
    setModalOpenMap((prev) => ({
      ...prev,
      [id]: true, 
    }));
  };

  const closeModal = (id: number) => {
    setModalOpenMap((prev) => ({
      ...prev,
      [id]: false,
    }));
    setSelectedId(null);
  };

  return (
    <div className="p-4 w-full max-w-10xl mx-auto">
      <div className="bg-white shadow-md rounded-lg">
        <div className="bg-gray-200 text-gray-800 p-4 rounded-t-lg flex justify-between">
          <span className="font-bold w-1/4">Cliente</span>
          <span className="font-bold w-1/4">Descrição</span>
          <span className="font-bold w-1/4">Status</span>
          <span className="font-bold w-1/4">Quantidade</span>
          <span className="font-bold w-1/4">Detalhes</span>
        </div>
        <ul className="divide-y divide-gray-200">
          {selectedItems.map((item) => (
            <li key={item.id} className="p-4 flex justify-between">
              <span className="w-1/4">{item.customer_name}</span>
              <span className="w-1/4">{item.description}</span>
              <span className="w-1/4">{item.status}</span>
              <span className="w-1/4">{item.quantity}</span>
              <span className="w-1/4">
                <button
                  onClick={() => openModal(item.id)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 
        hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Detalhes
                </button>
                {modalOpenMap[item.id] && (
                  <DetalhesItem id={item.id} closeModal={() => closeModal(item.id)} />
                )}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between mt-4 p-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Anterior
          </button>
          <button
            onClick={handleNextPage}
            disabled={startIndex + ITEMS_PER_PAGE >= items.length}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginationList;
