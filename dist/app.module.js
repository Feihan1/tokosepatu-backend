"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sequelize_1 = require("@nestjs/sequelize");
const db_config_1 = require("./config/db.config");
const cart_controller_1 = require("./controller/cart.controller");
const order_controller_1 = require("./controller/order.controller");
const cart_model_1 = require("./model/cart.model");
const order_model_1 = require("./model/order.model");
const product_sales_model_1 = require("./model/product.sales.model");
const cart_service_1 = require("./services/cart.service");
const order_service_1 = require("./services/order.service");
const midtrans_controller_1 = require("./controller/midtrans.controller");
const admin_model_1 = require("./model/admin.model");
const auth_service_1 = require("./services/auth.service");
const jwt_1 = require("@nestjs/jwt");
const admin_controller_1 = require("./controller/admin.controller");
const mst_product_model_1 = require("./model/mst.product.model");
const products_controller_1 = require("./controller/products.controller");
const products_service_1 = require("./services/products.service");
const platform_express_1 = require("@nestjs/platform-express");
const axios_1 = require("@nestjs/axios");
const multer = require("multer");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            sequelize_1.SequelizeModule.forRoot(db_config_1.default),
            sequelize_1.SequelizeModule.forFeature([order_model_1.OrderSales, cart_model_1.OrderCart, product_sales_model_1.ProductSales, admin_model_1.Admin, mst_product_model_1.MstProduct]),
            platform_express_1.MulterModule.register({
                storage: multer.memoryStorage(),
                limits: {
                    fileSize: 1024 * 1024 * 10,
                },
                fileFilter: (req, file, cb) => {
                    const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg'];
                    if (allowedMimes.includes(file.mimetype)) {
                        cb(null, true);
                    }
                    else {
                        cb(new Error('Invalid file type. Only JPEG, PNG, and GIF files are allowed.'), false);
                    }
                },
            }),
            axios_1.HttpModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '3h' }
            })
        ],
        controllers: [order_controller_1.OrderController, cart_controller_1.CartController, midtrans_controller_1.MidtransController, admin_controller_1.AdminController, products_controller_1.ProductController],
        providers: [order_service_1.OrderService, cart_service_1.CartService, auth_service_1.AuthService, products_service_1.ProductService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map