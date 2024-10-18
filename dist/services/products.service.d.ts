/// <reference types="node" />
import { HttpService } from "@nestjs/axios";
import { CreateMstProduct, UpdateProductDto } from "src/interfaces/admin.interface";
import { OrderCart } from "src/model/cart.model";
import { MstProduct } from "src/model/mst.product.model";
import { OrderSales } from "src/model/order.model";
import { ProductSales } from "src/model/product.sales.model";
export declare class ProductService {
    private Product;
    private Cart;
    private transaction;
    private cartItems;
    private httpService;
    constructor(Product: typeof MstProduct, Cart: typeof OrderCart, transaction: typeof OrderSales, cartItems: typeof ProductSales, httpService: HttpService);
    createProduct(payload: CreateMstProduct): Promise<any>;
    getAllProducts(): Promise<any>;
    uploadImageToImgur(file: Buffer): Promise<string>;
    uploadImageAndCreateProduct(file: Buffer, createMstProduct: CreateMstProduct): Promise<any>;
    updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<MstProduct>;
    deleteProduct(id: string): Promise<any>;
    readTransactionList(): Promise<any>;
    deleteProductonDB(id: string): Promise<void>;
}
