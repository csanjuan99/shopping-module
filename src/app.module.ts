import express, {Express} from 'express';
import {UserInterfaceModule} from "./user-interface/user-interface.module";
import {InfrastructureModule} from "./infrastructure/infrastructure.module";
import {PersistenceModule} from "./infrastructure/persistence/persistence.module";
import {ApplicationCoreModule} from "./application-core/application-core.module";
import {ObservableProduct} from "./infrastructure/product/use-cases/ObservableProduct";
import {LowStockNotifierInteractor} from "./infrastructure/product/observer/use-cases/lowStock-notifier.interactor";
import {IoC} from "./config/provider/IoC";
import {
    AvailableStockNotifierInteractor
} from "./infrastructure/product/observer/use-cases/availableStock-notifier.interactor";
import bodyParser from "body-parser";

export class AppModule {
    private static instance: AppModule;
    public app: Express;

    constructor() {
        this.app = express();
    }

    public static getInstance(): AppModule {
        if (!AppModule.instance) {
            AppModule.instance = new AppModule();
            return AppModule.instance;
        }
        return AppModule.instance;
    }

    public getApp() {
        return this.app;
    }

    init(): void {
        this.app.listen(9000, async (): Promise<void> => {
            console.log('Server is listening on port 9000')
            InfrastructureModule.getInstance().init();
            PersistenceModule.getInstance().init();
            ApplicationCoreModule.getInstance().init();
            UserInterfaceModule.getInstance().init();

            // Load product strategy
            const observableProduct = new ObservableProduct();
            const lowStockNotifier = new LowStockNotifierInteractor();
            const availableStockNotifier = new AvailableStockNotifierInteractor();
            observableProduct.attach(lowStockNotifier);
            observableProduct.attach(availableStockNotifier);

            // Register product strategy
            IoC.getInstance().register('ObservableProduct', observableProduct);
        });

        // Allow body parser for json in POST requests.
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());
    }
}
