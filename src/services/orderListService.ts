import axios from "axios";
import { Orders } from "../models/OrdersModel";

const API_URL = "http://localhost:8000/api/orders/list";

export const orderListService = async (formData: Orders) => {
  try {
    const response = await axios.get(API_URL, {
      params: { ...formData },
    });


    return response;
  } catch (error) {
    console.log("Error fetching data", error);
    throw error;
  }
};
