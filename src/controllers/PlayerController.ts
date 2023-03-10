import { Post, SuccessResponse, Response, Route, Tags, Body } from "tsoa";
import PlayerModel, { Player } from "../models/Player";
import Db from "../services/db";

@Route('/player')
@Tags('Player')
export default class PlayerController {

  @Post('/add')
  @SuccessResponse("201", "Player created")
  @Response("400", "'nickname' is a mandatory field")
  @Response("400", "Duplicate error")
  @Response("500", "Internal server error")
  static async addPlayer(@Body() player: Player): Promise<void> {
    //if(!player.nickname) throw Error('Invalid body, nickname is required');
    await Db.connect();
    const playerModel = new PlayerModel(player);
    await playerModel.save();
  }
}