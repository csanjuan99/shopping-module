import {Provider} from "../provider/provider";
import mongoose from "mongoose";

export abstract class Repository {

    private model: string;
    private connection: mongoose.Connection;


    protected constructor(model: string) {
        this.model = model;
        this.connection = Provider.getInstance().resolve('Connection');
    }

    public async findAll(): Promise<any> {
        return this.connection.model(this.model).find();
    }

}
