import { ProductSchema } from './schemas/product.schema';
import { InfrastructureModule } from '../infrastructure.module';

export class PersistenceModule {
  constructor(private readonly infrastructureModule: InfrastructureModule) {}

  SCHEMAS = [ProductSchema];

  async init() {
    for (const schema of this.SCHEMAS) {
      this.infrastructureModule
        .getConnection()
        .model(schema.name, schema.schema);
    }
  }
}
