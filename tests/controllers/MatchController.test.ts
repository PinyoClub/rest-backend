import MatchController from "../../src/controllers/MatchController";
import MatchModel, { Match } from "../../src/models/Match";
import Db from "../../src/services/db";
jest.mock('../../src/services/db');

describe('MatchController', () => {

  it("has 'create' method", () => {
    expect(MatchController.create).toBeDefined();
  })

})