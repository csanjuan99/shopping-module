import {PaymentStrategy} from "../payment-strategy.interface";

export class CardPaymentInteractor implements PaymentStrategy {

    constructor(
        private readonly cardNumber: string,
        private readonly expirationDate: string,
        private readonly securityCode: string
    ) {
    }

    async pay(amount: number): Promise<boolean> {
        setTimeout(() => {
            console.log(`Se pagó ${amount} con la tarjeta ${this.cardNumber}`);
            return true;
        }, 1500);
    }
}
