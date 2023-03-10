import PlayerController from "../../src/controllers/PlayerController";
import { Player } from "../../src/models/Player";

describe('Player controller', () => {
  it('instantiated', () => {
    expect(new PlayerController() instanceof PlayerController).toBeTruthy();
  })

  it("has method 'addPlayer'", () => {
    expect(new PlayerController().addPlayer).toBeDefined();  
  });

})
}) 