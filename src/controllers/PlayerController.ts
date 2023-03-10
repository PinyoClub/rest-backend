import { Post, SuccessResponse, Response } from "tsoa";
import PlayerModel, { Player } from "../models/Player";
import Db from "../services/db";

export default class PlayerController {

  @Post('/add')
  @SuccessResponse("201", "Player created")
  @Response("400", "Already exists")
  @Response("500", "Internal server error")
  public async addPlayer(playerDetails: Player) {
    if(!playerDetails.nickname) throw Error('Invalid body, nickname is required');
    await Db.connect();
    const playerModel = new PlayerModel(playerDetails);
    await playerModel.save();
  }
}