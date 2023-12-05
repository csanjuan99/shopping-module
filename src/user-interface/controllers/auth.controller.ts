import {IController} from "../../config/controller/IController";
import express, {Express, Router} from "express";
import {AppModule} from "../../app.module";
import {IoC} from "../../config/provider/IoC";
import {LoginInteractor} from "../../application-core/auth/use-cases/login.interactor";
import {Request, Response} from "express";
import {JwtMiddleware} from "../../infrastructure/auth/middleware/jwt.middleware";
import {MeInteractor} from "../../application-core/auth/use-cases/me.interactor";

export class AuthController implements IController {
    router: Router = express.Router();
    app: Express;

    constructor(
        private readonly loginInteractor: LoginInteractor = IoC.getInstance().resolve('LoginInteractor'),
        private readonly meInteractor: MeInteractor = IoC.getInstance().resolve('MeInteractor')
    ) {
        this.app = AppModule.getInstance().app;
    }


    private async login(): Promise<any> {
        this.router.post('/auth/login', async (req: Request, res: Response): Promise<any> => {
            return await this.loginInteractor.execute(req, res);
        });
    }

    private async me(): Promise<any> {
        this.router.get('/auth/me', JwtMiddleware, async (req: Request | any, res: Response): Promise<any> => {
            return await this.meInteractor.execute(req, res);
        });
    }

    async init(): Promise<void> {
        await this.login();
        await this.me();
        this.app.use(this.router);
    }
}
