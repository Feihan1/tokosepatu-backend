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
exports.RemoveItemFromCartRequest = exports.AddCartRequest = exports.CreateCartRequest = exports.CreateProductRequest = exports.RemoveItemRequest = void 0;
const swagger_1 = require("@nestjs/swagger");
class RemoveItemRequest {
}
exports.RemoveItemRequest = RemoveItemRequest;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RemoveItemRequest.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RemoveItemRequest.prototype, "product_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RemoveItemRequest.prototype, "product_qty", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RemoveItemRequest.prototype, "product_amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RemoveItemRequest.prototype, "product_code", void 0);
class CreateProductRequest {
}
exports.CreateProductRequest = CreateProductRequest;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateProductRequest.prototype, "product_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CreateProductRequest.prototype, "product_qty", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CreateProductRequest.prototype, "product_amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CreateProductRequest.prototype, "product_size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateProductRequest.prototype, "product_image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CreateProductRequest.prototype, "product_code", void 0);
class CreateCartRequest {
}
exports.CreateCartRequest = CreateCartRequest;
__decorate([
    (0, swagger_1.ApiProperty)({ type: CreateProductRequest, isArray: true }),
    __metadata("design:type", Array)
], CreateCartRequest.prototype, "product_data", void 0);
class AddCartRequest {
}
exports.AddCartRequest = AddCartRequest;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AddCartRequest.prototype, "cart_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: CreateProductRequest, isArray: true }),
    __metadata("design:type", Array)
], AddCartRequest.prototype, "product_data", void 0);
class RemoveItemFromCartRequest {
}
exports.RemoveItemFromCartRequest = RemoveItemFromCartRequest;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RemoveItemFromCartRequest.prototype, "cart_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: RemoveItemRequest, isArray: true }),
    __metadata("design:type", Array)
], RemoveItemFromCartRequest.prototype, "product_data", void 0);
//# sourceMappingURL=cart.interfaces.dto.js.map