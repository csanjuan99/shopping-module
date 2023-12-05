import {ISubscriber} from "../ISubscriber";

export class LowStockNotifierInteractor implements ISubscriber {
    public readonly NOTIFICATION_TYPE: string = 'LOW_STOCK';

    update(context?: any): void {
        console.log(
            `El producto ${context.product.name} tiene pocas existencias, quedan ${context.product.stock} unidades.` || `Tu stock es bajo, ordena más unidades.`
        );
    }
}
