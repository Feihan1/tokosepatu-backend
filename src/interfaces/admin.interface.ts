export interface Admin {
    username: string;
    password: string;
  }
  export type CreateMstProduct = {
    item_code: string
    item_name: string
    item_brand: string
    item_category: string
    item_qty: number
    item_amount: number
    item_gender: string
    image:Buffer
}

export class UpdateProductDto {
  item_qty?: number;
  item_amount?: number;
}

export interface TransactionListWithProducts {
  id: number;
  transaction_number: string;
  payment_status: string;
  products: ProductDetails[];
  total_amount: string;
}

export interface ProductDetails {
  cart_id: number;
  item_code: string;
  item_name: string;
  item_qty: number;
  item_amount: number;
}
