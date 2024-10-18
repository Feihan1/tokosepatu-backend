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
exports.OrderSales = void 0;
const crypto = require("crypto");
const sequelize_typescript_1 = require("sequelize-typescript");
const order_interfaces_dto_1 = require("../interfaces/order.interfaces.dto");
const cart_model_1 = require("./cart.model");
let OrderSales = class OrderSales extends sequelize_typescript_1.Model {
};
exports.OrderSales = OrderSales;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => cart_model_1.OrderCart),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    }),
    __metadata("design:type", Number)
], OrderSales.prototype, "cart_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => cart_model_1.OrderCart, {
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        hooks: true
    }),
    __metadata("design:type", cart_model_1.OrderCart)
], OrderSales.prototype, "cart_detail", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], OrderSales.prototype, "first_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], OrderSales.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: false
    }),
    __metadata("design:type", String)
], OrderSales.prototype, "address", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], OrderSales.prototype, "province", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], OrderSales.prototype, "regency", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], OrderSales.prototype, "subdistrict", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], OrderSales.prototype, "village", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], OrderSales.prototype, "zip_code", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], OrderSales.prototype, "phone_number", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM,
        values: Object.values(order_interfaces_dto_1.OrderPaymentStatus),
        defaultValue: order_interfaces_dto_1.OrderPaymentStatus.PENDING
    }),
    __metadata("design:type", String)
], OrderSales.prototype, "payment_status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
    }),
    __metadata("design:type", String)
], OrderSales.prototype, "payment_method", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(10, 2),
        allowNull: false
    }),
    __metadata("design:type", Number)
], OrderSales.prototype, "total_amount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        defaultValue: () => crypto.randomBytes(10).toString('hex'),
    }),
    __metadata("design:type", String)
], OrderSales.prototype, "transaction_number", void 0);
exports.OrderSales = OrderSales = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "order_sales" })
], OrderSales);
//# sourceMappingURL=order.model.js.map