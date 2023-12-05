import {ISubscriber} from "../observer/ISubscriber";

export class ObservableProduct {

    private readonly subscribers: ISubscriber[];

    constructor() {
        this.subscribers = [];
    }

    attach(subscriber: ISubscriber): void {
        this.subscribers.push(subscriber);
    }

    detach(subscriber: ISubscriber): void {
        const index = this.subscribers.indexOf(subscriber);
        this.subscribers.splice(index, 1);
    }

    notify(notificationType: string, context?: any): void {
        for (const subscriber of this.subscribers) {
            if (subscriber.NOTIFICATION_TYPE === notificationType)
                subscriber.update(context);
        }
    }
}
