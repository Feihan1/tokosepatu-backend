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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStatusNotification = exports.UpdateStatusNotificationTransactionVA = exports.CreatMidtransRequest = exports.CreateTransactionRequest = exports.OrderPaymentStatus = void 0;
const swagger_1 = require("@nestjs/swagger");
var OrderPaymentStatus;
(function (OrderPaymentStatus) {
    OrderPaymentStatus["PENDING"] = "PENDING";
    OrderPaymentStatus["SUCCESS"] = "SUCCESS";
})(OrderPaymentStatus || (exports.OrderPaymentStatus = OrderPaymentStatus = {}));
class CreateTransactionRequest {
}
exports.CreateTransactionRequest = CreateTransactionRequest;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CreateTransactionRequest.prototype, "cart_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateTransactionRequest.prototype, "first_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateTransactionRequest.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateTransactionRequest.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateTransactionRequest.prototype, "province", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateTransactionRequest.prototype, "regency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateTransactionRequest.prototype, "subdistrict", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateTransactionRequest.prototype, "village", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateTransactionRequest.prototype, "zip_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateTransactionRequest.prototype, "phone_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateTransactionRequest.prototype, "payment_method", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateTransactionRequest.prototype, "total_amount", void 0);
class CreatMidtransRequest {
}
exports.CreatMidtransRequest = CreatMidtransRequest;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CreatMidtransRequest.prototype, "cart_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CreatMidtransRequest.prototype, "total_amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreatMidtransRequest.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreatMidtransRequest.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CreatMidtransRequest.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreatMidtransRequest.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreatMidtransRequest.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreatMidtransRequest.prototype, "postal_code", void 0);
class UpdateStatusNotificationTransactionVA {
}
exports.UpdateStatusNotificationTransactionVA = UpdateStatusNotificationTransactionVA;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UpdateStatusNotificationTransactionVA.prototype, "va_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UpdateStatusNotificationTransactionVA.prototype, "bank", void 0);
class UpdateStatusNotification {
}
exports.UpdateStatusNotification = UpdateStatusNotification;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], UpdateStatusNotification.prototype, "va_numbers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UpdateStatusNotification.prototype, "transaction_time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UpdateStatusNotification.prototype, "transaction_status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UpdateStatusNotification.prototype, "transaction_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UpdateStatusNotification.prototype, "status_message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UpdateStatusNotification.prototype, "status_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UpdateStatusNotification.prototype, "signature_key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UpdateStatusNotification.prototype, "payment_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UpdateStatusNotification.prototype, "order_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UpdateStatusNotification.prototype, "fraud_status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UpdateStatusNotification.prototype, "gross_amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UpdateStatusNotification.prototype, "expiry_time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UpdateStatusNotification.prototype, "currency", void 0);
//# sourceMappingURL=order.interfaces.dto.js.map