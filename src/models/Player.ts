import { Schema, model } from 'mongoose';

export interface Player {
  nickname: string,
  email?: string
}

const playerSchema = new Schema<Player>({
  nickname: { type: String, required: true, unique: true },
  email: { type: String }
})

const PlayerModel = model('Player', playerSchema);
export default PlayerModel;