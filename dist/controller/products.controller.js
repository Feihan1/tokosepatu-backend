"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const admin_interface_1 = require("../interfaces/admin.interface");
const products_service_1 = require("../services/products.service");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async createProduct(file, createMstProduct) {
        try {
            const imageUrl = await this.productService.uploadImageAndCreateProduct(file.buffer, createMstProduct);
            return { message: 'Product created successfully', imageUrl };
        }
        catch (error) {
            console.error('Error creating product:', error);
            throw new Error('Error creating product');
        }
    }
    async getAllProducts(res) {
        try {
            const products = await this.productService.getAllProducts();
            return res.status(200).json({ products });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Whoops. Error Occurred",
            });
        }
    }
    async updateProduct(id, updateProductDto) {
        try {
            const newProduct = await this.productService.updateProduct(id, updateProductDto);
            return { message: 'Product Updated Successfully', newProduct };
        }
        catch (error) {
            console.error('Error creating product:', error);
            throw new Error('Error creating product');
        }
    }
    async deleteProduct(id) {
        return this.productService.deleteProduct(id);
    }
    async deleteProductonDB(id) {
        return this.productService.deleteProductonDB(id);
    }
    async readTransaction(res) {
        const response = await this.productService.readTransactionList();
        res.status(200).json({ message: "Sukses", data: response });
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Post)('/create'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Get)("/list"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAllProducts", null);
__decorate([
    (0, common_1.Patch)('/update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, admin_interface_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Delete)('/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProduct", null);
__decorate([
    (0, common_1.Delete)('/deleteOnDB/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProductonDB", null);
__decorate([
    (0, common_1.Get)('/transaction-list'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "readTransaction", null);
exports.ProductController = ProductController = __decorate([
    (0, swagger_1.ApiTags)("Admin Product Management"),
    (0, common_1.Controller)("/admin/product"),
    __metadata("design:paramtypes", [products_service_1.ProductService])
], ProductController);
//# sourceMappingURL=products.controller.js.map