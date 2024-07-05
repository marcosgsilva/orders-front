import { Orders } from "../models/Orders";
import { MonthlyStatus } from "../models/MonthlyStatus";
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
