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
exports.ProductService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const axios_2 = require("axios");
const cart_model_1 = require("../model/cart.model");
const mst_product_model_1 = require("../model/mst.product.model");
const order_model_1 = require("../model/order.model");
const product_sales_model_1 = require("../model/product.sales.model");
let ProductService = class ProductService {
    constructor(Product, Cart, transaction, cartItems, httpService) {
        this.Product = Product;
        this.Cart = Cart;
        this.transaction = transaction;
        this.cartItems = cartItems;
        this.httpService = httpService;
    }
    async createProduct(payload) {
        return await this.Product.create(payload);
    }
    async getAllProducts() {
        try {
            const products = await this.Product.findAll({ order: [['id', 'ASC']] });
            for (const product of products) {
                if (product.item_qty === 0) {
                    product.active = false;
                }
                if (product.item_qty !== 0) {
                    product.active = true;
                }
                await product.save();
            }
            return products;
        }
        catch (error) {
            throw new Error("Failed to fetch products");
        }
    }
    async uploadImageToImgur(file) {
        try {
            const imgurApiEndpoint = 'https://api.imgur.com/3/image';
            const clientId = 'f4b1ab3e14efe69';
            const response = await axios_2.default.post(imgurApiEndpoint, {
                image: file,
            }, {
                headers: {
                    Authorization: `Client-ID ${clientId}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            const imageUrl = response.data.data.link;
            console.log(imageUrl);
            return imageUrl;
        }
        catch (error) {
            console.error('Failed to upload image to Imgur:', error);
            throw new Error('Failed to upload image to Imgur');
        }
    }
    async uploadImageAndCreateProduct(file, createMstProduct) {
        const imageUrl = await this.uploadImageToImgur(file);
        console.log(imageUrl);
        return await this.Product.create({ ...createMstProduct, item_image_url: imageUrl });
    }
    async updateProduct(id, updateProductDto) {
        const product = await this.Product.findByPk(id);
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        if (updateProductDto.item_qty !== undefined) {
            product.item_qty = updateProductDto.item_qty;
        }
        if (updateProductDto.item_amount !== undefined) {
            product.item_amount = updateProductDto.item_amount;
        }
        await product.save();
        return product;
    }
    async deleteProduct(id) {
        const product = await this.Product.findByPk(id);
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        await product.update({ item_qty: 0 }, { where: { id } });
        return 'Produk Telah Di Hapus Untuk User';
    }
    async readTransactionList() {
        return await this.Cart.findAll({ include: [{ model: product_sales_model_1.ProductSales }, { model: order_model_1.OrderSales }] });
    }
    async deleteProductonDB(id) {
        const product = await this.Product.findByPk(id);
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        await product.destroy();
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(mst_product_model_1.MstProduct)),
    __param(1, (0, sequelize_1.InjectModel)(cart_model_1.OrderCart)),
    __param(2, (0, sequelize_1.InjectModel)(order_model_1.OrderSales)),
    __param(3, (0, sequelize_1.InjectModel)(product_sales_model_1.ProductSales)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, axios_1.HttpService])
], ProductService);
//# sourceMappingURL=products.service.js.map