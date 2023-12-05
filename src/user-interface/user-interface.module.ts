import {AppModule} from '../app.module';
import {ProductController} from "./controllers/product.controller";
import {AuthController} from "./controllers/auth.controller";
import {TransactionController} from "./controllers/transaction.controller";

export class UserInterfaceModule {
    private static instance: UserInterfaceModule;
    private app: any;

    private CONTROLLERS: any[] = [
        new ProductController(),
        new AuthController(),
        new TransactionController()
    ];

    private constructor() {
        this.app = AppModule.getInstance().getApp();
    }

    public static getInstance(): UserInterfaceModule {
        if (!UserInterfaceModule.instance) {
            UserInterfaceModule.instance = new UserInterfaceModule();
            return UserInterfaceModule.instance;
        }
        return UserInterfaceModule.instance;
    }

    public init(): void {
        for (const controller of this.CONTROLLERS) {
            controller.init();
        }
    }
}
