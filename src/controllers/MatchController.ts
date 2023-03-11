import Db from "../services/db";
import MatchModel, { Match } from "../models/Match";
import { Post, Route, SuccessResponse, Tags, Response, Body } from "tsoa";
import { ObjectId } from "mongodb";

@Route('/match')
@Tags('Match')
export default class MatchController {

  @Post('/create')
  @SuccessResponse('201', 'Match created')
  @Response('400', "StartTime & Players are required")
  @Response('500', "Internal server error")
  static async create(@Body() match: Match): Promise<{ id: string, message: 'Match created'}> {
    await Db.connect();
    match.IsInProgress = true;
    const matchModelInstance = new MatchModel(match);
    const { id } = await matchModelInstance.save();
    return { message: 'Match created', id };
  }

  @Post('/close')
  @SuccessResponse('200', 'Match has been closed')
  @Response('400', 'All fields are required')
  @Response('400', 'Match not found or it has been closed already')
  @Response('500', 'Internal server error')
  static async close(@Body() match: Match): Promise<{ id: string, message: 'Match has been closed'}> {
    await Db.connect();
    match.IsInProgress = false;
    const { ServeStart, EndTime, Steps, IsInProgress } = match;
    const mongoResponse = await MatchModel.findOneAndUpdate({_id: match.ID, IsInProgress: true } , { ServeStart, EndTime, Steps, IsInProgress }, { returnDocument: 'after' });
    if(!mongoResponse) throw Error('Match not found or it has been closed already');
    return { id: mongoResponse.id, message: 'Match has been closed' };
  }
}