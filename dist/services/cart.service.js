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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_2 = require("sequelize");
const cart_model_1 = require("../model/cart.model");
const mst_product_model_1 = require("../model/mst.product.model");
const order_model_1 = require("../model/order.model");
const product_sales_model_1 = require("../model/product.sales.model");
let CartService = class CartService {
    constructor(Cart, transactionModel, CartItems, mstProduct) {
        this.Cart = Cart;
        this.transactionModel = transactionModel;
        this.CartItems = CartItems;
        this.mstProduct = mstProduct;
    }
    async readAllMstProducts() {
        return await this.mstProduct.findAll({ where: { active: true, item_qty: { [sequelize_2.Op.gt]: 0 } } });
    }
    async createCart() {
        return await this.Cart.create({});
    }
    async createCartItems(payload) {
        return await this.CartItems.create(payload);
    }
    async readCartData(id) {
        return await this.Cart.findOne({ where: { id, active: true }, include: [{ model: product_sales_model_1.ProductSales }, { model: order_model_1.OrderSales }] });
    }
    async readCartItemById(id) {
        return await this.CartItems.findByPk(id);
    }
    async readSpecificCartItems(payload) {
        return await this.CartItems.findOne({ where: { item_name: payload.name, item_code: payload.productId, item_size: payload.size, cart_id: payload.cartId } });
    }
    async updateCartItems(payload) {
        const updatedQty = sequelize_2.Sequelize.literal(`item_qty + ${payload.qty}`);
        return await this.CartItems.update({ item_qty: updatedQty }, { where: { id: payload.item.id } });
    }
    async decreaseQtyCartItems(payload) {
        const updatedQty = sequelize_2.Sequelize.literal(`item_qty - ${payload.item_qty}`);
        return await this.CartItems.update({ item_qty: updatedQty }, { where: { id: payload.id } });
    }
    async removeItemFromCart(payloadData) {
        return await this.CartItems.destroy({ where: { id: payloadData.payload.id, cart_id: payloadData.cart_id } });
    }
    async deleteCart(cart_id) {
        return await this.Cart.update({ active: false }, { where: { id: cart_id } });
    }
    async getCartById(cart_id) {
        return this.transactionModel.findOne({ where: { cart_id } });
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(cart_model_1.OrderCart)),
    __param(1, (0, sequelize_1.InjectModel)(order_model_1.OrderSales)),
    __param(2, (0, sequelize_1.InjectModel)(product_sales_model_1.ProductSales)),
    __param(3, (0, sequelize_1.InjectModel)(mst_product_model_1.MstProduct)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], CartService);
//# sourceMappingURL=cart.service.js.map