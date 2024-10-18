/// <reference types="multer" />
import { CreateMstProduct, UpdateProductDto } from "src/interfaces/admin.interface";
import { ProductService } from "src/services/products.service";
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    createProduct(file: Express.Multer.File, createMstProduct: CreateMstProduct): Promise<any>;
    getAllProducts(res: any): Promise<any>;
    updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<any>;
    deleteProduct(id: string): Promise<any>;
    deleteProductonDB(id: string): Promise<void>;
    readTransaction(res: any): Promise<any>;
}
