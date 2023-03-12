import app from "./app";
import logger from "./services/logger";

app.listen(3000, () => {
  logger.info('Backend REST API is running');
});