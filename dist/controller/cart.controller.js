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
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cart_interfaces_dto_1 = require("../interfaces/cart.interfaces.dto");
const cart_service_1 = require("../services/cart.service");
let CartController = class CartController {
    constructor(cartService) {
        this.cartService = cartService;
    }
    async readAllMstProducts(res) {
        const exists = await this.cartService.readAllMstProducts();
        return res.status(common_1.HttpStatus.OK).json({ message: "Success", data: exists });
    }
    async readCart(res, cartId) {
        const exists = await this.cartService.readCartData(cartId);
        if (!cartId) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: "Please fill in the cart information" });
        }
        if (!exists) {
            return res.status(common_1.HttpStatus.NOT_FOUND).json({ message: "Your cart is currently empty" });
        }
        return res.status(common_1.HttpStatus.OK).json({ message: "Success", data: exists });
    }
    async createCart(res, payload) {
        try {
            const cartData = await this.cartService.createCart();
            const product_id = await this.cartService.readAllMstProducts();
            for (const item of payload.product_data) {
                await this.cartService.createCartItems({
                    cart_id: cartData.dataValues.id,
                    product_id: product_id.id,
                    item_name: item.product_name,
                    item_qty: item.product_qty,
                    item_amount: item.product_amount,
                    item_size: item.product_size,
                    item_image: item.product_image,
                    item_code: item.product_code
                });
            }
            return res.status(200).json({ message: "Success", cart_id: cartData.dataValues.id });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Whoops. Error Occured"
            });
        }
    }
    async updateCart(res, payload) {
        try {
            const cartExists = await this.cartService.readCartData(payload.cart_id.toString());
            if (!cartExists) {
                return res.status(404).json({
                    message: "Your cart is currently empty"
                });
            }
            for (const item of payload.product_data) {
                const exists = await this.cartService.readSpecificCartItems({ name: item.product_name, productId: item.product_code, size: item.product_size, cartId: payload.cart_id });
                if (exists) {
                    await this.cartService.updateCartItems({ item: exists, qty: item.product_qty });
                    continue;
                }
                await this.cartService.createCartItems({
                    cart_id: payload.cart_id,
                    product_id: payload.product_id,
                    item_name: item.product_name,
                    item_qty: item.product_qty,
                    item_amount: item.product_amount,
                    item_size: item.product_size,
                    item_image: item.product_image,
                    item_code: item.product_code
                });
            }
            return res.status(common_1.HttpStatus.OK).json({ message: "Success" });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Whoops. Error Occured"
            });
        }
    }
    async deleteItemsOnCart(res, payload) {
        try {
            const cartExists = await this.cartService.readCartData(payload.cart_id.toString());
            if (!cartExists) {
                return res.status(404).json({
                    message: "Your cart is currently empty"
                });
            }
            for (const item of payload.product_data) {
                const itemData = await this.cartService.readCartItemById(item.id);
                if (itemData.dataValues.item_qty > item.product_qty) {
                    await this.cartService.decreaseQtyCartItems({ id: item.id, cart_id: payload.cart_id, item_name: item.product_name, item_amount: item.product_amount, item_code: item.product_code, item_qty: item.product_qty });
                }
                else {
                    await this.cartService.removeItemFromCart({ cart_id: payload.cart_id, payload: item });
                }
            }
            return res.status(common_1.HttpStatus.OK).json({ message: "Success" });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Whoops. Error Occured"
            });
        }
    }
    async deleteCart(res, cartId) {
        try {
            const cartExists = await this.cartService.readCartData(cartId);
            if (!cartExists) {
                return res.status(404).json({
                    message: "Your cart is currently empty"
                });
            }
            if (!cartId) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: "Please fill in the cart information" });
            }
            await this.cartService.deleteCart(parseInt(cartId));
            return res.status(common_1.HttpStatus.OK).json({ message: "Success" });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Whoops. Error Occured"
            });
        }
    }
};
exports.CartController = CartController;
__decorate([
    (0, common_1.Get)("/get-products"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "readAllMstProducts", null);
__decorate([
    (0, common_1.Get)("/read/:id"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "readCart", null);
__decorate([
    (0, common_1.Post)("/create"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, cart_interfaces_dto_1.CreateCartRequest]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "createCart", null);
__decorate([
    (0, common_1.Patch)("/add/item"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, cart_interfaces_dto_1.AddCartRequest]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "updateCart", null);
__decorate([
    (0, common_1.Delete)("/remove/item"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, cart_interfaces_dto_1.RemoveItemFromCartRequest]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "deleteItemsOnCart", null);
__decorate([
    (0, common_1.Delete)("/delete/:id"),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "deleteCart", null);
exports.CartController = CartController = __decorate([
    (0, swagger_1.ApiTags)("Cart Management"),
    (0, common_1.Controller)("/cart"),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartController);
//# sourceMappingURL=cart.controller.js.map