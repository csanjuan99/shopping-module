import {VerifyTokenConcrete} from "../concrete/verify-token.concrete";
import { Request } from "express";
export class StrategyInteractor {
    constructor() {}

    async execute(request: Request) {
        const verifyTokenConcrete = new VerifyTokenConcrete();
        return verifyTokenConcrete.handle(request);
    }
}
