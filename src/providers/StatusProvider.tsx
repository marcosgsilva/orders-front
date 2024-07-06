import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Orders } from "../models/Orders";
import { orderListService } from "../services/orderListService";
import { orderStatusPerMonthService } from "../services/orderStatusPerMonthService";

interface OrderData {
  year: string;
  month: string;
  status: string;
  count: number;
}

const defaultOrderData: OrderData[] = [];

const StatusContext = createContext<{
  orderData: OrderData[];
  orderStatusData: OrderData[];
  loading: boolean;
  error: string | null;
  fetchOrderData: (formData: Orders) => void;
  fetchOrderDataByStatus: (formData: Orders) => void;
}>({
  orderData: defaultOrderData,
  orderStatusData: defaultOrderData,
  loading: true,
  error: null,
  fetchOrderData: () => {},
  fetchOrderDataByStatus: () => {},
});

interface StatusProviderProps {
  children: ReactNode;
}

export const StatusProvider: React.FC<StatusProviderProps> = ({ children }) => {
  const [orderData, setOrderData] = useState<OrderData[]>(defaultOrderData);
  const [orderStatusData, setOrderStatusData] = useState<OrderData[]>(defaultOrderData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrderData = async (formData: Orders) => {
    setLoading(true);
    try {
      const response = await orderListService(formData);
      setOrderData(response.data);
      setLoading(false);
    } catch (error) {
      setError("Erro ao buscar dados");
      setLoading(false);
    }
  };

  const fetchOrderDataByStatus = async (formData: Orders) => {
    setLoading(true);
    try {
      const response = await orderStatusPerMonthService(formData);
      setOrderStatusData(response); // Atualiza o estado correto
      setLoading(false);
    } catch (error) {
      setError("Erro ao buscar dados");
      setLoading(false);
    }
  };

  useEffect(() => {
    const formData: Orders = {
      status: "",
      customer_name: "",
      quantity: 0,
      description: "",
    };

    fetchOrderDataByStatus(formData);
    fetchOrderData(formData);
  }, []); // Executa apenas no carregamento inicial

  return (
    <StatusContext.Provider
      value={{
        orderData,
        orderStatusData,
        loading,
        error,
        fetchOrderData,
        fetchOrderDataByStatus,
      }}
    >
      {children}
    </StatusContext.Provider>
  );
};

export const useStatusContext = () => useContext(StatusContext);
