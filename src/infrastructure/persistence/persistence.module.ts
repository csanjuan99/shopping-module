import mongoose from "mongoose";
import {Provider} from "../../config/provider/provider";
import {ProductSchema} from "./schemas/product.schema";

export class PersistenceModule {

    private static instance: PersistenceModule;
    private readonly connection: mongoose.Connection;
    private SCHEMAS = [ProductSchema];

    constructor() {
        this.connection = Provider.getInstance().resolve('Connection')
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
            Provider.getInstance().register('Connection', this.connection);
        }
    }
}
