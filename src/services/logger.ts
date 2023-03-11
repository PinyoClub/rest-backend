import { createLogger, format, transports } from 'winston';
import * as dotenv from 'dotenv';
dotenv.config();

let logLevel = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() == 'development' ? 'debug' : process.env.LOG_LEVEL || 'error';

export default createLogger({
  level: logLevel,
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss.SSS'
    }),
    format.json(),
  ),
  transports: [
    new transports.Console()
  ]
});