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
exports.MidtransController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const midtransClient = require("midtrans-client");
const order_interfaces_dto_1 = require("../interfaces/order.interfaces.dto");
let MidtransController = class MidtransController {
    constructor() {
        this.snap = new midtransClient.Snap({
            isProduction: false,
            serverKey: process.env.MT_SERVER_KEY,
            clientKey: process.env.MT_CLIENT_KEY,
        });
    }
    async createTransactionToken(res, request) {
        try {
            const { cart_id, total_amount, name, email, phone, address, city, postal_code } = request;
            const parameter = {
                transaction_details: {
                    order_id: cart_id,
                    gross_amount: total_amount,
                },
                customer_details: {
                    first_name: name,
                    billing_address: {
                        first_name: name,
                    },
                    shipping_address: {
                        first_name: name,
                    }
                },
            };
            const token = await this.snap.createTransactionToken(parameter);
            console.log(token);
            return res.status(common_1.HttpStatus.OK).json({ token });
        }
        catch (error) {
            console.error(error);
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: "Whoops. Error Occurred",
            });
        }
    }
};
exports.MidtransController = MidtransController;
__decorate([
    (0, common_1.Post)('/token'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, order_interfaces_dto_1.CreatMidtransRequest]),
    __metadata("design:returntype", Promise)
], MidtransController.prototype, "createTransactionToken", null);
exports.MidtransController = MidtransController = __decorate([
    (0, swagger_1.ApiTags)("Payment Management"),
    (0, common_1.Controller)("/payment"),
    __metadata("design:paramtypes", [])
], MidtransController);
//# sourceMappingURL=midtrans.controller.js.map