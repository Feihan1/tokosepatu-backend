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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_2 = require("sequelize");
const order_interfaces_dto_1 = require("../interfaces/order.interfaces.dto");
const cart_model_1 = require("../model/cart.model");
const mst_product_model_1 = require("../model/mst.product.model");
const order_model_1 = require("../model/order.model");
const product_sales_model_1 = require("../model/product.sales.model");
let OrderService = class OrderService {
    constructor(Cart, transactionModel, CartItems, mstProduct) {
        this.Cart = Cart;
        this.transactionModel = transactionModel;
        this.CartItems = CartItems;
        this.mstProduct = mstProduct;
    }
    async findExistingInvoiceData(cart_id) {
        return await this.transactionModel.findOne({ where: { cart_id } });
    }
    async findExistingInvoiceDataByTrxID(id) {
        return await this.Cart.findOne({ include: { model: order_model_1.OrderSales, where: { transaction_number: id } } });
    }
    async updateExistingTransaction(payload) {
        let totalAmount = 0;
        const transaction = await this.Cart.sequelize.transaction();
        try {
            const cartData = await this.Cart.findOne({
                where: { id: payload.cart_id },
                include: { model: product_sales_model_1.ProductSales },
                transaction,
            });
            for (const item of cartData.dataValues.product_item) {
                let sumAmount = item.dataValues.item_qty * item.dataValues.item_amount;
                totalAmount += sumAmount;
            }
            await this.transactionModel.destroy({
                where: { cart_id: payload.cart_id },
                transaction,
            });
            const createOrder = await this.transactionModel.create({ ...payload, total_amount: totalAmount }, { transaction });
            if (createOrder.dataValues) {
                await transaction.commit();
                return createOrder;
            }
        }
        catch (error) {
            console.log(error);
            await transaction.rollback();
            throw new common_1.InternalServerErrorException('Whoops. Internal server error');
        }
    }
    async createTransactionData(payload) {
        let totalAmount = 0;
        const transaction = await this.Cart.sequelize.transaction();
        try {
            const cartData = await this.Cart.findOne({ where: { id: payload.cart_id }, include: { model: product_sales_model_1.ProductSales }, transaction });
            for (const item of cartData.dataValues.product_item) {
                let sumAmount = item.dataValues.item_qty * item.dataValues.item_amount;
                totalAmount += sumAmount;
            }
            const createOrder = await this.transactionModel.create({ ...payload, total_amount: totalAmount }, { transaction });
            if (createOrder.dataValues) {
                await transaction.commit();
                return createOrder;
            }
        }
        catch (error) {
            console.log(error);
            await transaction.rollback();
            throw new common_1.InternalServerErrorException('Whoops. Internal server error');
        }
    }
    async updateTransactionStatus(notification) {
        const { order_id, payment_type } = notification;
        try {
            const order = await this.transactionModel.findOne({
                where: { transaction_number: order_id },
            });
            if (order) {
                order.payment_method = payment_type;
                order.payment_status = order_interfaces_dto_1.OrderPaymentStatus.SUCCESS;
                await order.save();
            }
            else {
                throw new Error('Order not found');
            }
        }
        catch (error) {
            throw new Error('Failed to update transaction status and reduce product stock');
        }
    }
    async reduceProductStock(cartId) {
        const cartData = await this.Cart.findOne({
            where: { id: cartId },
            include: { model: product_sales_model_1.ProductSales },
        });
        if (cartData) {
            for (const item of cartData.dataValues.product_item) {
                await this.mstProduct.update({ item_qty: sequelize_2.default.literal(`item_qty - 1`) }, { where: { id: item.product_id } });
            }
        }
        else {
            throw new Error(`Cart with ID ${cartId} not found`);
        }
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(cart_model_1.OrderCart)),
    __param(1, (0, sequelize_1.InjectModel)(order_model_1.OrderSales)),
    __param(2, (0, sequelize_1.InjectModel)(product_sales_model_1.ProductSales)),
    __param(3, (0, sequelize_1.InjectModel)(mst_product_model_1.MstProduct)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], OrderService);
//# sourceMappingURL=order.service.js.map