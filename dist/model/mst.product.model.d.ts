import { Model } from 'sequelize-typescript';
import { ProductSales } from './product.sales.model';
export declare class MstProduct extends Model<MstProduct> {
    product_item: ProductSales[];
    item_code: string;
    item_name: string;
    item_brand: string;
    item_category: string;
    item_qty: number;
    item_amount: number;
    item_gender: string;
    item_image_url: string;
    active: boolean;
}
