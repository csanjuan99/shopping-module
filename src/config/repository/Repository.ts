import {IoC} from "../provider/IoC";
import mongoose from "mongoose";

export abstract class Repository {

    private model: string;
    private connection: mongoose.Connection;


    protected constructor(model: string) {
        this.model = model;
        this.connection = IoC.getInstance().resolve('Connection');
    }

    public async findAll(): Promise<any> {
        return this.connection.model(this.model).find();
    }

}
