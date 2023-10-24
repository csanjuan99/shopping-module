import { FindManyInteractor } from '../../application-core/products/use-cases/findMany.interactor';
import { Provider } from '../../common/container/provider.container';
import { IController } from '../../common/interfaces/IController';
import express, { Express } from 'express';
import { AppModule } from '../../app.module';

export class ProductController implements IController {
  private router = express.Router();
  private app: Express;

  constructor(
    private readonly findManyInteractor = Provider.getInstance().resolve(
      'FindManyInteractor'
    )
  ) {
    this.app = AppModule.getInstance().app;
  }

  public async findAll(): Promise<any> {
    this.router.get('/products', async (req, res) => {
      return await this.findManyInteractor.execute(req, res);
    });
  }

  async init(): Promise<void> {
    await this.findAll();
    this.app.use(this.router);
  }
}
