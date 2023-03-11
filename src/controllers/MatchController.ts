import Db from "../services/db";
import MatchModel, { Match } from "../models/Match";
import { Post, Route, SuccessResponse, Tags, Response, Body } from "tsoa";

type SuccessResponseType = {
  message: 'Match created',
  id: string
}

@Route('/match')
@Tags('Match')
export default class MatchController {

  @Post('/create')
  @SuccessResponse('201', 'Match created')
  @Response('400', "StartTime & Players are required")
  @Response('500', "Internal server error")
  static async create(@Body() match: Match): Promise<SuccessResponseType> {
    await Db.connect();
    const matchModelInstance = new MatchModel(match);
    const { id } = await matchModelInstance.save();
    return { message: 'Match created', id };
  }
}