export type BuyProductDto = {
    productId: string;
    quantity: number;
    paymentMethod: {
        type: string;
        accountNumber: string;
        expirationDate?: string;
        securityCode?: string;
    }
}
