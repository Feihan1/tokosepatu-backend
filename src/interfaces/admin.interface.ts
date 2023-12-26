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