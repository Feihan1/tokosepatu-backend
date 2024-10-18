import { CreateTransactionRequest, UpdateStatusNotification } from 'src/interfaces/order.interfaces.dto';
import { OrderService } from '../services/order.service';
import { CartService } from 'src/services/cart.service';
export declare class OrderController {
    private readonly orderService;
    private readonly cartService;
    constructor(orderService: OrderService, cartService: CartService);
    createTransactionInvoice(res: any, payload: CreateTransactionRequest): Promise<any>;
    updatePaymentStatus(res: any, body: UpdateStatusNotification): Promise<any>;
}
