import request from 'supertest';
import app from '../../src/app';
import { startMatch, StartMatchModel } from '../../src/models/Match';
import Db from '../../src/services/db';

describe('/match', () => {

  describe('POST /create', () => {

    beforeEach(async () => {
      await StartMatchModel.deleteMany({});
    })

    it('successfully creates a match', async () => {
      const testMatch: startMatch = {
        StartTime: new Date(),
        Players: [
          '640e4ace935732d50db2547a', 
          '640e4ace935732d50db2547b'
        ]
      }
      const response = await request(app)
        .post('/match/create')
        .send(testMatch);
      expect(response.statusCode).toBe(201);
    })

    it('returns error about missing attributes from body', async () => {
      const testMatch = {
        StartTime: new Date()
      }
      const response = await request(app)
        .post('/match/create')
        .send(testMatch);
      expect(response.statusCode).toBe(400);
    })

  })

  afterAll(async () => {
    await Db.disconnect();
  })

})