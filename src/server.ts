import express, { Express, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';
import helmet from 'helmet';
import PlayerRouter from './routers/PlayerRouter';
import MatchRouter from './routers/MatchRouter';
import logger from './services/logger';

const app: Express = express();
app.use(helmet());
app.use(morgan(':status | :method | :url | :response-time ms | :remote-addr | :date[iso]'));
app.use(express.static('./src/public'));

app.use("/docs", swaggerUI.serve, swaggerUI.setup(undefined, {
  swaggerOptions: {
    title: 'Pinyo REST API',
    url: "/swagger.json"
  },
}))

app.use('/player', PlayerRouter);
app.use('/match', MatchRouter);

app.listen(3000, () => {
  logger.info('Backend REST API is running');
});