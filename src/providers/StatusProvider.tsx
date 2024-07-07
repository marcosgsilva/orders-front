import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { OrdersModel } from "../models/OrdersModel";
import { orderListService } from "../services/orderListService";
import { orderStatusPerMonthService } from "../services/orderStatusPerMonthService";
import { OrdersPaginationModel } from "models/OrderPaginationModel";

interface OrderData {
  year: string;
  month: string;
  status: string;
  count: number;
}

const defaultOrderData: OrderData[] = [];
const defaultOrderModel: OrdersModel[] = [];

const StatusContext = createContext<{
  orderData: OrderData[];
  orderStatusData: OrderData[];
  orderListPagination: OrdersPaginationModel[];
  loading: boolean;
  error: string | null;
  fetchOrderData: (formData: OrdersModel) => void;
  fetchOrderDataByStatus: (formData: OrdersModel) => void;
}>({
  orderData: defaultOrderData,
  orderStatusData: defaultOrderData,
  orderListPagination: defaultOrderModel,
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
  const [orderListPagination, setOrderListPagination] = useState<OrdersModel[]>(defaultOrderModel);
  const [orderStatusData, setOrderStatusData] = useState<OrderData[]>(defaultOrderData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrderData = async (formData: OrdersModel) => {
    setLoading(true);
    try {
      const response = await orderListService(formData);
      setOrderListPagination(response.data);
      setLoading(false);
    } catch (error) {
      setError("Erro ao buscar dados");
      setLoading(false);
    }
  };

  const fetchOrderDataByStatus = async (formData: OrdersModel) => {
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
    const formData: OrdersModel = {
      id:0,
      status: "",
      customer_name: "",
      quantity: 0,
      description: "",
    };

    fetchOrderDataByStatus(formData);
    fetchOrderData(formData);
  }, []); 

  return (
    <StatusContext.Provider
      value={{
        orderData,
        orderListPagination,
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
