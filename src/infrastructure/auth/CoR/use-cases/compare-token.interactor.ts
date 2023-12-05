import {Request} from "express";
import {Handler} from "../Handler";
import jsonwebtoken from "jsonwebtoken";
import "dotenv/config";

export class CompareTokenInteractor extends Handler {
    constructor() {
        super();
    }

    public handle(request: Request | any): void {
        this.next(null);
        try {
            const authorization = request.headers.authorization || request.headers['Authorization'];
            const secret: string = process.env.JWT_SECRET || '';
            jsonwebtoken.verify(authorization.split(' ')[1], secret);
            request.user = jsonwebtoken.decode(authorization.split(' ')[1]);
        } catch (e: Error | any) {
            const type: string = e.name;
            if (type === 'TokenExpiredError') {
                throw new Error('El token ha expirado.');
            }
            if (type === 'JsonWebTokenError') {
                throw new Error('El token no es válido.');
            }
            if (type === 'NotBeforeError') {
                throw new Error('La fecha de expiración del token no es válida.');
            }
        }
        super.handle(request);
    }
}
