import { Schema, InferSchemaType, model } from 'mongoose';

export interface Player {
  nickname: string,
  email: string
}
const playerSchema = new Schema<Player>({
  nickname: { type: String, required: true, unique: true },
  email: { type: String, required: false }
})

//export type Player = InferSchemaType<typeof playerSchema>;

const PlayerModel = model('Player', playerSchema);

export default PlayerModel;