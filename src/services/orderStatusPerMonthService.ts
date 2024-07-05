import axios from "axios";
import { Orders } from "../models/Orders";

const API_URL = "http://localhost:8000/api/orders/monthly-status";

export const orderStatusPerMonthService = async (formData: Orders) => {

  try {
    const response = await axios.get(API_URL, {
      params: { ...formData },
    });
    console.log("STATUS",response)
    return response.data.data;
  } catch (error) {
    console.log("Error fetching data", error);
    throw error;
  }
};
