import {ProductSchema} from './schemas/product.schema';
import  mongoose from "mongoose";
import {Provider} from "../../common/container/provider.container";

export class PersistenceModule {

    private static instance: PersistenceModule;
    private connection: mongoose.Connection;
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

    public async init() {
        for (const schema of this.SCHEMAS) {
            console.log(`Registering schema ${schema.name}`)
            this.connection.model(schema.name, schema.schema);
        }
    }
}
