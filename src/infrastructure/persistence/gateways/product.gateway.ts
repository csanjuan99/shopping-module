import {Repository} from "../../../config/repository/repository";

export class ProductGateway extends Repository {

    constructor() {
        super('Product');
    }

    public async findAll(): Promise<any> {
        return super.findAll();
    }
}
