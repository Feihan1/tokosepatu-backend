import { ApiProperty } from "@nestjs/swagger";

export enum OrderPaymentStatus {
    "PENDING" = 'PENDING',
    "SUCCESS" = 'SUCCESS'
}

export class CreateTransactionRequest {
    @ApiProperty()
    cart_id: number;

    @ApiProperty()
    first_name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    province: string;

    @ApiProperty()
    regency: string;

    @ApiProperty()
    subdistrict: string;

    @ApiProperty()
    village: string;

    @ApiProperty()
    zip_code: string;

    @ApiProperty()
    phone_number: string;

    @ApiProperty()
    payment_method: string;

    @ApiProperty()
    total_amount: string;

}

export class CreatMidtransRequest {
    @ApiProperty()
    cart_id: number

    @ApiProperty()
    total_amount: number

    @ApiProperty()
    name: string

    @ApiProperty()
    email: string

    @ApiProperty()
    phone: number
    
    @ApiProperty()
    address: string

    @ApiProperty()
    city: string

    @ApiProperty()
    postal_code: string
}

export class UpdateStatusNotificationTransactionVA {
    @ApiProperty()
    va_number: string;

    @ApiProperty()
    bank: string;

}
export class UpdateStatusNotification {
    @ApiProperty()
    va_numbers: UpdateStatusNotificationTransactionVA[];

    @ApiProperty()
    transaction_time: string;

    @ApiProperty()
    transaction_status: string;

    @ApiProperty()
    transaction_id: string;
    
    @ApiProperty()
    status_message: string;

    @ApiProperty()
    status_code: string;
    
    @ApiProperty()
    signature_key: string;

    @ApiProperty()
    payment_type: string;

    @ApiProperty()
    order_id: string;

    @ApiProperty()
    fraud_status: string;

    @ApiProperty()
    gross_amount: string;

    @ApiProperty()
    expiry_time: string;

    @ApiProperty()
    currency: string;
}