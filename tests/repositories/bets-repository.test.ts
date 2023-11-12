import { betsRepository } from "@/repositories";
import { createGame, createParticipant } from "../factories";
import { init } from "@/app";
import { cleanDb } from "../integrations/helper";
import { prisma } from "@/database";

beforeAll(async () => {
  await init();
  await cleanDb();
});

describe("checkBalance", () => {
  it("should return false if the participant is not found", async () => {
    const nonExistentParticipantId = 999;

    const result = await betsRepository.checkBalance(
      nonExistentParticipantId,
      100
    );

    expect(result).toBe(false);
  });

  it("should return true if the participant hasnt enough balance", async () => {
    const participant = await createParticipant();
    const requiredBalance = participant.balance + 1;

    const result = await betsRepository.checkBalance(
      participant.id,
      requiredBalance
    );

    expect(result).toBe(false);
  });

  it("should return true if the participant has enough balance", async () => {
    const participant = await createParticipant();
    const requiredBalance = participant.balance - 1;

    const result = await betsRepository.checkBalance(
      participant.id,
      requiredBalance
    );

    expect(result).toBe(true);
  });
});

describe("reduceBalance", () => {
  it("should decrement the participant's balance", async () => {
    const participant = await createParticipant();

    const balanceReduction = 10;

    const updateMock = jest
      .spyOn(prisma.participant, "update")
      .mockResolvedValue({
        id: participant.id,
        name: participant.name,
        balance: 100 - balanceReduction,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

    await betsRepository.reduceBalance(participant.id, balanceReduction);

    expect(updateMock).toHaveBeenCalledWith({
      where: { id: participant.id },
      data: {
        balance: {
          decrement: balanceReduction,
        },
      },
    });
  });
});

describe("checkGame", () => {
  it("should return false if game is finished", async () => {
    const game = await createGame({
      isFinished: true,
    });

    const findUniqueMock = jest
      .spyOn(prisma.game, "findUnique")
      .mockResolvedValue({
        id: game.id,
        createdAt: game.createdAt,
        updatedAt: game.updatedAt,
        homeTeamName: game.homeTeamName,
        awayTeamName: game.awayTeamName,
        homeTeamScore: game.homeTeamScore,
        awayTeamScore: game.awayTeamScore,
        isFinished: game.isFinished,
      });

    const result = await betsRepository.checkGame(game.id);

    expect(findUniqueMock).toHaveBeenCalledWith({
      where: { id: game.id },
    });
    expect(result).toBe(false);
  });
  it("should return true if game isnt finished", async () => {
    const game = await createGame();

    const updateMock = jest.spyOn(prisma.game, "findUnique").mockResolvedValue({
      id: game.id,
      createdAt: game.createdAt,
      updatedAt: game.updatedAt,
      homeTeamName: game.homeTeamName,
      awayTeamName: game.awayTeamName,
      homeTeamScore: game.homeTeamScore,
      awayTeamScore: game.awayTeamScore,
      isFinished: game.isFinished,
    });

    const result = await betsRepository.checkGame(game.id);

    expect(updateMock).toHaveBeenCalledWith({
      where: { id: game.id },
    });
    expect(result).toBe(true);
  });
});
