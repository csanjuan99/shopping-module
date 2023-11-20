import express, {Express} from 'express';
import {AppModule} from '../../app.module';
import {Controller} from "../../config/controller/controller.interface";
import {Provider} from "../../config/provider/provider";
import {FindManyInteractor} from "../../application-core/product/use-cases/findMany.interactor";

export class ProductController implements Controller {
    router = express.Router();
    app: Express;

    constructor(
        private readonly findManyInteractor: FindManyInteractor = Provider.getInstance().resolve('FindManyInteractor')
    ) {
        this.app = AppModule.getInstance().app;
    }

    public async findAll(): Promise<any> {
        this.router.get('/products', async (req, res) => {
            return this.findManyInteractor.execute(req, res)
        });
    }

    async init(): Promise<void> {
        await this.findAll();
        this.app.use(this.router);
    }
}
