import express, { Express } from 'express';
import { ApplicationCoreModule } from './application-core/application-core.module';
import { UserInterfaceModule } from './user-interface/user-interface.module';

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
    this.app.listen(9000, (): void => {
      ApplicationCoreModule.getInstance().init();
      UserInterfaceModule.getInstance().init();
    });
  }
}
