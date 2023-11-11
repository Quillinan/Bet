import app, { init } from "@/app";
import { cleanDb } from "./helper";
import supertest from "supertest";
import httpStatus from "http-status";
import {
  createGame,
  createParticipant,
  generateNotValidBet,
  generateValidBetBody,
} from "../factories";

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
  it("should respond with status 400 when body is not valid", async () => {
    const invalidBody = generateNotValidBet();
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

    const body = generateValidBetBody({
      amountBet: participant.balance,
      gameId: game.id,
      participantId: participant.id,
    });
    const response = await server.post("/bets").send(body);

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
  });
});
