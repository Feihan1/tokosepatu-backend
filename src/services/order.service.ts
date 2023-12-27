import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { CreateTransactionRequest, OrderPaymentStatus, UpdateStatusNotification } from 'src/interfaces/order.interfaces.dto';
import { OrderCart } from 'src/model/cart.model';
import { MstProduct } from 'src/model/mst.product.model';
import { OrderSales } from 'src/model/order.model';
import { ProductSales } from 'src/model/product.sales.model';

@Injectable()
export class OrderService {

  constructor(
    @InjectModel(OrderCart) private Cart: typeof OrderCart,
    @InjectModel(OrderSales) private transactionModel: typeof OrderSales,
    @InjectModel(ProductSales) private CartItems: typeof ProductSales,
    @InjectModel(MstProduct) private mstProduct: typeof MstProduct
  ){}


  async findExistingInvoiceData(cart_id: number): Promise<any> {
    return await this.transactionModel.findOne({where: {cart_id}});
  }

  async findExistingInvoiceDataByTrxID(id: string): Promise<any> {
    return await this.Cart.findOne({include: { model: OrderSales, where: { transaction_number: id } }});
  }

  async createTransactionData(payload: CreateTransactionRequest): Promise<any> {
    let totalAmount = 0;
    const transaction = await this.Cart.sequelize.transaction();
    try{
      const cartData = await this.Cart.findOne({where: {id: payload.cart_id}, include: { model: ProductSales }, transaction})
  
      for(const item of cartData.dataValues.product_item ){
        let sumAmount: number = item.dataValues.item_qty * item.dataValues.item_amount;
        totalAmount += sumAmount
        const decreaseQtyProduct = await this.mstProduct.update({item_qty: sequelize.literal('item_qty - 1')}, { where: { id:  item.product_id}, transaction });
      }
      
      const createOrder = await this.transactionModel.create({...payload, total_amount: totalAmount} , {transaction});
      if(createOrder.dataValues){
        await transaction.commit();
        return createOrder;
      }
    }catch(error){
      console.log(error);
      await transaction.rollback();
      throw new InternalServerErrorException('Whoops. Internal server error');
    }
  }

  async updateTransactionStatus(notification: UpdateStatusNotification): Promise<void> {
    const { order_id, payment_type } = notification;

    try {
      const order = await this.transactionModel.findOne({
        where: { transaction_number: order_id },
      });

      if (order) {
        order.payment_method = payment_type; // Update payment method based on received notification
        order.payment_status = OrderPaymentStatus.SUCCESS; // Assuming transaction is successful
        await order.save();
      } else {
        throw new Error('Order not found');
      }
    } catch (error) {
      throw new Error('Failed to update transaction status');
    }
  }
}
