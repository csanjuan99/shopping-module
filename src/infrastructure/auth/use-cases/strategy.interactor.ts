import {VerifyTokenInteractor} from "../CoR/use-cases/verify-token.interactor";
import { Request } from "express";
export class StrategyInteractor {
    async execute(request: Request) {
        const verifyTokenConcrete = new VerifyTokenInteractor();
        return verifyTokenConcrete.handle(request);
    }
}
