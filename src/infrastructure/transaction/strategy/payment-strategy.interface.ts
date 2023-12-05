export interface PaymentStrategy {
    pay(valueToPay: number): Promise<boolean>;
}

