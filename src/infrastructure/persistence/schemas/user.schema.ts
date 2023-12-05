import {Schema} from "mongoose";


const schema = new Schema({
    email: String,
    password: String,
    permissions: [String],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

const UserSchemaName: string = 'User';

const UserSchema = {
    name: UserSchemaName,
    schema
};

export {UserSchema};
