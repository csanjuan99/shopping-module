import {Express, Router} from "express";

export interface IController {
    router: Router;
    app: Express;

    init(): void;
}
