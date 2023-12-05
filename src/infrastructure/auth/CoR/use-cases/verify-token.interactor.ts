import {Handler} from "../Handler";
import {Request} from "express";
import {CompareTokenInteractor} from "./compare-token.interactor";

export class VerifyTokenInteractor extends Handler {

    constructor() {
        super();
    }

    public handle(request: Request): void {
        this.next(new CompareTokenInteractor());
        const HEADERS = request.headers;
        if (!HEADERS) {
            throw new Error('Se requirere autenticación para continuar.');
        }
        const TOKEN = HEADERS.authorization || HEADERS.Authorization;
        if (!TOKEN) {
            throw new Error('Se requirere autenticación para continuar.');
        }
        super.handle(request);
    }
}
