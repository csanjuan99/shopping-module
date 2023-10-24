import { Request, Response } from 'express';

export class FindManyInteractor {
  async execute(req?: Request, res?: Response): Promise<any> {
    return res?.status(200).json({ message: 'Hello World' });
  }
}
