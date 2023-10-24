import { ProductController } from './controllers/product.controller';
import { AppModule } from '../app.module';

export class UserInterfaceModule {
  private static instance: UserInterfaceModule;
  private app: any;

  private CONTROLLERS = [new ProductController()];

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
