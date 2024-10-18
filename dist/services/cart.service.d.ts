import { CreateProductSales, ProductSalesDTO, RemoveItemRequest } from 'src/interfaces/cart.interfaces.dto';
import { OrderCart } from 'src/model/cart.model';
import { MstProduct } from 'src/model/mst.product.model';
import { OrderSales } from 'src/model/order.model';
import { ProductSales } from 'src/model/product.sales.model';
export declare class CartService {
    private Cart;
    private transactionModel;
    private CartItems;
    private mstProduct;
    constructor(Cart: typeof OrderCart, transactionModel: typeof OrderSales, CartItems: typeof ProductSales, mstProduct: typeof MstProduct);
    readAllMstProducts(): Promise<any>;
    createCart(): Promise<any>;
    createCartItems(payload: CreateProductSales): Promise<any>;
    readCartData(id: string): Promise<any>;
    readCartItemById(id: number): Promise<any>;
    readSpecificCartItems(payload: {
        name: string;
        productId: string;
        size: number;
        cartId: number;
    }): Promise<any>;
    updateCartItems(payload: {
        item: ProductSalesDTO;
        qty: number;
    }): Promise<any>;
    decreaseQtyCartItems(payload: ProductSalesDTO): Promise<any>;
    removeItemFromCart(payloadData: {
        cart_id: number;
        payload: RemoveItemRequest;
    }): Promise<any>;
    deleteCart(cart_id: number): Promise<any>;
    getCartById(cart_id: number): Promise<any>;
}
