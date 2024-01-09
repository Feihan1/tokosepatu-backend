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
      serverKey: process.env.NEW_SECRET,
      clientKey: process.env.NEW_CLIENT,
    });
  }

  @Post('/token')
async createTransactionToken(@Res() res, @Body() request: CreatMidtransRequest): Promise<any> {
  try {

    const { cart_id, total_amount } = request;
    
    const parameter = {
      transaction_details: {
        order_id: cart_id,  
        gross_amount: total_amount,  
      },
    };

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
