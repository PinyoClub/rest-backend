import { Schema, model, Types } from 'mongoose';

export interface Match {
  ID?: string,
  StartTime: Date,
  EndTime?: Date,
  Players: Array<string>,
  ServeStart?: number,
  Steps?: Array<Array<number>>,
  IsInProgress: Boolean
}

const matchSchema = new Schema<Match>({
  StartTime: { type: Date, required: true },
  EndTime: { type: Date, required: false },
  Players: [{ type: String }],
  ServeStart: { type: Number },
  Steps: [{ type: Array, required: true }],
  IsInProgress: { type: Boolean, required: true }
})

const MatchModel = model('Match', matchSchema);

export default MatchModel;
