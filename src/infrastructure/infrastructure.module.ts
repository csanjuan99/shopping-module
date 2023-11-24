import * as mongoose from "mongoose";
import {IoC} from "../config/provider/IoC";

export class InfrastructureModule {
    private static instance: InfrastructureModule;
    private connection: mongoose.Connection | null;

    private constructor() {
        this.connection = null;
    }

    public init() {
        this.connectToDatabase();
    }

    private connectToDatabase() {
        const connection = mongoose.createConnection('mongodb+srv://root:IzP1UypHEOnui4iF@cluster0.ithkbzf.mongodb.net/shopping-module');
        this.setConnection(connection);

    }

    private setConnection(connection: mongoose.Connection) {
        this.connection = connection
        IoC.getInstance().register('Connection', this.connection)
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
