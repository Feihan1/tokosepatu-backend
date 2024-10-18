import { CreatMidtransRequest } from "src/interfaces/order.interfaces.dto";
export declare class MidtransController {
    private snap;
    constructor();
    createTransactionToken(res: any, request: CreatMidtransRequest): Promise<any>;
}
