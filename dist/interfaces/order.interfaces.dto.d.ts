export declare enum OrderPaymentStatus {
    "PENDING" = "PENDING",
    "SUCCESS" = "SUCCESS"
}
export declare class CreateTransactionRequest {
    cart_id: number;
    first_name: string;
    email: string;
    address: string;
    province: string;
    regency: string;
    subdistrict: string;
    village: string;
    zip_code: string;
    phone_number: string;
    payment_method: string;
    total_amount: string;
}
export declare class CreatMidtransRequest {
    cart_id: number;
    total_amount: number;
    name: string;
    email: string;
    phone: number;
    address: string;
    city: string;
    postal_code: string;
}
export declare class UpdateStatusNotificationTransactionVA {
    va_number: string;
    bank: string;
}
export declare class UpdateStatusNotification {
    va_numbers: UpdateStatusNotificationTransactionVA[];
    transaction_time: string;
    transaction_status: string;
    transaction_id: string;
    status_message: string;
    status_code: string;
    signature_key: string;
    payment_type: string;
    order_id: string;
    fraud_status: string;
    gross_amount: string;
    expiry_time: string;
    currency: string;
}
