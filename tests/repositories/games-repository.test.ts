import { init } from "@/app";
import { cleanDb } from "../integrations/helper";
import { createGame } from "../factories";
import { gamesRepository } from "@/repositories";

beforeAll(async () => {
  await init();
  await cleanDb();
});

describe("check", () => {
  it("should return false if game does not exist", async () => {
    const result = await gamesRepository.checkGame(-1);

    expect(result).toBe(false);
  });
  it("should return false if game is finished", async () => {
    const game = await createGame({ isFinished: true });

    const result = await gamesRepository.checkGame(game.id);

    expect(result).toBe(false);
  });
  it("should return true if game is not finished", async () => {
    const game = await createGame();

    const result = await gamesRepository.checkGame(game.id);

    expect(result).toBe(true);
  });
});
