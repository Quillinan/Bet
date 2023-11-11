import app, { init } from "@/app";
import { cleanDb } from "./helper";
import supertest from "supertest";
import httpStatus from "http-status";
import {
  createParticipant,
  generateNotValidParticipantBalance,
  generateNotValidParticipantName,
  generateValidParticipantBody,
} from "../factories";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe("GET /participants", () => {
  it("should respond with status 404 when dont exist participants", async () => {
    const response = await server.get("/participants");

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });
  it("should respond with status 200 and contain the participant when participants exist", async () => {
    const participant = await createParticipant();
    const response = await server.get("/participants");

    expect(response.status).toBe(httpStatus.OK);

    expect(response.body).toEqual([
      {
        id: participant.id,
        name: participant.name,
        balance: participant.balance,
        createdAt: participant.createdAt.toISOString(),
        updatedAt: participant.updatedAt.toISOString(),
      },
    ]);
  });
});

describe("POST /participants", () => {
  it("should respond with status 400 when body is not valid", async () => {
    const response = await server.post("/participants");

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });
  it("should respond with status 400 when name is not valid", async () => {
    const invalidBody = generateNotValidParticipantName();
    const response = await server.post("/participants").send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });
  it("should respond with status 400 when balance is not valid", async () => {
    const invalidBody = generateNotValidParticipantBalance();
    const response = await server.post("/participants").send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });
  it("should respond with status 201 when body is valid", async () => {
    const body = generateValidParticipantBody();
    const response = await server.post("/participants").send(body);

    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.body).toEqual({
      id: response.body.id,
      name: body.name,
      balance: body.balance * 100,
      createdAt: response.body.createdAt,
      updatedAt: response.body.updatedAt,
    });
  });
});
