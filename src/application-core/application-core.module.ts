import { Express, Request, Response } from 'express';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';

export class ApplicationCoreModule {
  private static instance: ApplicationCoreModule;

  private constructor() {}

  static getInstance(): ApplicationCoreModule {
    if (!ApplicationCoreModule.instance) {
      ApplicationCoreModule.instance = new ApplicationCoreModule();
    }
    return ApplicationCoreModule.instance;
  }

  public async init(app: Express): Promise<void> {
    app.get('/', (req: Request, res: Response): void => {
      res.send('Hello World!');
    });

    app.listen(9000, (): void => {
      console.log(`Server is running on port 9000`);
    });

    console.log('ApplicationCoreModule initialized');

    await InfrastructureModule.getInstance().init();
  }
}
