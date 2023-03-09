import mongoose, { Schema, InferSchemaType } from 'mongoose';

const playerSchema = new Schema({
  nickname: { type: String, required: true },
  email: { type: String, required: false }
})

export type Player = InferSchemaType<typeof playerSchema>;

const PlayerModel = mongoose.model('Player', playerSchema);

export default PlayerModel;