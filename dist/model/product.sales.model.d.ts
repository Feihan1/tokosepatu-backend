import { Model } from 'sequelize-typescript';
import { OrderCart } from './cart.model';
import { MstProduct } from './mst.product.model';
export declare class ProductSales extends Model<ProductSales> {
    cart_detail: OrderCart;
    cart_id: number;
    product_detail: MstProduct;
    product_id: number;
    item_name: string;
    item_qty: number;
    item_amount: number;
    item_size: number;
    item_image: string;
    item_code: string;
}
