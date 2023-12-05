import {Request, Response} from "express";
import {ProductGateway} from "../../../infrastructure/persistence/gateways/product.gateway";

export class FindManyProductsInteractor {

    private readonly productGateway: ProductGateway = new ProductGateway();

    async execute(req: Request, res: Response): Promise<Response> {
        const products = await this.productGateway.findAll();
        if (!products || !products[0]) {
            return res?.status(404).json({message: 'No se encontraron productos'});
        }
        return res.status(200).json({
            products
        });
    }
}
