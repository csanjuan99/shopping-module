import { IInteractorInterface } from '../../../infrastructure/interfaces/IInteractor.interface';
import { InfrastructureModule } from '../../../infrastructure/infrastructure.module';

export class FindManyInteractor implements IInteractorInterface {
  private db;

  constructor() {
    this.db = InfrastructureModule.getInstance().getConnection();
  }

  async execute() {
    return this.db?.collection('products').find().toArray();
  }
}
