import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import sequelizeConfig from './config/db.config';
import { CartController } from './controller/cart.controller';
import { OrderController } from './controller/order.controller';
import { OrderCart } from './model/cart.model';
import { OrderSales } from './model/order.model';
import { ProductSales } from './model/product.sales.model';
import { CartService } from './services/cart.service';
import { OrderService } from './services/order.service';
import { MidtransController } from './controller/midtrans.controller';
import {Admin} from './model/admin.model';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AdminController } from './controller/admin.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true } ),
    SequelizeModule.forRoot(sequelizeConfig),
    SequelizeModule.forFeature([OrderSales, OrderCart, ProductSales,Admin]),
    JwtModule.register({
      secret:process.env.JWT_SECRET,
      signOptions: {expiresIn:'3h'}
    })
  ],
  controllers: [OrderController, CartController,MidtransController,AdminController],
  providers: [OrderService, CartService,AuthService],
})
export class AppModule {}
