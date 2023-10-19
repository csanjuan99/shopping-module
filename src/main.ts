import express, { Express } from 'express';
import { ApplicationCoreModule } from './application-core/application-core.module';

const app: Express = express();

ApplicationCoreModule.getInstance().init(app);
