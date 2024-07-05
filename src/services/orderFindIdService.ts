import axios from "axios";
import { Orders } from "../models/Orders";

const API_URL = "http://localhost:8000/api/orders";

export const orderFindIdService = async (id: number): Promise<Orders>=> {
  try {
    const response: Orders = (await axios.get(API_URL + "/" + id));


    return response;
  } catch (error) {
    console.log("Error fetching data", error);
    throw error;
  }
};
