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

    private connectToDatabase(): void {
        const connection: mongoose.Connection = mongoose.createConnection('mongodb+srv://root:IzP1UypHEOnui4iF@cluster0.ithkbzf.mongodb.net/shopping-module');
        this.setConnection(connection);

    }

    private setConnection(connection: mongoose.Connection): void {
        this.connection = connection
        IoC.getInstance().register('Connection', this.connection)
    }

    public static getInstance(): InfrastructureModule {
        if (!InfrastructureModule.instance) {
            InfrastructureModule.instance = new InfrastructureModule();
            return InfrastructureModule.instance;
        }
        return InfrastructureModule.instance;
    }

    public getConnection(): mongoose.Connection | null {
        return this.connection;
    }
}
