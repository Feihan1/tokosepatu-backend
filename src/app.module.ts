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
import { MstProduct } from './model/mst.product.model';
import { ProductController } from './controller/products.controller';
import { ProductService } from './services/products.service';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from './config/multer.config';
import { HttpModule } from '@nestjs/axios';
import * as multer from 'multer'; 

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true } ),
    SequelizeModule.forRoot(sequelizeConfig),
    SequelizeModule.forFeature([OrderSales, OrderCart, ProductSales,Admin,MstProduct]),
    MulterModule.register({
      storage: multer.memoryStorage(), // Menggunakan penyimpanan di memori
      limits: {
        fileSize: 1024 * 1024 * 10, // Ukuran file maksimum (contoh: 10 MB)
      },
      fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (allowedMimes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error('Invalid file type. Only JPEG, PNG, and GIF files are allowed.'), false);
        }
      },
    }),
    HttpModule,
    JwtModule.register({
      secret:process.env.JWT_SECRET,
      signOptions: {expiresIn:'3h'}
    })
  ],
  controllers: [OrderController, CartController,MidtransController,AdminController,ProductController],
  providers: [OrderService, CartService,AuthService,ProductService],
})
export class AppModule {}
