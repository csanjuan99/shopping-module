import {Document, model as Model} from "mongoose";
import {UserSchema} from "../schemas/user.schema";

export class UserModel extends Document {

    public email: string;
    public password: string;
    public permissions: string[];

    constructor(email: string, password: string, permissions: string[]) {
        super();
        this.email = email;
        this.password = password;
        this.permissions = permissions;
    }
}

export const User = Model<UserModel>('User', UserSchema.schema)
