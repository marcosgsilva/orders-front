export interface OrdersPaginationModel{
    id: number;
    status: string;
    customer_name: string;
    description: string;
    quantity: number;
    created_at?: Date | undefined;
}