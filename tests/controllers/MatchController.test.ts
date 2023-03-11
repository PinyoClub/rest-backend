import MatchController from "../../src/controllers/MatchController";
import MatchModel, { Match } from "../../src/models/Match";
import Db from "../../src/services/db";
jest.mock('../../src/services/db');

describe('MatchController', () => {

  it("has 'create' method", () => {
    expect(MatchController.create).toBeDefined();
  })

  describe('create match', () => {
    
    it('should call Db.connect()', async () => {
      MatchModel.prototype.save = jest.fn();
      const connectSpy = jest.spyOn(Db, 'connect');
      const testMatch: Match = {
        StartTime: new Date(),
        Players: [
          '640c3859f44deb0eb9d27b1f',
          '640c385ef44deb0eb9d27b22'
        ]
      }
      await MatchController.create(testMatch);
      expect(connectSpy).toHaveBeenCalled();
    })

  })

})