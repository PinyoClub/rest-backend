import { ObjectId } from 'mongodb';
import { Schema, model } from 'mongoose';

export interface startMatch {
  StartTime: Date,
  Players: String[]
}

export interface endMatch {
  ID: string,
  EndTime: Date, 
  ServeStart: number,
  Steps: Array<Array<number>>
}

export type Match = startMatch & endMatch;

const startMatchSchemaObject = {
  StartTime: { type: Date, required: true },
  Players: { type: [ObjectId], required: true, ref: 'Player' , default: undefined }
};

const endMatchSchemaObject = {
  ID: { type: String, required: true },
  ServeStart: { type: Number, required: true },
  Steps: [{ type: Array, required: true }],
  EndTime: { type: Date, required: true }
};

export const startMatchSchema = new Schema<startMatch>(startMatchSchemaObject);
export const endMatchSchema = new Schema<endMatch>(endMatchSchemaObject);
export const matchSchema = new Schema<endMatch & startMatch>({ ...startMatchSchemaObject, ...endMatchSchemaObject });

export const StartMatchModel = model('StartMatch', startMatchSchema, 'matches');
export const EndMatchModel = model('EndMatch', endMatchSchema, 'matches');
export const MatchModel = model('Match', matchSchema, 'matches');