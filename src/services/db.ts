import { secrets } from "docker-secret";
import { connect } from "mongoose";

export default class Db {
  
  public static async connect() {
    const connectionUrl = `mongodb://db:27017/pinyoclub`
    try {
      connect(connectionUrl, {
        authSource: 'admin',
        user: secrets.pc_mongo_user,
        pass: secrets.pc_mongo_pw
      })
      console.log('Mongo DB connection successful');
    } catch (error) {
      console.log('Not able to setup connection to MONGODB.', error);
    }
  }
}