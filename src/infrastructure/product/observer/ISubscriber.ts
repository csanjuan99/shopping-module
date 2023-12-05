export interface ISubscriber {

    readonly NOTIFICATION_TYPE: string;
    update(context?: any): void;
}
