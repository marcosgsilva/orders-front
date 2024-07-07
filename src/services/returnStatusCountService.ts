import { Orders } from "../models/OrdersModel";
import { MonthlyStatus } from "../models/MonthlyStatusModel";
import { orderStatusPerMonthService } from "./orderStatusPerMonthService";

export const returnStatusCountService = async (formData: Orders): Promise<MonthlyStatus[]> => {
  try {
    const data: MonthlyStatus[] = await orderStatusPerMonthService(formData);

    return data;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return [];
  }
};
