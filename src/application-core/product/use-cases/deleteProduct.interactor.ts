import {ProductGateway} from "../../../infrastructure/persistence/gateways/product.gateway";
import {Response} from "express";

export class DeleteProductInteractor {

    constructor(
        private readonly productGateway: ProductGateway = new ProductGateway()
    ) {
    }

    async execute(id: string, res: Response): Promise<Response> {
        const product = await this.productGateway.findById(id);
        if (!product) {
            return res.status(404).json({
                message: 'Producto no encontrado'
            })
        }
        await this.productGateway.delete(id);
        return res.status(200).json({
            message: 'Producto eliminado'
        })
    }
}
