import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddCartRequest, CreateCartRequest, RemoveItemFromCartRequest } from 'src/interfaces/cart.interfaces.dto';
import { CartService } from 'src/services/cart.service';

@ApiTags("Cart Management")
@Controller("/cart")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get("/get-products")
  async readAllMstProducts(@Res() res): Promise<any> {
    const exists = await this.cartService.readAllMstProducts(); 
    return res.status(HttpStatus.OK).json({message: "Success", data: exists});
  }

  @Get("/read/:id")
  async readCart(@Res() res, @Param('id') cartId: string): Promise<any> {
    const exists = await this.cartService.readCartData(cartId);

    if(!cartId){
      return res.status(HttpStatus.BAD_REQUEST).json({message: "Please fill in the cart information"});
    }
    
    if(!exists){
      return res.status(HttpStatus.NOT_FOUND).json({message: "Your cart is currently empty"});
    }
    
    return res.status(HttpStatus.OK).json({message: "Success", data: exists});
  }

  @Post("/create")
  async createCart(@Res() res, @Body() payload: CreateCartRequest): Promise<any> {
    try {
        const cartData = await this.cartService.createCart();
        const product_id = await this.cartService.readAllMstProducts();
        for(const item of payload.product_data){
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
        return res.status(200).json({message: "Success", cart_id: cartData.dataValues.id})
    }catch(error){
        console.log(error)
        return res.status(500).json({
            message: "Whoops. Error Occured"
        });
    }

  }

  @Patch("/add/item")
  async updateCart(@Res() res, @Body() payload: AddCartRequest): Promise<any> {
    try{
      const cartExists = await this.cartService.readCartData(payload.cart_id.toString());

      if(!cartExists){
        return res.status(404).json({
          message: "Your cart is currently empty"
        });
      }

      for(const item of payload.product_data){
        const exists = await this.cartService.readSpecificCartItems({name: item.product_name, productId: item.product_code,size: item.product_size, cartId: payload.cart_id })

        if(exists){
          await this.cartService.updateCartItems({item: exists, qty: item.product_qty});
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
      return res.status(HttpStatus.OK).json({message: "Success"});
    }catch(error){
      console.log(error)
      return res.status(500).json({
          message: "Whoops. Error Occured"
      });
    }
  }

  @Delete("/remove/item")
  async deleteItemsOnCart(@Res() res, @Body() payload: RemoveItemFromCartRequest): Promise<any> {
    try{
      const cartExists = await this.cartService.readCartData(payload.cart_id.toString());

      if(!cartExists){
        return res.status(404).json({
          message: "Your cart is currently empty"
        });
      }

      for(const item of payload.product_data){
        const itemData = await this.cartService.readCartItemById(item.id);

        if(itemData.dataValues.item_qty > item.product_qty){
          await this.cartService.decreaseQtyCartItems({ id: item.id, cart_id: payload.cart_id, item_name: item.product_name, item_amount: item.product_amount, item_code: item.product_code, item_qty: item.product_qty });
        } else {
          await this.cartService.removeItemFromCart({cart_id: payload.cart_id, payload: item});
        }

      }
      return res.status(HttpStatus.OK).json({message: "Success"});
    }catch(error){
      console.log(error)
      return res.status(500).json({
          message: "Whoops. Error Occured"
      });
    }
  }

  @Delete("/delete/:id")
  async deleteCart(@Res() res, @Param('id') cartId: string): Promise<any> {
    try{
      const cartExists = await this.cartService.readCartData(cartId);

      if(!cartExists){
        return res.status(404).json({
          message: "Your cart is currently empty"
        });
      }

      if(!cartId){
        return res.status(HttpStatus.BAD_REQUEST).json({message: "Please fill in the cart information"});
      }

      await this.cartService.deleteCart(parseInt(cartId));
      return res.status(HttpStatus.OK).json({message: "Success"});
    }catch(error){
      console.log(error)
      return res.status(500).json({
          message: "Whoops. Error Occured"
      });
    }
  }

}
