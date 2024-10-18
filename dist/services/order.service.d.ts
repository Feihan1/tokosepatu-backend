import { CreateTransactionRequest, UpdateStatusNotification } from 'src/interfaces/order.interfaces.dto';
import { OrderCart } from 'src/model/cart.model';
import { MstProduct } from 'src/model/mst.product.model';
import { OrderSales } from 'src/model/order.model';
import { ProductSales } from 'src/model/product.sales.model';
export declare class OrderService {
    private Cart;
    private transactionModel;
    private CartItems;
    private mstProduct;
    constructor(Cart: typeof OrderCart, transactionModel: typeof OrderSales, CartItems: typeof ProductSales, mstProduct: typeof MstProduct);
    findExistingInvoiceData(cart_id: number): Promise<any>;
    findExistingInvoiceDataByTrxID(id: string): Promise<any>;
    updateExistingTransaction(payload: CreateTransactionRequest): Promise<any>;
    createTransactionData(payload: CreateTransactionRequest): Promise<any>;
    updateTransactionStatus(notification: UpdateStatusNotification): Promise<void>;
    reduceProductStock(cartId: number): Promise<void>;
}
