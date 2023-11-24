import express, {Express} from 'express';
import {AppModule} from '../../app.module';
import {FindManyInteractor} from "../../application-core/product/use-cases/findMany.interactor";
import {IController} from "../../config/controller/IController";
import {IoC} from "../../config/provider/IoC"
import {JwtMiddleware} from "../../infrastructure/auth/middleware/jwt.middleware";

export class ProductController implements IController {
    router = express.Router();
    app: Express;

    constructor(
        private readonly findManyInteractor: FindManyInteractor = IoC.getInstance().resolve('FindManyInteractor')
    ) {
        this.app = AppModule.getInstance().app;
    }

    public async findAll(): Promise<any> {
        this.router.get('/products', JwtMiddleware, async (req, res) => {
            return this.findManyInteractor.execute(req, res)
        });
    }

    async init(): Promise<void> {
        await this.findAll();
        this.app.use(this.router);
    }
}
