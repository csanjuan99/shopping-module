import {ISubscriber} from "../ISubscriber";

export class AvailableStockNotifierInteractor implements ISubscriber {
    public readonly NOTIFICATION_TYPE: string = 'AVAILABLE_STOCK';

    update(context?: any): void {
        console.log(
            `El producto ${context.product?.name} tiene nuevo stock (${context.product?.stock}) disponible.` || 'El producto tiene nuevo stock disponible.'
        );
    }
}
