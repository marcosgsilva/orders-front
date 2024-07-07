import { createContext, ReactNode, useContext, useState } from "react";
import { OrdersModel } from "../models/OrdersModel";
import { orderFindIdService } from "../services/orderFindIdService";

type DetailOrdersContextType = {
  detailOrder(id: number): Promise<OrdersModel>;
  orders: OrdersModel | null; // Inicialmente nulo até que os dados sejam carregados
};

const DetailOrdesContext = createContext<DetailOrdersContextType>({
  orders: null,
  detailOrder: async (id: number) => {
    return {} as OrdersModel;
  },
});

type DetailOrderProviderProps = {
  children: ReactNode;
};

export const DetailOrderProvider: React.FC<DetailOrderProviderProps> = ({
  children,
}) => {
  const [orders, setOrders] = useState<Orders | null>(null);

  const detailOrder = async (id: number): Promise<Orders> => {
    try {
      const order = await orderFindIdService(id);
      setOrders(order);
      return order;
    } catch (error) {
      console.log("Error ao Buscar contagens de status", error);
      throw error;
    }
  };

  return (
    <DetailOrdesContext.Provider value={{ orders, detailOrder }}>
      {children}
    </DetailOrdesContext.Provider>
  );
};

export const useDetailsContext = () => useContext(DetailOrdesContext);
