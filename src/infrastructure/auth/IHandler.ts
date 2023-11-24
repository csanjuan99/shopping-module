import {Request} from 'express';

export interface IHandler {
    next(h: IHandler): void;

    handle(request: Request): void;
}
