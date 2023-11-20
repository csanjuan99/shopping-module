import {Request, Response} from 'express';
import {ProductGateway} from "../../../infrastructure/persistence/gateways/product.gateway";

export class FindManyInteractor {

    private readonly productGateway: ProductGateway = new ProductGateway();

    async execute(req?: Request, res?: Response): Promise<any> {
        const products = await this.productGateway.findAll();
        if (!products || !products[0]) {
            return res?.status(404).json({message: 'Products not found'});
        }
        return res?.status(200).json({
            products
        });
    }
}
