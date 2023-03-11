import { Schema, model, Types } from 'mongoose';

export interface Match {
  StartTime: Date,
  EndTime?: Date,
  Players: Array<string>,
  ServeStart?: string,
  Steps?: Array<Array<string>>
}

const matchSchema = new Schema<Match>({
  StartTime: { type: Date, required: true },
  EndTime: { type: Date, required: false },
  Players: [{ type: String }],
  ServeStart: { type: String },
  Steps: [{ type: Array, required: true }]
})

const MatchModel = model('Match', matchSchema);

export default MatchModel;
