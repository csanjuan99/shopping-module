import {FindManyProductsInteractor} from "./product/use-cases/findManyProducts.interactor";
import {IoC} from "../config/provider/IoC";
import {LoginInteractor} from "./auth/use-cases/login.interactor";
import {MeInteractor} from "./auth/use-cases/me.interactor";
import {CreateProductInteractor} from "./product/use-cases/createProduct.interactor";
import {UpdateProductInteractor} from "./product/use-cases/updateProduct.interactor";
import {DeleteProductInteractor} from "./product/use-cases/deleteProduct.interactor";
import {FindProductInteractor} from "./product/use-cases/findProduct.interactor";
import {BuyProductInteractor} from "./transaction/use-cases/buyProduct.interactor";


export class ApplicationCoreModule {
    private static instance: ApplicationCoreModule;

    private PROVIDERS = [
        new CreateProductInteractor(),
        new UpdateProductInteractor(),
        new FindManyProductsInteractor(),
        new FindProductInteractor(),
        new DeleteProductInteractor(),
        new LoginInteractor(),
        new MeInteractor(),
        new BuyProductInteractor(),
    ];

    private constructor() {
    }

    public static getInstance(): ApplicationCoreModule {
        if (!ApplicationCoreModule.instance) {
            ApplicationCoreModule.instance = new ApplicationCoreModule();
            return ApplicationCoreModule.instance;
        }
        return ApplicationCoreModule.instance;
    }

    public init(): void {
        for (const provider of this.PROVIDERS) {
            IoC.getInstance().register(provider.constructor.name, provider);
        }
    }
}
