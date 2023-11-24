import {Request} from "express";
import {Handler} from "../Handler";
import {verify} from "jsonwebtoken";

export class CompareTokenConcrete extends Handler {
    constructor() {
        super();
    }

    public handle(request: Request): void {
        this.next(null);
        try {
            verify(request.headers.authorization ?? '', process.env.SECRET_KEY ?? '');
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
