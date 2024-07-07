export interface MonthlyStatusModel {
    year: string;
    month: string;
    status: 'CANCELADO' | 'PENDENTE' | 'SUCESSO';
    count: number;
}