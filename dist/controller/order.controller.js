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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_interfaces_dto_1 = require("../interfaces/order.interfaces.dto");
const order_service_1 = require("../services/order.service");
const cart_service_1 = require("../services/cart.service");
let OrderController = class OrderController {
    constructor(orderService, cartService) {
        this.orderService = orderService;
        this.cartService = cartService;
    }
    async createTransactionInvoice(res, payload) {
        try {
            const exists = await this.orderService.findExistingInvoiceData(payload.cart_id);
            if (exists) {
                const updatedTransaction = await this.orderService.updateExistingTransaction(payload);
                return res.status(common_1.HttpStatus.OK).json({ message: "Success", data: updatedTransaction });
            }
            else {
                const invoiceData = await this.orderService.createTransactionData(payload);
                return res.status(common_1.HttpStatus.OK).json({ message: "Success", data: invoiceData });
            }
        }
        catch (error) {
            console.log(error);
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Whoops. Error occured" });
        }
    }
    async updatePaymentStatus(res, body) {
        try {
            const exists = await this.orderService.findExistingInvoiceDataByTrxID(body.order_id);
            if (!exists) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: "Cannot find data" });
            }
            else {
                const invoiceData = await this.orderService.updateTransactionStatus(body);
                if (order_interfaces_dto_1.OrderPaymentStatus.SUCCESS) {
                    await this.orderService.reduceProductStock(exists.dataValues.id);
                    console.log('Product stock reduced successfully');
                }
                const deleteCart = await this.cartService.deleteCart(exists.dataValues.id);
                return res.status(common_1.HttpStatus.OK).json({ message: "Success" });
            }
        }
        catch (error) {
            console.log(error);
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Whoops. Error occured" });
        }
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.Post)("/create"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, order_interfaces_dto_1.CreateTransactionRequest]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createTransactionInvoice", null);
__decorate([
    (0, common_1.Post)("/update-status"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, order_interfaces_dto_1.UpdateStatusNotification]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "updatePaymentStatus", null);
exports.OrderController = OrderController = __decorate([
    (0, common_1.Controller)("/invoice"),
    __metadata("design:paramtypes", [order_service_1.OrderService, cart_service_1.CartService])
], OrderController);
//# sourceMappingURL=order.controller.js.map