import { Schema, InferSchemaType, model } from 'mongoose';

const playerSchema = new Schema({
  nickname: { type: String, required: true, unique: true },
  email: { type: String, required: false }
})


export type Player = InferSchemaType<typeof playerSchema>;

const PlayerModel = model('Player', playerSchema);

export default PlayerModel;