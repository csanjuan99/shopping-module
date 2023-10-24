import mongoose from 'mongoose';

export class InfrastructureModule {
  private static instance: InfrastructureModule;
  private connection: mongoose.Connection;

  private constructor() {
    this.connection = new mongoose.Connection();
  }

  static getInstance(): InfrastructureModule {
    if (!InfrastructureModule.instance) {
      InfrastructureModule.instance = new InfrastructureModule();
    }
    return InfrastructureModule.instance;
  }

  public async init() {
    console.log('Connecting to database...');
    await this.connectToDatabase()
      .then(() => {
        console.log('Database connected');
      })
      .then(() => {
        console.log('InfrastructureModule initialized');
      })
      .catch(() => {
        console.log('Error connecting to database');
      });
  }

  private async connectToDatabase() {
    await mongoose.connect(
      'mongodb+srv://root:IzP1UypHEOnui4iF@cluster0.ithkbzf.mongodb.net/shopping-module'
    );
    this.setConnection(mongoose.connection);
  }

  private setConnection(connection: mongoose.Connection) {
    this.connection = connection;
  }

  public getConnection(): mongoose.Connection {
    return this.connection;
  }
}
