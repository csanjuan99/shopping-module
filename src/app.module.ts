import express, {Express} from 'express';
import {UserInterfaceModule} from "./user-interface/user-interface.module";
import {InfrastructureModule} from "./infrastructure/infrastructure.module";
import {PersistenceModule} from "./infrastructure/persistence/persistence.module";
import {ApplicationCoreModule} from "./application-core/application-core.module";

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
        });
    }
}
