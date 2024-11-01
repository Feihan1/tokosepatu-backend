import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, Order, Sequelize } from 'sequelize';
import { CreateProductSales, ProductSalesDTO, RemoveItemFromCartRequest, RemoveItemRequest } from 'src/interfaces/cart.interfaces.dto';
import { OrderPaymentStatus } from 'src/interfaces/order.interfaces.dto';
import { OrderCart } from 'src/model/cart.model';
import { MstProduct } from 'src/model/mst.product.model';
import { OrderSales } from 'src/model/order.model';
import { ProductSales } from 'src/model/product.sales.model';

@Injectable()
export class CartService {

  constructor(
    @InjectModel(OrderCart) private Cart: typeof OrderCart,
    @InjectModel(OrderSales) private transactionModel: typeof OrderSales,
    @InjectModel(ProductSales) private CartItems: typeof ProductSales,
    @InjectModel(MstProduct) private mstProduct: typeof MstProduct
  ) {}
  
  async readAllMstProducts(): Promise<any> {
    return await this.mstProduct.findAll({where: { active: true, item_qty: {[Op.gt]: 0 }}});
  }

  async createCart(): Promise<any> {
    return await this.Cart.create({});
  }

  async createCartItems(payload: CreateProductSales): Promise<any> {
    return await this.CartItems.create(payload);
  }

  async readCartData(id: string): Promise<any> {
    return await this.Cart.findOne({where: { id, active: true }, include: [{ model: ProductSales }, { model: OrderSales }]})
  }

  async readCartItemById(id: number): Promise<any> {
    return await this.CartItems.findByPk(id);
  }

  async readSpecificCartItems(payload: {name: string, productId: string,size:number, cartId: number}): Promise<any> {
    return await this.CartItems.findOne({where: {item_name: payload.name, item_code: payload.productId, item_size:payload.size, cart_id: payload.cartId}});
  }

  async updateCartItems(payload: {item: ProductSalesDTO, qty: number}): Promise<any> {
    const updatedQty = Sequelize.literal(`item_qty + ${payload.qty}`);
    return await this.CartItems.update({ item_qty: updatedQty }, {where: { id: payload.item.id }});
  }

  async decreaseQtyCartItems(payload: ProductSalesDTO): Promise<any> {
    const updatedQty = Sequelize.literal(`item_qty - ${payload.item_qty}`);
    return await this.CartItems.update({ item_qty: updatedQty }, {where: { id: payload.id }});
  }

  async removeItemFromCart(payloadData: {cart_id: number, payload: RemoveItemRequest }): Promise<any> {
    return await this.CartItems.destroy({where: { id: payloadData.payload.id, cart_id: payloadData.cart_id }})
  }

  async deleteCart(cart_id: number): Promise<any> {
    return await this.Cart.update({active: false}, {where: {id: cart_id}})
  }

  async getCartById(cart_id: number): Promise<any> {
    return this.transactionModel.findOne({where: {cart_id}})
  }
}
