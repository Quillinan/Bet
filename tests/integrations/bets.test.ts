import app, { init } from "@/app";
import { cleanDb } from "./helper";
import supertest from "supertest";
import httpStatus from "http-status";
import {
  createGame,
  createParticipant,
  generateNotValidBetAmount,
  generateNotValidBetAway,
  generateNotValidBetGame,
  generateNotValidBetHome,
  generateNotValidBetParticipant,
  generateValidBetBody,
} from "../factories";
import { participantsRepository } from "@/repositories";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe("POST /bets", () => {
  it("should respond with status 400 when body is not valid", async () => {
    const response = await server.post("/bets");

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });
  it("should respond with status 400 when homeTeamScore is not valid", async () => {
    const invalidBody = generateNotValidBetHome();
    const response = await server.post("/bets").send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });
  it("should respond with status 400 when awayTeamScore is not valid", async () => {
    const invalidBody = generateNotValidBetAway();
    const response = await server.post("/bets").send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 when amountBet is not valid", async () => {
    const invalidBody = generateNotValidBetAmount();
    const response = await server.post("/bets").send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 when gameId is not valid", async () => {
    const invalidBody = generateNotValidBetGame();
    const response = await server.post("/bets").send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 when participantId is not valid", async () => {
    const invalidBody = generateNotValidBetParticipant();
    const response = await server.post("/bets").send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 when amountBet exceeds participant balance", async () => {
    const participant = await createParticipant();
    const game = await createGame();

    const body = generateValidBetBody({
      amountBet: participant.balance + 1,
      gameId: game.id,
      participantId: participant.id,
    });
    const response = await server.post("/bets").send(body);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });
  it("should respond with status 400 when game is finished", async () => {
    const participant = await createParticipant();
    const game = await createGame({
      isFinished: true,
    });
    const body = generateValidBetBody({
      amountBet: participant.balance,
      gameId: game.id,
      participantId: participant.id,
    });
    const response = await server.post("/bets").send(body);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });
  it("should respond with status 201 when body is valid", async () => {
    const participant = await createParticipant();
    const game = await createGame();

    const reduceBalanceSpy = jest.spyOn(
      participantsRepository,
      "reduceBalance"
    );

    const body = generateValidBetBody({
      amountBet: participant.balance,
      gameId: game.id,
      participantId: participant.id,
    });

    const response = await server.post("/bets").send(body);

    expect(reduceBalanceSpy).toHaveBeenCalledWith(
      participant.id,
      body.amountBet
    );

    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.body).toEqual({
      id: response.body.id,
      createdAt: response.body.createdAt,
      updatedAt: response.body.updatedAt,
      homeTeamScore: body.homeTeamScore,
      awayTeamScore: body.awayTeamScore,
      amountBet: body.amountBet,
      gameId: body.gameId,
      participantId: body.participantId,
      status: response.body.status,
      amountWon: response.body.amountWon,
    });

    reduceBalanceSpy.mockRestore();
  });
});
