import * as mongoose from "mongoose";
import {Provider} from "../common/container/provider.container";
import {PersistenceModule} from "./persistence/persistence.module";

export class InfrastructureModule {
    private static instance: InfrastructureModule;
    private connection: mongoose.Connection | null;

    private constructor() {
        this.connection = null;
    }

    public init() {
        console.log('Connecting to database...');
        this.connectToDatabase()
            .then(() => {
                console.log('Database connected');
            })
            .then(() => {
                console.log('InfrastructureModule initialized');
                PersistenceModule.getInstance().init();
            })
            .catch(() => {
                console.log('Error connecting to database');
            });
    }

    private async connectToDatabase() {
        const connection = mongoose.createConnection('mongodb+srv://root:IzP1UypHEOnui4iF@cluster0.ithkbzf.mongodb.net/shopping-module');
        this.setConnection(connection);
        Provider.getInstance().register('Connection', this.connection)
    }

    private setConnection(connection: mongoose.Connection) {
        this.connection = connection;
    }

    public static getInstance() {
        if (!InfrastructureModule.instance) {
            InfrastructureModule.instance = new InfrastructureModule();
            return InfrastructureModule.instance;
        }
        return InfrastructureModule.instance;
    }

    public getConnection() {
        return this.connection;
    }
}
