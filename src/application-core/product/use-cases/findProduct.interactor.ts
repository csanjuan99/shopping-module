import {ProductGateway} from "../../../infrastructure/persistence/gateways/product.gateway";

export class FindProductInteractor {
    constructor(
        private readonly productGateway: ProductGateway = new ProductGateway()
    ) {
    }

    async execute(id: string, res: any) {
        const product = await this.productGateway.findById(id);
        if (!product) {
            return res.status(404).json({
                message: 'Producto no encontrado'
            })
        }
        return res.status(200).json({
            product
        })
    }
}
