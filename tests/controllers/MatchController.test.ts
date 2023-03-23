import MatchController from "../../src/controllers/MatchController";
import Db from "../../src/services/db";
jest.mock('../../src/services/db');

describe('MatchController', () => {

  it("has 'create' method", () => {
    expect(MatchController.create).toBeDefined();
  })

})