import express, { Express, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';
import helmet from 'helmet';

const app: Express = express();
app.use(helmet());
app.use(morgan('common'));
app.use(express.static('./src/public'));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(undefined, {
  swaggerOptions: {
    title: 'Pinyo REST API',
    url: "/swagger.json"
  },
}))

app.listen(3000, () => {
  console.log('Backend REST API is running');
});