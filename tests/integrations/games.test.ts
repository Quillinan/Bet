import app, { init } from "@/app";
import { cleanDb } from "./helper";
import supertest from "supertest";
import httpStatus from "http-status";
import {
  createGame,
  createGameWithBets,
  generateNotValidGameAway,
  generateNotValidGameHome,
  generateValidGameBody,
} from "../factories";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe("GET /games", () => {
  it("should respond with status 404 when dont exist games", async () => {
    const response = await server.get("/games");

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });
  it("should respond with status 200 and contain the games when games exist", async () => {
    const game = await createGame();
    const response = await server.get("/games");

    expect(response.status).toBe(httpStatus.OK);

    expect(response.body).toEqual([
      {
        id: game.id,
        createdAt: game.createdAt.toISOString(),
        updatedAt: game.updatedAt.toISOString(),
        homeTeamName: game.homeTeamName,
        awayTeamName: game.awayTeamName,
        homeTeamScore: game.homeTeamScore,
        awayTeamScore: game.awayTeamScore,
        isFinished: game.isFinished,
      },
    ]);
  });
});

describe("GET /games/:id", () => {
  it("should respond with status 400 when id is not valid", async () => {
    const response = await server.get("/games/string");

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });
  it("should respond with status 404 when dont exist games", async () => {
    const game = await createGame();
    await cleanDb();
    const response = await server.get(`/games/${game.id}`);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });
  it("should respond with status 200 and contain the games when games exist", async () => {
    const game = await createGameWithBets();
    const response = await server.get(`/games/${game.id}`);

    expect(response.status).toBe(httpStatus.OK);

    // Aguarde a resolução da promise antes de comparar
    expect(response.body).toEqual({
      id: game.id,
      createdAt: game.createdAt.toISOString(),
      updatedAt: game.updatedAt.toISOString(),
      homeTeamName: game.homeTeamName,
      awayTeamName: game.awayTeamName,
      homeTeamScore: game.homeTeamScore,
      awayTeamScore: game.awayTeamScore,
      isFinished: game.isFinished,
      Bets: game.Bets,
    });
  });
});

describe("POST /games", () => {
  it("should respond with status 400 when body is not valid", async () => {
    const response = await server.post("/games");

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });
  it("should respond with status 400 when homeTeamName is not valid", async () => {
    const invalidBody = generateNotValidGameHome();
    const response = await server.post("/games").send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });
  it("should respond with status 400 when awayTeamName is not valid", async () => {
    const invalidBody = generateNotValidGameAway();
    const response = await server.post("/games").send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });
  it("should respond with status 201 when body is valid", async () => {
    const body = generateValidGameBody();
    const response = await server.post("/games").send(body);

    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.body).toEqual({
      id: response.body.id,
      createdAt: response.body.createdAt,
      updatedAt: response.body.updatedAt,
      homeTeamName: body.homeTeamName,
      awayTeamName: body.awayTeamName,
      homeTeamScore: response.body.homeTeamScore,
      awayTeamScore: response.body.awayTeamScore,
      isFinished: response.body.isFinished,
    });
  });
});