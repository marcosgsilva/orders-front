import axios from "axios";
import { Orders } from "../models/OrdersModel";

const API_URL = "http://localhost:8000/api/orders";

export const orderFindIdService = async (id: number): Promise<Orders>=> {
  try {
    const response = (await axios.get(API_URL + "/" + id));


    return response.data;
  } catch (error) {
    console.log("Error fetching data", error);
    throw error;
  }
};
