import {Model} from "../../../config/model/model";
import mongoose from "mongoose";

export class ProductModel extends mongoose.Document {

    public name: string;
    public description: string;
    public price: number;
    public stock: number;
    public isFeatured: boolean;

    constructor(name: string, description: string, price: number, stock: number, isFeatured: boolean) {
        super();
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.isFeatured = isFeatured;
    }


}
