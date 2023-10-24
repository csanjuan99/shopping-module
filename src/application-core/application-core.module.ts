import { FindManyInteractor } from './products/use-cases/findMany.interactor';
import { Provider } from '../common/container/provider.container';

export class ApplicationCoreModule {
  private static instance: ApplicationCoreModule;

  private PROVIDERS = [new FindManyInteractor()];

  private constructor() {}

  public static getInstance() {
    if (!ApplicationCoreModule.instance) {
      ApplicationCoreModule.instance = new ApplicationCoreModule();
      return ApplicationCoreModule.instance;
    }
    return ApplicationCoreModule.instance;
  }

  public init() {
    for (const provider of this.PROVIDERS) {
      Provider.getInstance().register(provider.constructor.name, provider);
    }
  }
}
