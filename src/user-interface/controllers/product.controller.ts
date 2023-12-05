import {AppModule} from '../../app.module';
import {FindManyProductsInteractor} from "../../application-core/product/use-cases/findManyProducts.interactor";
import {IController} from "../../config/controller/IController";
import {IoC} from "../../config/provider/IoC"
import {JwtMiddleware} from "../../infrastructure/auth/middleware/jwt.middleware";
import {CreateProductInteractor} from "../../application-core/product/use-cases/createProduct.interactor";
import {DeleteProductInteractor} from "../../application-core/product/use-cases/deleteProduct.interactor";
import {UpdateProductInteractor} from "../../application-core/product/use-cases/updateProduct.interactor";
import {FindProductInteractor} from "../../application-core/product/use-cases/findProduct.interactor";
import {PermissionMiddleware} from "../../infrastructure/auth/middleware/permission.middleware";
import {Response, Express, Router, Request} from "express";

export class ProductController implements IController {
    router: Router = Router();
    app: Express;

    constructor(
        private readonly findManyProductsInteractor: FindManyProductsInteractor = IoC.getInstance().resolve('FindManyProductsInteractor'),
        private readonly createInteractor: CreateProductInteractor = IoC.getInstance().resolve('CreateProductInteractor'),
        private readonly updateProductInteractor: UpdateProductInteractor = IoC.getInstance().resolve('UpdateProductInteractor'),
        private readonly deleteProductInteractor: DeleteProductInteractor = IoC.getInstance().resolve('DeleteProductInteractor'),
        private readonly findProductInteractor: FindProductInteractor = IoC.getInstance().resolve('FindProductInteractor')
    ) {
        this.app = AppModule.getInstance().app;
    }

    public async findAll(): Promise<void> {
        this.router.get('/products', async (req: Request, res: Response): Promise<Response> => {
            return this.findManyProductsInteractor.execute(req, res)
        });
    }

    public async findOne(): Promise<void> {
        this.router.get('/products/:id', async (req: Request, res: Response): Promise<Response> => {
            return this.findProductInteractor.execute(req.params.id, res)
        });
    }

    public async create(): Promise<void> {
        this.router.post('/products', JwtMiddleware, PermissionMiddleware(['product:write']), async (req: Request, res: Response): Promise<Response> => {
            return this.createInteractor.execute(req.body, res);
        });
    }

    public async updateOne(): Promise<void> {
        this.router.put('/products/:id', JwtMiddleware, PermissionMiddleware(['product:write']), async (req: Request, res: Response): Promise<Response> => {
            return this.updateProductInteractor.execute(req.params.id, req.body, res);
        });
    }

    public async deleteOne(): Promise<void> {
        this.router.delete('/products/:id', JwtMiddleware, PermissionMiddleware(['product:remove']), async (req: Request, res: Response): Promise<Response> => {
            return this.deleteProductInteractor.execute(req.params.id, res);
        });
    }

    async init(): Promise<void> {
        await this.findAll();
        await this.updateOne();
        await this.create();
        await this.deleteOne();
        await this.findOne();
        this.app.use(this.router);
    }
}
