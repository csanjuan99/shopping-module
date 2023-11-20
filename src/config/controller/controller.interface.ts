import {Express, Router} from "express";

export interface Controller {
    router: Router;
    app: Express;

    init(): void;
}
