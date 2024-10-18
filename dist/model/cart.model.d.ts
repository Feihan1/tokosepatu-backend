import { Model } from 'sequelize-typescript';
import { ProductSales } from './product.sales.model';
import { OrderSales } from './order.model';
export declare class OrderCart extends Model<OrderCart> {
    product_item: ProductSales[];
    cart_detail: OrderSales;
    active: boolean;
}
