import { Post, SuccessResponse, Response, Route, Tags, Body, Get, Security } from "tsoa";
import PlayerModel, { Player } from "../models/Player";
import Db from "../services/db";
import { Types } from 'mongoose';

@Route('/player')
@Tags('Player')
export default class PlayerController {

  @Get('/')
  @SuccessResponse("200", "Player list (only nicknames)")
  @Security('jwt')
  @Response("500", "Internal server error")
  static async getAllPlayers(): Promise<Player[] | null> {
    //await Db.connect();
    return await PlayerModel.find({});
  }

  @Get('/:identifier')  
  @SuccessResponse("200", "Player details")
  @Security('jwt')
  @Response("404", "Player not found")
  @Response("500", "Internal server error")
  static async getPlayer(identifier: string): Promise<Player | null> {
    let condition = {};
    if(Types.ObjectId.isValid(identifier)) condition = { _id: identifier };
    else condition = { nickname: identifier };
    return await PlayerModel.findOne(condition);
  }

  @Post('/add')
  @SuccessResponse("201", "Player created")
  @Security('jwt')
  @Response("400", "'nickname' is a mandatory field")
  @Response("400", "Duplicate error")
  @Response("500", "Internal server error")
  static async addPlayer(@Body() player: Player): Promise<void> {
    const playerModel = new PlayerModel(player);
    await playerModel.save();
  }
  
}