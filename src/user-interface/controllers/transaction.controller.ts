import {BuyProductInteractor} from "../../application-core/transaction/use-cases/buyProduct.interactor";
import {BuyProductDto} from "../../application-core/transaction/dto/buyProduct.dto";
import express, {Express, Request, Response, Router} from "express";
import {IController} from "../../config/controller/IController";
import {AppModule} from "../../app.module";
import {JwtMiddleware} from "../../infrastructure/auth/middleware/jwt.middleware";

export class TransactionController implements IController {
    router: Router = express.Router();
    app: Express;

    constructor(
        private readonly buyProductInteractor: BuyProductInteractor = new BuyProductInteractor(),
    ) {
        this.app = AppModule.getInstance().app;
    }

    async buyProduct(): Promise<void> {
        this.router.post('/transactions/buy-product', JwtMiddleware, async (req: Request, res: Response) => {
            return await this.buyProductInteractor.execute(req.body, res);
        });
    }

    async init(): Promise<void> {
        await this.buyProduct();
        this.app.use(this.router);
    }
}
