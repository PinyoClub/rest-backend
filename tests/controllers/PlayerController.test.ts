import PlayerController from "../../src/controllers/PlayerController";

describe('Player controller', () => {
  it('instantiated', () => {
    expect(new PlayerController() instanceof PlayerController).toBeTruthy();
  })
})