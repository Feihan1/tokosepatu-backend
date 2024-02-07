import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import * as midtransClient from "midtrans-client";
import { CreatMidtransRequest } from "src/interfaces/order.interfaces.dto";

@ApiTags("Payment Management")
@Controller("/payment")
export class MidtransController {
  private snap: midtransClient.Snap;

  constructor() {
    this.snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MT_SERVER_KEY,
      clientKey: process.env.MT_CLIENT_KEY,
    });
  }

  @Post('/token')
async createTransactionToken(@Res() res, @Body() request: CreatMidtransRequest): Promise<any> {
  try {

    const { cart_id, total_amount , name ,email,phone,address,city,postal_code} = request;
    
    const parameter = {
      transaction_details: {
        order_id: cart_id,  
        gross_amount: total_amount,  
      },
      customer_details: {
        first_name:name ,
          billing_address: {
            first_name:name,   
      },
        shipping_address: {
          first_name:name,
      }
    },
  }

    const token = await this.snap.createTransactionToken(parameter);
    console.log(token);

    return res.status(HttpStatus.OK).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Whoops. Error Occurred",
    });
  }
}
}
