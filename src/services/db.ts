import { secrets } from "docker-secret";
import { connect, disconnect } from "mongoose";
import logger from "./logger";

export default class Db {
  
  public static async connect() {
    const connectionUrl = `mongodb://db:27017/pinyoclub`
    await connect(connectionUrl, {
      authSource: 'admin',
      user: secrets.pc_mongo_user,
      pass: secrets.pc_mongo_pw,
      serverSelectionTimeoutMS: 5000
    })
    logger.verbose("Connected to MongoDB");
  }

  public static async disconnect() {
    await disconnect();
  }
}