export abstract class Model {
    public _id: string;
    public createdAt: Date;
    public updatedAt: Date;

    protected constructor(_id: string, createdAt: Date, updatedAt: Date) {
        this._id = _id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
