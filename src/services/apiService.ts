import axios from 'axios';

export interface MonthlyStatus {
    year: string;
    month: string;
    status: 'CANCELADO' | 'PENDENTE' | 'SUCESSO';
    count: number;
}

const API_URL = 'http://localhost:8000/api/orders/monthly-status';

export const fetchMonthlyStatus = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data.data;
    } catch (error) {
        console.log('Error fetching data', error);
        throw error;
    }
}