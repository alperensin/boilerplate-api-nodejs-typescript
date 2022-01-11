import express, { Express } from 'express';
import cors from 'cors';
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import doc from '../swagger.json';

class App {
  server: Express;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use('/swagger', swaggerUi.serve, swaggerUi.setup(doc));
  }

  routes() {
    this.server.use(routes);
  }

}

export default new App().server;