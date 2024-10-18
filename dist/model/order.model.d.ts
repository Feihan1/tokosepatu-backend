import { Model } from 'sequelize-typescript';
import { OrderPaymentStatus } from 'src/interfaces/order.interfaces.dto';
import { OrderCart } from './cart.model';
export declare class OrderSales extends Model<OrderSales> {
    cart_id: number;
    cart_detail: OrderCart;
    first_name: string;
    email: string;
    address: string;
    province: string;
    regency: string;
    subdistrict: string;
    village: string;
    zip_code: string;
    phone_number: string;
    payment_status: OrderPaymentStatus;
    payment_method: string;
    total_amount: number;
    transaction_number: string;
}
