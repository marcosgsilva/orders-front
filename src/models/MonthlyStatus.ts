export interface MonthlyStatus {
    year: string;
    month: string;
    status: 'CANCELADO' | 'PENDENTE' | 'SUCESSO';
    count: number;
}