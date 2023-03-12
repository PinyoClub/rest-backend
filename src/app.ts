import express, { Express, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';
//import helmet from 'helmet'; // problem with swagger and auth0 -> CSP Content Security Protocol
import PlayerRouter from './routers/PlayerRouter';
import MatchRouter from './routers/MatchRouter';
import auth from './services/auth';
import Db from './services/db';
import logger from './services/logger';

const app: Express = express();
//app.use(helmet());
if(process.env.NODE_ENV != 'test') app.use(morgan(':status | :method | :url | :response-time ms | :remote-addr | :date[iso]'));
app.use(express.static('./src/public'));

app.use("/docs", swaggerUI.serve, swaggerUI.setup(undefined, {
  swaggerOptions: {
    title: 'Pinyo REST API',
    url: "/swagger.json"
  },
}))

if(process.env.NODE_ENV != 'development' && process.env.NODE_ENV != 'test') app.use(auth);
app.use('/player', PlayerRouter);
app.use('/match', MatchRouter);

Db.connect();

export default app;