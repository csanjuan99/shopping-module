import {Request, Response} from "express";

export class MeInteractor {

    async execute(req: Request | any, res: Response): Promise<Response> {
        return res.status(200).json(req.user);
    }
}
