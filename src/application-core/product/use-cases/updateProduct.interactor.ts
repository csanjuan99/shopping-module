import {ProductGateway} from "../../../infrastructure/persistence/gateways/product.gateway";
import {CreateProductDto} from "../dto/createProduct.dto";
import {IoC} from "../../../config/provider/IoC";
import {Response} from "express";

export class UpdateProductInteractor {

    constructor(
        private readonly productGateway: ProductGateway = new ProductGateway()
    ) {
    }

    async execute(id: string, payload: CreateProductDto, res: any): Promise<Response> {
        const product = await this.productGateway.findById(id);
        if (!product) {
            return res.status(404).json({
                message: 'Producto no encontrado'
            })
        }
        const updatedProduct = await this.productGateway.update(id, payload);
        if (product.stock <= updatedProduct.stock) {
            const observableProduct = IoC.getInstance().resolve('ObservableProduct');
            observableProduct.notify('AVAILABLE_STOCK', {product: {name: updatedProduct.name, stock: updatedProduct.stock}});
        }
        return res.status(200).json({
            data: updatedProduct
        })
    }
}
