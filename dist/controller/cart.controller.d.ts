import { AddCartRequest, CreateCartRequest, RemoveItemFromCartRequest } from 'src/interfaces/cart.interfaces.dto';
import { CartService } from 'src/services/cart.service';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    readAllMstProducts(res: any): Promise<any>;
    readCart(res: any, cartId: string): Promise<any>;
    createCart(res: any, payload: CreateCartRequest): Promise<any>;
    updateCart(res: any, payload: AddCartRequest): Promise<any>;
    deleteItemsOnCart(res: any, payload: RemoveItemFromCartRequest): Promise<any>;
    deleteCart(res: any, cartId: string): Promise<any>;
}
