export declare class RemoveItemRequest {
    id: number;
    product_name: string;
    product_qty: number;
    product_amount: number;
    product_code: string;
}
export declare class CreateProductRequest {
    product_name: string;
    product_qty: number;
    product_amount: number;
    product_size: number;
    product_image: string;
    product_code: string;
}
export declare class CreateCartRequest {
    product_data: CreateProductRequest[];
}
export type CreateProductSales = {
    cart_id: number;
    product_id: number;
    item_name: string;
    item_qty: number;
    item_amount: number;
    item_size: number;
    item_image: string;
    item_code: string;
};
export type ProductSalesDTO = {
    id: number;
    cart_id: number;
    item_name: string;
    item_qty: number;
    item_amount: number;
    item_code: string;
};
export declare class AddCartRequest {
    cart_id: number;
    product_id: number;
    product_data: CreateProductRequest[];
}
export declare class RemoveItemFromCartRequest {
    cart_id: number;
    product_data: RemoveItemRequest[];
}
