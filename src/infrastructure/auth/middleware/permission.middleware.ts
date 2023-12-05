import {NextFunction, Request, Response} from "express";
import {PermissionInteractor} from "../use-cases/permission.interactor";

export const PermissionMiddleware = (permissions: any[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const permissionInteractor: PermissionInteractor = new PermissionInteractor();
        try {
            await permissionInteractor.execute(req, permissions);
            next();
        } catch (error: Error | any) {
            return res.status(403).json({
                message: error.message
            });
        }
    }
};
