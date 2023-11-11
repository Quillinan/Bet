import { init } from "@/app";
import { cleanDb } from "../integrations/helper";
import { gamesRepository } from "@/repositories";
import { createBet, createGame, createParticipant } from "../factories";
import {
  calculateWinnerAmount,
  checkBets,
  updateWinners,
} from "@/services/games-service";

beforeAll(async () => {
  await init();
  await cleanDb();
});

describe("checkBets", () => {
  it("should correctly update bets status", async () => {
    const game = await createGame();
    const participant1 = await createParticipant();
    const participant2 = await createParticipant();
    const bet1 = await createBet({
      amountBet: participant1.balance,
      gameId: game.id,
      participantId: participant1.id,
    });
    const bet2 = await createBet({
      amountBet: participant2.balance,
      gameId: game.id,
      participantId: participant2.id,
    });

    const bets = [bet1, bet2];

    const homeTeamScore = bets[1].homeTeamScore;
    const awayTeamScore = bets[1].awayTeamScore;

    const updateBetMock = jest.spyOn(gamesRepository, "updateBet");

    await checkBets(bets, homeTeamScore, awayTeamScore);

    expect(updateBetMock).toHaveBeenCalledWith(bets[0].id, "LOST", 0);
    expect(updateBetMock).toHaveBeenCalledWith(bets[1].id, "WON");
  });
});

describe("updateWinners", () => {
  it("should correctly update winners", async () => {
    const game = await createGame();
    const participant1 = await createParticipant();
    const participant2 = await createParticipant();
    const bet1 = await createBet({
      amountBet: participant1.balance,
      gameId: game.id,
      participantId: participant1.id,
      status: "WON",
    });
    const bet2 = await createBet({
      amountBet: participant2.balance,
      gameId: game.id,
      participantId: participant2.id,
      status: "WON",
    });
    const total = bet1.amountBet + bet2.amountBet;
    const amountBet1 = calculateWinnerAmount(
      total,
      total,
      participant1.balance,
      0.3
    );
    const amountBet2 = calculateWinnerAmount(
      total,
      total,
      participant2.balance,
      0.3
    );

    const bets = [bet1, bet2];

    const updateBetMock = jest.spyOn(gamesRepository, "updateBet");
    const updateWinnerMock = jest.spyOn(gamesRepository, "updateWinner");

    await updateWinners(bets, total, total);

    expect(updateBetMock).toHaveBeenCalledWith(
      bets[0].id,
      undefined,
      amountBet1
    );
    expect(updateBetMock).toHaveBeenCalledWith(
      bets[1].id,
      undefined,
      amountBet2
    );
    expect(updateWinnerMock).toHaveBeenCalledWith(
      bets[0].participantId,
      amountBet1
    );
    expect(updateWinnerMock).toHaveBeenCalledWith(
      bets[1].participantId,
      amountBet2
    );
  });
});

describe("calculateWinnerAmount", () => {
  it("should correctly calculate winner amount", () => {
    const total = 60;
    const totalWinners = 30;
    const participantAmount = 20;
    const tax = 0.3;

    const result = calculateWinnerAmount(
      total,
      totalWinners,
      participantAmount,
      tax
    );

    expect(result).toBe(28);
  });
});
