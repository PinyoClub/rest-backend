import request from "supertest"
import app from "../../src/app"
import PlayerModel from "../../src/models/Player"
import Db from "../../src/services/db"

describe('/player', () => {
  
  describe('POST /create', () => {

    beforeEach(async () => {
      await PlayerModel.deleteMany({});
    })

    it('returns 201 when only nickname is passed in body', async () => {
      const response = await request(app)
        .post('/player/add')
        .send({ nickname: 'Integration test player'} );
      expect(response.statusCode).toEqual(201);
    })

    it('returns 400 when player with that nickname already exists', async () => {
      const testPlayer = { nickname: 'TestPlayer' };
      const responseSuccess = await request(app)
        .post('/player/add')
        .send(testPlayer);
      expect(responseSuccess.statusCode).toEqual(201);
      
      const responseDuplicate = await request(app)
        .post('/player/add')
        .send(testPlayer);
      expect(responseDuplicate.statusCode).toEqual(400);
    })

    it('returns 400 when nickname is not passed in body object', async () => {
      const testPlayer = { name: 'testPlayer' };
      const response400 = await request(app)
        .post('/player/add')
        .send(testPlayer);
      expect(response400.body).toHaveProperty('error');
      expect(response400.statusCode).toEqual(400);

    })

  })
  
  describe('GET /', () => {

    beforeAll(async () => {
      await PlayerModel.deleteMany({});
    })

    it('returns [] when no players available', async () => {
      const allPlayers = await request(app)
        .get('/player');
      expect(allPlayers.statusCode).toBe(200);
      expect(allPlayers.body).toStrictEqual([]);
    })

    it('returns 2 length array with only nicknames', async () => {
      const testPlayers = [
        { nickname: 'TestPlayer1' },
        { nickname: 'TestPlayer2' }
      ];

      for(const player of testPlayers) {
        await request(app).post('/player/add').send(player);
      }

      const allPlayers = await request(app).get('/player');
      expect(allPlayers.statusCode).toBe(200);
      expect(allPlayers.body.length).toBe(2);
      expect(allPlayers.body).toStrictEqual(testPlayers.map(player => player.nickname));
    })

  })

  describe('GET /:identifier', () => {

    const playerIds = [];

    const testPlayer =  { nickname: 'Player1' };

    beforeAll(async () => {
      await PlayerModel.deleteMany({});
      await new PlayerModel(testPlayer).save();
    })

    it('returns player by nickname', async () => {
      const response = await request(app)
        .get(`/player/${testPlayer.nickname}`);
      expect(response.statusCode).toBe(200);
    })

    it('returns No player found -  404', async () => {
      const response = await request(app)
        .get('/player/Player2');
      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('error');
    })

  }) 

  
  afterAll(async () => {
    await Db.disconnect();
  })

})