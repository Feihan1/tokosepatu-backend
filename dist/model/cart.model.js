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
exports.OrderCart = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const product_sales_model_1 = require("./product.sales.model");
const order_model_1 = require("./order.model");
let OrderCart = class OrderCart extends sequelize_typescript_1.Model {
};
exports.OrderCart = OrderCart;
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => product_sales_model_1.ProductSales),
    __metadata("design:type", Array)
], OrderCart.prototype, "product_item", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => order_model_1.OrderSales),
    __metadata("design:type", order_model_1.OrderSales)
], OrderCart.prototype, "cart_detail", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: true
    }),
    __metadata("design:type", Boolean)
], OrderCart.prototype, "active", void 0);
exports.OrderCart = OrderCart = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "order_cart" })
], OrderCart);
//# sourceMappingURL=cart.model.js.map