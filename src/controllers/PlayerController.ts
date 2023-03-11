import { Post, SuccessResponse, Response, Route, Tags, Body, Get } from "tsoa";
import PlayerModel, { Player } from "../models/Player";
import Db from "../services/db";
import { Types } from 'mongoose';

@Route('/player')
@Tags('Player')
export default class PlayerController {

  @Post('/add')
  @SuccessResponse("201", "Player created")
  @Response("400", "'nickname' is a mandatory field")
  @Response("400", "Duplicate error")
  @Response("500", "Internal server error")
  static async addPlayer(@Body() player: Player): Promise<void> {
    await Db.connect();
    const playerModel = new PlayerModel(player);
    await playerModel.save();
  }

  @Get('/:identifier')  
  @SuccessResponse("200", "Player details")
  @Response("404", "Player not found")
  @Response("500", "Internal sever error")
  static async getPlayer(identifier: string): Promise<Player | null> {
    await Db.connect();
    let condition = {};
    if(Types.ObjectId.isValid(identifier)) condition = { _id: identifier };
    else condition = { nickname: identifier };
    return await PlayerModel.findOne(condition);
  }
}