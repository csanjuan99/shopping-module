import mongoose from "mongoose";
import {IoC} from "../../config/provider/IoC";
import {ProductSchema} from "./schemas/product.schema";

export class PersistenceModule {

    private static instance: PersistenceModule;
    private readonly connection: mongoose.Connection;
    private SCHEMAS = [ProductSchema];

    constructor() {
        this.connection = IoC.getInstance().resolve('Connection')
    }


    public static getInstance() {
        if (!PersistenceModule.instance) {
            PersistenceModule.instance = new PersistenceModule();
            return PersistenceModule.instance;
        }
        return PersistenceModule.instance;
    }

    public init() {
        for (const schema of this.SCHEMAS) {
            this.connection.model(schema.name, schema.schema);
            IoC.getInstance().register('Connection', this.connection);
        }
    }
}
