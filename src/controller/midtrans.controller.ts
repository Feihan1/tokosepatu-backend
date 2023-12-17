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
      serverKey: "SB-Mid-server-07J1B-cF976zfSafnqGGOtmN",
      clientKey: "SB-Mid-client-orNXPW9gwjn9En6r",
    });
  }

  @Post('/token')
async createTransactionToken(@Res() res, @Body() request: CreatMidtransRequest): Promise<any> {
  try {
    // Assuming you have 'cart_id' and 'total_price' in the request from the front end
    const { cart_id, total_amount } = request;
    
    // Use the cart_id and total_price dynamically
    const parameter = {
      transaction_details: {
        order_id: cart_id,  // Use the cart_id as order_id
        gross_amount: total_amount,  // Use the total_price as gross_amount
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
