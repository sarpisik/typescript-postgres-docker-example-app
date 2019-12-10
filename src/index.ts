import 'reflect-metadata';
import { createConnection } from 'typeorm';
import connectionOptions from './database.connection';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import routes from './routes';
import { handleError } from './lib/middleware';

(async (attempts: number) => {
  while (attempts) {
    try {
      await createConnection(connectionOptions);
      const PORT: number = 3000;
      // create express app
      const app = express();
      app.use(bodyParser.json());

      // middleware
      app.use(cors());
      app.use(helmet());
      app.use(bodyParser.json());

      // all routes
      app.use('/', routes);

      // error handler
      app.use(handleError);

      // start express server
      app.listen(PORT, () =>
        console.log(
          `Server started in container on port ${PORT}, Open http://localhost:8080/ to consume APIs.`
        )
      );
      break;
    } catch (error) {
      attempts--;
      console.error('Remained attempts to restart: ' + attempts);
      console.error(error);
    }
  }
})(5);
