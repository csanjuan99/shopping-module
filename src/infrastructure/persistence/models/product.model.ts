import {Document, model as Model} from "mongoose";
import {ProductSchema} from "../schemas/product.schema";

export class ProductModel extends Document {

    public name: string;
    public description: string;
    public price: number;
    public stock: number;
    public isFeatured: boolean;
    public image: string;

    constructor(name: string, description: string, price: number, stock: number, isFeatured: boolean, image: string) {
        super();
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.isFeatured = isFeatured;
        this.image = image;
    }
}

export const Product = Model<ProductModel>('Product', ProductSchema.schema)
