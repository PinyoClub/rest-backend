import PlayerController from "../../src/controllers/PlayerController";
import { Player } from "../../src/models/Player";

describe('Player controller', () => {

  it("has method 'addPlayer'", () => {
    expect(PlayerController.addPlayer).toBeDefined();  
  });

})