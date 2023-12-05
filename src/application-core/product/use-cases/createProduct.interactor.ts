import {ProductGateway} from "../../../infrastructure/persistence/gateways/product.gateway";
import {CreateProductDto} from "../dto/createProduct.dto";
import {Response} from "express";

export class CreateProductInteractor {

    private readonly productGateway: ProductGateway = new ProductGateway();

    async execute(payload: CreateProductDto, res: any): Promise<Response> {
        const product = await this.productGateway.create(payload);
        if (!product) {
            return res.status(400).json({
                message: 'No se pudo crear el producto'
            });
        }
        return res.status(201).json({
            product
        });
    }
}
