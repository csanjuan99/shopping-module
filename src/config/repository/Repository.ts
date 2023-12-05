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

    public async findOne(payload: any, projection?: any): Promise<any> {
        return this.connection.model(this.model).findOne(payload, {
            ...projection
        });
    }

    public async findById(id: string): Promise<any> {
        return this.connection.model(this.model).findById(id);
    }

    public async create(data: any): Promise<any> {
        return this.connection.model(this.model).create(data);
    }

    public async update(id: string, data: any): Promise<any> {
        return this.connection.model(this.model).findByIdAndUpdate(id, data);
    }

    public async delete(id: string): Promise<any> {
        return this.connection.model(this.model).findByIdAndDelete(id);
    }

}
