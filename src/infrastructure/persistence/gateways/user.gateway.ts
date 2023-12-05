import {Repository} from "../../../config/repository/Repository";

export class UserGateway extends Repository {
    constructor() {
        super('User');
    }
}
