import {ProductGateway} from "../../../infrastructure/persistence/gateways/product.gateway";
import {BuyProductDto} from "../dto/buyProduct.dto";
import {IoC} from "../../../config/provider/IoC";
import {Response} from "express";

export class BuyProductInteractor {

    constructor(
        private readonly productGateway: ProductGateway = new ProductGateway(),
    ) {
    }

    async execute(payload: BuyProductDto, res: Response): Promise<Response> {
        console.log('Payload: ', payload)
        const product = await this.productGateway.findById(payload.productId)

        if (!product) {
            return res.status(404).json({
                message: "Producto no encontrado"
            })
        }
        if (product.stock < payload.quantity) {
            return res.status(400).json({
                message: "No hay suficiente stock para realizar la compra"
            })
        }

        const TOTAL_TO_PAY: number = product.price * payload.quantity;

        const isPayed = this.pay(TOTAL_TO_PAY, payload.paymentMethod);

        const LIMIT: number = 10;
        if (product.stock <= LIMIT) {
            const observableProduct = IoC.getInstance().resolve('ObservableProduct');
            observableProduct.notify('LOW_STOCK', {product: {name: product.name, stock: product.stock}});
        }

        return res.status(202).json({
            message: "Compra realizada exitosamente"
        })
    }

    private pay(VALUE_TO_PAY: number, paymentMethod: any): boolean {
        return true;
    }
}
