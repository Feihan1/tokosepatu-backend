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
exports.ProductSales = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const cart_model_1 = require("./cart.model");
const mst_product_model_1 = require("./mst.product.model");
let ProductSales = class ProductSales extends sequelize_typescript_1.Model {
};
exports.ProductSales = ProductSales;
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => cart_model_1.OrderCart, {
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        hooks: true
    }),
    __metadata("design:type", cart_model_1.OrderCart)
], ProductSales.prototype, "cart_detail", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => cart_model_1.OrderCart),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    }),
    __metadata("design:type", Number)
], ProductSales.prototype, "cart_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => mst_product_model_1.MstProduct, {
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        hooks: true
    }),
    __metadata("design:type", mst_product_model_1.MstProduct)
], ProductSales.prototype, "product_detail", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => mst_product_model_1.MstProduct),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    }),
    __metadata("design:type", Number)
], ProductSales.prototype, "product_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], ProductSales.prototype, "item_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    }),
    __metadata("design:type", Number)
], ProductSales.prototype, "item_qty", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(10, 2),
        allowNull: false
    }),
    __metadata("design:type", Number)
], ProductSales.prototype, "item_amount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", Number)
], ProductSales.prototype, "item_size", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], ProductSales.prototype, "item_image", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    }),
    __metadata("design:type", String)
], ProductSales.prototype, "item_code", void 0);
exports.ProductSales = ProductSales = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "product_sales" })
], ProductSales);
//# sourceMappingURL=product.sales.model.js.map