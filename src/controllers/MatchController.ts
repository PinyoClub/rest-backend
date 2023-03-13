import Db from "../services/db";
import { startMatch, endMatch, EndMatchModel, StartMatchModel } from "../models/Match";
import { Post, Route, SuccessResponse, Tags, Response, Body, Security } from "tsoa";

@Route('/match')
@Tags('Match')
export default class MatchController {

  @Post('/create')
  @SuccessResponse('201', 'Match created')
  @Security('jwt')
  @Response('400', "StartTime & Players are required")
  @Response('500', "Internal server error")
  static async create(@Body() match: startMatch): Promise<{ id: string, message: 'Match created'}> {
    const matchModelInstance = new StartMatchModel(match);
    const { id } = await matchModelInstance.save();
    return { message: 'Match created', id };
  }

  @Post('/close')
  @SuccessResponse('200', 'Match has been closed')
  @Security('jwt')
  @Response('400', 'All fields are required')
  @Response('400', 'Match not found or it has been closed already')
  @Response('500', 'Internal server error')
  static async close(@Body() match: endMatch): Promise<{ id: string, message: 'Match has been closed'}> {
    const { ServeStart, EndTime, Steps } = match;
    const mongoResponse = await EndMatchModel.findOneAndUpdate({_id: match.ID, EndTime: { $exists: false } } , { ServeStart, EndTime, Steps }, { returnDocument: 'after' });
    if(!mongoResponse) throw Error('Match not found or it has been closed already');
    return { id: mongoResponse.id, message: 'Match has been closed' };
  }
}