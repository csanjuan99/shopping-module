import {IHandler} from "./IHandler";
import {Request} from "express";

export abstract class Handler implements IHandler {

    private nextHandler: IHandler | null = null;

    handle(request: Request): void {
        if (this.nextHandler != null) {
            this.nextHandler.handle(request);
        }
        return;
    }

    next(h: IHandler | null): void {
        this.nextHandler = h;
    }
}
