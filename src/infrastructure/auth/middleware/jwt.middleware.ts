import {StrategyInteractor} from "../use-cases/strategy.interactor";
import {NextFunction, Request, Response} from "express";

export const JwtMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const strategyInteractor = new StrategyInteractor();
    try {
        await strategyInteractor.execute(req);
        next();
    } catch (error: Error | any) {
        return res.status(401).json({
            message: error.message
        });
    }
};
